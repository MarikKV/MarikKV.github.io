import { projects } from './projects.js';
const { createApp } = Vue;
createApp({
    data() {
        return {
            projects: projects
        };
    },
    computed: {
        visibleProjects() {
            return this.projects.filter((p) => p.show);
        }
    }
}).mount('#projects-app');
