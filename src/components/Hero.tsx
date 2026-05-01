import { useEffect, useRef, useState } from 'react';
import { Github, Mail, Instagram, Linkedin, Download, Dribbble } from 'lucide-react';
import useClickSound from '../hooks/useClickSound';

const skills = [
  'Unity',
  'C#',
  'Unreal Engine',
  'Blueprints',
  'AR/VR',
  'Multiplayer',
  'XR Dev',
  'C++',
  'JS',
  'HTML',
  'CSS',
];

const typed = ['Game Developer', 'XR Developer', 'Web Developer'];

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [typedIndex, setTypedIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const playClick = useClickSound();

  useEffect(() => {
    const current = typed[typedIndex];
    const speed = deleting ? 40 : 80;

    intervalRef.current = setTimeout(() => {
      if (!deleting && charIndex < current.length) {
        setDisplayText(current.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      } else if (deleting && charIndex > 0) {
        setDisplayText(current.slice(0, charIndex - 1));
        setCharIndex(c => c - 1);
      } else if (!deleting && charIndex === current.length) {
        setTimeout(() => setDeleting(true), 1500);
      } else if (deleting && charIndex === 0) {
        setDeleting(false);
        setTypedIndex(i => (i + 1) % typed.length);
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [charIndex, deleting, typedIndex]);

  const scrollToProjects = () => {
    playClick();
    document.getElementById('projects')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg pt-24 md:pt-0"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,191,255,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 80% 60%, rgba(0,229,204,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 20% 70%, rgba(0,135,179,0.08) 0%, transparent 60%)
          `,
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Name */}
        <h1 className="section-title text-5xl sm:text-6xl md:text-7xl text-white mb-4">
          Levin <span className="text-gradient">McLeish</span>
        </h1>

        {/* Typed text */}
        <div className="flex items-center justify-center gap-2 mb-6 h-10">
          <span className="text-2xl sm:text-3xl text-[#00bfff]">
            {displayText}
          </span>
          <span className="w-[2px] h-6 bg-[#00bfff] animate-pulse" />
        </div>

        {/* Bio */}
        <p className="text-slate-400 max-w-xl mx-auto mb-8 text-sm sm:text-base">
          Building immersive Games, Websites, XR experiences, and multiplayer systems.
        </p>

        {/* Skills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {skills.map(skill => (
            <span key={skill} className="tag">
              {skill}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <a
            href="/Levin_Resume.pdf"
            download="Levin_McLeish_Resume.pdf"
            onClick={playClick}
            className="btn-primary px-6 py-3 rounded-lg text-sm flex items-center gap-2"
          >
            <Download size={16} />
             Resume 
          </a>

          <button
            onClick={scrollToProjects}
            className="btn-outline px-6 py-3 rounded-lg text-sm"
          >
            View Projects
          </button>
        </div>

        {/* Socials */}
        <div className="flex justify-center gap-5">
          <a
            href="https://github.com/Albatross-02"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="w-10 h-10 glass rounded-lg flex items-center justify-center text-slate-400 hover:text-[#00bfff]"
          >
            <Github size={18} />
          </a>

          <a
            href="mailto:levinoffcl@gmail.com"
            onClick={playClick}
            className="w-10 h-10 glass rounded-lg flex items-center justify-center text-slate-400 hover:text-[#00bfff]"
          >
            <Mail size={18} />
          </a>

          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="w-10 h-10 glass rounded-lg flex items-center justify-center text-slate-400 hover:text-[#00bfff]"
          >
            <Linkedin size={18} />
          </a>

          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="w-10 h-10 glass rounded-lg flex items-center justify-center text-slate-400 hover:text-[#00bfff]"
          >
            <Instagram size={18} />
          </a>

          {/* ✅ Dribbble Added */}
          <a
            href="https://dribbble.com/levin-mcleish"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="w-10 h-10 glass rounded-lg flex items-center justify-center text-slate-400 hover:text-[#00bfff]"
          >
            <Dribbble size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}