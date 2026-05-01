import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import ProjectModal from './ProjectModal';
import { useInView } from '../hooks/useInView';
import useClickSound from '../hooks/useClickSound';

const categories = [
  { value: 'all', label: 'All Projects' },
  { value: 'unity', label: 'Unity' },
  { value: 'unreal', label: 'Unreal' },
  { value: 'blender', label: 'Blender' },
  { value: 'web', label: 'Web' },
];

// ✅ Dribbble card
const dribbbleProject: Project = {
  id: 'dribbble-web',
  title: 'Web Design Portfolio',
  description: 'Explore my UI/UX and website designs on Dribbble.',
  longDescription: '',
  tech: ['UI Design', 'Web Design'],
  category: 'web',
  media: {
    type: 'image',
    src: import.meta.env.BASE_URL + 'dribbble.png',
  },
  features: [],
};

function ProjectCard({
  project,
  onClick,
  index,
}: {
  project: Project;
  onClick: () => void;
  index: number;
}) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const playClick = useClickSound();

  const isDribbble = project.id === 'dribbble-web';

  const handleClick = () => {
    playClick();

    if (isDribbble) {
      window.open('https://dribbble.com/levin-mcleish', '_blank');
      return;
    }

    onClick();
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onClick={handleClick} // ✅ FULL CARD CLICKABLE
      className="glass-card rounded-xl overflow-hidden group cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s ease ${index * 80}ms`,
      }}
    >
      {/* Media */}
      <div className="relative h-48 overflow-hidden">
        {project.media.type === 'image' ? (
          <img
            src={project.media.src}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <video
            src={project.media.src}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#050d14] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="section-title text-lg text-white mb-2 group-hover:text-[#00bfff] transition-colors">
          {project.title}
        </h3>

        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 3).map(t => (
            <span key={t} className="tag text-xs">{t}</span>
          ))}
        </div>

        {/* ✅ Button still works separately */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // 🔥 prevent double trigger
            handleClick();
          }}
          className={`flex items-center gap-2 text-xs ${
            isDribbble
              ? 'text-pink-400 hover:text-pink-500'
              : 'text-[#00bfff] hover:text-[#00ffff]'
          }`}
        >
          {isDribbble ? 'View on Dribbble' : 'View Details'} 
          <ExternalLink size={12} />
        </button>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const [titleRef, titleInView] = useInView({ threshold: 0.2 });

  const playClick = useClickSound();

  const filtered =
    filter === 'all'
      ? [...projects, dribbbleProject]
      : filter === 'web'
      ? [...projects.filter(p => p.category === 'web'), dribbbleProject]
      : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-x-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className="text-center mb-16"
          style={{
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <h2 className="section-title text-4xl sm:text-5xl text-white mb-4">
            My <span className="text-gradient">Projects</span>
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => {
                playClick();
                setFilter(cat.value);
              }}
              className={`px-5 py-2 rounded-lg ${
                filter === cat.value
                  ? 'bg-[#00bfff] text-black'
                  : 'glass text-slate-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      {selected && (
        <ProjectModal
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}