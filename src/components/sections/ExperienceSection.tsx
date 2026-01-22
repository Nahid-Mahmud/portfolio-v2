const experiences = [
  {
    company: "ExecuteML",
    position: "Full-Stack Developer",
    period: "Sep 2025 - Jan 2026",
    duration: "4 mos",
    current: true,
    responsibilities: [
      "Contribute to the development of scalable, AI-integrated web applications.",
      "Collaborate with data science teams to integrate AI-driven features.",
      "Implement clean, reusable code following best practices.",
    ],
    technologies: ["Next.js", "TypeScript", "Prisma", "Mongoose", "MongoDB", "PostgreSQL"],
  },
  {
    company: "SM Technology",
    position: "Full Stack Developer",
    period: "Aug 2024 - Apr 2025",
    duration: "8 mos",
    current: false,
    responsibilities: [
      "Led a frontend team of 12 developers, overseeing task distribution.",
      "Built responsive interfaces using React and Next.js.",
      "Configured VPS and maintained CI/CD pipelines.",
    ],
    technologies: ["React", "Next.js", "Prisma", "Node.js", "Express", "VPS", "Prisma", "MongoDB", "PostgreSQL"],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="min-h-screen py-16  md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">Experience</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            A timeline of my professional career and technical milestones.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 md:ml-4 space-y-20">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8 md:pl-12 group">
              {/* Timeline Dot (Pulse effect for current job) */}
              <div
                className={`absolute -left-2.25 top-1.5 h-4 w-4 rounded-full border-4 border-white dark:border-slate-950 
                ${exp.current ? "bg-emerald-500 ring-4 ring-emerald-500/20" : "bg-slate-300 dark:bg-slate-700"}`}
              ></div>

              {/* Header: Role & Company */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {exp.position}
                  </h3>
                  <div className="text-lg font-medium text-slate-700 dark:text-slate-300">{exp.company}</div>
                </div>

                {/* Date Badge */}
                <div className="mt-2 sm:mt-0 flex flex-col items-start sm:items-end">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                    {exp.period}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-500 font-mono">{exp.duration}</span>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="mb-6">
                <ul className="space-y-2">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start text-slate-600 dark:text-slate-400 leading-relaxed">
                      <span className="mr-3 mt-2 h-1.5 w-1.5 min-w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium 
                    bg-slate-100 text-slate-700 
                    dark:bg-slate-800/50 dark:text-slate-400 
                    border border-slate-200 dark:border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Optional: "End of list" indicator to show the timeline is complete */}
        <div className="relative ml-3 md:ml-4 pt-8">
          <div className="absolute -left-1.25 top-8 h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-slate-800"></div>
          <p className="pl-8 md:pl-12 text-sm text-slate-400 italic">Professional journey began in 2024</p>
        </div>
      </div>
    </section>
  );
}
