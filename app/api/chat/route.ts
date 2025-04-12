import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const userContext = {
  name: "Gonzalo Alonso",
  title: "Full Stack Developer",
  location: {
    origin: "Spain",
    current: "Utrecht, Netherlands",
  },
  contact: {
    phone: "+34620684555",
    email: "gonalonso.gar@gmail.com",
    linkedin: "www.linkedin.com/in/galonsog/",
    github: "github.com/gonzaloalonso123",
  },
  summary:
    "Passionate about making ideas come to life. Over the past years, I've created and/or participated in more than 15 projects. I bring reliable workforce, critical thinking, creative problem solving, and always a positive mindset to any team.",

  skills: {
    programmingLanguages: [
      { name: "JavaScript", level: "Advanced" },
      { name: "TypeScript", level: "Advanced" },
      { name: "Python", level: "Intermediate" },
      { name: "Java", level: "Beginner" },
    ],
    backend: [
      { name: "Node.js", level: "Advanced" },
      { name: "Express", level: "Advanced" },
      { name: "Google Cloud & Firebase", level: "Advanced" },
      { name: "Selenium", level: "Intermediate" },
      { name: "MongoDB", level: "Beginner" },
      { name: "SQL", level: "Beginner" },
    ],
    frontend: [
      { name: "React/Next.js", level: "Advanced" },
      { name: "HTML5 and CSS3", level: "Advanced" },
      { name: "Tailwind", level: "Advanced" },
      { name: "React Native/Expo", level: "Intermediate" },
      { name: "Multiple UI libraries", level: "Intermediate" },
    ],
    tools: [
      { name: "Docker", level: "Intermediate" },
      { name: "Version Control (Git/GitHub/GitLab)", level: "Intermediate" },
      { name: "AI", level: "Intermediate and exploring daily" },
      { name: "Testing (Mocha/Jest/Cypress)", level: "Beginner" },
    ],
  },

  languages: [
    { language: "English", proficiency: "Proficient" },
    { language: "Spanish", proficiency: "Native" },
    { language: "Dutch", proficiency: "Beginner" },
  ],

  achievements: [
    "First place in algorithmic national programming contest in Madrid and fourth place in Spain (ProgramaMe) in 2022",
  ],

  strengths: ["Communication & team player", "High motivation and fast learning", "Passionate about coding"],

  experience: [
    {
      position: "Frontend Developer",
      company: "SoilBeat B.V",
      period: "November 2023 - Present",
      responsibilities: [
        "Developing frontend application for a SAAS company",
        "Great responsibility and independence as the frontend developer of the team",
        "Developing several complementary tools, including AI/LLM scripts, and data extracting/cleaning tools",
        "Stack: JavaScript, React, Tailwind, Node, Express",
      ],
    },
    {
      position: "Full Stack Developer",
      company: "Independent Projects",
      period: "January 2022 - Present",
      responsibilities: [
        "Lead developer for GierigGroeien.nl, a protein powder comparer (Node, JavaScript, React, Selenium, WordPress)",
        "Lead developer for Tiranik Games, my own board game company",
        "Constantly working on personal projects, including tools to scaffold templates with a focus on best practices, AI tools (e.g., Stock market analysis), scrapers, websites, and web bots",
      ],
    },
    {
      position: "Full Stack Developer",
      company: "Freelancing",
      period: "April 2023 - November 2023",
      responsibilities: [
        "Social Media Application",
        "Landing pages for different clients",
        "Stack: JavaScript, React, Node, Express, Firebase, React Native",
      ],
    },
    {
      position: "Full Stack Developer",
      company: "Santander bank via Ibermatica",
      period: "March 2022 - January 2023",
      responsibilities: [
        "Daily development using React, TypeScript, Node.js",
        "Creating, fixing and maintaining features and products",
        "Agile methodologies - scrum team",
        "CI/CD, Git, GitHub",
        "Other: Migrations, provisioning, automated flows",
      ],
    },
  ],

  education: [
    {
      degree: "Full Stack Javascript Bootcamp",
      institution: "School of Applied Technology",
      period: "January 2023 - April 2023",
      details: [
        "Designing and developing the user interface and creating and maintaining the server-side logic, databases, and APIs",
        "500+ coding hours, TDD, Pair programming, and presentations",
        "Stack: JavaScript, TypeScript, React, Node, Express, Redux, Docker, Jest",
      ],
    },
    {
      degree: "DAM (Developing Applications)",
      institution: "IES José Luis Sampedro",
      period: "September 2020 - June 2022",
      details: [
        "Developing, installing, documenting and maintaining cross-platform applications",
        "Stack: Java, SQL, MongoDB, HTML, CSS, Python",
        "Honors in programming subjects and in thesis",
      ],
    },
  ],

  projects: [
    {
      name: "Soilbeat",
      description:
        "A platform to help agronomists store, standardize, and visualize their data, with the aim of improving soil health.",
      technologies: ["React", "Tailwind"],
    },
    {
      name: "Gierig Groeien",
      description:
        "A server that scrapes all protein powders of the Netherlands from the web, compares them, and pushes them to a WordPress site.",
      technologies: ["React", "Firebase", "Express", "Docker", "WordPress"],
    },
    {
      name: "Node Cook",
      description:
        "Build instant Database & API in Mongo or Firebase, with Authentication, Authorization, CRUD, and more, and push it to your GitHub repository.",
      technologies: ["React", "Firebase", "Express", "MongoDB", "Docker"],
    },
    {
      name: "Subasta de Hashiban",
      description:
        "Main selling point for the card game 'La Subasta de Hashiban', brought by my company Tiranik Games. An immersive website that teleports you to the kingdom of Hashiban.",
      technologies: ["React", "Firebase", "TypeScript"],
    },
    {
      name: "Taskwise",
      description:
        "Task management app with AI. This tool allows you to invite people to join your projects, manage tasks kanban style, and use AI to help you complete the tasks or subdivide them.",
      technologies: ["React", "Firebase", "OpenAI"],
    },
  ],

  portfolio: "A space-themed portfolio showcasing projects and skills in an interactive cosmic environment",
};

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();
    const formattedHistory = history.map((msg: any) => ({
      role: msg.isUser ? "user" : "assistant",
      content: msg.text,
    }));
    const systemMessage = {
      role: "system",
      content: `You are NOVA, an AI assistant for Gonzalo Alonso's space-themed portfolio website. 
      Be helpful, concise, and friendly. Your responses should be informative but brief (1-3 sentences when possible).
      
      Here's comprehensive information about Gonzalo that you can use to answer questions:
      ${JSON.stringify(userContext, null, 2)}
      
      If asked about projects, skills, experience, or education, refer to this information. If you don't know something specific, 
      suggest the visitor explore the portfolio sections or contact Gonzalo directly. In that case, provide the contact details:
      - Phone: ${userContext.contact.phone}
      - Email: ${userContext.contact.email}
      
      Keep your tone professional but conversational, with occasional space-themed references to match the cosmic portfolio theme.
      For example, you might say "Launching into a new project" instead of "Starting a new project" or refer to skills as part of Gonzalo's "tech constellation".`,
    };
    const userMessage = {
      role: "user",
      content: message,
    };
    const messages = [systemMessage, ...formattedHistory, userMessage];
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      max_tokens: 300,
      temperature: 0.7,
    });
    const response = completion.choices[0].message.content;

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 });
  }
}
