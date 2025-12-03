document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.image-gallery');
    let galleryItems = document.querySelectorAll('.gallery-item');
    const bars = document.querySelectorAll('.bar');
    const captionElement = document.querySelector('.carousel-caption-titulo');
    const ctaButton = document.querySelector('.cta-button');
    
    // Verifica se estamos na página sobreNos (com barras de paginação)
    if (bars.length > 0) {
        // Para a página sobreNos, apenas atualiza os indicadores
        let currentIndex = 0;
        
        // Atualiza os indicadores de barras
        function updateBars(index) {
            bars.forEach((bar, i) => {
                if (i === index) {
                    bar.classList.add('active');
                } else {
                    bar.classList.remove('active');
                }
            });
        }
        
        // Adiciona evento de clique nas barras
        bars.forEach((bar, index) => {
            bar.addEventListener('click', () => {
                currentIndex = index;
                updateBars(currentIndex);
            });
        });
        
        // Inicializa com a primeira barra ativa
        updateBars(0);
        return; // Sai da função para não executar o código do carrossel
    }
    
    // Código original do carrossel para outras páginas
    const dots = document.querySelectorAll('.dot');
    
    // O carrossel real começa no item 1 devido aos clones.
    let currentIndex = 1; 

    // Clonar o primeiro e o último item para o loop infinito suave
    // A ordem de clonagem aqui é CRUCIAL para a lógica.
    const firstClone = galleryItems[0].cloneNode(true);
    const lastClone = galleryItems[galleryItems.length - 1].cloneNode(true);

    gallery.appendChild(firstClone); // O clone do primeiro vai para o final
    gallery.prepend(lastClone);    // O clone do último vai para o começo
    
    galleryItems = document.querySelectorAll('.gallery-item');
    
    // Definição das legendas e textos dos botões NA ORDEM CORRETA
    // 0: foto-4 (Homens conversando)
    // 1: foto-3 (Aperto de mãos)
    // 2: foto-2 (Médico escrevendo)
    const captions = [
        "Presença constante no pós-venda.", // Foto 4
        "Independência para atuar com diversas operadoras.", // Foto 3
        "Foco na prevenção e não apenas na emergência." // Foto 2 (Ajustado para corresponder às imagens de exemplo)
    ];
    
    const ctaTexts = [
        "Saiba mais", 
        "Saiba mais sobre a independência", 
        "Saiba mais"
    ];

    function updateCarousel(smoothTransition = true) {
        // A porcentagem de translação é a largura de UM ITEM: 100% / 3 itens visíveis
        const slidePercentage = 100 / 3; 
        
        gallery.style.transition = smoothTransition ? 'transform 0.5s ease-in-out' : 'none';
        
        // Aplica a translação. Move-se a quantidade de itens do currentIndex.
        gallery.style.transform = `translateX(${-currentIndex * slidePercentage}%)`;

        // O índice do dot é o índice real do item (0, 1, 2)
        // O (currentIndex - 1) corrige o índice por causa do clone inicial.
        const dotIndex = currentIndex - 1;

        if (dotIndex >= 0 && dotIndex < dots.length) {
            dots.forEach((dot, index) => {
                if (index === dotIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });

            updateCaption(dotIndex);
        }
    }

    function updateCaption(dotIndex) {
        if (dotIndex >= 0 && dotIndex < captions.length) {
            captionElement.textContent = captions[dotIndex];
            ctaButton.textContent = ctaTexts[dotIndex];
        }
    }

    // Lógica para o salto instantâneo no final do loop
    gallery.addEventListener('transitionend', () => {
        // Se estiver no clone do primeiro item (índice 4 = 3 + 1)
        if (currentIndex === galleryItems.length - 1) {
            currentIndex = 1;
            updateCarousel(false); // Salto instantâneo
        }
        // Se estiver no clone do último item (índice 0)
        else if (currentIndex === 0) {
            currentIndex = galleryItems.length - 2; // Índice 3
            updateCarousel(false); // Salto instantâneo
        }
    });


    // Adiciona o evento de clique aos indicadores (dots)
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Os dots 0, 1, 2 correspondem aos índices expandidos 1, 2, 3
            currentIndex = index + 1; 
            updateCarousel();
        });
    });

    // Inicia o carrossel no item real 1 (índice 1)
    updateCarousel(false); 
    updateCaption(0); // Garante que a legenda inicial corresponda ao primeiro item (dotIndex 0)
});

// Função para mover o carrossel de planos (se necessário no futuro)
function moveCarousel(direction) {
    // Esta função pode ser implementada se quiser adicionar funcionalidade de carrossel
    // Por enquanto, as setas são apenas visuais
    console.log('Carousel move:', direction);
}


function initializeNavbar() {
    // Seleciona o botão hamburguer e o menu mobile pelos seus IDs
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Verifica se os elementos existem para evitar erros
    if (!hamburgerBtn || !mobileMenu) {
        console.error("Erro: Elementos 'hamburger-btn' ou 'mobile-menu' não encontrados no DOM.");
        return;
    }

    // --- Lógica do Botão Hamburguer ---
    hamburgerBtn.addEventListener('click', function() {
        // 1. Alterna a classe 'active' para animar o X e mostrar/ocultar o menu
        hamburgerBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        // 2. Atualiza os atributos de acessibilidade (ARIA)
        const isExpanded = hamburgerBtn.classList.contains('active');
        hamburgerBtn.setAttribute('aria-expanded', isExpanded);

        // 3. Trava o scroll do corpo quando o menu estiver aberto
        document.body.style.overflow = isExpanded ? 'hidden' : 'auto';
    });

    // --- Lógica de Navegação Única (Para Links Dentro do Menu Mobile) ---
    // Você pode usar esta função se desejar remover o 'onclick' direto no HTML
    
    // Seleciona todos os botões/links dentro do menu mobile
    const menuLinks = mobileMenu.querySelectorAll('button'); 

    menuLinks.forEach(link => {
        // Garante que o link navegue para a URL definida no 'onclick' OU usa 'href'
        link.addEventListener('click', function(event) {
            
            // Simula o comportamento de navegação que estava no HTML
            // Note: Se você usou <button onclick="...">, isso é opcional, 
            // mas é melhor para a manutenção ter toda a lógica aqui.
            
            // Fecha o menu antes de navegar (melhora a UX)
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';

            // O código de navegação real (usando window.location.href)
            // deve ser mantido no seu HTML ou implementado aqui:
            // window.location.href = event.target.getAttribute('data-href') || event.target.value; 
        });
    });
    
    // --- Lógica para Mudar o Botão Ativo (Desktop e Mobile) ---
    // Fazendo isso no JS, você não precisa repetir a lógica de qual botão está ativo
    const allNavButtons = document.querySelectorAll('.navbar button, .mobile-menu button');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html'; // Obtém o nome do arquivo atual

    allNavButtons.forEach(button => {
        // Pega o destino do botão (usando 'onclick' ou 'data-href')
        const buttonDestination = button.getAttribute('onclick');
        
        if (buttonDestination && buttonDestination.includes(currentPath)) {
            // Se o destino do botão contém o nome da página atual, torna-o ativo
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeNavbar);