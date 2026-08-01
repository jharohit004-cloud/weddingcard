/* ==========================================================================
   Advanced Minimalist Mobile-First Wedding Invitation JavaScript
   Featuring Persistent Long Sparkle Touch Physics & High-End Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Device Detector
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (isMobile) {
        document.body.classList.add('is-mobile');
    } else {
        document.body.classList.add('is-desktop');
    }

    // 2. Persistent Touch & Particle Sparkle Trail Engine
    const canvas = document.getElementById('sparkle-canvas');
    const ctx = canvas.getContext('2d');
    let sparkles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Sparkle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3.5 + 1.2;
            this.speedX = (Math.random() - 0.5) * 1.8;
            this.speedY = (Math.random() - 0.5) * 1.8 - 0.4;
            
            const goldTones = [
                'hsl(43, 74%, 60%)',  // Royal Gold
                'hsl(48, 89%, 75%)',  // Light Champagne
                'hsl(38, 80%, 50%)',  // Deep Amber Gold
                'hsl(0, 0%, 95%)'     // Diamond White
            ];
            this.color = goldTones[Math.floor(Math.random() * goldTones.length)];
            this.opacity = 1;
            this.decay = Math.random() * 0.006 + 0.005;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity -= this.decay;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = Math.max(0, this.opacity);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color;
            ctx.restore();
        }
    }

    function addSparkles(e) {
        let x, y;
        if (e.touches && e.touches.length > 0) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        } else {
            x = e.clientX;
            y = e.clientY;
        }

        if (x && y) {
            const count = isMobile ? 3 : 2;
            for (let i = 0; i < count; i++) {
                sparkles.push(new Sparkle(x, y));
            }
        }
    }

    window.addEventListener('mousemove', addSparkles);
    window.addEventListener('touchmove', addSparkles, { passive: true });
    window.addEventListener('touchstart', addSparkles, { passive: true });

    function animateSparkles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < sparkles.length; i++) {
            sparkles[i].update();
            sparkles[i].draw();
            if (sparkles[i].opacity <= 0) {
                sparkles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animateSparkles);
    }
    animateSparkles();

    // 3. Soothing Ambient Sound Synthesizer
    let audioCtx = null;
    let isPlaying = false;
    let synthInterval = null;

    const musicBtn = document.getElementById('music-toggle');
    const musicBtnText = musicBtn.querySelector('.btn-text');
    const musicIcon = musicBtn.querySelector('i');

    const ambientNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];

    function playNote(freq) {
        if (!audioCtx) return;
        
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.8);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.6);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 3.7);
    }

    function toggleAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }

        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        if (!isPlaying) {
            isPlaying = true;
            musicBtnText.textContent = 'Pause Music';
            musicIcon.className = 'fas fa-pause';
            
            playNote(ambientNotes[0]);
            synthInterval = setInterval(() => {
                const randomNote = ambientNotes[Math.floor(Math.random() * ambientNotes.length)];
                playNote(randomNote);
            }, 1800);
        } else {
            isPlaying = false;
            musicBtnText.textContent = 'Ambient Music';
            musicIcon.className = 'fas fa-music';
            clearInterval(synthInterval);
        }
    }

    musicBtn.addEventListener('click', toggleAudio);

    // 4. Language Switcher
    let currentLang = 'en';
    const langBtn = document.getElementById('lang-toggle');
    const langLabel = document.getElementById('lang-label');

    function toggleLanguage() {
        currentLang = currentLang === 'en' ? 'hi' : 'en';
        langLabel.textContent = currentLang === 'en' ? 'हिंदी' : 'English';

        if (currentLang === 'hi') {
            document.body.classList.add('lang-hi');
        } else {
            document.body.classList.remove('lang-hi');
        }

        document.querySelectorAll('[data-en]').forEach(el => {
            const text = el.getAttribute(`data-${currentLang}`);
            if (text) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = text;
                } else {
                    el.textContent = text;
                }
            }
        });
    }

    langBtn.addEventListener('click', toggleLanguage);

    // 5. Countdown Timer
    const weddingDate = new Date('November 25, 2026 18:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            document.querySelector('.countdown-container').innerHTML = '<h3>The Wedding Has Arrived!</h3>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 6. High-End Scroll Fade-In Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: isMobile ? 0.05 : 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // 7. RSVP Form Handler
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpSuccess = document.getElementById('rsvp-success');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            rsvpForm.style.display = 'none';
            rsvpSuccess.style.display = 'block';
        });
    }

});
