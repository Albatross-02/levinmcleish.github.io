import { useRef } from 'react';

export default function useClickSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!audioRef.current) {
    audioRef.current = new Audio('/Click.mp3'); // exact filename
    audioRef.current.volume = 0.4;
  }

  const play = () => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  return play;
}