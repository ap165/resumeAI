import { useMemo, useState } from "react";

const emptyExperience = {
  jobTitle: "",
  employer: "",
  city: "",
  startDate: "",
  endDate: "",
  responsibilities: "",
};

const emptyEducation = {
  schoolName: "",
  location: "",
  degree: "",
  fieldOfStudy: "",
  graduationDate: "",
};

const emptyLink = {
  title: "",
  url: "",
  description: "",
};

const createSummaryFromData = (form) => {
  const name = form.personal.name || "Candidate";
  const title = form.experiences[0]?.jobTitle || "professional";
  const city = form.personal.city || "your city";
  const skills = form.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean)
    .slice(0, 4)
    .join(", ");

  return `${name} is a results-driven ${title} based in ${city}. They bring hands-on experience in delivering high-impact work and collaborating across teams. ${skills ? `Key strengths include ${skills}.` : "They are focused on continuous growth and measurable outcomes."}`;
};

const ResumeBuilder = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    personal: {
      name: "",
      city: "",
      country: "",
      pinCode: "",
      phone: "",
      email: "",
    },
    experiences: [{ ...emptyExperience }],
    educations: [{ ...emptyEducation }],
    skills: "",
    summary: "",
    links: [{ ...emptyLink }],
  });

  const totalSteps = 7;

  const progress = useMemo(() => `${Math.round((step / totalSteps) * 100)}%`, [step]);

  const updatePersonal = (field, value) => {
    setForm((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  const updateArrayField = (section, index, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: prev[section].map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    }));
  };

  const addItem = (section, template) => {
    setForm((prev) => ({
      ...prev,
      [section]: [...prev[section], { ...template }],
    }));
  };

  const hasAnyInput = (item) => Object.values(item).some((value) => value.trim() !== "");

  const removeItem = (section, index) => {
    setForm((prev) => {
      const item = prev[section][index];

      if (!item || index === 0) {
        return prev;
      }

      if (hasAnyInput(item)) {
        const shouldRemove = window.confirm("This form has unsaved data. Are you sure you want to close it?");
        if (!shouldRemove) {
          return prev;
        }
      }

      return {
        ...prev,
        [section]: prev[section].filter((_, itemIndex) => itemIndex !== index),
      };
    });
  };

  const enhanceText = (section, index, field) => {
    if (section === "skills") {
      setForm((prev) => ({
        ...prev,
        skills: `${prev.skills}${prev.skills ? "\n" : ""}• Improved, ATS-ready skills statement with action-driven keywords.`,
      }));
      return;
    }

    if (section === "summary") {
      setForm((prev) => ({
        ...prev,
        summary: `${prev.summary}${prev.summary ? "\n" : ""}Enhanced with AI: concise, impact-focused summary aligned with target roles.`,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [section]: prev[section].map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: `${item[field]}${item[field] ? "\n" : ""}Enhanced with AI: clarified impact, metrics, and outcomes.`,
            }
          : item,
      ),
    }));
  };

  const autoGenerateSummary = () => {
    setForm((prev) => ({
      ...prev,
      summary: createSummaryFromData(prev),
    }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["name", "Name"],
              ["city", "City"],
              ["country", "Country"],
              ["pinCode", "Pin Code"],
              ["phone", "Phone"],
              ["email", "Email"],
            ].map(([field, label]) => (
              <label key={field} className="space-y-2 text-sm font-medium text-slate-700">
                <span>{label}</span>
                <input
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                  value={form.personal[field]}
                  onChange={(e) => updatePersonal(field, e.target.value)}
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </label>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            {form.experiences.map((experience, index) => (
              <div key={index} className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-slate-900">Experience {index + 1}</h3>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeItem("experiences", index)}
                      className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                    >
                      Close
                    </button>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    ["jobTitle", "Job Title"],
                    ["employer", "Employer"],
                    ["city", "City"],
                    ["startDate", "Start Date"],
                    ["endDate", "End Date"],
                  ].map(([field, label]) => (
                    <label key={field} className="space-y-2 text-sm font-medium text-slate-700">
                      <span>{label}</span>
                      <input
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                        value={experience[field]}
                        onChange={(e) => updateArrayField("experiences", index, field, e.target.value)}
                        placeholder={`Enter ${label.toLowerCase()}`}
                      />
                    </label>
                  ))}
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => enhanceText("experiences", index, "responsibilities")}
                    className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
                  >
                    Enhance with AI
                  </button>
                  <textarea
                    rows={6}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none"
                    placeholder={`What did you do in ${experience.jobTitle || "this role"}?`}
                    value={experience.responsibilities}
                    onChange={(e) => updateArrayField("experiences", index, "responsibilities", e.target.value)}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addItem("experiences", emptyExperience)}
              className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              + Add More Experience
            </button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            {form.educations.map((education, index) => (
              <div key={index} className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-slate-900">Education {index + 1}</h3>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeItem("educations", index)}
                      className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                    >
                      Close
                    </button>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    ["schoolName", "School Name"],
                    ["location", "Location"],
                    ["degree", "Degree"],
                    ["fieldOfStudy", "Field of Study"],
                    ["graduationDate", "Graduation Date"],
                  ].map(([field, label]) => (
                    <label key={field} className="space-y-2 text-sm font-medium text-slate-700">
                      <span>{label}</span>
                      <input
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                        value={education[field]}
                        onChange={(e) => updateArrayField("educations", index, field, e.target.value)}
                        placeholder={`Enter ${label.toLowerCase()}`}
                      />
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addItem("educations", emptyEducation)}
              className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              + Add Education
            </button>
          </div>
        );
      case 4:
        return (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => enhanceText("skills")}
              className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
            >
              Enhance with AI
            </button>
            <textarea
              rows={10}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none"
              placeholder="Add your skills (technical, tools, soft skills, etc.)"
              value={form.skills}
              onChange={(e) => setForm((prev) => ({ ...prev, skills: e.target.value }))}
            />
          </div>
        );
      case 5:
        return (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={autoGenerateSummary}
                className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
              >
                AI Generate Summary
              </button>
              <button
                type="button"
                onClick={() => enhanceText("summary")}
                className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
              >
                Enhance with AI
              </button>
            </div>
            <textarea
              rows={10}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none"
              placeholder="Write a short professional summary"
              value={form.summary}
              onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))}
            />
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            {form.links.map((link, index) => (
              <div key={index} className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:grid-cols-3">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Title</span>
                  <input
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                    value={link.title}
                    onChange={(e) => updateArrayField("links", index, "title", e.target.value)}
                    placeholder="LinkedIn / Award"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Link</span>
                  <input
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                    value={link.url}
                    onChange={(e) => updateArrayField("links", index, "url", e.target.value)}
                    placeholder="https://..."
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Description (optional)</span>
                  <input
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                    value={link.description}
                    onChange={(e) => updateArrayField("links", index, "description", e.target.value)}
                    placeholder="About this link"
                  />
                </label>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addItem("links", emptyLink)}
              className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              + Add More Links
            </button>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-bold text-slate-900">Resume Preview</h3>
            <div>
              <h4 className="font-semibold text-slate-900">{form.personal.name || "Your Name"}</h4>
              <p className="text-sm text-slate-600">
                {[form.personal.city, form.personal.country, form.personal.pinCode].filter(Boolean).join(", ")}
              </p>
              <p className="text-sm text-slate-600">
                {[form.personal.phone, form.personal.email].filter(Boolean).join(" • ")}
              </p>
            </div>

            <div>
              <h5 className="mb-2 font-semibold text-slate-900">Experience</h5>
              <div className="space-y-3 text-sm text-slate-700">
                {form.experiences.map((experience, index) => (
                  <div key={index}>
                    <p className="font-medium">{experience.jobTitle || "Job Title"} {experience.employer ? `— ${experience.employer}` : ""}</p>
                    <p className="text-slate-500">{[experience.city, experience.startDate, experience.endDate].filter(Boolean).join(" | ")}</p>
                    <p className="whitespace-pre-line">{experience.responsibilities}</p>
                  </div>
                ))}
              </div>
            </div>

            <button type="button" className="rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500">
              Create Resume
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="mx-auto max-w-4xl space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Resume Builder</p>
        <h1 className="text-3xl font-bold text-slate-900">Multi-step AI Resume Builder</h1>
        <p className="text-sm text-slate-600">Inspired by modern builders: quick sections, repeatable entries, and AI-enhanced writing help.</p>
        <div className="h-2 w-full rounded-full bg-slate-100">
          <div className="h-2 rounded-full bg-indigo-600 transition-all" style={{ width: progress }} />
        </div>
        <p className="text-xs font-medium text-slate-500">Step {step} of {totalSteps}</p>
      </header>

      {renderStep()}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={prevStep}
          disabled={step === 1}
          className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={nextStep}
          disabled={step === totalSteps}
          className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ResumeBuilder;
