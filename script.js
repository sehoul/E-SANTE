document.addEventListener('DOMContentLoaded', () => {


    // Animation du bouton CTA
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', () => {
        document.querySelector('.appointment').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });

    // Animation au scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

    // Gestion du menu mobile
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.classList.add('mobile-menu-button');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        
        const mobileMenu = document.createElement('div');
        mobileMenu.classList.add('mobile-menu');
        
        // Copier les liens de navigation
        const navLinks = document.querySelector('.nav-links').cloneNode(true);
        mobileMenu.appendChild(navLinks);
        
        nav.appendChild(mobileMenuButton);
        document.body.appendChild(mobileMenu);
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenuButton.classList.toggle('active');
        });
    };

    // Créer le menu mobile si la largeur de l'écran est inférieure à 768px
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    // Gestion du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-button')) {
            createMobileMenu();
        }
    });

});

window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.style.display = 'none', 400);
  }
}); 

 // Header scroll effect
 const header = document.querySelector('header');
 window.addEventListener('scroll', () => {
     if (window.scrollY > 0) {
         header.classList.add('scrolled');
         document.querySelector('.logo-img').src = 'image/logoEsante.png';
         document.querySelector('.logo-text').style.background = 'var(--primary-color)';
         document.querySelector('.logo-text').style.webkitBackgroundClip = 'text';
         document.querySelector('.logo-text').style.webkitTextFillColor = 'transparent';
         // Change color of all navbar links
         document.querySelectorAll('nav a').forEach(link => {
             link.style.color = 'var(--text-color)';
         });
         
        } else {
            header.classList.remove('scrolled');
            document.querySelector('.logo-img').src = 'image/logoEsante_B.png';
            document.querySelector('.logo-text').style.background = 'var(--white)';
            document.querySelector('.logo-text').style.webkitBackgroundClip = 'text';
            document.querySelector('.logo-text').style.webkitTextFillColor = 'transparent';
            // Reset color of all navbar links
            document.querySelectorAll('nav a').forEach(link => {
                link.style.color = 'var(--white)';
            });
     }
 });

 document.addEventListener('DOMContentLoaded', function() {
    const vid1 = document.getElementById('vid1');
    const vid2 = document.getElementById('vid2');
    
    // Démarrer la première vidéo
    vid1.play();
    
    // Précharger la deuxième vidéo
    vid2.load();
    
    let isTransitioning = false;
    
    function handleVideoEnd(video) {
      if (isTransitioning) return;
      isTransitioning = true;
      
      const current = video.id === 'vid1' ? vid1 : vid2;
      const next = video.id === 'vid1' ? vid2 : vid1;
      
      // Préparer la transition
      next.currentTime = 0;
      next.play();
      
      // Effectuer la transition
      current.classList.remove('active');
      next.classList.add('active');
      
      // Réinitialiser après la transition
      setTimeout(() => {
        current.pause();
        isTransitioning = false;
      }, 1500);
    }
    
    vid1.addEventListener('ended', () => handleVideoEnd(vid1));
    vid2.addEventListener('ended', () => handleVideoEnd(vid2));
    
    // Système de fallback au cas où l'événement ended ne se déclenche pas
    function checkVideoProgress() {
      if (!isTransitioning) {
        if (vid1.classList.contains('active') && vid1.currentTime >= vid1.duration - 0.5) {
          handleVideoEnd(vid1);
        } else if (vid2.classList.contains('active') && vid2.currentTime >= vid2.duration - 0.5) {
          handleVideoEnd(vid2);
        }
      }
      requestAnimationFrame(checkVideoProgress);
    }
    
    checkVideoProgress();
  });