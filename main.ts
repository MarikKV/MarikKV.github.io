import { projects, Project } from './projects.js';

// Define Vue interface for type safety if needed, 
// but since we're using the global Vue object, we'll cast it or use it as is.
declare var Vue: any;

const { createApp } = Vue;

createApp({
    data() {
        return {
            projects: projects as Project[]
        }
    },
    computed: {
        visibleProjects(): Project[] {
            return (this as any).projects.filter((p: Project) => p.show);
        }
    }
}).mount('#projects-app');
