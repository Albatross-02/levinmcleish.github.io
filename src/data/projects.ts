export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  category: 'unity' | 'unreal' | 'blender' | 'web' | 'other';

  media: {
    type: 'image' | 'video';
    src: string;
  };

  features: string[];
}

export const projects: Project[] = [
  {
    id: 'social-virtual-world',
    title: 'Social Virtual World',
    description: 'A multiplayer social virtual platform with real-time voice communication and LAN networking.',
    longDescription:
      'Built a fully networked social virtual world using Unreal Engine and C++. Integrated Epic Online Services (EOS) for multiplayer functionality, enabling players to connect via LAN.',
    tech: ['Unreal Engine', 'C++', 'Blueprints'],
    category: 'unreal',
    media: {
      type: 'image',
      src: '/Cyberspace.png',
    },
    features: ['Multiplayer LAN networking', 'Voice chat', 'EOS integration', 'Unreal Engine'],
  },

  {
    id: 'ar-furniture',
    title: 'AR Furniture Application',
    description: 'Augmented reality furniture placement app.',
    longDescription:
      'AR app allowing users to place furniture in real-world environments.',
    tech: ['Unity', 'C#', 'AR Foundation'],
    category: 'unity',
    media: {
      type: 'video',
      src: '/FurnitureApp.mp4',
    },
    features: ['AR placement', 'Scaling', 'Rotation', 'Shaders'],
  },

  {
    id: 'alphabet-game',
    title: 'Alphabet Game',
    description: 'Educational Unity typing game.',
    longDescription:
      'Interactive alphabet game with scoring and dynamic UI.',
    tech: ['Unity', 'C#'],
    category: 'unity',
    media: {
      type: 'video',
      src: '/AlphabetGame.mp4',
    },
    features: ['Asset management', 'Score system', 'Health system', 'Visual & Audio feedback', 'Game Logic'],
  },

  {
    id: 'archviz',
    title: 'Archviz Project',
    description: 'Interactive Unreal architectural visualization.',
    longDescription:
      'Realistic house visualization with lighting and interaction.',
    tech: ['Unreal Engine', 'Blueprints'],
    category: 'unreal',
    media: {
      type: 'video',
      src: '/Archvis.mp4',
    },
    features: ['Raycast based interactions', 'Dynamic Material changing', 'Dynamic Object changing', 'Lighting', 'Interaction', 'Teleportation', 'Video & Audio'],
  },

  {
    id: 'endless-runner',
    title: 'Endless Runner 2D',
    description: 'Fast-paced runner with power-ups.',
    longDescription:
      '2D endless runner with procedural obstacles and shooting.',
    tech: ['Unity', 'C#'],
    category: 'unity',
    media: {
      type: 'video',
      src: '/Aladdin.mp4',
    },
    features: ['Object Pooling', 'Trail Effects', 'Power-ups', 'Game state management'],
  },

  {
    id: '3d-dodge-game',
    title: '3D Dodge Game',
    description: 'Obstacle avoidance with ragdoll physics.',
    longDescription:
      'Dodge incoming obstacles with physics-based reactions.',
    tech: ['Unreal Engine'],
    category: 'unreal',
    media: {
      type: 'video',
      src: '/Dodge3.mp4',
    },
    features: ['Ragdoll physics', 'Procedural obstacles', 'Audio', 'Blueprints', 'Foliage'],
  },

  {
    id: 'blender-car',
    title: 'Blender Car Model',
    description: 'Detailed 3D car model.',
    longDescription:
      'High-quality car modeling with topology and materials.',
    tech: ['Blender'],
    category: 'blender',
    media: {
      type: 'image',
      src: '/Blender1.png',
    },
    features: ['3D modeling', 'UV mapping', 'Reference modeling', 'Materials', 'Texturing'],
  },

  // ✅ ADDED BACK
  {
    id: 'hillscape',
    title: 'Hillscape Environment',
    description: 'Lush environment in Unreal Engine.',
    longDescription:
      'Crafted a large landscape using terrain tools, foliage system, and dynamic lighting.',
    tech: ['Unreal Engine', 'Landscape Tool', 'Foliage System', 'Lumen'],
    category: 'unreal',
    media: {
      type: 'video', // change to 'video' if you have one
      src: '/HillScape.mp4', // update if needed
    },
    features: ['Procedural foliage', 'Terrain painting', 'Optimization', 'Creek'],
  },
];