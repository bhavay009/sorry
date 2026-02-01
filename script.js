document.addEventListener('DOMContentLoaded', () => {
    // Generate Floating Background Particles
    function createParticles() {
        const container = document.querySelector('.background-animation');
        const particleCount = 12; // Reduced for performance
        const symbols = ['❤', '✨', '🌸', '💫'];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('floating-particle');
            particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

            // Random properties
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = Math.random() * 10 + 10 + 's'; // 10-20s
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.fontSize = Math.random() * 1.5 + 1 + 'rem';
            particle.style.color = `rgba(216, 112, 147, ${Math.random() * 0.3 + 0.1})`;

            container.appendChild(particle);
        }
    }
    createParticles();

    // Login Logic
    const loginScreen = document.getElementById('login-screen');
    const loginInput = document.getElementById('login-input');
    const loginBtn = document.getElementById('login-btn');
    const errorMsg = document.getElementById('error-msg');
    const mainContent = document.getElementById('main-content');

    function checkLogin() {
        const name = loginInput.value.trim().toLowerCase();
        if (name === 'ishu') {
            // Success
            loginScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            // Trigger initial scroll animations because they might have been missed if main content was hidden
            setTimeout(() => {
                document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
            }, 500);
        } else {
            // Error
            errorMsg.classList.remove('hidden');
            loginInput.classList.add('shake');
            setTimeout(() => loginInput.classList.remove('shake'), 500);
        }
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', checkLogin);
        loginInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkLogin();
        });
    }

    // Scroll Observer for Fade-in effects
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // If the target is the message section, trigger typewriter
                if (entry.target.id === 'message-section' && !entry.target.classList.contains('typed')) {
                    startTypewriter();
                    entry.target.classList.add('typed');
                }
            }
        });
    }, observerOptions);

    // Observe all scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    // Observe sections to trigger typewriter
    const messageSection = document.getElementById('message-section');
    if (messageSection) observer.observe(messageSection);


    // Typewriter Effect
    const textToType = "Hey my love, my baby 💕\nI know I hurt you, and that breaks my heart more than anything. I’m really, really sorry, my jaan. I never wanted to make you sad or feel unloved, not even for a second. You mean the whole world to me, and sometimes my silly mistakes forget how precious you are. Please know this little heart of mine only beats for you. I promise to listen better, love you harder, and protect your smile like it’s my favorite thing ever. Come here, baby… let me make things right and hold you close again 🤍🫂";
    const typeWriterElement = document.getElementById('typewriter-text');

    function startTypewriter() {
        let i = 0;
        typeWriterElement.innerHTML = ""; // Clear existing text
        function type() {
            if (i < textToType.length) {
                if (textToType.charAt(i) === '\n') {
                    typeWriterElement.innerHTML += '<br>';
                } else {
                    typeWriterElement.innerHTML += textToType.charAt(i);
                }
                i++;
                setTimeout(type, 50); // Typing speed
            }
        }
        type();
    }


    // Forgive Button Interaction
    const forgiveBtn = document.getElementById('forgive-btn');
    const overlay = document.getElementById('love-overlay');
    const closeOverlayBtn = document.getElementById('close-overlay');
    const closingSection = document.getElementById('closing-section');

    forgiveBtn.addEventListener('click', () => {
        // Create simple confetti explosion effect (simple CSS based or DOM particles)
        createConfetti();

        // Show overlay with delay
        setTimeout(() => {
            overlay.classList.add('visible'); // Use visible class
            overlay.classList.remove('hidden'); // Safety

            // Trigger Ring Animation
            setTimeout(() => {
                const ringWrapper = document.querySelector('.ring-wrapper');
                if (ringWrapper) ringWrapper.classList.add('animate');

                // Show final message after animation
                setTimeout(() => {
                    const finalMsg = document.querySelector('.final-message');
                    if (finalMsg) finalMsg.classList.add('visible');
                    if (finalMsg) finalMsg.classList.remove('hidden');
                }, 2500); // Wait for ring to slide down
            }, 500);

        }, 500);
    });

    closeOverlayBtn.addEventListener('click', () => {
        overlay.classList.remove('visible'); // Use visible class
        overlay.classList.add('hidden'); // Safety

        // Reset animations if reopened
        const ringWrapper = document.querySelector('.ring-wrapper');
        const finalMsg = document.querySelector('.final-message');
        if (ringWrapper) ringWrapper.classList.remove('animate');
        if (finalMsg) finalMsg.classList.remove('visible');
        if (finalMsg) finalMsg.classList.add('hidden');

        document.getElementById('cta-section').style.display = 'none';
        closingSection.classList.remove('hidden');
        closingSection.classList.add('fade-in-up');

        // Scroll to bottom
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    });

    // Simple Confetti Function
    function createConfetti() {
        const colors = ['#FFB6C1', '#D87093', '#FF69B4', '#FFFAFA'];

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';

            // Animation
            const duration = Math.random() * 3 + 2;
            confetti.style.transition = `top ${duration}s ease-in, left ${duration}s ease-in, opacity ${duration}s ease-in`;

            document.body.appendChild(confetti);

            // Trigger animation
            setTimeout(() => {
                confetti.style.top = '110vh';
                confetti.style.left = (parseFloat(confetti.style.left) + (Math.random() * 20 - 10)) + 'vw';
                confetti.style.opacity = '0';
            }, 100);

            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }
    }
});
