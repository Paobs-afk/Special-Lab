import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2F97ee5723ed634863ab2e56731585fbe0?format=webp&width=800&height=600"
            alt="TextIQ Logo"
            className="h-16 w-auto"
          />
        </Link>
      </div>
    </header>
  );
}
