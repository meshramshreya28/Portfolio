import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const links = [
  "about",
  "skills",
  "projects",
  "journey",
  "contact",
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      links.forEach((section) => {
        const element = document.getElementById(section);

        if (element) {
          const top = element.offsetTop - 120;
          const bottom = top + element.offsetHeight;

          if (
            window.scrollY >= top &&
            window.scrollY < bottom
          ) {
            setActive(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/20 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-black tracking-widest text-primary">
          PORTFOLIO
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`relative group capitalize transition ${
                active === item
                  ? "text-primary"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {item}

              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-primary transition-all duration-300 ${
                  active === item
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}
        </div>

        {/* Mobile Menu */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl"
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-5 bg-black/40 backdrop-blur-xl">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setOpen(false)}
              className={`capitalize transition ${
                active === item
                  ? "text-primary"
                  : "text-gray-300"
              }`}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;