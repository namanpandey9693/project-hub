export function createProjectCard(project, index) {
    const card = document.createElement('a');
    card.className = 'project-card';
    card.dataset.id = project.id;
    card.href = project.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.setAttribute('aria-label', `View project ${project.name}`);
    
    // Format index as 01, 02, etc.
    const formattedIndex = (index + 1).toString().padStart(2, '0');

    // Fallback for image loading error
    const imgErrorFallback = `this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwYTBhMGEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM4YTg4ODMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';`;

    const tagsHtml = (project.technologies || []).join(' &middot; ');

    card.innerHTML = `
        <div class="card-image-wrapper">
            <span class="card-index">${formattedIndex}</span>
            <img src="${project.image}" alt="" class="card-image" loading="lazy" onerror="${imgErrorFallback}">
        </div>
        <div class="card-content">
            <span class="card-kicker">${project.category}</span>
            <div class="card-header">
                <h3 class="card-title">${project.name}</h3>
                <svg class="card-link-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
            </div>
            <p class="card-description">${project.description}</p>
            <div class="card-tags">
                ${tagsHtml}
            </div>
        </div>
    `;

    return card;
}

export function renderProjects(projectsToRender, containerElement) {
    containerElement.innerHTML = '';
    
    // Create DocumentFragment for efficient rendering
    const fragment = document.createDocumentFragment();
    
    projectsToRender.forEach((project, idx) => {
        fragment.appendChild(createProjectCard(project, idx));
    });
    
    containerElement.appendChild(fragment);

    // Setup intersection observer for fade-in effect
    setupScrollAnimations(containerElement.querySelectorAll('.project-card'));
}

function setupScrollAnimations(cards) {
    // Respect user's preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // One-time animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    });

    cards.forEach(card => observer.observe(card));
}
