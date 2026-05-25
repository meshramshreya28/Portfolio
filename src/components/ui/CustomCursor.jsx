import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const mouseMove = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <div
      className="hidden md:block fixed top-0 left-0 w-6 h-6 rounded-full bg-primary/40 border border-primary pointer-events-none z-[9999] backdrop-blur-md"
      style={{
        transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
      }}
    />
  );
};

export default CustomCursor;