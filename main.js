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
        runners: {
            title: "4RUNNERS",
            subtitle: "Plataforma digital para assessorias de corrida e performance esportiva",
            setor: "Tecnologia esportiva focada em assessorias de corrida, com gestão de atletas, treinos personalizados e construção de comunidade.",
            desafio: "Criar uma plataforma que fosse além do acompanhamento básico de treinos, permitindo que assessorias estruturassem uma comunidade ativa e engajada, com gestão individualizada de atletas em diferentes níveis de performance.",
            solucao: "Foi desenvolvida uma interface completa que integra acompanhamento de treinos, análise de desempenho e interação entre membros. A experiência foi pensada para facilitar o trabalho do assessor, ao mesmo tempo em que gamifica a jornada do atleta, incentivando constância, evolução e participação dentro da comunidade.",
            impacto: "A interface combina um visual robusto com elementos de gamificação e leitura rápida de dados, transmitindo performance, evolução e pertencimento. O design reforça a sensação de progresso contínuo e posiciona a plataforma como um ambiente premium para corredores comprometidos.",
            image: "assets/Capas/4RUNNERS.png"
        },
        botanica: {
            title: "BOTÂNICA",
            subtitle: "Projetos de jardins verticais e paisagismo contemporâneo",
            setor: "Paisagismo premium com foco em jardins verticais para ambientes urbanos.",
            desafio: "Apresentar o serviço de forma clara e sofisticada, conectando estética, funcionalidade e sustentabilidade para um público exigente de grandes centros urbanos.",
            solucao: "A estrutura do site foi pensada para destacar os serviços principais e facilitar o entendimento do processo, valorizando projetos personalizados e reforçando o diferencial da marca na integração da natureza aos espaços urbanos.",
            impacto: "O design explora tons naturais, formas orgânicas e imagens imersivas, criando uma sensação de frescor e bem-estar. A interface transmite equilíbrio entre natureza e arquitetura, reforçando o valor estético e sensorial do serviço.",
            image: "assets/Capas/Botânica.png"
        },
        tripai: {
            title: "TRIP.AI",
            subtitle: "Plataforma inteligente de planejamento de viagens",
            setor: "Tecnologia para turismo com foco em planejamento, organização e gestão de viagens.",
            desafio: "Centralizar todas as etapas de uma viagem em uma única plataforma, tornando o planejamento mais simples, eficiente e adaptável tanto para viajantes quanto para agentes.",
            solucao: "Foi criada uma plataforma que utiliza inteligência para organizar roteiros, controlar orçamento e estruturar a experiência de viagem de forma dinâmica. A interface conecta planejamento, execução e acompanhamento em um fluxo contínuo.",
            impacto: "A interface aposta em um visual moderno, tecnológico e intuitivo, com destaque para dados e organização de informações. O resultado transmite praticidade, controle e confiança durante toda a jornada do usuário.",
            image: "assets/Capas/Trip.AI.png"
        },
        voltbr: {
            title: "VOLTBR",
            subtitle: "Infraestrutura de carregamento para veículos elétricos",
            setor: "Mobilidade elétrica e soluções de carregamento para veículos.",
            desafio: "Comunicar uma proposta robusta de infraestrutura nacional de carregamento, equilibrando inovação tecnológica, sustentabilidade e expansão da rede.",
            solucao: "Foi desenvolvida uma estrutura institucional com foco em cobertura, facilidade de uso e expansão da rede. O conteúdo destaca tanto a experiência do usuário final quanto as oportunidades de integração com empresas e parceiros.",
            impacto: "O design combina tecnologia e sofisticação com uma estética limpa e moderna. Elementos visuais reforçam conectividade, energia e inovação, posicionando a marca como parte da evolução da mobilidade no país.",
            image: "assets/Capas/VOLTBR.png"
        },
        archello: {
            title: "ARCHELLO",
            subtitle: "Estúdio de arquitetura e interiores de alto padrão",
            setor: "Arquitetura e design de interiores voltado para projetos residenciais sofisticados.",
            desafio: "Reposicionar a presença digital do estúdio, saindo de um site genérico para uma experiência que refletisse o nível estético, o cuidado e o valor percebido dos projetos.",
            solucao: "Foi criada uma estrutura focada em apresentação de portfólio, com narrativa visual refinada e hierarquia de conteúdo que valoriza cada projeto. O site equilibra estética e clareza, conduzindo o visitante por uma jornada que reforça autoridade e sensibilidade criativa.",
            impacto: "A linguagem visual é minimalista, elegante e editorial, com uso estratégico de espaços, tipografia e imagens. O resultado transmite exclusividade e posiciona o estúdio como referência em projetos de alto padrão.",
            image: "assets/Capas/Archello.png"
        },
        twistag: {
            title: "TWIST.AG",
            subtitle: "Agência de estratégia e crescimento digital",
            setor: "Marketing digital com foco em posicionamento, estratégia e crescimento de negócios.",
            desafio: "Criar uma presença digital que refletisse autoridade estratégica e diferenciação, fugindo de abordagens genéricas comuns no mercado.",
            solucao: "O site foi estruturado para apresentar metodologia, cases e proposta de valor de forma direta e estratégica. A comunicação prioriza clareza, impacto e posicionamento, conduzindo o usuário à percepção de resultado e consistência.",
            impacto: "A interface utiliza contraste, tipografia marcante e elementos visuais inspirados em performance e dados, transmitindo crescimento, precisão e domínio técnico.",
            image: "assets/Capas/Twist Ag.png"
        }
    };

    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.dataset.project;
            const data = projectData[projectId];

            if (data) {
                projectDetails.innerHTML = `
                    <div class="site-header">
                        <h2 class="display-site text-neon">${data.title}</h2>
                        <p class="body-lg" style="max-width: 600px;">${data.subtitle}</p>
                    </div>
                    
                    <div class="site-mock">
                        <img src="${data.image}" alt="${data.title}" class="detail-img">
                    </div>
                    
                    <div class="site-body">
                        <div class="glass pill" style="padding: 3rem; margin-bottom: 2rem;">
                            <h4 class="headline-sm">SETOR</h4>
                            <p class="text-variant">${data.setor}</p>
                        </div>

                        <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
                            <div class="glass pill" style="padding: 3rem;">
                                <h4 class="headline-sm">O DESAFIO</h4>
                                <p class="text-variant">${data.desafio}</p>
                            </div>
                            <div class="glass pill" style="padding: 3rem;">
                                <h4 class="headline-sm">A SOLUÇÃO</h4>
                                <p class="text-variant">${data.solucao}</p>
                            </div>
                        </div>
                        
                        <div style="margin-top: 6rem; text-align: center;">
                            <h3 class="headline-md">Impacto Visual</h3>
                            <p class="body-lg" style="margin: 2rem auto; max-width: 800px;">${data.impacto}</p>
                        </div>

                        <div style="margin-top: 4rem; text-align: center;">
                            <button class="btn-primary" id="back-to-home">VOLTAR PARA HOME <i class="ti ti-arrow-back-up"></i></button>
                        </div>
                    </div>
                    
                    <div class="site-footer" style="padding: 6rem 0; border-top: 1px solid var(--color-surface-bright); margin-top: 6rem; text-align: center;">
                        <p class="label-tech">Francielter Borges</p>
                    </div>
                `;
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Botão Voltar para Home (mesma função do fechar)
                const backBtn = document.getElementById('back-to-home');
                if (backBtn) {
                    backBtn.addEventListener('click', () => {
                        overlay.classList.remove('active');
                        document.body.style.overflow = 'auto';
                        window.scrollTo({ top: 0, behavior: 'smooth' }); // Opcional: voltar ao topo da home
                    });
                }
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

    // 5. Project Slider Navigation
    const carousel = document.getElementById('project-carousel');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (carousel && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const firstItem = carousel.querySelector('.project-item');
            if (firstItem) {
                const style = window.getComputedStyle(carousel.querySelector('.carousel-track'));
                const gap = parseInt(style.gap) || 32;
                return firstItem.offsetWidth + gap;
            }
            return 352;
        };

        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });

        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        // Hide/Show arrows based on scroll position (optional but premium)
        const toggleArrows = () => {
            const isAtStart = carousel.scrollLeft <= 10;
            const isAtEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10;

            prevBtn.style.opacity = isAtStart ? '0.3' : '1';
            prevBtn.style.pointerEvents = isAtStart ? 'none' : 'all';

            nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
            nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'all';
        };

        carousel.addEventListener('scroll', toggleArrows);
        window.addEventListener('resize', toggleArrows);
        toggleArrows(); // Initial state
    }

    // 6. Mobile Menu Logic
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeMenu = () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        if (menuClose) menuClose.addEventListener('click', closeMenu);

        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
});
