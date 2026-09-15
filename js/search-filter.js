import { projects } from './projects-data.js';

let currentSearchQuery = '';
let currentCategory = 'All';

export function filterProjects(query, category) {
    currentSearchQuery = query.toLowerCase();
    currentCategory = category;

    return projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(currentSearchQuery);
        const matchesCategory = currentCategory === 'All' || project.category === currentCategory;
        
        return matchesSearch && matchesCategory;
    });
}

// Debounce helper to prevent excessive filtering while typing
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
