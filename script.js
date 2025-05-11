document.addEventListener('DOMContentLoaded', () => {
    // Animation du formulaire
    const form = document.getElementById('appointment-form');
    const inputs = form.querySelectorAll('input, select');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // Gestion du formulaire
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animation de soumission
        const submitButton = form.querySelector('.submit-button');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        
        // Simulation d'envoi (à remplacer par votre logique d'API)
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Rendez-vous confirmé !';
            submitButton.style.backgroundColor = '#4CAF50';
            
            // Réinitialisation du formulaire
            form.reset();
            
            // Retour à l'état initial après 3 secondes
            setTimeout(() => {
                submitButton.innerHTML = 'Confirmer le RDV';
                submitButton.style.backgroundColor = '';
            }, 3000);
        }, 2000);
    });

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

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}); 