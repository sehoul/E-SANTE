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

// Script to handle the appointment popup
document.addEventListener('DOMContentLoaded', function() {
  // Popup elements
  const openPopupButtons = document.querySelectorAll('.cta');
  const popupOverlay = document.querySelector('.popup-overlay');
  const closePopupButton = document.querySelector('.close-popup');

  // Calendar elements
  const currentMonthElement = document.querySelector('.current-month');
  const calendarGridElement = document.querySelector('.calendar-grid');
  const prevMonthButton = document.querySelector('.prev-month');
  const nextMonthButton = document.querySelector('.next-month');

  // Time slot elements
  const selectedDatetimeElement = document.querySelector('.selected-datetime');
  const timeSlotsElement = document.querySelector('.time-slots');

  // Form elements
  const specialtySelect = document.getElementById('specialty');
  const doctorSelect = document.getElementById('doctor');

  // New: Today button element
  const todayButton = document.querySelector('.today-button');

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let selectedDate = null;
  let selectedTime = null;

  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  // Data for specialties and doctors provided by the user
  const medicalData = [
    {
      "specialite": "Cardiologie",
      "docteurs": [
        "Dr. Ahmed Benani",
        "Dr. Leila El Fassi",
        "Dr. Youssef Cherkaoui"
      ]
    },
    {
      "specialite": "Dermatologie",
      "docteurs": [
        "Dr. Samira Bennis",
        "Dr. Karim Belhaj"
      ]
    },
    {
      "specialite": "Pédiatrie",
      "docteurs": [
        "Dr. Fatima Zahra Akka",
        "Dr. Hassan El Moutawakil",
        "Dr. Amina Berrada"
      ]
    },
    {
      "specialite": "Chirurgie Orthopédique",
      "docteurs": [
        "Dr. Omar El Khatib",
        "Dr. Nadia Zemmama"
      ]
    },
  ];

  // Recreate specialties and doctors arrays in the old structure
  const specialties = medicalData.map(item => ({
      value: item.specialite.toLowerCase().replace(/\s+/g, ''), // Create a simple value
      text: item.specialite
  }));

  let doctorIdCounter = 1;
  const doctors = medicalData.flatMap(item =>
      item.docteurs.map(doctorName => ({
          id: doctorIdCounter++,
          name: doctorName,
          specialties: [item.specialite.toLowerCase().replace(/\s+/g, '')] // Associate with specialty value
      }))
  );

  // Generate time slots from 7:00 AM to 8:00 PM (20:00) with 30-minute interval
  const timeSlots = [];
  const startTime = 7 * 60; // 7:00 AM in minutes
  const endTime = 20 * 60; // 8:00 PM (20:00) in minutes
  const interval = 30; // 30 minutes interval

  for (let i = startTime; i <= endTime; i += interval) {
    const hours = Math.floor(i / 60);
    const minutes = i % 60;
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM/PM
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const timeString = `${formattedHours}:${formattedMinutes}${ampm}`;
    timeSlots.push(timeString);
  }

  // Function to render the calendar
  function renderCalendar(month, year) {
    calendarGridElement.innerHTML = ''; // Clear previous days

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Adjust to make Monday the first day

    currentMonthElement.textContent = `${monthNames[month]} ${year}`;

    // Add empty days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      const emptyDay = document.createElement('div');
      calendarGridElement.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('calendar-day');
      dayElement.textContent = day;
      dayElement.dataset.day = day;

      const today = new Date();
      if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
        dayElement.classList.add('today');
      }

      // Simple check for past days (can be made more sophisticated)
      const currentDay = new Date(year, month, day);
      if (currentDay < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
          dayElement.classList.add('disabled');
          dayElement.style.pointerEvents = 'none'; // Disable clicks
      } else {
           dayElement.addEventListener('click', handleDateSelect);
      }

      calendarGridElement.appendChild(dayElement);
    }
  }

  // Function to handle date selection
  function handleDateSelect(event) {
    const previouslySelected = calendarGridElement.querySelector('.calendar-day.selected');
    if (previouslySelected) {
      previouslySelected.classList.remove('selected');
    }

    const selectedDayElement = event.target;
    selectedDayElement.classList.add('selected');
    selectedDate = new Date(currentYear, currentMonth, parseInt(selectedDayElement.dataset.day));

    updateSelectedDatetimeDisplay();
    renderTimeSlots();
  }

  // Function to render time slots
  function renderTimeSlots() {
      timeSlotsElement.innerHTML = ''; // Clear previous time slots

      if (!selectedDate) {
          timeSlotsElement.innerHTML = '<p>Sélectionnez une date pour voir les créneaux horaires disponibles.</p>';
          return;
      }

      // In a real application, you would fetch available time slots based on selectedDate, specialty, and doctor
      // For now, we use dummy data and mark some as unavailable
      const today = new Date();
      const isSelectedDateToday = selectedDate.getFullYear() === today.getFullYear() &&
                                  selectedDate.getMonth() === today.getMonth() &&
                                  selectedDate.getDate() === today.getDate();

      timeSlots.forEach(slot => {
          const timeSlotElement = document.createElement('div');
          timeSlotElement.classList.add('time-slot');
          timeSlotElement.textContent = slot;
          timeSlotElement.dataset.time = slot;

          // Simple logic to mark some slots as unavailable (for demonstration)
          if (isSelectedDateToday && (slot === '12:00pm' || slot === '12:30pm' || slot === '01:00pm')) {
              timeSlotElement.classList.add('unavailable');
              timeSlotElement.innerHTML = `${slot} <span>Indisponible</span>`;
          } else {
               timeSlotElement.addEventListener('click', handleTimeSelect);
          }

          timeSlotsElement.appendChild(timeSlotElement);
      });
  }

  // Function to handle time slot selection
  function handleTimeSelect(event) {
      const previouslySelected = timeSlotsElement.querySelector('.time-slot.selected');
      if (previouslySelected) {
          previouslySelected.classList.remove('selected');
          // Remove the 'Choose Time' button from the previously selected slot
          const previousButton = previouslySelected.querySelector('.choose-time-btn');
          if (previousButton) {
              previousButton.remove();
          }
      }

      const selectedTimeSlotElement = event.target;
      selectedTimeSlotElement.classList.add('selected');
      selectedTime = selectedTimeSlotElement.dataset.time;

      // Add 'Choose Time' button
      const chooseTimeButton = document.createElement('button');
      chooseTimeButton.classList.add('choose-time-btn');
      chooseTimeButton.innerHTML = '<i class="bi bi-check-lg"></i>';
      // In a real application, this button would trigger confirmation or form submission
      // chooseTimeButton.addEventListener('click', handleBookingConfirmation);

      selectedTimeSlotElement.appendChild(chooseTimeButton);

      updateSelectedDatetimeDisplay();
  }

  // Function to update the selected date and time display
  function updateSelectedDatetimeDisplay() {
      if (selectedDate && selectedTime) {
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          const formattedDate = selectedDate.toLocaleDateString('fr-FR', options);
          selectedDatetimeElement.textContent = `${formattedDate} ${selectedTime}`;
      } else if (selectedDate) {
           const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
           const formattedDate = selectedDate.toLocaleDateString('fr-FR', options);
           selectedDatetimeElement.textContent = `${formattedDate}`;
      } else {
          selectedDatetimeElement.textContent = 'Sélectionnez une date et une heure';
      }
  }

  // Function to populate the specialty dropdown
  function populateSpecialties() {
    specialties.forEach(specialty => {
      const option = document.createElement('option');
      option.value = specialty.value;
      option.textContent = specialty.text;
      specialtySelect.appendChild(option);
    });
  }

  // Function to update the doctor dropdown based on selected specialty
  function updateDoctors() {
    doctorSelect.innerHTML = '<option value="">-- Sélectionner un docteur --</option>'; // Clear previous options
    doctorSelect.disabled = true; // Disable by default

    const selectedSpecialtyValue = specialtySelect.value;

    if (selectedSpecialtyValue) {
      const filteredDoctors = doctors.filter(doctor =>
        doctor.specialties.includes(selectedSpecialtyValue)
      );

      if (filteredDoctors.length > 0) {
          filteredDoctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.id;
            option.textContent = doctor.name;
            doctorSelect.appendChild(option);
          });
          doctorSelect.disabled = false;
      } else {
           const option = document.createElement('option');
           option.value = "";
           option.textContent = 'Aucun docteur disponible pour cette spécialité';
           doctorSelect.appendChild(option);
      }
    }
  }

  // Event listeners for month navigation
  prevMonthButton.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
  });

  nextMonthButton.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
  });

  // Event listener for specialty dropdown change
  specialtySelect.addEventListener('change', updateDoctors);

  // New: Event listener for Today button
  todayButton.addEventListener('click', () => {
    const today = new Date();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    renderCalendar(currentMonth, currentYear);
    // Optionally reset selected date and time when going to today
    selectedDate = null;
    selectedTime = null;
    updateSelectedDatetimeDisplay();
    renderTimeSlots();
  });

  // Initial render and population
  renderCalendar(currentMonth, currentYear);
  populateSpecialties();
  renderTimeSlots(); // Render initial time slots display


  // Function to open the popup
  function openPopup() {
    popupOverlay.style.display = 'flex';
  }

  // Function to close the popup
  function closePopup() {
    popupOverlay.style.display = 'none';
  }

  // Add click event listeners to all 'cta' buttons to open the popup
  openPopupButtons.forEach(button => {
    button.addEventListener('click', openPopup);
  });

  // Add click event listener to the close button
  closePopupButton.addEventListener('click', closePopup);

  // Add click event listener to the overlay to close the popup when clicking outside the content
  popupOverlay.addEventListener('click', function(event) {
    if (event.target === popupOverlay) {
      closePopup();
    }
  });
});

// Add smooth scrolling to navigation links
document.querySelectorAll('header nav ul li a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
  