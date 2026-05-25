import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { icon: <FaGithub />,   label: "GitHub",   href: "https://github.com/meshramshreya28" },
  { icon: <FaLinkedin />, label: "LinkedIn",  href: "https://www.linkedin.com/in/shreya-meshram28/" },
  { icon: <FaEnvelope />, label: "Email",     href: "mailto:meshramshreya28@gmail.com" },
];

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef    = useRef(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: formRef.current, start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-28 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Heading */}
        <div ref={headingRef} className="opacity-0 mb-20">
          <p className="label text-cream-dim mb-4">Get in touch</p>
          <h2 className="heading-lg text-cream leading-none">
            Let's build<br />
            <span className="text-muted">something great.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24">

          {/* Left — form */}
          <div ref={formRef} className="opacity-0">
            {sent ? (
              <div className="flex flex-col gap-4 py-12">
                <p className="heading-md text-cream">Message sent ✦</p>
                <p className="text-muted text-sm">Thanks for reaching out — I'll get back to you soon.</p>
                <button
                  onClick={() => setSent(false)}
                  className="label text-cream-dim hover:text-cream transition-colors mt-4 text-left"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="label text-muted">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full bg-transparent border-b border-border text-cream text-sm py-3 placeholder-muted focus:outline-none focus:border-cream-dim transition-colors duration-300"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="label text-muted">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-border text-cream text-sm py-3 placeholder-muted focus:outline-none focus:border-cream-dim transition-colors duration-300"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="label text-muted">Message</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Tell me about your project..."
                    className="w-full bg-transparent border-b border-border text-cream text-sm py-3 placeholder-muted focus:outline-none focus:border-cream-dim transition-colors duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-magnetic mt-4 self-start px-8 py-3 rounded-full bg-cream text-bg text-sm font-semibold hover:bg-cream/90 transition-colors duration-300"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    e.currentTarget.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
                  }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translate(0,0)"; }}
                >
                  <span className="btn-inner">Send Message ↗</span>
                </button>
              </form>
            )}
          </div>

          {/* Right — info */}
          <div className="flex flex-col justify-between gap-12">
            <div>
              <p className="text-muted text-sm leading-relaxed max-w-sm">
                Open to freelance projects, full-time roles, and interesting collaborations.
                Don't hesitate to reach out — I'd love to hear what you're building.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <p className="label text-muted">Find me on</p>
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between group border-b border-border pb-4 last:border-0"
                  data-cursor-hover
                >
                  <div className="flex items-center gap-4">
                    <span className="text-muted text-lg group-hover:text-cream transition-colors duration-300">
                      {s.icon}
                    </span>
                    <span
                      className="text-cream font-medium group-hover:text-cream-dim transition-colors duration-300"
                      style={{ fontSize: "1.1rem", letterSpacing: "-0.01em" }}
                    >
                      {s.label}
                    </span>
                  </div>
                  <span className="text-muted group-hover:text-cream transition-all duration-300 group-hover:translate-x-1 inline-block">
                    ↗
                  </span>
                </a>
              ))}
            </div>

            <div>
              <p className="label text-muted mb-1">Based in</p>
              <p className="text-cream-dim text-sm">Nagpur, Maharashtra, India</p>
            </div>
          </div>

        </div>
      </div>

      <div className="hr absolute bottom-0 left-0" />
    </section>
  );
};

export default Contact;