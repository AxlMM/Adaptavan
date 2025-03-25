document.addEventListener('DOMContentLoaded', function() {
    // Función para animar el slogan de escritura
    function animateSlogan() {
        const slogan = "Accesibilidad en cada kilómetro";
        const typingElement = document.getElementById('typing-slogan');
        
        if (!typingElement) return;
        
        // Resetear el contenido por si acaso
        typingElement.textContent = '';
        
        // Crear un array de caracteres del slogan
        const sloganChars = slogan.split('');
        let currentIndex = 0;
        
        // Usamos requestAnimationFrame para mejor rendimiento entre dispositivos
        function typeNextChar(timestamp) {
            // Solo añadir un carácter cada 100ms aproximadamente
            if (!typeNextChar.lastTimestamp || timestamp - typeNextChar.lastTimestamp > 100) {
                if (currentIndex < sloganChars.length) {
                    typingElement.textContent += sloganChars[currentIndex];
                    currentIndex++;
                    typeNextChar.lastTimestamp = timestamp;
                }
                
                if (currentIndex < sloganChars.length) {
                    requestAnimationFrame(typeNextChar);
                }
            } else {
                requestAnimationFrame(typeNextChar);
            }
        }
        
        // Iniciamos la animación después de un breve retraso
        setTimeout(function() {
            requestAnimationFrame(typeNextChar);
        }, 1000);
    }

    // Iniciar la animación del slogan
    animateSlogan();
    
    // Resto del código existente para animaciones de scroll...
    const introCard = document.getElementById('introCard');
    const parallaxBg = document.getElementById('parallaxBg');
    const parallaxSection = document.getElementById('parallaxSection');
    const firstSection = document.getElementById('firstSection');
    const statsHeader = document.getElementById('statsHeader');
    let lastScrollPosition = window.pageYOffset;
    
    // Función para animar contadores
    function animateCounter(elementId, targetNumber, prefix = '', suffix = '', duration = 2000) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        let startNumber = 0;
        let startTime = null;
        
        function updateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            
            const progress = Math.min((timestamp - startTime) / duration, 1);
            let currentNumber;
            
            if (elementId === "reviewsCounter") {
                currentNumber = Math.floor(progress * targetNumber);
                element.textContent = prefix + currentNumber.toLocaleString() + suffix;
            } else {
                currentNumber = Math.floor(progress * targetNumber);
                element.textContent = prefix + currentNumber + suffix;
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Establecer el valor final exacto
                if (elementId === "reviewsCounter") {
                    element.textContent = prefix + targetNumber.toLocaleString() + suffix;
                } else {
                    element.textContent = prefix + targetNumber + suffix;
                }
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Variable para rastrear si los contadores ya han sido animados
    let countersAnimated = false;
    
    function handleScroll() {
        const currentScrollPosition = window.pageYOffset;
        
        // Verificar si los elementos existen antes de acceder a sus propiedades
        const parallaxSectionPosition = parallaxSection ? parallaxSection.getBoundingClientRect().top : 0;
        const introCardPosition = introCard ? introCard.getBoundingClientRect().top : 0;
        const firstSectionPosition = firstSection ? firstSection.getBoundingClientRect().top : 0;
        const statsHeaderPosition = statsHeader ? statsHeader.getBoundingClientRect().top : 0;
        const screenHeight = window.innerHeight;
        
        // Determinar dirección del scroll
        const isScrollingDown = currentScrollPosition > lastScrollPosition;
        
        // Primera sección - aparecer/desaparecer
        if (firstSection) {
            if (isScrollingDown && firstSectionPosition < screenHeight * 0.7) {
                firstSection.classList.add('first-section-visible');
            } else if (!isScrollingDown && firstSectionPosition > screenHeight * 0.2) {
                firstSection.classList.remove('first-section-visible');
            }
        }
        
        // Segunda sección - aparecer/desaparecer
        if (parallaxSection) {
            if (isScrollingDown && parallaxSectionPosition < screenHeight) {
                parallaxSection.classList.add('section-visible');
            } else if (!isScrollingDown && parallaxSectionPosition > screenHeight * 0.3) {
                parallaxSection.classList.remove('section-visible');
            }
        }
        
        // Encabezado de estadísticas - aparecer/desaparecer
        if (statsHeader) {
            if (isScrollingDown && statsHeaderPosition < screenHeight * 0.8) {
                statsHeader.classList.add('stats-header-visible');
            } else if (!isScrollingDown && statsHeaderPosition > screenHeight * 0.4) {
                statsHeader.classList.remove('stats-header-visible');
            }
        }
        
        // Efecto parallax en la imagen de fondo (solo vertical)
        if (parallaxSection && parallaxBg) {
            const scrolled = window.pageYOffset;
            const sectionTop = parallaxSection.offsetTop;
            const sectionHeight = parallaxSection.offsetHeight;
            
            // Solo aplicar parallax cuando la sección está visible
            if (scrolled >= sectionTop - screenHeight && scrolled <= sectionTop + sectionHeight) {
                const relativeScroll = (scrolled - (sectionTop - screenHeight)) / (sectionHeight + screenHeight);
                parallaxBg.style.transform = `translateY(-${relativeScroll * 20}%)`;
            }
        }
        
        // Mostrar la tarjeta cuando bajamos y está dentro del viewport
        if (introCard) {
            if (isScrollingDown && introCardPosition < screenHeight * 0.8) {
                introCard.classList.add('intro-visible');
            } 
            // Ocultar la tarjeta cuando subimos y salimos del área visible
            else if (!isScrollingDown && introCardPosition > screenHeight * 0.5) {
                introCard.classList.remove('intro-visible');
            }
        }
        
        // Animación de contadores
        const statsContainer = document.querySelector('.stats-container');
        if (statsContainer) {
            const statsContainerPosition = statsContainer.getBoundingClientRect().top;
            
            // Verificar si los contadores están en el viewport y aún no han sido animados
            if (!countersAnimated && statsContainerPosition < screenHeight * 0.7) {
                animateCounter('clientCounter', 400, '', '+');
                animateCounter('yearsCounter', 6, '', '+');
                animateCounter('reviewsCounter', 1300, '', '+');
                countersAnimated = true;
            }
        }
        
        // Guardar la posición actual para la próxima comprobación
        lastScrollPosition = currentScrollPosition;
    }
    
    // Función para mostrar elementos inicialmente
    function showInitialContent() {
        // Mostrar primera sección
        if (firstSection) {
            firstSection.classList.add('first-section-visible');
        }
    }

    // Llamar a la función de mostrar contenido inicial
    showInitialContent();
    
    // Comprobar al cargar la página
    handleScroll();
    
    // Comprobar al hacer scroll
    window.addEventListener('scroll', handleScroll);
    
    // Configuración del menú móvil
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const closeMenuButton = document.getElementById('closeMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.add('open');
        });
    }
    
    if (closeMenuButton && mobileMenu) {
        closeMenuButton.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
        });
    }
});
