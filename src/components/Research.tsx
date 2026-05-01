import { FileText, Award, ExternalLink } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import useClickSound from '../hooks/useClickSound'; // 🔊 ADDED

export default function Research() {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section id="research" className="relative py-24 sm:py-32">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 30% 50%, rgba(0,191,255,0.04) 0%, transparent 70%)',
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
            // Publications
          </span>
          <h2 className="section-title text-4xl sm:text-5xl text-white mb-4">
            Research & <span className="text-gradient">Publications</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Main paper */}
          <PublicationCard
            delay={0}
            icon={<FileText className="text-[#00bfff]" size={24} />}
            badge="IEEE Conference"
            title="Social Virtual Worlds for Virtual Communication"
            description="This research explores the design and implementation of social virtual worlds as platforms for meaningful virtual communication, examining user interaction patterns, presence, and collaborative experiences in networked virtual environments. The work was presented at VIT Conference (VITECON) and published by IEEE."
            tags={['IEEE', 'Virtual Reality', 'Networking', 'VIT Conference']}
            venue="VITECON, VIT"
          />

          {/* Accomplishments */}
          <div className="flex flex-col gap-5">
            <AccomplishmentCard
              delay={100}
              icon={<Award className="text-[#00bfff]" size={20} />}
              title="IEEE PELS Project Expo — 2nd Place"
              description="Secured second place at St. Joseph's College of Engineering's IEEE PELS Project Expo with Social Virtual World project."
            />
            <AccomplishmentCard
              delay={200}
              icon={<FileText className="text-[#00bfff]" size={20} />}
              title="C# & Unity Workshop Conductor"
              description="Conducted a technical workshop on C# programming and Unity game development at Sathyabama University, sharing knowledge with aspiring game developers."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PUBLICATION CARD ---------------- */

function PublicationCard({
  delay,
  icon,
  badge,
  title,
  description,
  tags,
  venue,
}: {
  delay: number;
  icon: React.ReactNode;
  badge: string;
  title: string;
  description: string;
  tags: string[];
  venue: string;
}) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const playClick = useClickSound(); // 🔊 ADDED

  const handleViewPaperClick = () => {
    playClick(); // sound

    // optional smooth open so sound is not cut off
    setTimeout(() => {
      window.open(
        "https://ieeexplore.ieee.org/document/10156942",
        "_blank"
      );
    }, 80);
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="glass-card rounded-2xl p-7 flex flex-col h-full"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="w-12 h-12 rounded-xl glass flex items-center justify-center flex-shrink-0">
          {icon}
        </div>

        <span
          className="text-xs font-mono px-3 py-1 rounded-full"
          style={{
            background: 'rgba(0, 191, 255, 0.1)',
            border: '1px solid rgba(0, 191, 255, 0.3)',
            color: '#00bfff',
          }}
        >
          {badge}
        </span>
      </div>

      <h3 className="section-title text-xl text-white mb-3">{title}</h3>

      <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        {tags.map(t => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500 font-mono">{venue}</span>

        {/* 🔊 SOUND ADDED HERE */}
        <button
          onClick={handleViewPaperClick}
          className="btn-outline flex items-center gap-2 px-4 py-2 rounded-lg text-xs"
        >
          <ExternalLink size={12} />
          View Paper
        </button>
      </div>
    </div>
  );
}

/* ---------------- ACCOMPLISHMENT CARD ---------------- */

function AccomplishmentCard({
  delay,
  icon,
  title,
  description,
}: {
  delay: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="glass-card rounded-xl p-5 flex gap-4"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(40px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div className="w-10 h-10 rounded-lg glass flex items-center justify-center flex-shrink-0">
        {icon}
      </div>

      <div>
        <h4 className="section-title text-base text-white mb-1">
          {title}
        </h4>
        <p className="text-slate-400 text-xs leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}