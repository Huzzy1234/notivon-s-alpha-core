const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background pointer-events-none">
      {/* Subtle texture/mesh */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-primary/10 opacity-30 mix-blend-overlay z-0" />
      
      {/* Blend gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background z-10 block" />
      
      {/* Floating orbs */}
      <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[150px] mix-blend-screen animate-float z-0 will-change-transform" />
      <div className="absolute top-[20%] -right-[15%] w-[50%] h-[50%] rounded-full bg-accent/20 blur-[120px] mix-blend-screen animate-float-slow z-0 will-change-transform" />
      <div className="absolute -bottom-[30%] left-[10%] w-[80%] h-[80%] rounded-full bg-primary/10 blur-[160px] mix-blend-screen animate-float z-0 will-change-transform delay-1000" />
    </div>
  );
};

export default AnimatedBackground;