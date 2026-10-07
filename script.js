// 页面切换功能
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    // 导航只负责定位到对应内容，不隐藏或切换页面。
    const updateActiveLink = () => {
        const currentPage = Array.from(pages).reverse().find(page =>
            page.getBoundingClientRect().top <= 120
        );

        navLinks.forEach(link => {
            link.classList.toggle(
                'active',
                currentPage && link.getAttribute('href') === `#${currentPage.id}`
            );
        });
    };

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

    // 技能条动画
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const skillObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-fill');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }

    // 统计数字动画
    const countUpObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const rawText = stat.textContent.trim();
                    // 只对纯数字做动画，避免破坏 "3000+" 这类文本
                    if (/^\d+$/.test(rawText)) {
                        animateCount(stat, parseInt(rawText, 10));
                    }
                });
                countUpObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        countUpObserver.observe(statsSection);
    }

    function animateCount(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    }

    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll <= 0) {
                navbar.style.boxShadow = 'none';
            } else {
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            }
        });
    }

    // 卡片悬停视差效果
    const cards = document.querySelectorAll('.info-card, .feature-card, .dept-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // 时间线动画
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    });

    // 粒子背景动态效果增强
    const particles = document.querySelector('.particles');
    if (particles) {
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;

            particles.style.backgroundPosition =
                `${mouseX * 50}px ${mouseY * 50}px,
                 ${40 + mouseX * 30}px ${60 + mouseY * 30}px,
                 ${130 + mouseX * 40}px ${270 + mouseY * 40}px`;
        });
    }

    // 打印加载完成信息
    console.log('页面加载完成');
});