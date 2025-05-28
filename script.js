// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Ativar link ativo na navegação
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Botão voltar ao topo
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Contador animado
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    stat.textContent = target.toLocaleString();
                } else {
                    stat.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        });
    }
    
    // Observador de interseção para animações
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('hero-stats')) {
                    animateCounters();
                }
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.hero-stats, .tech-card, .situation-card, .alert-card').forEach(el => {
        observer.observe(el);
    });
    
    // Filtro de categorias
    const filterButtons = document.querySelectorAll('.filter-btn');
    const situationCards = document.querySelectorAll('.situation-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar active ao botão clicado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            situationCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Tabs de tecnologia
    const techTabButtons = document.querySelectorAll('.tab-btn');
    const techTabContents = document.querySelectorAll('.tab-content');
    
    techTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover active de todos os botões e conteúdos
            techTabButtons.forEach(btn => btn.classList.remove('active'));
            techTabContents.forEach(content => content.classList.remove('active'));
            
            // Adicionar active ao botão clicado
            this.classList.add('active');
            
            // Mostrar o conteúdo correspondente
            const tabId = this.getAttribute('data-tab');
            document.querySelector(`.tab-content[data-tab="${tabId}"]`).classList.add('active');
        });
    });
    
    // Tabs de doação
    const donationTabButtons = document.querySelectorAll('.donation-tab-btn');
    const donationTabContents = document.querySelectorAll('.donation-tab-content');
    
    donationTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover active de todos os botões e conteúdos
            donationTabButtons.forEach(btn => btn.classList.remove('active'));
            donationTabContents.forEach(content => content.classList.remove('active'));
            
            // Adicionar active ao botão clicado
            this.classList.add('active');
            
            // Mostrar o conteúdo correspondente
            const tabId = this.getAttribute('data-tab');
            document.querySelector(`.donation-tab-content[data-tab="${tabId}"]`).classList.add('active');
        });
    });
    
    // Accordion FAQ
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            
            // Fechar todos os outros itens
            document.querySelectorAll('.accordion-item').forEach(el => {
                if (el !== item) {
                    el.classList.remove('active');
                }
            });
            
            // Alternar o item clicado
            item.classList.toggle('active');
        });
    });
    
    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação simples
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // Simular envio
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        });
    }
    
    // Formulário de newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                alert('Por favor, insira seu e-mail.');
                return;
            }
            
            // Simular cadastro
            alert('Obrigado por se cadastrar! Você receberá nossos alertas por e-mail.');
            this.reset();
        });
    }
    
    // Botão de receber alertas
    const receiveAlertsBtn = document.getElementById('receber-alertas');
    
    if (receiveAlertsBtn) {
        receiveAlertsBtn.addEventListener('click', function() {
            alert('Para receber alertas via SMS, envie "ALERTA SP" para 40199');
        });
    }
});