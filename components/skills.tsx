import Image from "next/image";

export function SkillsGalaxy({ languages, frontend, backend, tools }) {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
        My Skills
      </h2>

      <div className="flex flex-col xl:flex-row gap-3 w-full pb-20">
        <div className="flex flex-col gap-3 w-full">
          <SkillCluster title="Programming Languages" skills={languages} color="from-purple-500 to-pink-500" />
          <SkillCluster title="Backend Technologies" skills={backend} color="from-green-500 to-teal-500" />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <SkillCluster title="Frontend Technologies" skills={frontend} color="from-cyan-500 to-blue-500" />
          <SkillCluster title="Tools & Utilities" skills={tools} color="from-orange-500 to-red-500" />
        </div>
      </div>
    </div>
  );
}

function SkillCluster({ title, skills, color }) {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-gradient-to-r opacity-10 rounded-3xl blur-xl"
        style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
      ></div>
      <div className={`bg-gradient-to-r ${color} p-1 rounded-3xl shadow-lg`}>
        <div className="bg-black/80 backdrop-blur-sm rounded-3xl p-6">
          <h3 className="text-2xl font-bold mb-6 text-center">{title}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="flex flex-col items-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <Image src={skill.image} alt={`${skill.name} logo`} width={48} height={48} />
                </div>
                <span className="text-sm font-medium text-center">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
