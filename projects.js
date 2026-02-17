const { createApp } = Vue;

createApp({
    data() {
        return {
            projects: [
                {
                    name: "Instafill.ai",
                    description: "AI PDF filler. Web application that helps user to fill PDF forms with AI.",
                    image: "/project_images/instafill.png",
                    tags: ["PDF filler", "AI-driven", "Articles"],
                    responsibilities: [
                        "Support and develop new UI/UX features for web-app",
                        "Create multiple tools to work with pdf files"
                    ],
                    video: "https://www.youtube.com/channel/UCa57I5DFqulQaoMR_0H--kA"
                },
                {
                    name: "Tarta.ai",
                    description: "Job board website. Also provides content about companies and articles for job apply tips.",
                    image: "/project_images/tarta.png",
                    tags: ["Job board", "AI-driven", "Articles"],
                    responsibilities: [
                        "Support and develop new conted and functionality of website",
                        "Worked on page load speed and SEO optimization of website",
                        "Created and supported admin tools to support job board, company profiles, articles, and other features"
                    ],
                    video: "https://www.youtube.com/@tarta-ai"
                },
                {
                    name: "Bestaiapps.co",
                    description: "Some description of site (support <b>html-markup</b>)",
                    image: "/project_images/tarta.png", // Or local path if available
                    tags: ["AI plugins", "AI-driven"],
                    responsibilities: [

                    ],
                    video: "https://www.youtube.com/@tarta-ai" // Placeholder link
                },
                // Add more projects here
            ]
        }
    }
}).mount('#projects-app');
