export interface TimelineEntry {
  date: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const timelineData: TimelineEntry[] = [
  {
    date: "2020-2022",
    title: "Higher Education in Application Development",
    description:
      "Studied DAM (Developing, installing, documenting and maintaining cross-platform applications) at IES José Luis Sampedro. Worked with Java, SQL, MongoDB, HTML, CSS, and Python. Received honors in programming subjects and thesis.",
    icon: "calendar",
    color: "from-blue-500 to-cyan-500",
  },
  {
    date: "2022",
    title: "First Place in National Programming Contest",
    description:
      "Achieved first place in the algorithmic national programming contest in Madrid and fourth place in Spain (ProgramaMe). A significant milestone demonstrating problem-solving skills and algorithmic thinking.",
    icon: "sparkles",
    color: "from-purple-500 to-pink-500",
  },
  {
    date: "Mar 2022 - Jan 2023",
    title: "Full Stack Developer at Santander Bank",
    description:
      "Worked via Ibermatica using React, TypeScript, and NodeJS. Created, fixed, and maintained features and products. Practiced agile methodologies in a scrum team. Gained experience with CI/CD, Git, GitHub, migrations, provisioning, and automated flows.",
    icon: "lightbulb",
    color: "from-green-500 to-teal-500",
  },
  {
    date: "Jan 2022 - Present",
    title: "Independent Projects",
    description:
      "Lead developer for Gierig Groeien, a protein powder comparison website using Node, JavaScript, React, Selenium, and WordPress. Also lead developer for Tiranik Games, a personal board game company. Continuously working on personal projects including scaffolding tools, AI tools, scrapers, websites, and web bots.",
    icon: "calendar",
    color: "from-orange-500 to-red-500",
  },
  {
    date: "Jan 2023 - Apr 2023",
    title: "Full Stack JavaScript Bootcamp",
    description:
      "Attended the School of Applied Technology bootcamp with 500+ coding hours. Focused on designing and developing user interfaces, server-side logic, databases, and APIs. Practiced Test-Driven Development, pair programming, and presentations using JavaScript, TypeScript, React, Node, Express, Redux, Docker, and Jest.",
    icon: "lightbulb",
    color: "from-blue-500 to-cyan-500",
  },
  {
    date: "Apr 2023 - Nov 2023",
    title: "Freelance Full Stack Developer",
    description:
      "Developed a Social Media Application and various landing pages for different clients. Utilized JavaScript, React, Node, Express, Firebase, and React Native to deliver custom solutions tailored to client needs.",
    icon: "sparkles",
    color: "from-purple-500 to-pink-500",
  },
  {
    date: "Nov 2023 - Present",
    title: "Frontend Developer at SoilBeat B.V",
    description:
      "Developing frontend applications for a SaaS company with great responsibility and independence as the frontend developer of the team. Also developing complementary tools including AI/LLM scripts and data extracting/cleaning tools using JavaScript, React, Tailwind, Node, and Express.",
    icon: "calendar",
    color: "from-green-500 to-teal-500",
  },
  {
    date: "Future",
    title: "Continuing the Cosmic Journey",
    description:
      "Exploring new technologies, contributing to innovative projects, and expanding skills in AI integration and modern web development. Always seeking new challenges and opportunities to grow as a developer.",
    icon: "lightbulb",
    color: "from-orange-500 to-red-500",
  },
];
