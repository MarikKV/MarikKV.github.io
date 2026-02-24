export interface Project {
    name: string;
    description: string;
    image: string;
    tags: string[];
    responsibilities: string[];
    video: string;
    website: string;
    show: boolean;
}

export const projects: Project[] = [
    {
        name: "Instafill.ai",
        description: "AI PDF filler. Web application that helps user to fill PDF forms with AI.",
        image: "/images/last_projects/instafill.png",
        tags: ["PDF filler", "AI-driven", "Articles"],
        responsibilities: [
            "Support and develop new UI/UX features for web-app",
            "Create multiple tools to work with pdf files",
            "Create admin tools to support clients and manage website"
        ],
        video: "https://www.youtube.com/channel/UCa57I5DFqulQaoMR_0H--kA",
        website: "https://instafill.ai",
        show: true
    },
    {
        name: "Resume Copilot",
        description: "AI-povered tool to create resumes.",
        image: "/images/last_projects/resumecopilot.png",
        tags: ["Resume builder", "AI-driven"],
        responsibilities: [
            "Support and develop new UI/UX features for web-app",
            "Creating new resume templates for customers"
        ],
        video: "https://www.youtube.com/watch?v=KxM6UBC7yFw&t=1s",
        website: "https://resumecopilot.net",
        show: true
    },
    {
        name: "Best AI Apps",
        description: "Market of plugins for ChatGPT. AI applications designed for personal and business use cases.",
        image: "/images/last_projects/bestaiapps.png",
        tags: ["AI plugins", "AI-driven"],
        responsibilities: [
            "Support and develop new UI/UX features for web-app",
            "Creating chat bots driven by AI to implement plugins features"
        ],
        video: "https://www.youtube.com/@bestaiapps-co",
        website: "https://bestaiapps.co",
        show: true
    },
    {
        name: "Tarta.ai",
        description: "Job board website. Also provides content about companies and articles for job apply tips.",
        image: "/images/last_projects/tarta.png",
        tags: ["Job board", "AI-driven", "Articles"],
        responsibilities: [
            "Support and develop new conted and functionality of website",
            "Worked on page load speed and SEO optimization of website",
            "Created and supported admin tools to support job board, company profiles, articles, and other features"
        ],
        video: "https://www.youtube.com/@tarta-ai",
        website: "https://tarta.ai",
        show: true
    }
];
