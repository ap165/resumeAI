import { useMemo, useState } from "react";

const totalSteps = 7;

const initialData = {
  personal: {
    name: "",
    city: "",
    country: "",
    pinCode: "",
    phone: "",
    email: "",
  },
  experiences: [
    {
      jobTitle: "",
      employer: "",
      city: "",
      startDate: "",
      endDate: "",
      whatIDid: "",
    },
  ],
  education: [
    {
      schoolName: "",
      location: "",
      degree: "",
      fieldOfStudy: "",
      graduationDate: "",
    },
  ],
  skills: "",
  summary: "",
  additional: [
    {
      title: "",
      details: "",
    },
  ],
};

const inputClass =
  "mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200";

const labelClass = "text-sm font-medium text-slate-700";

const enhanceText = (text, context) => {
  if (!text.trim()) {
    return `• Added clear and measurable achievements for ${context}.\n• Improved readability with action verbs and impact-focused language.`;
  }

  return `${text}\n\nEnhanced with AI:\n• Rewritten with stronger action verbs and measurable impact.\n• Optimized for ATS keywords and concise professional tone.`;
};

const ResumeBuilder = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialData);

  const progress = useMemo(() => Math.round((step / totalSteps) * 100), [step]);

  const updatePersonal = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  const updateExperience = (index, field, value) => {
    setFormData((prev) => {
      const next = [...prev.experiences];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, experiences: next };
    });
  };

  const updateEducation = (index, field, value) => {
    setFormData((prev) => {
      const next = [...prev.education];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, education: next };
    });
  };

  const updateAdditional = (index, field, value) => {
    setFormData((prev) => {
      const next = [...prev.additional];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, additional: next };
    });
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { jobTitle: "", employer: "", city: "", startDate: "", endDate: "", whatIDid: "" },
      ],
    }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { schoolName: "", location: "", degree: "", fieldOfStudy: "", graduationDate: "" }],
    }));
  };

  const addAdditional = () => {
    setFormData((prev) => ({
      ...prev,
      additional: [...prev.additional, { title: "", details: "" }],
    }));
  };

  const onNext = () => setStep((s) => Math.min(totalSteps, s + 1));
  const onBack = () => setStep((s) => Math.max(1, s - 1));

  const renderPersonal = () => (
    <div className="grid gap-5 md:grid-cols-2">
      {[
        ["name", "Full Name"],
        ["city", "City"],
        ["country", "Country"],
        ["pinCode", "Pin Code"],
        ["phone", "Phone"],
        ["email", "Email"],
      ].map(([field, label]) => (
        <label key={field} className={labelClass}>
          {label}
          <input
            value={formData.personal[field]}
            onChange={(e) => updatePersonal(field, e.target.value)}
            className={inputClass}
            type={field === "email" ? "email" : "text"}
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        </label>
      ))}
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      {formData.experiences.map((item, index) => (
        <div key={`exp-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">Experience {index + 1}</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["jobTitle", "Job Title"],
              ["employer", "Employer"],
              ["city", "City"],
              ["startDate", "Start Date"],
              ["endDate", "End Date"],
            ].map(([field, label]) => (
              <label key={field} className={labelClass}>
                {label}
                <input
                  value={item[field]}
                  onChange={(e) => updateExperience(index, field, e.target.value)}
                  className={inputClass}
                  type={field.includes("Date") ? "month" : "text"}
                />
              </label>
            ))}
          </div>

          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <label className={labelClass}>What I did in {item.jobTitle || "this role"}</label>
              <button
                type="button"
                onClick={() => updateExperience(index, "whatIDid", enhanceText(item.whatIDid, item.jobTitle || "your job"))}
                className="rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-200"
              >
                Enhance with AI
              </button>
            </div>
            <textarea
              value={item.whatIDid}
              onChange={(e) => updateExperience(index, "whatIDid", e.target.value)}
              className={`${inputClass} min-h-36`}
              placeholder="Describe your responsibilities, achievements, and results."
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
      >
        + Add More Experience
      </button>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      {formData.education.map((item, index) => (
        <div key={`edu-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="mb-4 text-base font-semibold text-slate-900">Education {index + 1}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["schoolName", "School Name"],
              ["location", "Location"],
              ["degree", "Degree"],
              ["fieldOfStudy", "Field of Study"],
              ["graduationDate", "Graduation Date"],
            ].map(([field, label]) => (
              <label key={field} className={labelClass}>
                {label}
                <input
                  value={item[field]}
                  onChange={(e) => updateEducation(index, field, e.target.value)}
                  className={inputClass}
                  type={field === "graduationDate" ? "month" : "text"}
                />
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEducation}
        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
      >
        + Add Education (Optional)
      </button>
    </div>
  );

  const renderSkills = () => (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className={labelClass}>Skills</label>
        <button
          type="button"
          onClick={() => setFormData((prev) => ({ ...prev, skills: enhanceText(prev.skills, "skills section") }))}
          className="rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-200"
        >
          Enhance with AI
        </button>
      </div>
      <textarea
        value={formData.skills}
        onChange={(e) => setFormData((prev) => ({ ...prev, skills: e.target.value }))}
        className={`${inputClass} min-h-56`}
        placeholder="List your technical and soft skills, tools, platforms, and strengths."
      />
    </div>
  );

  const renderSummary = () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              summary:
                `Results-driven ${prev.experiences[0]?.jobTitle || "professional"} with strong experience in ${prev.skills ? "skills optimization and execution" : "cross-functional collaboration"}. ` +
                "Known for delivering measurable impact, improving processes, and communicating clearly with stakeholders.",
            }))
          }
          className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
        >
          AI Generate Summary
        </button>
        <button
          type="button"
          onClick={() => setFormData((prev) => ({ ...prev, summary: enhanceText(prev.summary, "professional summary") }))}
          className="rounded-full bg-indigo-100 px-4 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-200"
        >
          Enhance with AI
        </button>
      </div>

      <textarea
        value={formData.summary}
        onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
        className={`${inputClass} min-h-56`}
        placeholder="Write a concise summary of your profile, impact, and goals."
      />
    </div>
  );

  const renderAdditional = () => (
    <div className="space-y-5">
      {formData.additional.map((item, index) => (
        <div key={`additional-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="mb-4 text-base font-semibold text-slate-900">Additional Item {index + 1}</h3>
          <label className={labelClass}>
            Title
            <input
              value={item.title}
              onChange={(e) => updateAdditional(index, "title", e.target.value)}
              className={inputClass}
              placeholder="e.g., LinkedIn, GitHub, Award, Portfolio"
            />
          </label>
          <label className={`${labelClass} mt-4 block`}>
            Link / Description
            <textarea
              value={item.details}
              onChange={(e) => updateAdditional(index, "details", e.target.value)}
              className={`${inputClass} min-h-28`}
              placeholder="Paste URL or add supporting details"
            />
          </label>
        </div>
      ))}
      <button
        type="button"
        onClick={addAdditional}
        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
      >
        + Add More Links / Awards
      </button>
    </div>
  );

  const renderPreview = () => (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-2xl font-bold text-slate-900">{formData.personal.name || "Your Name"}</h2>
      <p className="mt-1 text-sm text-slate-600">
        {[formData.personal.city, formData.personal.country, formData.personal.pinCode].filter(Boolean).join(", ")} • {formData.personal.phone || "Phone"} • {formData.personal.email || "Email"}
      </p>

      <section className="mt-6">
        <h3 className="text-lg font-semibold text-slate-900">Professional Summary</h3>
        <p className="mt-2 whitespace-pre-line text-sm text-slate-700">{formData.summary || "No summary added yet."}</p>
      </section>

      <section className="mt-6">
        <h3 className="text-lg font-semibold text-slate-900">Experience</h3>
        <div className="mt-3 space-y-4">
          {formData.experiences.map((exp, idx) => (
            <div key={`preview-exp-${idx}`}>
              <p className="font-semibold text-slate-800">{exp.jobTitle || "Job Title"} • {exp.employer || "Employer"}</p>
              <p className="text-xs text-slate-500">{exp.city} • {exp.startDate} - {exp.endDate || "Present"}</p>
              <p className="mt-1 whitespace-pre-line text-sm text-slate-700">{exp.whatIDid || "No details added."}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h3 className="text-lg font-semibold text-slate-900">Education</h3>
        <div className="mt-3 space-y-3">
          {formData.education.map((edu, idx) => (
            <p key={`preview-edu-${idx}`} className="text-sm text-slate-700">
              <span className="font-semibold">{edu.schoolName || "School Name"}</span> — {edu.degree || "Degree"}, {edu.fieldOfStudy || "Field"} ({edu.graduationDate || "Date"})
            </p>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h3 className="text-lg font-semibold text-slate-900">Skills</h3>
        <p className="mt-2 whitespace-pre-line text-sm text-slate-700">{formData.skills || "No skills added."}</p>
      </section>

      <section className="mt-6">
        <h3 className="text-lg font-semibold text-slate-900">Additional</h3>
        <div className="mt-2 space-y-2 text-sm text-slate-700">
          {formData.additional.map((item, idx) => (
            <p key={`preview-add-${idx}`}>
              <span className="font-semibold">{item.title || "Title"}:</span> {item.details || "No details provided."}
            </p>
          ))}
        </div>
      </section>

      <button
        type="button"
        className="mt-8 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Create Resume
      </button>
    </div>
  );

  const pageContent = {
    1: renderPersonal(),
    2: renderExperience(),
    3: renderEducation(),
    4: renderSkills(),
    5: renderSummary(),
    6: renderAdditional(),
    7: renderPreview(),
  };

  const stepTitles = {
    1: "Personal Details",
    2: "Work Experience",
    3: "Education",
    4: "Skills",
    5: "Summary",
    6: "Additional Links & Awards",
    7: "Resume Preview",
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600">Resume Builder</p>
            <h1 className="text-2xl font-bold text-slate-900">{stepTitles[step]}</h1>
            <p className="mt-1 text-sm text-slate-600">Step {step} of {totalSteps}</p>
          </div>
          <p className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">{progress}% Complete</p>
        </div>
        <div className="mt-4 h-2 w-full rounded-full bg-slate-100">
          <div className="h-2 rounded-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">{pageContent[step]}</div>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={step === 1}
          className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={step === totalSteps}
          className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ResumeBuilder;
