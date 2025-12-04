document.addEventListener('DOMContentLoaded', () => {

    const gallery = document.querySelector('.image-gallery');
    let galleryItems = document.querySelectorAll('.gallery-item');
    const bars = document.querySelectorAll('.bar');
    const captionElement = document.querySelector('.carousel-caption-titulo');
    const ctaButton = document.querySelector('.cta-button');
    
    if (bars.length > 0) {
  
        let currentIndex = 0;
        
        function updateBars(index) {
            bars.forEach((bar, i) => {
                if (i === index) {
                    bar.classList.add('active');
                } else {
                    bar.classList.remove('active');
                }
            });
        }
        

        bars.forEach((bar, index) => {
            bar.addEventListener('click', () => {
                currentIndex = index;
                updateBars(currentIndex);
            });
        });
        

        updateBars(0);
        return; 
    }
    
    if (!gallery || galleryItems.length === 0) {
        console.warn("Nenhum item de galeria encontrado. O carrossel não será inicializado.");

    } else {

        const dots = document.querySelectorAll('.dot');
        
  
        let currentIndex = 1; 


        const firstClone = galleryItems[0].cloneNode(true);
        const lastClone = galleryItems[galleryItems.length - 1].cloneNode(true);

        gallery.appendChild(firstClone); 
        gallery.prepend(lastClone);      
        
        galleryItems = document.querySelectorAll('.gallery-item');
        
        const captions = [
            "Presença constante no pós-venda.", 
            "Independência para atuar com diversas operadoras.", 
            "Foco na prevenção e não apenas na emergência." 
        ];
        
        const ctaTexts = [
            "Saiba mais", 
            "Saiba mais sobre a independência", 
            "Saiba mais"
        ];

        function updateCarousel(smoothTransition = true) {
       
            const slidePercentage = 100 / 3; 
            
            gallery.style.transition = smoothTransition ? 'transform 0.5s ease-in-out' : 'none';
            
       
            gallery.style.transform = `translateX(${-currentIndex * slidePercentage}%)`;


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


        gallery.addEventListener('transitionend', () => {
           
            if (currentIndex === galleryItems.length - 1) {
                currentIndex = 1;
                updateCarousel(false); 
            }
          
            else if (currentIndex === 0) {
                currentIndex = galleryItems.length - 2; 
                updateCarousel(false); 
            }
        });



        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
            
                currentIndex = index + 1; 
                updateCarousel();
            });
        });

        updateCarousel(false); 
        updateCaption(0); 
    } 
});

// Função para mover o carrossel de planos (se necessário no futuro)
function moveCarousel(direction) {

    console.log('Carousel move:', direction);
}


function initializeNavbar() {
    
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Verifica se os elementos existem para evitar erros
    if (!hamburgerBtn || !mobileMenu) {
        console.error("Erro: Elementos 'hamburger-btn' ou 'mobile-menu' não encontrados no DOM.");
       
    } else {
     
        hamburgerBtn.addEventListener('click', function() {
            
            hamburgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');

          
            const isExpanded = hamburgerBtn.classList.contains('active');
            hamburgerBtn.setAttribute('aria-expanded', isExpanded);

            document.body.style.overflow = isExpanded ? 'hidden' : 'auto';
        });

     
        const menuLinks = mobileMenu.querySelectorAll('button'); 

        menuLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                
                hamburgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';

            });
        });
    }

 
    const allNavButtons = document.querySelectorAll('.navbar button, .mobile-menu button');
    

    const currentPath = window.location.pathname.split('/').pop() || 'index.html'; 

    allNavButtons.forEach(button => {
        const buttonDestination = button.getAttribute('onclick');
        
        if (buttonDestination) {
    
            const match = buttonDestination.match(/['"]([^'"]+\.html)['"]/);
            
            if (match && match[1] === currentPath) { 
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeNavbar);