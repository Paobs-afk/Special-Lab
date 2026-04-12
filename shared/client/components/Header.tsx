import { Link, useLocation } from "react-router-dom";
import { Clock } from "lucide-react";

export default function Header() {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F895651d642164b74988a81b4e99696fb%2F97ee5723ed634863ab2e56731585fbe0?format=webp&width=800&height=600"
            alt="TextIQ Logo"
            className="h-16 w-auto"
          />
        </Link>
        
        <nav className="flex items-center gap-2">
          {location.pathname !== "/history" && (
            <Link 
              to="/history"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
