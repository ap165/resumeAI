import { Link } from "react-router-dom";

const features = [
  {
    title: "AI Resume Builder",
    description: "Build an ATS-friendly resume in minutes with smart suggestions tailored to your role.",
  },
  {
    title: "ATS Score Checker",
    description: "See how your resume performs against job descriptions and get instant improvement tips.",
  },
  {
    title: "Keyword Optimizer",
    description: "Automatically match impactful keywords recruiters and hiring systems are looking for.",
  },
];

const steps = [
  "Choose your target role and experience level.",
  "Generate a resume draft with AI-powered guidance.",
  "Check ATS score and refine before applying.",
];


const Home = () => {
  return (
    <div className="space-y-20 pb-8">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 px-6 py-16 text-white shadow-xl sm:px-10 lg:px-14">
        <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-indigo-400/30 blur-3xl" />
        <div className="absolute -bottom-10 left-0 h-56 w-56 rounded-full bg-fuchsia-400/20 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Build a job-winning resume with <span className="text-indigo-200">ResumeAI</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-indigo-100 sm:text-lg">
              Create polished resumes, improve ATS performance, and apply confidently with an all-in-one career toolkit.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/resume-builder"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
              >
                Start Building Free
              </Link>
              <Link
                to="/ats-score-checker"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Check ATS Score
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-indigo-100">
              <span>✔ No credit card required</span>
              <span>✔ Export to PDF</span>
              <span>✔ Real-time suggestions</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
            <p className="mb-4 text-sm font-medium text-indigo-100">Weekly job application performance</p>
            <div className="space-y-4">
              {[72, 84, 91, 96].map((score, idx) => (
                <div key={score}>
                  <div className="mb-1 flex items-center justify-between text-xs text-indigo-100">
                    <span>Resume version {idx + 1}</span>
                    <span>{score}% ATS match</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/15">
                    <div className="h-2 rounded-full bg-emerald-300" style={{ width: `${score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Everything you need to get hired faster</h2>
            <p className="mt-2 text-slate-600">A modern workflow inspired by top career platforms, tailored for speed and clarity.</p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">How ResumeAI works</h2>
          <ol className="mt-4 space-y-3 text-slate-700">
            {steps.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <Link
          to="/resume-builder"
          className="inline-flex justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Create My Resume
        </Link>
      </section>
    </div>
  );
};

export default Home;
