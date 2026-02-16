const { createApp } = Vue;

createApp({
    data() {
        return {
            projects: [
                {
                    name: "Tarta.ai",
                    description: "Some description of site (support <b>html-markup</b>)",
                    image: "https://tarta.ai/logo.png", // Or local path if available
                    tags: ["Job board", "AI-driven", "Articles", "Companies"],
                    responsibilities: "<ul><li>My responsibilities at that project</li><li>Support html-markup</li></ul>",
                    video: "https://youtube.com" // Placeholder link
                },
                // Add more projects here
            ]
        }
    }
}).mount('#projects-app');
