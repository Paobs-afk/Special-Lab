import html2pdf from 'html2pdf.js';
import { AnalysisResponse } from "@shared/api";

export function generatePDFReport(analysis: AnalysisResponse): void {
  const element = document.createElement('div');
  element.style.cssText = 'padding: 40px; background: white; color: #0F172A; font-family: Inter, sans-serif;';
  
  const now = new Date();
  const formatDate = now.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  element.innerHTML = `
    <div style="margin-bottom: 40px; border-bottom: 3px solid #2563EB; padding-bottom: 20px;">
      <h1 style="font-size: 32px; margin: 0 0 10px 0; color: #0F172A;">TextIQ Analysis Report</h1>
      <p style="font-size: 14px; color: #64748B; margin: 0;">Generated on ${formatDate}</p>
    </div>

    <!-- Executive Summary -->
    <div style="margin-bottom: 40px;">
      <h2 style="font-size: 24px; margin: 0 0 16px 0; color: #0F172A;">Executive Summary</h2>
      <div style="background: #F8FAFC; border-left: 4px solid #2563EB; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
        <p style="font-size: 14px; line-height: 1.6; margin: 0; color: #0F172A;">${analysis.summary}</p>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div style="background: #F1F5F9; padding: 16px; border-radius: 8px;">
          <p style="font-size: 12px; color: #64748B; margin: 0 0 8px 0; text-transform: uppercase; font-weight: 600;">Collection Coherence</p>
          <p style="font-size: 28px; margin: 0; color: #2563EB; font-weight: bold;">${analysis.overallScore}%</p>
        </div>
        <div style="background: #F1F5F9; padding: 16px; border-radius: 8px;">
          <p style="font-size: 12px; color: #64748B; margin: 0 0 8px 0; text-transform: uppercase; font-weight: 600;">Documents Analyzed</p>
          <p style="font-size: 28px; margin: 0; color: #2563EB; font-weight: bold;">${analysis.documentCount}</p>
        </div>
      </div>
    </div>

    <!-- Algorithm Info -->
    <div style="margin-bottom: 40px;">
      <h2 style="font-size: 24px; margin: 0 0 16px 0; color: #0F172A;">Algorithm Information</h2>
      <div style="background: #EFF6FF; border: 1px solid #BFDBFE; padding: 16px; border-radius: 8px;">
        <h3 style="font-size: 16px; margin: 0 0 8px 0; color: #1E40AF;">${analysis.algorithm.name}</h3>
        <p style="font-size: 14px; line-height: 1.6; margin: 0 0 16px 0; color: #1E40AF;">${analysis.algorithm.description}</p>
        <p style="font-size: 12px; margin: 0; color: #1E40AF; font-weight: 600; margin-bottom: 8px;">Processing Layers:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${analysis.algorithm.layers.map(layer => `
            <span style="background: #DBEAFE; color: #0C4A6E; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">
              ${layer}
            </span>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Document Scores -->
    <div style="margin-bottom: 40px; page-break-inside: avoid;">
      <h2 style="font-size: 24px; margin: 0 0 16px 0; color: #0F172A;">Document Scores</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <thead>
          <tr style="background: #F8FAFC; border-bottom: 2px solid #E2E8F0;">
            <th style="padding: 12px; text-align: left; font-weight: 600; font-size: 12px; color: #0F172A;">Document</th>
            <th style="padding: 12px; text-align: center; font-weight: 600; font-size: 12px; color: #0F172A;">Tokens</th>
            <th style="padding: 12px; text-align: center; font-weight: 600; font-size: 12px; color: #0F172A;">Unique Terms</th>
            <th style="padding: 12px; text-align: center; font-weight: 600; font-size: 12px; color: #0F172A;">Signal Score</th>
          </tr>
        </thead>
        <tbody>
          ${analysis.documentScores.map((doc, index) => `
            <tr style="border-bottom: 1px solid #E2E8F0; ${index % 2 === 0 ? 'background: #F8FAFC;' : ''}">
              <td style="padding: 12px; font-size: 13px; color: #0F172A; font-weight: 500;">${doc.filename}</td>
              <td style="padding: 12px; text-align: center; font-size: 13px; color: #64748B;">${doc.tokenCount}</td>
              <td style="padding: 12px; text-align: center; font-size: 13px; color: #64748B;">${doc.uniqueTermCount}</td>
              <td style="padding: 12px; text-align: center; font-size: 13px; color: #0F172A; font-weight: 600;">${doc.signalScore}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- Similarity Matrix -->
    ${analysis.matrix.labels.length > 0 ? `
      <div style="margin-bottom: 40px; page-break-inside: avoid;">
        <h2 style="font-size: 24px; margin: 0 0 16px 0; color: #0F172A;">Similarity Matrix</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #F8FAFC;">
              <th style="padding: 12px; text-align: left; font-weight: 600; font-size: 12px; color: #0F172A; border: 1px solid #E2E8F0;"></th>
              ${analysis.matrix.labels.map(label => `
                <th style="padding: 12px; text-align: center; font-weight: 600; font-size: 11px; color: #0F172A; border: 1px solid #E2E8F0; word-break: break-word; max-width: 100px;">
                  ${label.substring(0, 15)}...
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            ${analysis.matrix.rows.map((row, rowIndex) => `
              <tr>
                <td style="padding: 12px; font-weight: 600; font-size: 11px; color: #0F172A; border: 1px solid #E2E8F0; max-width: 100px; word-break: break-word;">
                  ${row.filename.substring(0, 12)}...
                </td>
                ${row.scores.map((score, colIndex) => {
                  let bgColor = '#F8FAFC';
                  if (rowIndex === colIndex) {
                    bgColor = '#2563EB';
                  } else if (score >= 80) {
                    bgColor = '#D1FAE5';
                  } else if (score >= 60) {
                    bgColor = '#DBEAFE';
                  } else if (score >= 40) {
                    bgColor = '#FEF08A';
                  } else {
                    bgColor = '#FFEDD5';
                  }
                  const textColor = rowIndex === colIndex ? 'white' : '#0F172A';
                  return `
                    <td style="padding: 8px; text-align: center; font-size: 12px; border: 1px solid #E2E8F0; background: ${bgColor}; color: ${textColor}; font-weight: 600;">
                      ${score}%
                    </td>
                  `;
                }).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` : ''}

    <!-- Top Terms -->
    ${analysis.topTerms.length > 0 ? `
      <div style="margin-bottom: 40px;">
        <h2 style="font-size: 24px; margin: 0 0 16px 0; color: #0F172A;">Top Terms (TF-IDF Ranked)</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          ${analysis.topTerms.slice(0, 10).map((term, index) => `
            <div style="background: #F8FAFC; padding: 12px; border-radius: 8px; border-left: 3px solid #2563EB;">
              <p style="font-weight: 600; margin: 0 0 4px 0; color: #0F172A; font-size: 14px;">${term.term}</p>
              <p style="font-size: 12px; color: #64748B; margin: 0;">TF-IDF: ${term.score.toFixed(4)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- Key Findings -->
    ${analysis.keyFindings.length > 0 ? `
      <div style="margin-bottom: 40px;">
        <h2 style="font-size: 24px; margin: 0 0 16px 0; color: #0F172A;">Key Findings</h2>
        <div style="space-y: 12px;">
          ${analysis.keyFindings.map(finding => {
            let borderColor = '#EF4444';
            if (finding.impact === 'medium') borderColor = '#EAB308';
            if (finding.impact === 'low') borderColor = '#16A34A';
            return `
              <div style="border-left: 4px solid ${borderColor}; background: #F8FAFC; padding: 12px; margin-bottom: 12px; border-radius: 4px;">
                <h4 style="margin: 0 0 4px 0; color: #0F172A; font-size: 14px; font-weight: 600;">${finding.title}</h4>
                <p style="margin: 0; font-size: 13px; color: #64748B; line-height: 1.5;">${finding.description}</p>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    ` : ''}

    <!-- Recommendations -->
    ${analysis.recommendations.length > 0 ? `
      <div style="margin-bottom: 40px;">
        <h2 style="font-size: 24px; margin: 0 0 16px 0; color: #0F172A;">Recommendations</h2>
        <ol style="padding-left: 20px; margin: 0;">
          ${analysis.recommendations.map(rec => `
            <li style="margin-bottom: 12px; font-size: 14px; color: #0F172A; line-height: 1.6;">
              ${rec.text}
              <span style="display: inline-block; margin-left: 8px; background: ${rec.priority === 'high' ? '#FEE2E2' : rec.priority === 'medium' ? '#FEF3C7' : '#F0FDF4'}; color: ${rec.priority === 'high' ? '#991B1B' : rec.priority === 'medium' ? '#92400E' : '#166534'}; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600;">
                ${rec.priority.toUpperCase()}
              </span>
            </li>
          `).join('')}
        </ol>
      </div>
    ` : ''}

    <!-- Footer -->
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #E2E8F0; text-align: center;">
      <p style="font-size: 12px; color: #94A3B8; margin: 0;">
        TextIQ Analysis Report • Intelligent Document Analysis System
      </p>
      <p style="font-size: 11px; color: #CBD5E1; margin: 4px 0 0 0;">
        This report was generated automatically using TF-IDF and Cosine Similarity algorithms.
      </p>
    </div>
  `;

  const filename = `textiq-analysis-report-${Date.now()}.pdf`;
  
  const options = {
    margin: 10,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, backgroundColor: '#ffffff' },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
  };

  html2pdf().set(options).from(element).save();
}

export function generateCSVReport(analysis: AnalysisResponse): void {
  let csv = 'TextIQ Analysis Report\n';
  csv += new Date().toLocaleString() + '\n\n';

  csv += 'EXECUTIVE SUMMARY\n';
  csv += `Overall Coherence Score,${analysis.overallScore}%\n`;
  csv += `Documents Analyzed,${analysis.documentCount}\n`;
  csv += `Summary,"${analysis.summary}"\n\n`;

  csv += 'DOCUMENT SCORES\n';
  csv += 'Filename,Token Count,Unique Terms,Signal Score,Classification\n';
  analysis.documentScores.forEach(doc => {
    csv += `"${doc.filename}",${doc.tokenCount},${doc.uniqueTermCount},${doc.signalScore},"${doc.classification}"\n`;
  });
  csv += '\n';

  csv += 'SIMILARITY MATRIX\n';
  if (analysis.matrix.labels.length > 0) {
    csv += ',' + analysis.matrix.labels.map(l => `"${l}"`).join(',') + '\n';
    analysis.matrix.rows.forEach(row => {
      csv += `"${row.filename}"`;
      row.scores.forEach(score => {
        csv += `,${score}%`;
      });
      csv += '\n';
    });
  }
  csv += '\n';

  if (analysis.similarities.length > 0) {
    csv += 'PAIRWISE SIMILARITIES\n';
    csv += 'Document A,Document B,Similarity %,Decision,Evidence Terms\n';
    analysis.similarities.forEach(sim => {
      const terms = sim.evidenceTerms?.join('; ') || 'N/A';
      csv += `"${sim.documents[0]}","${sim.documents[1]}",${sim.similarity},${sim.decision},"${terms}"\n`;
    });
  }

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `textiq-analysis-${Date.now()}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
