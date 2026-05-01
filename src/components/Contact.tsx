import { useState } from 'react';
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  Send,
  MapPin,
} from 'lucide-react';
import { useInView } from '../hooks/useInView';
import useClickSound from '../hooks/useClickSound'; // 🔊 ADDED

const socials = [
  {
    label: 'Email',
    value: 'levinoffcl@gmail.com',
    href: 'mailto:levinoffcl@gmail.com',
    icon: Mail,
  },
  {
    label: 'GitHub',
    value: 'Albatross-02',
    href: 'https://github.com/Albatross-02',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    value: 'levin-mcleish-m',
    href: 'https://www.linkedin.com/in/levin-mcleish-m-1b08b320a/',
    icon: Linkedin,
  },
  {
    label: 'Instagram',
    value: '@levins_artchive',
    href: 'https://www.instagram.com/levins_artchive/',
    icon: Instagram,
  },
];

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const playClick = useClickSound(); // 🔊 GLOBAL SOUND

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    try {
      const formData = new FormData(e.currentTarget);

      const res = await fetch("https://formspree.io/f/xqewjkzr", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (res.ok) {
        playClick(); // 🔊 success sound
        setSent(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("Form submission failed");
      }
    } catch (error) {
      console.error(error);
      alert("CORS / Network error");
    }

    setSending(false);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,191,255,0.06) 0%, transparent 60%)',
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
            // Get In Touch
          </span>

          <h2 className="section-title text-4xl sm:text-5xl text-white mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>

          <p className="text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
            Open to game development roles, freelance projects, and collaborations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <ContactInfo playClick={playClick} />
          <ContactForm
            form={form}
            setForm={setForm}
            sent={sent}
            sending={sending}
            onSubmit={handleSubmit}
            playClick={playClick}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-[rgba(0,191,255,0.1)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-gradient font-bold text-lg tracking-widest">
            Your Friendly Neighborhood Developer
          </span>

          <p className="text-slate-500 text-xs font-mono">
            &copy; {new Date().getFullYear()} Levin McLeish M — Unity Game Developer
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT INFO ---------------- */

function ContactInfo({ playClick }: { playClick: () => void }) {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(-30px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <h3 className="section-title text-2xl text-white mb-2">
        Contact Info
      </h3>

      <div className="flex items-center gap-2 mb-8 text-slate-500 text-sm">
        <MapPin size={14} />
        <span className="font-mono">India</span>
      </div>

      <div className="space-y-4">
        {socials.map(({ label, value, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick} // 🔊 SOUND
            className="flex items-center gap-4 glass-card rounded-xl p-4 group"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[rgba(0,191,255,0.1)] border border-[rgba(0,191,255,0.2)]">
              <Icon size={16} className="text-[#00bfff]" />
            </div>

            <div>
              <div className="text-xs text-slate-500 font-mono">{label}</div>
              <div className="text-sm text-slate-200 group-hover:text-[#00bfff] transition-colors">
                {value}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ---------------- CONTACT FORM ---------------- */

function ContactForm({
  form,
  setForm,
  sent,
  sending,
  onSubmit,
  playClick,
}: {
  form: { name: string; email: string; message: string };
  setForm: (f: { name: string; email: string; message: string }) => void;
  sent: boolean;
  sending: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  playClick: () => void;
}) {
  const [ref, inView] = useInView({ threshold: 0.1 });

  const inputClass =
    'w-full glass rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-[#00bfff]';

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(30px)',
        transition: 'opacity 0.6s ease',
      }}
    >
      <h3 className="section-title text-2xl text-white mb-8">
        Send a Message
      </h3>

      {sent ? (
        <div className="glass rounded-2xl p-10 text-center">
          <Send size={24} className="text-[#00bfff] mx-auto mb-4" />
          <h4 className="text-white text-xl mb-2">Message Sent!</h4>
          <p className="text-slate-400 text-sm">I'll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className={inputClass}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className={inputClass}
            required
          />

          <textarea
            name="message"
            rows={5}
            placeholder="Your Message"
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            className={`${inputClass} resize-none`}
            required
          />

          <button
            type="submit"
            disabled={sending}
            onClick={playClick} // 🔊 SOUND
            className="btn-primary w-full py-3 rounded-xl flex items-center justify-center gap-2"
          >
            {sending ? "Sending..." : (
              <>
                <Send size={15} />
                Send Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}