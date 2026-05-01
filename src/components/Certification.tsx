import { ShieldCheck, Cpu, Layers, Bug, Gamepad2, Code2, ExternalLink } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import useClickSound from '../hooks/useClickSound'; // 🔊 ADDED

const skills = [
  { icon: <Cpu size={18} />, label: 'Unity Engine' },
  { icon: <Code2 size={18} />, label: 'C# Scripting' },
  { icon: <Gamepad2 size={18} />, label: 'Game Mechanics' },
  { icon: <Layers size={18} />, label: 'Physics Systems' },
  { icon: <Layers size={18} />, label: 'UI Systems' },
  { icon: <Bug size={18} />, label: 'Debugging' },
];

const CREDLY_LINK =
  "https://www.credly.com/badges/e571f5a1-38a0-45d9-a988-2214e5f155ad/linked_in?t=tcbfdh";

export default function Certification() {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section id="certification" className="relative py-24 sm:py-32 grid-bg">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 70% 50%, rgba(0,191,255,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span className="text-xs tracking-widest text-[#00bfff] font-mono uppercase mb-3 block">
            // Credentials
          </span>
          <h2 className="section-title text-4xl sm:text-5xl text-white mb-4">
            <span className="text-gradient">Certification</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <CertCard />
        </div>
      </div>
    </section>
  );
}

function CertCard() {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const playClick = useClickSound(); // 🔊 ADDED

  const handleCredlyClick = (e: React.MouseEvent) => {
    playClick(); // sound

    // optional smoother open (prevents tab delay cutting sound)
    setTimeout(() => {
      window.open(CREDLY_LINK, "_blank");
    }, 80);
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative glass-card rounded-2xl overflow-hidden"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.97)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      {/* Top gradient bar */}
      <div
        className="h-1 w-full"
        style={{
          background: 'linear-gradient(90deg, #00bfff, #00ffff, #00e5cc)',
        }}
      />

      <div className="p-8 sm:p-12">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">

          {/* Badge Image */}
          <div className="flex-shrink-0">
            <div
              onClick={handleCredlyClick} // 🔊 ADDED
              className="block cursor-pointer"
            >
              <div
                className="relative w-28 h-28 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(0,191,255,0.15), rgba(0,229,204,0.05))',
                  border: '2px solid rgba(0, 191, 255, 0.4)',
                  boxShadow:
                    '0 0 30px rgba(0, 191, 255, 0.2), inset 0 0 30px rgba(0, 191, 255, 0.05)',
                }}
              >
                <img
                  src="/image.png"
                  alt="Unity Certification Badge"
                  className="w-20 h-20 object-contain"
                />

                {/* Verified tick */}
                <div
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #00bfff, #00ffff)',
                    color: '#020408',
                    fontFamily: 'Rajdhani, sans-serif',
                  }}
                >
                  ✓
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-3">
              <span
                className="text-xs font-mono px-3 py-1 rounded-full"
                style={{
                  background: 'rgba(0, 191, 255, 0.1)',
                  border: '1px solid rgba(0, 191, 255, 0.35)',
                  color: '#00bfff',
                }}
              >
                Unity Technologies
              </span>

              <span
                className="text-xs font-mono px-3 py-1 rounded-full"
                style={{
                  background: 'rgba(0, 229, 204, 0.08)',
                  border: '1px solid rgba(0, 229, 204, 0.25)',
                  color: '#00e5cc',
                }}
              >
                ID: UCA — 156
              </span>
            </div>

            <h3 className="section-title text-2xl sm:text-3xl text-white mb-2">
              Unity Certified Associate
            </h3>

            <p className="text-[#00bfff] font-medium mb-4 font-mono text-sm">
              Game Developer Track
            </p>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
              Demonstrates proficiency in Unity Engine core systems — C# scripting,
              game mechanics, physics, UI development, and debugging.
              Issued by Unity Technologies, one of the most recognized certifications
              in the game development industry.
            </p>

            {/* View Credly Button */}
            <button
              onClick={handleCredlyClick} // 🔊 ADDED
              className="inline-flex items-center gap-2 mt-6 px-5 py-2 rounded-lg text-sm btn-outline hover:scale-105 transition-all duration-300"
            >
              <ExternalLink size={14} />
              View Credly Badge
            </button>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {skills.map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl p-3 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(0, 191, 255, 0.05)',
                border: '1px solid rgba(0, 191, 255, 0.12)',
              }}
            >
              <span className="text-[#00bfff]">{icon}</span>
              <span className="text-sm text-slate-300 font-medium">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Corner glow */}
      <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none">
        <div
          className="absolute bottom-4 right-4 w-20 h-20 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #00bfff, transparent)',
          }}
        />
      </div>
    </div>
  );
}