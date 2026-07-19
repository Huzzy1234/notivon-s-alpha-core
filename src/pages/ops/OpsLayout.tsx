import { LogOut, MapPin, Calculator, ClipboardList, Globe } from "lucide-react";
import { Link, useLocation, Navigate, Outlet } from "react-router-dom";

export default function OpsLayout() {
  const isAuthed = localStorage.getItem("ops_auth") === "true";
  const location = useLocation();

  if (!isAuthed) {
    return <Navigate to="/ops/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("ops_auth");
    window.location.href = "/ops/login";
  };

  const navItems = [
    { name: "Lead Scout", path: "/ops/scout", icon: MapPin },
    { name: "Pipeline", path: "/ops/pipeline", icon: ClipboardList },
    { name: "Bridge Builder", path: "/ops/bridge-builder", icon: Globe },
    { name: "Cost Calc", path: "/ops/cost-calculator", icon: Calculator },
  ];

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col h-full">
        <div className="p-6 border-b border-border">
          <h2 className="font-display font-bold text-xl tracking-tight text-primary">Notivon Ops</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-md text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto bg-muted/20">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
          <h2 className="font-display font-bold text-lg text-primary">Notivon Ops</h2>
          <button onClick={handleLogout} className="p-2 text-muted-foreground">
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
