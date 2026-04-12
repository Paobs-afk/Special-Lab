import { inflateRawSync } from "node:zlib";

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\u0000/g, " ")
    .trim();
}

function decodePdfLiteral(literal: string): string {
  return literal
    .replace(/\\n/g, " ")
    .replace(/\\r/g, " ")
    .replace(/\\t/g, " ")
    .replace(/\\\(/g, "(")
    .replace(/\\\)/g, ")")
    .replace(/\\\\/g, "\\")
    .replace(/\\([0-7]{3})/g, (_, octal) => String.fromCharCode(parseInt(octal, 8)));
}

function extractStringsFromBinary(text: string): string {
  const matches = text.match(/[A-Za-z][A-Za-z0-9,.;:()\-/'"\s]{3,}/g) || [];
  return cleanText(matches.join(" "));
}

function extractTextFromPdfBuffer(buffer: Buffer): string {
  const binary = buffer.toString("latin1");
  const literalMatches = binary.match(/\((?:\\.|[^\\()])*\)/g) || [];
  const hexMatches = Array.from(binary.matchAll(/<([A-Fa-f0-9]{8,})>/g)).map((match) => match[1]);

  const literalText = literalMatches
    .map((value) => value.slice(1, -1))
    .map(decodePdfLiteral)
    .join(" ");

  const hexText = hexMatches
    .map((value) => {
      const safeValue = value.length % 2 === 0 ? value : `${value}0`;
      try {
        return Buffer.from(safeValue, "hex").toString("utf8");
      } catch {
        return "";
      }
    })
    .join(" ");

  const combined = cleanText(`${literalText} ${hexText}`);
  if (combined.length >= 120) {
    return combined;
  }

  return extractStringsFromBinary(binary);
}

interface ZipEntry {
  filename: string;
  compressionMethod: number;
  compressedSize: number;
  localHeaderOffset: number;
}

function findEndOfCentralDirectory(buffer: Buffer): number {
  for (let index = buffer.length - 22; index >= Math.max(0, buffer.length - 65557); index -= 1) {
    if (buffer.readUInt32LE(index) === 0x06054b50) {
      return index;
    }
  }

  return -1;
}

function getZipEntries(buffer: Buffer): ZipEntry[] {
  const eocdOffset = findEndOfCentralDirectory(buffer);
  if (eocdOffset === -1) {
    return [];
  }

  const centralDirectoryOffset = buffer.readUInt32LE(eocdOffset + 16);
  const totalEntries = buffer.readUInt16LE(eocdOffset + 10);
  const entries: ZipEntry[] = [];

  let cursor = centralDirectoryOffset;
  for (let index = 0; index < totalEntries; index += 1) {
    if (buffer.readUInt32LE(cursor) !== 0x02014b50) {
      break;
    }

    const compressionMethod = buffer.readUInt16LE(cursor + 10);
    const compressedSize = buffer.readUInt32LE(cursor + 20);
    const fileNameLength = buffer.readUInt16LE(cursor + 28);
    const extraLength = buffer.readUInt16LE(cursor + 30);
    const commentLength = buffer.readUInt16LE(cursor + 32);
    const localHeaderOffset = buffer.readUInt32LE(cursor + 42);
    const filename = buffer.toString("utf8", cursor + 46, cursor + 46 + fileNameLength);

    entries.push({
      filename,
      compressionMethod,
      compressedSize,
      localHeaderOffset,
    });

    cursor += 46 + fileNameLength + extraLength + commentLength;
  }

  return entries;
}

function extractZipEntry(buffer: Buffer, targetFilename: string): Buffer | null {
  const entry = getZipEntries(buffer).find((item) => item.filename === targetFilename);
  if (!entry) {
    return null;
  }

  const offset = entry.localHeaderOffset;
  if (buffer.readUInt32LE(offset) !== 0x04034b50) {
    return null;
  }

  const filenameLength = buffer.readUInt16LE(offset + 26);
  const extraLength = buffer.readUInt16LE(offset + 28);
  const dataStart = offset + 30 + filenameLength + extraLength;
  const dataEnd = dataStart + entry.compressedSize;
  const compressed = buffer.slice(dataStart, dataEnd);

  if (entry.compressionMethod === 0) {
    return compressed;
  }

  if (entry.compressionMethod === 8) {
    return inflateRawSync(compressed);
  }

  return null;
}

function stripXml(xml: string): string {
  return cleanText(
    xml
      .replace(/<w:tab\/?\s*>/g, " ")
      .replace(/<w:br\/?\s*>/g, " ")
      .replace(/<w:p[^>]*>/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
  );
}

function extractTextFromDocxBuffer(buffer: Buffer): string {
  const xmlParts = [
    "word/document.xml",
    "word/header1.xml",
    "word/header2.xml",
    "word/footer1.xml",
    "word/footer2.xml",
  ]
    .map((entry) => extractZipEntry(buffer, entry))
    .filter((entry): entry is Buffer => Boolean(entry))
    .map((entry) => stripXml(entry.toString("utf8")));

  return cleanText(xmlParts.join(" "));
}

function extractTextFromLegacyDoc(buffer: Buffer): string {
  const utf16 = extractStringsFromBinary(buffer.toString("utf16le"));
  const latin1 = extractStringsFromBinary(buffer.toString("latin1"));

  return utf16.length >= latin1.length ? utf16 : latin1;
}

export async function extractTextFromFile(file: Express.Multer.File): Promise<string> {
  const filename = file.originalname.toLowerCase();

  if (filename.endsWith(".txt")) {
    return cleanText(file.buffer.toString("utf8"));
  }

  if (filename.endsWith(".pdf")) {
    return extractTextFromPdfBuffer(file.buffer);
  }

  if (filename.endsWith(".docx")) {
    return extractTextFromDocxBuffer(file.buffer);
  }

  if (filename.endsWith(".doc")) {
    return extractTextFromLegacyDoc(file.buffer);
  }

  return cleanText(file.buffer.toString("utf8"));
}
