import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

export default function OpsLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // If already authed, redirect
  if (localStorage.getItem("ops_auth") === "true") {
    return <Navigate to="/ops/scout" replace />;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded password for internal use (trimmed & lowercase for mobile friendly login).
    if (password.trim().toLowerCase() === "notivon2026") {
      localStorage.setItem("ops_auth", "true");
      navigate("/ops/scout");
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-sm p-8">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-primary" />
          </div>
        </div>
        <h1 className="text-2xl font-display font-semibold text-center text-foreground mb-2">
          Internal Ops
        </h1>
        <p className="text-muted-foreground text-center text-sm mb-8">
          Enter password to access internal tools.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              autoFocus
            />
          </div>
          {error && <p className="text-destructive text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-md hover:bg-primary/90 transition-colors"
          >
            Access
          </button>
        </form>
      </div>
    </div>
  );
}
