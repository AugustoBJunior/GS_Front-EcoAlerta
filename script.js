// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
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
    }
    
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
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
    
    if (sections.length && navItems.length) {
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
    }
    
    // Botão voltar ao topo
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
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
    }
    
    // Modal SOS
    const sosButton = document.getElementById('sos-button');
    const sosModal = document.getElementById('sos-modal');
    const sosOptions = document.querySelectorAll('.sos-option');
    const confirmSos = document.getElementById('confirm-sos');
    const cancelSos = document.getElementById('cancel-sos');
    
    if (sosButton && sosModal) {
        sosButton.addEventListener('click', () => {
            sosModal.style.display = 'block';
            
            // Atualizar localização
            const userLocation = document.getElementById('user-location');
            if (userLocation) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(position => {
                        userLocation.textContent = 
                            `Lat: ${position.coords.latitude.toFixed(4)}, Long: ${position.coords.longitude.toFixed(4)}`;
                    }, error => {
                        userLocation.textContent = 'Não foi possível obter a localização';
                    });
                } else {
                    userLocation.textContent = 'Geolocalização não suportada';
                }
            }
        });
        
        // Configurar os botões de opção de emergência
        sosOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Esconde as opções e mostra a confirmação
                document.querySelector('.emergency-options').style.display = 'none';
                document.querySelector('.sos-confirm').style.display = 'block';
            });
        });
        
        if (cancelSos) {
            cancelSos.addEventListener('click', () => {
                // Ao cancelar, volta a mostrar as opções e esconde a confirmação
                document.querySelector('.emergency-options').style.display = 'grid';
                document.querySelector('.sos-confirm').style.display = 'none';
            });
        }
        
        if (confirmSos) {
            confirmSos.addEventListener('click', () => {
                alert('Emergência acionada! A ajuda está a caminho.');
                sosModal.style.display = 'none';
                // Ao confirmar, reseta o modal para o estado inicial
                document.querySelector('.emergency-options').style.display = 'grid';
                document.querySelector('.sos-confirm').style.display = 'none';
            });
        }
        
        // Fechar modal ao clicar fora
        window.addEventListener('click', (e) => {
            if (e.target === sosModal) {
                sosModal.style.display = 'none';
                // Reseta o modal para o estado inicial
                document.querySelector('.emergency-options').style.display = 'grid';
                document.querySelector('.sos-confirm').style.display = 'none';
            }
        });
    }
    
    // Modal de cadastro de pontos
    const registerModalButton = document.getElementById('open-register-modal');
    const registerModal = document.getElementById('register-modal');
    const closeRegisterModal = document.querySelector('#register-modal .close-modal');
    
    if (registerModalButton && registerModal) {
        registerModalButton.addEventListener('click', () => {
            registerModal.style.display = 'block';
        });
        
        closeRegisterModal.addEventListener('click', () => {
            registerModal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === registerModal) {
                registerModal.style.display = 'none';
            }
        });
    }
    
    // Tabs de tecnologia
    const techTabButtons = document.querySelectorAll('.tech-tabs .tab-btn');
    const techTabContents = document.querySelectorAll('.tech-tabs .tab-content');
    
    if (techTabButtons.length && techTabContents.length) {
        techTabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover active de todos
                techTabButtons.forEach(btn => btn.classList.remove('active'));
                techTabContents.forEach(content => content.classList.remove('active'));
                
                // Adicionar active ao clicado
                this.classList.add('active');
                
                // Mostrar conteúdo correspondente
                const tabId = this.getAttribute('data-tab');
                document.querySelector(`.tab-content[data-tab="${tabId}"]`).classList.add('active');
            });
        });
    }
    
    // Tabs de doação
    const donationTabButtons = document.querySelectorAll('.donation-tab-btn');
    const donationTabContents = document.querySelectorAll('.donation-tab-content');

    if (donationTabButtons.length && donationTabContents.length) {
        donationTabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active de todos os botões
                donationTabButtons.forEach(btn => btn.classList.remove('active'));
                // Remove active de todos os conteúdos
                donationTabContents.forEach(content => content.classList.remove('active'));

                // Adiciona active ao botão clicado
                this.classList.add('active');

                // Mostra o conteúdo correspondente
                const tabId = this.getAttribute('data-tab');
                const tabContent = document.querySelector(`.donation-tab-content[data-tab="${tabId}"]`);
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            });
        });
    }
    
    // Accordion FAQ
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    if (accordionHeaders.length) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const item = this.parentElement;
                
                // Fechar todos os outros
                document.querySelectorAll('.accordion-item').forEach(el => {
                    if (el !== item) el.classList.remove('active');
                });
                
                // Alternar item clicado
                item.classList.toggle('active');
            });
        });
    }
    
    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
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
    
    // Botão de voz no mapa
    const voiceBtn = document.getElementById('voice-search');
    if (voiceBtn) {
        voiceBtn.addEventListener('click', function() {
            if ('webkitSpeechRecognition' in window) {
                const recognition = new webkitSpeechRecognition();
                recognition.lang = 'pt-BR';
                recognition.start();
                
                recognition.onresult = function(event) {
                    const command = event.results[0][0].transcript.toLowerCase();
                    alert(`Comando de voz reconhecido: "${command}"`);
                    // Aqui você implementaria as ações
                };
                
                recognition.onerror = function(event) {
                    alert('Erro no reconhecimento de voz: ' + event.error);
                };
            } else {
                alert('Seu navegador não suporta reconhecimento de voz.');
            }
        });
    }
    
    // Botão de download offline
    const offlineBtn = document.getElementById('download-offline');
    if (offlineBtn) {
        offlineBtn.addEventListener('click', function() {
            alert('Dados essenciais foram salvos para acesso offline!');
        });
    }
    
    // Botões de emergência
    document.querySelectorAll('.btn-emergency').forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            alert(`Recursos de ${type} acionados! Verifique o mapa.`);
        });
    });
});

// Função de inicialização do mapa
function initMap() {
    // Verifica se o elemento do mapa existe
    if (!document.getElementById('map')) return;
    
    const saoPaulo = { lat: -23.5505, lng: -46.6333 };
    
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: saoPaulo,
        styles: [
            { featureType: "poi", stylers: [{ visibility: "off" }] },
            { featureType: "transit", elementType: "labels.icon", stylers: [{ visibility: "off" }] }
        ]
    });
    
    // Adicionar marcadores de exemplo
    const locations = [
        { position: { lat: -23.5505, lng: -46.6333 }, title: "Hospital das Clínicas", type: "health" },
        { position: { lat: -23.5605, lng: -46.6433 }, title: "Delegacia da Sé", type: "safety" },
        { position: { lat: -23.5405, lng: -46.6233 }, title: "Abrigo Central", type: "shelter" },
        { position: { lat: -23.5705, lng: -46.6533 }, title: "Banco de Alimentos", type: "food" }
    ];
    
    const icons = {
        health: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        safety: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        shelter: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
        food: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    };
    
    locations.forEach(location => {
        new google.maps.Marker({
            position: location.position,
            map: map,
            title: location.title,
            icon: icons[location.type]
        });
    });
    
    // Função para filtrar marcadores
    window.updateMapFilters = function() {
        const locationType = document.getElementById('location-type').value;
        alert(`Filtro aplicado: ${locationType}`);
        // Implementaria a lógica de filtragem aqui
    };
}

// Tratamento de erro do Google Maps
window.gm_authFailure = function() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.innerHTML = '<div class="map-error">Erro ao carregar o mapa. Recarregue a página.</div>';
    }
};