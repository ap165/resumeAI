import { Link } from "react-router-dom";

const highlights = [
  {
    title: "Student-first mindset",
    description:
      "As a first-year engineering student, I focus on learning fast, building consistently, and improving every version of my work.",
  },
  {
    title: "CSE at UEM Kolkata",
    description:
      "I am currently pursuing B.Tech in Computer Science and Engineering at UEM Kolkata, where I am strengthening my programming and problem-solving skills.",
  },
  {
    title: "Future-ready goals",
    description:
      "I am passionate about web development, AI-powered products, and creating practical tools that help students and professionals.",
  },
];

const inspirations = [
  "Clean hero storytelling inspired by modern product sites.",
  "Card-based highlights similar to contemporary portfolio layouts.",
  "Strong call-to-action section influenced by startup landing pages.",
];

const About = () => {
  return (
    <section className="space-y-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 px-6 py-14 text-white shadow-2xl sm:px-10">
        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-purple-400/20 blur-3xl" />

        <div className="relative max-w-3xl space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-200">About Me</p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Hi, I&apos;m Arijit Paine 👋</h1>
          <p className="text-lg text-indigo-100">
            I am a B.Tech 1st year student at <span className="font-semibold text-white">UEM Kolkata (CSE)</span>. I am
            currently building my foundation in software development and using projects like ResumeAI to turn ideas into
            useful products.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
          </article>
        ))}
      </div>

      <div className="rounded-3xl border border-indigo-100 bg-indigo-50/60 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Design references used for this page</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          {inspirations.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Let&apos;s build something meaningful</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          I am at the beginning of my journey, and I am excited to keep learning by building. If you&apos;d like to see my
          work, start with the Resume Builder and explore what I am creating.
        </p>
        <Link
          to="/resume-builder"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Explore Resume Builder
        </Link>
      </div>
    </section>
  );
};

export default About;
