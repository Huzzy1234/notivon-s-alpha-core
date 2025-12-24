import { ArrowRight, FileText } from "lucide-react";
import { useEffect, useRef } from "react";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // AI Nodes configuration
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const nodeCount = 60;
    const connectionDistance = 180;

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.3;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            // Blue gradient for connections
            const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
            gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(0, 240, 255, ${opacity * 1.5})`);
            gradient.addColorStop(1, `rgba(59, 130, 246, ${opacity})`);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw node with blue/cyan glow
        const nodeGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 3
        );
        nodeGradient.addColorStop(0, "rgba(0, 240, 255, 0.8)");
        nodeGradient.addColorStop(0.5, "rgba(59, 130, 246, 0.4)");
        nodeGradient.addColorStop(1, "rgba(59, 130, 246, 0)");

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = nodeGradient;
        ctx.fill();

        // Core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 240, 255, 0.9)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated AI Nodes Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: "linear-gradient(135deg, hsl(210 25% 8%) 0%, hsl(210 30% 12%) 50%, hsl(200 25% 10%) 100%)" }}
      />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-background/80" />

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <div className="animate-fade-up">
            <span className="inline-block px-4 py-2 border border-primary/30 bg-primary/5 text-xs font-semibold uppercase tracking-widest text-primary mb-8 backdrop-blur-sm">
              AI Transformation Partner
            </span>
          </div>

          {/* Bold Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-[-0.03em] text-foreground mb-8 animate-fade-up-delay-1">
            Unlock Proprietary
            <br />
            <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
              Deal Flow
            </span>{" "}
            with
            <br />
            <span className="text-muted-foreground">Agentic AI</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-12 animate-fade-up-delay-2">
            The autonomous infrastructure mid-market PE firms need to surface
            off-market alpha—before the competition even knows it exists.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up-delay-3">
            <a
              href="https://calendly.com/hussainhussainakan/10min"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-sm hover:bg-primary/90 transition-all glow-cyan"
            >
              Request AI Maturity Audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#dossier"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-border bg-background/50 backdrop-blur-sm text-foreground font-semibold uppercase tracking-wider text-sm hover:border-primary hover:text-primary transition-all"
            >
              <FileText className="w-4 h-4" />
              View Sample Dossier
            </a>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-12 right-12 hidden lg:block">
          <div className="w-32 h-32 border border-primary/20 relative">
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary animate-pulse" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-500 animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-primary/50 flex items-start justify-center p-2 backdrop-blur-sm">
          <div className="w-1 h-2 bg-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
