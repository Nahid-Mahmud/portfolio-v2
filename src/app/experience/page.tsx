import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Experience - Md. Nahid Mahmud",
  description:
    "Explore my professional journey as a Full Stack Developer, showcasing my skills, achievements, and technologies used.",
  openGraph: {
    title: "Professional Experience - Md. Nahid Mahmud",
    description:
      "Explore my professional journey as a Full Stack Developer, showcasing my skills, achievements, and technologies used.",
    url: "hhttps://nahid-mahmud.xyz/experience",
    siteName: "Your Portfolio",
    images: [
      {
        url: "/professionalExperience.png",
        width: 1200,
        height: 630,
        alt: "Professional Experience",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Experience - Md. Nahid Mahmud",
    description:
      "Explore my professional journey as a Full Stack Developer, showcasing my skills, achievements, and technologies used.",
    images: ["/professionalExperience.png"],
  },
};

export default function ExperiencePage() {
  const technologies = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Git",
    "GitHub",
    "Postman",
    "VPS Hosting",
    "CI/CD",
    "API Integration",
    "Prisma",
  ];

  return (
    <div className="min-h-screen  py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-2">
            Professional Experience
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto dark:text-white">
            A detailed overview of my professional journey and expertise
          </p>
        </div>

        <div className="overflow-hidden border-none rounded-lg shadow-lg ">
          {/* Card Header */}
          <div
            className="bg-gradient-to-r relative z-10 from-slate-800 to-slate-900 text-white p-6
          dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 
          "
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">SM Technology</h2>
                <p className="text-slate-300 mt-1">Full Stack Developer</p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500 text-white">
                2024-2025
              </span>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-0 relative bg-white z-10">
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-700 mt-0.5"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                  </svg>
                  <div>
                    <h3 className="font-medium text-slate-900">Duration</h3>
                    <p className="text-slate-600">August 17, 2024 - April 2, 2025</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-700 mt-0.5"
                  >
                    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  <div>
                    <h3 className="font-medium text-slate-900">Position</h3>
                    <p className="text-slate-600">Full Stack Developer</p>
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="h-px bg-slate-200 w-full my-4"></div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-700 mt-1"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" x2="8" y1="13" y2="13"></line>
                    <line x1="16" x2="8" y1="17" y2="17"></line>
                    <line x1="10" x2="8" y1="9" y2="9"></line>
                  </svg>
                  <div>
                    <h3 className="font-medium text-slate-900">Responsibilities & Achievements</h3>
                    <ul className="mt-2 space-y-3 text-slate-600">
                      <li className="flex items-start">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-600 mt-2 mr-2 flex-shrink-0"></span>
                        <span>
                          Worked as a Full Stack Developer with a strong focus on frontend development, primarily using
                          HTML, CSS, JavaScript, TypeScript, React, and Next.js to build responsive and user-friendly
                          interfaces.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-600 mt-2 mr-2 flex-shrink-0"></span>
                        <span>
                          Led a frontend team of 12 developers, overseeing task distribution, project planning, and code
                          quality to ensure smooth delivery of features and UI components.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-600 mt-2 mr-2 flex-shrink-0"></span>
                        <span>
                          Joined a capsule team to provide cross-functional support, helping other teams achieve their
                          technical goals effectively.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-600 mt-2 mr-2 flex-shrink-0"></span>
                        <span>
                          Provided technical assistance in configuring and hosting email services on a VPS, and helped
                          deploy and maintain web applications on the VPS, ensuring reliable and secure hosting.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="h-px bg-slate-200 w-full my-4"></div>

              <div className="flex items-start space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-700 mt-0.5"
                >
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                <div>
                  <h3 className="font-medium text-slate-900">Technologies Used</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-slate-100 text-slate-800 border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
