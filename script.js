// Configurações personalizáveis
const CONFIG = {
    // Textos personalizáveis
    texts: {
        headerTitle: "🚀 PROMOÇÕES INCRÍVEIS QUE NÃO PARAM DE CHEGAR 🚀",
        mainTitle: "CANAL DE OFERTAS",
        subtitle: "Quem curte PROMOÇÃO de verdade já entrou!!!<br>E você, vai ficar de fora?",
        ctaText: "&#x2B07; Entre agora e fique por dentro &#x2B07;",
        primaryButton: "QUERO PARTICIPAR",
        secondaryButton: "💸 ENTRAR NO TELEGRAM 💸"
    },
    
    // Links personalizáveis
    links: {
        primaryButton: "https://wa.me/5511999999999?text=Quero%20participar%20do%20grupo%20de%20ofertas!",
        secondaryButton: "https://t.me/techdeals",
        instagram: "https://instagram.com/techdeals",
        profileImage: "https://via.placeholder.com/150x150/ff0000/ffffff?text=TECH"
    },
    
    // Configurações de animação
    animations: {
        enableParticles: true,
        enablePreloader: true,
        preloaderDuration: 2000
    }
};

// Classe principal da aplicação
class TechDealsLanding {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.setupPreloader();
        this.setupParticles();
        this.setupScrollEffects();
        this.setupButtonEffects();
        this.applyCustomTexts();
        this.applyCustomLinks();
    }
    
    // Aplicar textos personalizados
    applyCustomTexts() {
        const elements = {
            headerTitle: document.querySelector('.header-title'),
            mainTitle: document.getElementById('mainTitle'),
            subtitle: document.getElementById('subtitle'),
            ctaText: document.getElementById('ctaText'),
            primaryBtn: document.getElementById('primaryBtn'),
            secondaryBtn: document.getElementById('secondaryBtn')
        };
        
        Object.keys(elements).forEach(key => {
            if (elements[key] && CONFIG.texts[key]) {
                elements[key].innerHTML = CONFIG.texts[key];
            }
        });
    }
    
    // Aplicar links personalizados
    applyCustomLinks() {
        const links = {
            primaryBtn: document.getElementById('primaryBtn'),
            secondaryBtn: document.getElementById('secondaryBtn'),
            instagramLink: document.getElementById('instagramLink'),
            profileImg: document.getElementById('profileImg')
        };
        
        
        
    }
    
    // Configurar event listeners
    setupEventListeners() {
        // Smooth scroll para links internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Tracking de cliques nos botões
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.trackButtonClick(btn);
                this.addRippleEffect(e, btn);
            });
        });
        
        // Efeitos de hover nos elementos interativos
        document.querySelectorAll('.btn, .social-link').forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.addHoverEffect(element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.removeHoverEffect(element);
            });
        });
        
        // Resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Scroll handler
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }
    
    // Configurar animações
    setupAnimations() {
        // Intersection Observer para animações de entrada
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observar elementos para animação
        document.querySelectorAll('.profile-section, .title-section, .subtitle-section, .cta-section, .buttons-section, .social-section').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Configurar preloader
    setupPreloader() {
        if (!CONFIG.animations.enablePreloader) return;
        
        // Criar preloader
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = '<div class="loader"></div>';
        document.body.appendChild(preloader);
        
        // Remover preloader após carregamento
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, CONFIG.animations.preloaderDuration);
        });
    }
    
    // Configurar partículas de fundo
    setupParticles() {
        if (!CONFIG.animations.enableParticles) return;
        
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        document.body.appendChild(particlesContainer);
        
        // Criar partículas
        for (let i = 0; i < 50; i++) {
            this.createParticle(particlesContainer);
        }
    }
    
    // Criar partícula individual
    createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            animation: float ${Math.random() * 10 + 5}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
    
    // Configurar efeitos de scroll
    setupScrollEffects() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Parallax effect no header
            const header = document.querySelector('.header');
            if (header) {
                header.style.transform = `translateY(${scrollY * 0.5}px)`;
            }
            
            // Fade effect nos elementos
            document.querySelectorAll('.main-content > .container > *').forEach((el, index) => {
                const rect = el.getBoundingClientRect();
                const elementTop = rect.top;
                const elementVisible = elementTop < windowHeight - 100;
                
                if (elementVisible) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                } else {
                    el.style.opacity = '0.3';
                    el.style.transform = 'translateY(20px)';
                }
            });
            
            ticking = false;
        };
        
        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestScrollUpdate);
    }
    
    // Configurar efeitos dos botões
    setupButtonEffects() {
        document.querySelectorAll('.btn').forEach(btn => {
            // Efeito de ondulação
            btn.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                btn.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Adicionar CSS para animação de ripple
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .btn {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Adicionar efeito ripple
    addRippleEffect(e, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Adicionar efeito de hover
    addHoverEffect(element) {
        element.style.transform = 'translateY(-2px) scale(1.02)';
        element.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
    }
    
    // Remover efeito de hover
    removeHoverEffect(element) {
        element.style.transform = '';
        element.style.boxShadow = '';
    }
    
    // Tracking de cliques
    trackButtonClick(button) {
        const buttonText = button.textContent.trim();
        const timestamp = new Date().toISOString();
        
        // Log para analytics (pode ser integrado com Google Analytics, etc.)
        console.log(`Button clicked: ${buttonText} at ${timestamp}`);
        
        // Aqui você pode adicionar integração com ferramentas de analytics
        // gtag('event', 'click', {
        //     event_category: 'button',
        //     event_label: buttonText
        // });
    }
    
    // Handler de resize
    handleResize() {
        // Reajustar partículas se necessário
        if (CONFIG.animations.enableParticles) {
            const container = document.querySelector('.particles-container');
            if (container) {
                // Reposicionar partículas
                container.querySelectorAll('div').forEach(particle => {
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.top = Math.random() * 100 + '%';
                });
            }
        }
    }
    
    // Handler de scroll
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Efeito parallax no header
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
        
        // Mostrar/ocultar botão de voltar ao topo (se existir)
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            if (scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }
}

// Utilitários para personalização fácil
const LandingUtils = {
    // Atualizar texto de qualquer elemento
    updateText(elementId, newText) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = newText;
        }
    },
    
    // Atualizar link de qualquer botão
    updateLink(elementId, newLink) {
        const element = document.getElementById(elementId);
        if (element) {
            element.href = newLink;
        }
    },
    
    // Atualizar imagem do perfil
    updateProfileImage(newImageUrl) {
        const img = document.getElementById('profileImg');
        if (img) {
            img.src = newImageUrl;
        }
    },
    
    // Adicionar novo botão
    addButton(text, link, className = 'btn-primary') {
        const buttonsSection = document.querySelector('.buttons-section');
        if (buttonsSection) {
            const newButton = document.createElement('a');
            newButton.href = link;
            newButton.className = `btn ${className}`;
            newButton.textContent = text;
            buttonsSection.appendChild(newButton);
        }
    },
    
    // Alterar cores do tema
    updateTheme(colors) {
        const root = document.documentElement;
        Object.keys(colors).forEach(property => {
            root.style.setProperty(`--${property}`, colors[property]);
        });
    }
};

// Inicializar aplicação quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new TechDealsLanding();
});

// Expor utilitários globalmente para fácil personalização
window.LandingUtils = LandingUtils;
window.CONFIG = CONFIG;

// Adicionar CSS adicional para animações
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .animate-in {
        animation: slideInUp 0.8s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-decoration: none;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
    }
`;
document.head.appendChild(additionalStyles);

