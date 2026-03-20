document.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => { document.querySelector('header').classList.add('loaded'); }, 100);
    setTimeout(() => { const h = document.getElementById('hero-title'); if (h) h.classList.add('reveal-active'); }, 300);
    setTimeout(() => { document.querySelectorAll('.reveal').forEach(el => el.classList.add('active')); }, 400);

    const lenis = new Lenis({
        duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        direction: 'vertical', gestureDirection: 'vertical', smooth: true, smoothTouch: false, touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    gsap.registerPlugin(ScrollTrigger);

    /* ========================================================
       SCROLLYVIDEO.JS - DEFINITIVE NATIVE MP4 DECODING TECH
       ======================================================== */
    const scrollyVideo = new ScrollyVideo({
        scrollyVideoContainer: "video-engine-container",
        src: "Vídeo_pronto_com_zoom_preto.mp4",
        cover: true,
        fixed: false,
        trackScroll: false // Desativado no modo global, agora ele mapeia DENTRO do Hero!
    });

    const progressText = document.getElementById('scroll-percentage');
    const progressBar = document.querySelector('.scroll-progress-bar');
    
    gsap.timeline({
        scrollTrigger: {
            trigger: "#scroll-track", 
            start: "top top", 
            end: "bottom bottom", 
            scrub: 0.1, 
            onUpdate: (self) => {
                const percent = Math.round(self.progress * 100);
                progressText.innerText = percent.toString().padStart(2, '0');
                if (progressBar) gsap.set(progressBar, { y: Math.max(0, self.progress * 64) }); 
                
                // Garante que o vídeo termina EXATAMENTE quando o usuário chega no fim do track do Hero
                if (scrollyVideo) scrollyVideo.setTargetTimePercent(self.progress);
            }
        }
    });

    // Fade out do conteúdo tipográfico quando descer a página (Hero)
    gsap.to('.content-layer', {
        opacity: 0.1, y: -100, ease: "power1.inOut",
        scrollTrigger: { trigger: "#scroll-track", start: "25% top", end: "75% top", scrub: true }
    });


    /* ========================================================
       SECTION 2: A ESSÊNCIA (Image Mask Reveal & Parallax)
       ======================================================== */
    const sessaoEssencia = document.getElementById('section-essencia');
    if (sessaoEssencia) {
        
        // Cortina revelando a imagem de cima para baixo
        gsap.to('.img-reveal-wrapper', { 
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1.5, delay: 1, ease: "power4.inOut",
            scrollTrigger: { trigger: '#section-essencia', start: "top 60%" }
        });

        // Zoom out suave dentro da máscara (parallax in-place)
        gsap.to('.img-parallax', { 
            scale: 1, duration: 2, delay: 1, ease: "power3.out",
            scrollTrigger: { trigger: '#section-essencia', start: "top 60%" }
        });

        // Acionar cascata de textos (A linha vermelha cresce junto com os blocos text-reveal-content)
        ScrollTrigger.create({
            trigger: '#section-essencia',
            start: "top 65%",
            onEnter: () => {
                setTimeout(() => {
                    sessaoEssencia.classList.add('reveal-active');
                    document.querySelector('.red-line').style.width = '3rem'; // Expande a linha do label
                }, 1000); // 1 segundo de atraso dramático
            }
        });
    }

    /* ========================================================
       SECTION 3: SERVIÇOS (Tipos de Captação - Grid Reveal)
       ======================================================== */
    const sessaoServicos = document.getElementById('section-servicos');
    if (sessaoServicos) {
        // Ativar Textos
        ScrollTrigger.create({
            trigger: '#section-servicos',
            start: "top 65%",
            onEnter: () => {
                sessaoServicos.classList.add('reveal-active');
                document.querySelector('.red-line-2').style.width = '3rem'; // Expande a 2ª linha do label
            }
        });

        // Entrada Pesada e Luxuosa dos Cards (Bento Boxes)
        gsap.fromTo('.service-square', 
            { opacity: 0, y: 120, scale: 0.95 },
            { 
                opacity: 1, y: 0, scale: 1, duration: 1.6, ease: "power4.out", stagger: 0.15,
                scrollTrigger: { trigger: '#section-servicos', start: "top 50%" }
            }
        );
    }

    /* ========================================================
       SECTION 4: PORTFÓLIO (Vertical Cascade Reveal)
       ======================================================== */
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (portfolioGrid) {
        // Entrada majestosa subindo e crescendo do Grid Vertical
        gsap.fromTo('.video-vert-item', 
            { opacity: 0, y: 150, scale: 0.9 },
            { 
                opacity: 1, y: 0, scale: 1, duration: 1.8, ease: "power4.out", stagger: 0.2,
                scrollTrigger: { trigger: '#portfolio-grid', start: "top 65%" }
            }
        );
    }

    /* ========================================================
       SECTION 5: CTA FINAL (Text Block Reveal)
       ======================================================== */
    const sessaoCta = document.getElementById('section-cta');
    if (sessaoCta) {
        // Cascata poderosa subindo verticalmente (Label -> "Vamos criar" -> "algo épico" -> Botão -> Footer)
        gsap.to('.cta-reveal', {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power4.out",
            stagger: 0.12, // Um item puxa o outro com um leve atraso
            scrollTrigger: {
                trigger: '#section-cta',
                start: "top 65%"
            }
        });
    }

    /* ========================================================
       MINIMALIST BUTTON APPROACH - MAGNETIC PHYSICS REMOVED
       ======================================================== */
    // physics block stripped as requested by the user's preference for 'pure minimalism'.
});
