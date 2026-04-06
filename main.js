// STUDIO_NEON | Portfolio Acid Archive Interactivity

document.addEventListener('DOMContentLoaded', () => {
    console.log('STUDIO_NEON System Initialized...');

    // 1. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.pill, .headline-lg, .display-lg, .project-card, .focus-item');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = entry.target.dataset.originalTransform || 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        // Store original transform if exists (like rotated pills)
        const style = window.getComputedStyle(el);
        el.dataset.originalTransform = style.transform !== 'none' ? style.transform : '';
        
        // Initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) ' + (el.dataset.originalTransform || '');
        el.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        
        revealObserver.observe(el);
    });

    // 3. Project Modal / Overlay Logic
    const projectItems = document.querySelectorAll('.project-item');
    const overlay = document.getElementById('project-overlay');
    const closeBtn = document.getElementById('close-overlay');
    const projectDetails = document.getElementById('project-details');

    const projectData = {
        twist: {
            title: "Twist",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            image: "https://picsum.photos/seed/twist/1200/800"
        },
        botanica: {
            title: "Botânica",
            description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: "https://picsum.photos/seed/botanica/1200/800"
        },
        archello: {
            title: "Archello",
            description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
            image: "https://picsum.photos/seed/archello/1200/800"
        },
        runners: {
            title: "4RUNNERS",
            description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
            image: "https://picsum.photos/seed/runners/1200/800"
        },
        enelx: {
            title: "EnelX",
            description: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.",
            image: "https://picsum.photos/seed/enelx/1200/800"
        },
        befly: {
            title: "Befly",
            description: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
            image: "https://picsum.photos/seed/befly/1200/800"
        }
    };

    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.dataset.project;
            const data = projectData[projectId];

            if (data) {
                projectDetails.innerHTML = `
                    <div class="site-header">
                        <span class="label-tech">CASE STUDY // 2026</span>
                        <h2 class="display-site text-neon">${data.title}</h2>
                        <p class="body-lg" style="max-width: 600px;">Uma exploração profunda em design de interface e experiência do usuário para a plataforma ${data.title}.</p>
                    </div>
                    
                    <div class="site-mock">
                        <img src="${data.image}" alt="${data.title}" class="detail-img">
                    </div>
                    
                    <div class="site-body">
                        <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
                            <div class="glass pill" style="padding: 3rem;">
                                <h4 class="headline-sm">O DESAFIO</h4>
                                <p class="text-variant">${data.description}</p>
                            </div>
                            <div class="glass pill" style="padding: 3rem;">
                                <h4 class="headline-sm">A SOLUÇÃO</h4>
                                <p class="text-variant">Implementamos um sistema visual baseado no Brutalismo Digital, garantindo que cada interação reforce a identidade da marca ${data.title} através de contrastes altos e tipografia monumental.</p>
                            </div>
                        </div>
                        
                        <div style="margin-top: 6rem; text-align: center;">
                            <h3 class="headline-md">Impacto Visual</h3>
                            <p class="body-lg" style="margin: 2rem auto; max-width: 800px;">O resultado é uma interface que não apenas comunica, mas provoca uma resposta emocional imediata do usuário, elevando o patamar de branding digital para ${data.title}.</p>
                            <img src="https://picsum.photos/seed/${projectId}2/1400/600" alt="Full Width Visual" class="detail-img">
                        </div>
                    </div>
                    
                    <div class="site-footer" style="padding: 6rem 0; border-top: 1px solid var(--color-surface-bright); margin-top: 6rem; text-align: center;">
                        <p class="label-tech">PROJECT END // STUDIO_NEON</p>
                    </div>
                `;
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // 4. Parallax effect for the hero image
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.1}px) rotate(2deg)`;
        }
    });
});
