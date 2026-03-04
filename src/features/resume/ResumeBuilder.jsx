import { useMemo, useState } from "react";
import { getAiResponse } from "../../api/aiSummery";

const stripHtml = (value = "") => value.replace(/<[^>]*>/g, "").trim();

const toEditorHtml = (value = "") => {
  if (!value) {
    return "";
  }

  if (value.includes("<") && value.includes(">")) {
    return value;
  }

  return value
    .split("\n")
    .filter(Boolean)
    .map((line) => `<p>${line}</p>`)
    .join("");
};

const RichTextEditor = ({ value, onChange, placeholder, minHeight = "140px" }) => {
  const applyFormat = (command) => {
    document.execCommand(command, false, null);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-100 p-2">
        {[
          ["bold", "Bold"],
          ["underline", "Underline"],
          ["insertUnorderedList", "Bullet List"],
          ["insertOrderedList", "Numbered List"],
        ].map(([command, label]) => (
          <button
            key={command}
            type="button"
            onClick={() => applyFormat(command)}
            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            {label}
          </button>
        ))}
      </div>
      <div
        contentEditable
        suppressContentEditableWarning
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none"
        style={{ minHeight }}
        data-placeholder={placeholder}
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: toEditorHtml(value) }}
      />
    </div>
  );
};

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

// form data json structure:
// {
//   personal: { name, city, country, pinCode, phone, email },
//   experiences: [{ jobTitle, employer, city, startDate, endDate, responsibilities }],
//   educations: [{ schoolName, location, degree, fieldOfStudy, graduationDate }],
//   skills: "",
//   summary: "",
//   links: [{ title, url, description }],
// }  

 if(step === 7) {
    console.log("Final resume data:", form);
  }


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

  const removeLink = (index) => {
    setForm((prev) => {
      if (prev.links.length === 1) {
        return prev;
      }

      const item = prev.links[index];
      if (item && hasAnyInput(item)) {
        const shouldRemove = window.confirm("This link has data. Are you sure you want to remove it?");
        if (!shouldRemove) {
          return prev;
        }
      }

      return {
        ...prev,
        links: prev.links.filter((_, itemIndex) => itemIndex !== index),
      };
    });
  };



  // AI enhancement functions. 
  const enhanceText = (section, index, field) => {
    console.log("Enhance called for:", section, index, field);
    if (section === "skills") {

      let prompt = `Enhance the following resume skills section to be more ATS-friendly and impactful:\n\n${stripHtml(form.skills)}\n\nPlease improve the phrasing, add relevant keywords, and make it concise.`;
      const handleEnhanceSkills = async () => {
        try {
          const aiResponse = await getAiResponse(prompt);
          console.log("AI response for skills enhancement:", aiResponse);
          setForm((prev) => ({
            ...prev,
            skills: toEditorHtml(`${aiResponse["choices"][0]["message"]["content"]}`),
          }));
        } catch (error) {
          console.log("Error enhancing skills:", error);
        }
      };
      handleEnhanceSkills();
      
      return;
    }

    if (section === "summary") {
      
      let prompt = `Enhance the following resume summary to be more concise, impactful, and aligned with target roles:\n\n${stripHtml(form.summary)}\n\nPlease clarify the candidate's value proposition, highlight key strengths, and make it compelling for recruiters.`;

        const handleEnhanceSummary = async () => {
        try {          const aiResponse = await getAiResponse(prompt);
          setForm((prev) => ({
            ...prev,
            summary: toEditorHtml(`${aiResponse["choices"][0]["message"]["content"]}`),
          }));
        } catch (error) {
          console.error("Error enhancing summary:", error);
        }
      };
      handleEnhanceSummary();
      return;
    }

    setForm((prev) => ({
      ...prev,
      [section]: prev[section].map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: `${toEditorHtml(item[field])}${item[field] ? "" : "<p>"}Enhanced with AI: clarified impact, metrics, and outcomes.${item[field] ? "" : "</p>"}`,
            }
          : item,
      ),
    }));
  };

  const autoGenerateSummary = () => {
    let promptAIGenerate = `Generate a concise and impactful resume summary based on the following information:\n\n${JSON.stringify(form)}\n\nPlease create a professional summary that highlights the candidate's value proposition, key strengths, and is tailored for recruiters.`;


    const handleAutoGenerateSummary = async () => {
      try {
        const aiResponse = await getAiResponse(promptAIGenerate);
        setForm((prev) => ({
          ...prev,
          summary: toEditorHtml(`${aiResponse["choices"][0]["message"]["content"]}`),
        }));
      } catch (error) {
        console.error("Error generating summary:", error);
      }
    };
    handleAutoGenerateSummary();
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
                  <RichTextEditor
                    placeholder={`What did you do in ${experience.jobTitle || "this role"}?`}
                    value={experience.responsibilities}
                    onChange={(value) => updateArrayField("experiences", index, "responsibilities", value)}
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
            <RichTextEditor
              minHeight="220px"
              placeholder="Add your skills (technical, tools, soft skills, etc.)"
              value={form.skills}
              onChange={(value) => setForm((prev) => ({ ...prev, skills: value }))}
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
            <RichTextEditor
              minHeight="220px"
              placeholder="Write a short professional summary"
              value={form.summary}
              onChange={(value) => setForm((prev) => ({ ...prev, summary: value }))}
            />
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            {form.links.map((link, index) => (
              <div key={index} className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-800">Link {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeLink(index)}
                    disabled={form.links.length === 1}
                    className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Remove Link
                  </button>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
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
                    <div className="prose prose-sm max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: toEditorHtml(experience.responsibilities) }} />
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
