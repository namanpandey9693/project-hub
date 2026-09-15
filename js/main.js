import { projects } from './projects-data.js';
import { renderProjects } from './render.js';
import { filterProjects, debounce } from './search-filter.js';

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const gridContainer = document.getElementById('project-grid');
    const searchInput = document.getElementById('search-input');
    const searchToggle = document.getElementById('search-toggle');
    const searchContainer = document.querySelector('.search-input-container');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const emptyState = document.getElementById('empty-state');
    const resultsCount = document.getElementById('results-count');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const currentYearSpan = document.getElementById('current-year');
    const header = document.querySelector('.site-header');

    // Initialize UI
    currentYearSpan.textContent = new Date().getFullYear();
    
    // Initial render
    updateUI(projects);

    // Hero visual animation
    const heroVisual = document.querySelector(".hero-visual");
    if (heroVisual) {
        requestAnimationFrame(() => {
            setTimeout(() => heroVisual.classList.add("is-visible"), 150);
        });
    }

    // --- Event Listeners ---

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    // Search toggle
    searchToggle.addEventListener('click', () => {
        searchContainer.classList.toggle('open');
        if (searchContainer.classList.contains('open')) {
            searchInput.focus();
        }
    });

    // Close search if clicked outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-wrapper') && searchContainer.classList.contains('open')) {
            if (searchInput.value === '') {
                searchContainer.classList.remove('open');
            }
        }
    });

    // Search input (debounced)
    const handleSearch = debounce((e) => {
        const query = e.target.value;
        const activeCategory = document.querySelector('.filter-tab.active').dataset.category;
        const filtered = filterProjects(query, activeCategory);
        updateUI(filtered);
    }, 200);

    searchInput.addEventListener('input', handleSearch);

    // Category tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active class
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Apply filter
            const category = tab.dataset.category;
            const query = searchInput.value;
            const filtered = filterProjects(query, category);
            updateUI(filtered);
        });
    });

    // Clear filters button (in empty state)
    clearFiltersBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchContainer.classList.remove('open');
        filterTabs.forEach(t => t.classList.remove('active'));
        document.querySelector('.filter-tab[data-category="All"]').classList.add('active');
        
        const filtered = filterProjects('', 'All');
        updateUI(filtered);
    });

    // --- Helper Functions ---
    
    function updateUI(filteredProjects) {
        if (filteredProjects.length === 0) {
            gridContainer.style.display = 'none';
            emptyState.style.display = 'block';
        } else {
            gridContainer.style.display = 'grid';
            emptyState.style.display = 'none';
            renderProjects(filteredProjects, gridContainer);
        }

        // Pad count to 3 digits (e.g., 006)
        resultsCount.textContent = filteredProjects.length.toString().padStart(3, '0');
    }
});
