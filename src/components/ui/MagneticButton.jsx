import { useRef } from "react";

const MagneticButton = ({ children, className = "", strength = 0.3, ...props }) => {
  const btnRef = useRef(null);

  const onMouseMove = (e) => {
    const btn  = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x    = e.clientX - rect.left - rect.width  / 2;
    const y    = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onMouseLeave = () => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transform = "translate(0px, 0px)";
    btn.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
    setTimeout(() => {
      if (btnRef.current) btnRef.current.style.transition = "";
    }, 500);
  };

  return (
    <div
      ref={btnRef}
      className={`btn-magnetic ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
};

export default MagneticButton;