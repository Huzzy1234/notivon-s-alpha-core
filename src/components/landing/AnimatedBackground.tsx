const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 animate-float" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-float" style={{ animationDelay: '3s' }} />
    </div>
  );
};

export default AnimatedBackground;