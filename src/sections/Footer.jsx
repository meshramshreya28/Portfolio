const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-12 py-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="label text-muted">
          © {year} Shreya Meshram
        </p>

        <p className="label text-muted">
          Built with React · Tailwind · GSAP
        </p>

        <a
          href="#"
          className="label text-muted hover:text-cream transition-colors duration-300"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
};

export default Footer;