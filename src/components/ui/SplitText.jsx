import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits text into words and animates each one up from below
 * when the element enters the viewport.
 *
 * Usage:
 *   <SplitText as="h2" className="heading-lg text-cream" delay={0.1}>
 *     Hello World
 *   </SplitText>
 */
const SplitText = ({
  children,
  as: Tag = "p",
  className = "",
  delay = 0,
  duration = 0.9,
  stagger = 0.08,
  start = "top 85%",
}) => {
  const ref = useRef(null);

  const words = String(children).split(" ");

  useEffect(() => {
    const spans = ref.current.querySelectorAll(".word-inner");

    gsap.fromTo(
      spans,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ref.current,
          start,
        },
      }
    );
  }, []);

  return (
    <Tag ref={ref} className={className} aria-label={String(children)}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom mr-[0.25em] last:mr-0"
        >
          <span className="word-inner inline-block">{word}</span>
        </span>
      ))}
    </Tag>
  );
};

export default SplitText;