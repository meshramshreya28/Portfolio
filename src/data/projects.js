import promptcraft from "../assets/images/promptcraft.png";
import resumebuddy from "../assets/images/resumebuddy.png";
import jobtidal from "../assets/images/jobtidal.png";
import codecanvas from "../assets/images/codecanvas.png";

export const projects = [
  {
    title: "CodeCanvas AI",
    image: codecanvas,
    description:
      "AI-powered UI/UX analyzer that takes any website URL, screenshots it with Playwright, and uses Gemini AI to score the UI and UX quality with actionable suggestions.",
    tech: ["Python", "React", "Gemini API", "FastAPI", "Playwright", "UI/UX Design", "Full-Stack Development"],
    live: "https://codecanavs-ai-1.onrender.com/",
    github: "https://github.com/meshramshreya28/CodeCanavs-AI",
  },

  {
    title: "PromptCraft AI",
    image: promptcraft,
    description:
      "A full-stack web application designed to generate structured and optimized AI prompts for improved output quality.",
    tech: ["CSS", "JavaScript", "Node.js", "Express", "AI Integration"],
    live: "https://promptcraft-ai-1-386o.onrender.com/",
    github: "https://github.com/meshramshreya28/PromptCraft-AI",
  },

  {
    title: "ResumeBuddy",
    image: resumebuddy,
    description:
      "Smart AI-powered resume analyzer using Python & Flask. Gives ATS score, matched/missing skills, and smart suggestions. ",
    tech: ["Python", "Flask", "HTML", "CSS", "JavaScript"],
    live: "https://resumebuddy-flzm.onrender.com/",
    github: "https://github.com/meshramshreya28/ResumeBuddy",
  },

  {
    title: "JobTidal",
    image: jobtidal,
    description:
      "Modern full-stack job and placement management portal designed for students and recruiters",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
    live: "https://myjobtidalportal.netlify.app/",
    github: "https://github.com/meshramshreya28/jobtidal",
  },
];