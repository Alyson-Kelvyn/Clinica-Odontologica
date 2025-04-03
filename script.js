// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Form Submission with Validation
const appointmentForm = document.getElementById('appointment-form');

appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic form validation
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        procedure: document.getElementById('procedure').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value
    };

    // Validate required fields
    for (let field in formData) {
        if (!formData[field]) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Por favor, insira um email válido.');
        return;
    }

    // Validate phone format (Brazilian format)
    const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
    if (!phoneRegex.test(formData.phone)) {
        alert('Por favor, insira um número de telefone válido.');
        return;
    }

    // Here you would typically send the data to a server
    console.log('Appointment Data:', formData);
    alert('Agendamento recebido! Entraremos em contato em breve.');
    appointmentForm.reset();
});

// Animate Elements on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.procedure-card, .photo-item, .section-header').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Initialize current date for appointment form
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
}