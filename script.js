document.addEventListener('DOMContentLoaded', () => {
    // 1. MOBILE MENU TOGGLE
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 2. NAVBAR SCROLL EFFECT
    const navbar = document.querySelector('.navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load

    // 3. SCROLL REVEAL ANIMATION (Intersection Observer)
    // Add 'reveal' class to sections first
    const sections = document.querySelectorAll('section:not(.hero), .card, .teacher-card, .keunggulan li');
    sections.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once animated, stop observing
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Reveal when 15% of element is visible
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
        revealObserver.observe(section);
    });

    // 4. SMOOTH SCROLL FOR ANCHOR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 5. PROGRAM MODAL LOGIC
    const programData = {
        iqro: {
            title: 'Iqro Dasar',
            icon: '📖',
            duration: '3 - 6 Bulan',
            time: '16:00 - 17:30 WIB',
            price: 'Rp 150.000 / bln',
            method: 'Privat / Kelompok Kecil',
            desc: 'Fokus pada pengenalan huruf hijaiyah, makharijul huruf, dan kelancaran membaca dasar.'
        },
        tahsin: {
            title: 'Tahsin Tartil',
            icon: '🎙️',
            duration: '6 Bulan',
            time: '19:00 - 20:30 WIB',
            price: 'Rp 200.000 / bln',
            method: 'Intensif Tajwid',
            desc: 'Penyempurnaan bacaan Al-Qur\'an sesuai dengan kaidah tajwid untuk mencapai bacaan yang tartil.'
        },
        tahfizh: {
            title: 'Tahfizh Quran',
            icon: '🧠',
            duration: 'Target 1 Juz / 3 Bln',
            time: 'Fleksibel (Pagi/Sore)',
            price: 'Rp 250.000 / bln',
            method: 'Setoran Rutin One-on-One',
            desc: 'Program hafalan Al-Qur\'an dengan pendampingan intensif dan metode murojaah yang terukur.'
        }
    };

    const modal = document.getElementById('programModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    document.querySelectorAll('.card-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const programKey = link.getAttribute('data-program');
            const data = programData[programKey];

            if (data) {
                modalBody.innerHTML = `
                    <div class="modal-detail-header">
                        <span class="icon">${data.icon}</span>
                        <h2>${data.title}</h2>
                        <p>${data.desc}</p>
                    </div>
                    <div class="modal-info-grid">
                        <div class="info-item">
                            <label>Durasi Program</label>
                            <p>${data.duration}</p>
                        </div>
                        <div class="info-item">
                            <label>Waktu Belajar</label>
                            <p>${data.time}</p>
                        </div>
                        <div class="info-item">
                            <label>Investasi Belajar</label>
                            <p>${data.price}</p>
                        </div>
                        <div class="info-item">
                            <label>Metode</label>
                            <p>${data.method}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <a href="https://wa.me/62895424707273?text=Halo%20Admin%20Muhammad%20Nur%20Ramadhan%2C%20saya%20tertarik%20dengan%20program%20${data.title}." target="_blank" class="btn btn-primary" id="modalRegister">Daftar via WhatsApp</a>
                    </div>
                `;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Handle registration button inside modal
                document.getElementById('modalRegister').addEventListener('click', () => {
                    closeModal();
                });
            }
        });
    });

    const closeModal = () => {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Close modal on Esc key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
