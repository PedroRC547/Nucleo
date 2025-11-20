document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.image-gallery');
    let galleryItems = document.querySelectorAll('.gallery-item');
    const bars = document.querySelectorAll('.bar');
    const captionElement = document.querySelector('.carousel-caption');
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