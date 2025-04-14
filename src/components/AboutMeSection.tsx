import Image from "next/image";

import profilePic from "@/assets/profile.png";

function AboutMeSection() {
  return (
    <section id="about" className="">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Image Column */}
          <div className="relative order-fist lg:order-first w-full max-w-sm mx-auto lg:max-w-none lg:mx-0">
            <div className="relative aspect-square bg-green-50 z-10 rounded-lg shadow-xl overflow-hidden group">
              <Image
                src={profilePic}
                alt="Md. Nahid Mahmud - Profile Picture"
                priority={true}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                className="transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent dark:from-black/30"></div>
            </div>
          </div>

          {/* Text Content Column */}
          <div className="text-justify flex flex-col gap-6 lg:gap-6">
            <h2
              className="font-semibold uppercase tracking-wider mb-3 
        text-emerald-600 dark:text-emerald-400 text-2xl "
            >
              <span className="text-gray-900 dark:text-white">About</span> Me
            </h2>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              I&apos;m <span className="text-emerald-600 dark:text-emerald-400">Md. Nahid Mahmud</span>
            </h1>

            <div className="space-y-5 text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                A passionate{" "}
                <span className="font-medium text-emerald-600 dark:text-emerald-400">Fullstack Developer</span> with a
                deep love for crafting beautiful and performant{" "}
                <span className="font-medium text-emerald-600 dark:text-emerald-400">Frontend experiences</span>. While
                I navigate the entire MERN stack, my focus sharpens on the user-facing side of web applications.
              </p>
              <p>
                My goal is to transform{" "}
                <span className="italic font-medium text-emerald-600 dark:text-emerald-400">
                  innovative ideas into digital reality
                </span>
                . I achieve this through meticulous attention to detail, writing{" "}
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  clean, efficient, and maintainable code
                </span>
                . I believe great software is not only functional but also elegant and user-friendly.
              </p>
              <p>
                I&apos;m constantly exploring new technologies and refining my skills to build cutting-edge web
                solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMeSection;
