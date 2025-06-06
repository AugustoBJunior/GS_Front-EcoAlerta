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

    // Botão de SMS
    const smsBtn = document.getElementById('sms-btn');
    if (smsBtn) {
        smsBtn.addEventListener('click', function() {
            alert('Cadastro realizado com sucesso! Você irá receber alertas via SMS.');
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

    //monitoramento
document.querySelectorAll('.botao-risco-dark, .botao-monitorado-dark, .botao-seguro-dark').forEach(botao => {
    botao.addEventListener('click', function() {
        const mensagem = this.getAttribute('data-alerta');
        mostrarAlertaDark(mensagem);
    });
});

function mostrarAlertaDark(mensagem) {
    const alerta = document.createElement('div');
    alerta.className = 'alerta-dark';
    alerta.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${mensagem}</span>
    `;
    
    document.body.appendChild(alerta);
    
    setTimeout(() => {
        alerta.classList.add('visible');
    }, 10);
    
    setTimeout(() => {
        alerta.classList.remove('visible');
        setTimeout(() => {
            alerta.remove();
        }, 300);
    }, 2500);
}

function mostrarAlerta(mensagem) {
    const alerta = document.createElement('div');
    alerta.className = 'alerta-estetico';
    alerta.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${mensagem}</span>
    `;
    
    document.body.appendChild(alerta);
    
    setTimeout(() => {
        alerta.classList.add('visible');
    }, 10);
    
    setTimeout(() => {
        alerta.classList.remove('visible');
        setTimeout(() => {
            alerta.remove();
        }, 300);
    }, 3000);
}

document.querySelectorAll('.botao-mapa').forEach(botao => {
    botao.addEventListener('click', function() {
        const mensagem = this.getAttribute('data-alerta');
        mostrarAlerta(mensagem);
        
        // Destaque visual do botão clicado
        document.querySelectorAll('.botao-mapa').forEach(btn => {
            btn.style.background = 'rgba(30, 41, 59, 0.8)';
        });
        
        if (this.classList.contains('botao-risco')) {
            this.style.background = 'rgba(220, 38, 38, 0.8)';
        } else if (this.classList.contains('botao-monitorar')) {
            this.style.background = 'rgba(234, 179, 8, 0.8)';
        } else if (this.classList.contains('botao-seguro')) {
            this.style.background = 'rgba(34, 197, 94, 0.8)';
        }
    });
});

// Interação com o mapa
document.querySelectorAll('.area-risco, .area-monitorada, .area-segura').forEach(area => {
    area.addEventListener('click', function() {
        const info = this.getAttribute('data-info');
        mostrarAlerta(info);
    });
});

function mostrarAlerta(mensagem) {
    const alerta = document.createElement('div');
    alerta.className = 'alerta-estetico';
    alerta.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${mensagem}</span>
    `;
    
    document.body.appendChild(alerta);
    
    setTimeout(() => {
        alerta.classList.add('visible');
    }, 10);
    
    setTimeout(() => {
        alerta.classList.remove('visible');
        setTimeout(() => {
            alerta.remove();
        }, 300);
    }, 3000);
}

// Simulação de atualização de dados no tempo real
function atualizarDados() {
    const valores = {
        temperatura: Math.floor(Math.random() * 5) + 20,
        chuva: Math.floor(Math.random() * 20) + 70,
        rio: (Math.random() * 0.5 + 2.5).toFixed(1),
        alertas: Math.floor(Math.random() * 3) + 10
    };
    
    document.querySelector('.dado-item:nth-child(1) .dado-valor').textContent = `${valores.temperatura}°C`;
    document.querySelector('.dado-item:nth-child(2) .dado-valor').textContent = `${valores.chuva}mm`;
    document.querySelector('.dado-item:nth-child(3) .dado-valor').textContent = `${valores.rio}m`;
    document.querySelector('.dado-item:nth-child(4) .dado-valor').textContent = valores.alertas;
}

// ha cada 5seg atualiza
setInterval(atualizarDados, 5000);
atualizarDados(); // Inicializa os dados


    
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

    // Modal de Doação
const donationModal = document.getElementById('donationModal');
const donateButtons = document.querySelectorAll('.btn-donate, .btn-custom-donate');
const closeModal = document.querySelector('.close-modal');
const btnModal = document.querySelector('.btn-modal');

// Função para mostrar o modal
function showDonationModal() {
    donationModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Previne scroll quando o modal está aberto
}

// Função para esconder o modal
function hideDonationModal() {
    donationModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaura o scroll
}

// Adiciona evento de clique a todos os botões de doação
donateButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        showDonationModal();
    });
});

// Fecha o modal quando clicar no X
closeModal.addEventListener('click', hideDonationModal);

// Fecha o modal quando clicar no botão "Entendido"
btnModal.addEventListener('click', hideDonationModal);

// Fecha o modal quando clicar fora do conteúdo
donationModal.addEventListener('click', function(e) {
    if (e.target === donationModal) {
        hideDonationModal();
    }
});

    
    
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
