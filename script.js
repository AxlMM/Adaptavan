document.addEventListener('DOMContentLoaded', function() {
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
        const parallaxSectionPosition = parallaxSection.getBoundingClientRect().top;
        const introCardPosition = introCard.getBoundingClientRect().top;
        const firstSectionPosition = firstSection.getBoundingClientRect().top;
        const statsHeaderPosition = statsHeader.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        
        // Determinar dirección del scroll
        const isScrollingDown = currentScrollPosition > lastScrollPosition;
        
        // Primera sección - aparecer/desaparecer
        if (isScrollingDown && firstSectionPosition < screenHeight * 0.7) {
            firstSection.classList.add('first-section-visible');
        } else if (!isScrollingDown && firstSectionPosition > screenHeight * 0.2) {
            firstSection.classList.remove('first-section-visible');
        }
        
        // Segunda sección - aparecer/desaparecer
        if (isScrollingDown && parallaxSectionPosition < screenHeight) {
            parallaxSection.classList.add('section-visible');
        } else if (!isScrollingDown && parallaxSectionPosition > screenHeight * 0.3) {
            parallaxSection.classList.remove('section-visible');
        }
        
        // Encabezado de estadísticas - aparecer/desaparecer
        if (isScrollingDown && statsHeaderPosition < screenHeight * 0.8) {
            statsHeader.classList.add('stats-header-visible');
        } else if (!isScrollingDown && statsHeaderPosition > screenHeight * 0.4) {
            statsHeader.classList.remove('stats-header-visible');
        }
        
        // Efecto parallax en la imagen de fondo (solo vertical)
        const scrolled = window.pageYOffset;
        const sectionTop = parallaxSection.offsetTop;
        const sectionHeight = parallaxSection.offsetHeight;
        
        // Solo aplicar parallax cuando la sección está visible
        if (scrolled >= sectionTop - screenHeight && scrolled <= sectionTop + sectionHeight) {
            const relativeScroll = (scrolled - (sectionTop - screenHeight)) / (sectionHeight + screenHeight);
            parallaxBg.style.transform = `translateY(-${relativeScroll * 20}%)`;
        }
        
        // Mostrar la tarjeta cuando bajamos y está dentro del viewport
        if (isScrollingDown && introCardPosition < screenHeight * 0.8) {
            introCard.classList.add('intro-visible');
        } 
        // Ocultar la tarjeta cuando subimos y salimos del área visible
        else if (!isScrollingDown && introCardPosition > screenHeight * 0.5) {
            introCard.classList.remove('intro-visible');
        }
        
        // Animación de contadores
        const statsContainer = document.querySelector('.stats-container');
        const statsContainerPosition = statsContainer.getBoundingClientRect().top;
        
        // Verificar si los contadores están en el viewport y aún no han sido animados
        if (!countersAnimated && statsContainerPosition < screenHeight * 0.7) {
            animateCounter('clientCounter', 400, '', '+');
            animateCounter('yearsCounter', 6, '', '+');
            animateCounter('reviewsCounter', 1300, '', '+');
            countersAnimated = true;
        }
        
        // Guardar la posición actual para la próxima comprobación
        lastScrollPosition = currentScrollPosition;
    }
    
    // Comprobar al cargar la página
    handleScroll();
    
    // Comprobar al hacer scroll
    window.addEventListener('scroll', handleScroll);
});
document.addEventListener('DOMContentLoaded', function() {
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

    // Función para mostrar elementos inicialmente
    function showInitialContent() {
        // Mostrar primera sección
        const firstSection = document.querySelector('.first-section');
        if (firstSection) {
            firstSection.classList.add('first-section-visible');
        }

        // Animar contadores
        animateCounter('clientCounter', 400, '', '+');
        animateCounter('yearsCounter', 6, '', '+');
        animateCounter('reviewsCounter', 1300, '', '+');
    }

    // Llamar a la función de mostrar contenido inicial
    showInitialContent();

    // Función de scroll original
    function handleScroll() {
        const firstSection = document.querySelector('.first-section');
        const statsContainer = document.querySelector('.stats-container');
        
        if (!firstSection || !statsContainer) return;

        const firstSectionPosition = firstSection.getBoundingClientRect().top;
        const statsContainerPosition = statsContainer.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        
        // Lógica de scroll original (mantenida)
    }

    // Evento de scroll
    window.addEventListener('scroll', handleScroll);

    // Forzar un pequeño desplazamiento para activar las animaciones
    function forceInitialScroll() {
        window.scrollBy(0, 1);
        setTimeout(() => {
            window.scrollBy(0, -1);
        }, 50);
    }

    // Llamar a forzar desplazamiento después de un breve retraso
    setTimeout(forceInitialScroll, 100);
});
document.addEventListener('DOMContentLoaded', function() {
    const slogan = "Accesibilidad en cada kilómetro";
    const typingElement = document.getElementById('typing-slogan');
    let index = 0;

    function typeSlogan() {
        if (index < slogan.length) {
            typingElement.innerHTML += slogan.charAt(index);
            index++;
            setTimeout(typeSlogan, 100); // Velocidad de escritura
        }
    }

    // Comenzar animación después de un breve retraso
    setTimeout(typeSlogan, 1000);
});