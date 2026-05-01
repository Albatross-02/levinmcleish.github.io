import { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import type { Project } from '../data/projects';

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="
          relative z-10
          w-full max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          overflow-x-hidden
          glass rounded-2xl
        "
        onClick={(e) => e.stopPropagation()}
        style={{ border: '1px solid rgba(0, 191, 255, 0.3)' }}
      >
        {/* ✅ MEDIA (FIXED SECTION) */}
        <div className="relative w-full max-h-[60vh] bg-black flex items-center justify-center">
          
          {project.media.type === 'image' ? (
            <img
              src={project.media.src}
              alt={project.title}
              className="max-h-[60vh] w-auto object-contain"
            />
          ) : (
            <video
              src={project.media.src}
              controls
              autoPlay
              loop
              muted
              playsInline
              className="max-h-[60vh] w-auto object-contain"
            />
          )}

          {/* overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,191,255,0.05)] to-transparent pointer-events-none" />

          {/* close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-300 hover:text-[#00bfff] transition-colors"
          >
            <X size={18} />
          </button>

          {/* title */}
          <div className="absolute bottom-4 left-6">
            <h2 className="section-title text-2xl sm:text-3xl text-white">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 min-w-0">
          <p className="text-slate-300 text-sm leading-relaxed mb-6 break-words">
            {project.longDescription}
          </p>

          {/* Features */}
          <div className="mb-6 min-w-0">
            <h3 className="text-xs tracking-widest text-[#00bfff] mb-3 font-mono uppercase">
              Key Features
            </h3>

            <ul className="space-y-2">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-sm text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00bfff] mt-1.5 flex-shrink-0" />
                  <span className="break-words">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div className="min-w-0">
            <h3 className="text-xs tracking-widest text-[#00bfff] mb-3 font-mono uppercase">
              Tech Stack
            </h3>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="tag whitespace-nowrap">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={onClose}
              className="btn-outline flex-1 py-2.5 rounded-lg text-sm flex items-center justify-center gap-2"
            >
              Close
            </button>

            <a
              href="https://github.com/Albatross-02"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 py-2.5 rounded-lg text-sm flex items-center justify-center gap-2"
            >
              <ExternalLink size={14} />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}