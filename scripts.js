// 星空背景动画
document.addEventListener('DOMContentLoaded', function() {
    // 初始化星空背景
    initStarfield();
    
    // 添加滚动监听器，实现视差效果
    window.addEventListener('scroll', function() {
        parallaxEffect();
    });
    
    // 添加按钮点击事件
    initButtonEvents();
});

// 星空背景初始化
function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    
    // 调整画布大小
    function resizeCanvas() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }
    
    // 创建星星
    class Star {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2;
            this.speed = Math.random() * 0.05;
            this.brightness = Math.random();
            this.color = `rgba(255, 255, 255, ${this.brightness})`;
        }
        
        update() {
            this.x += this.speed;
            this.brightness += Math.random() * 0.01 - 0.005;
            
            // 限制亮度范围
            if (this.brightness > 1) this.brightness = 1;
            if (this.brightness < 0.1) this.brightness = 0.1;
            
            this.color = `rgba(255, 255, 255, ${this.brightness})`;
            
            // 如果星星移出画布，重置位置
            if (this.x > width) {
                this.x = 0;
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // 创建星星数组
    let stars = [];
    const starCount = 200;
    
    // 初始化星星
    function initStars() {
        stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push(new Star());
        }
    }
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // 绘制渐变背景
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(10, 14, 39, 0.8)');
        gradient.addColorStop(1, 'rgba(26, 27, 58, 0.8)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // 更新并绘制星星
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        
        // 添加一些随机闪烁的大星星
        if (Math.random() > 0.99) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 3 + 1;
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
            
            // 添加光晕效果
            const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 4);
            glow.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
            glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(x, y, size * 4, 0, Math.PI * 2);
            ctx.fill();
        }
        
        requestAnimationFrame(animate);
    }
    
    // 初始化
    window.addEventListener('resize', function() {
        resizeCanvas();
        initStars();
    });
    
    resizeCanvas();
    initStars();
    animate();
}

// 视差滚动效果
function parallaxEffect() {
    const sections = document.querySelectorAll('section');
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const offset = section.offsetTop;
        const height = section.offsetHeight;
        
        // 只有当部分在视口内时才应用效果
        if (scrollY > offset - window.innerHeight && scrollY < offset + height) {
            // 计算视差偏移量
            const parallaxOffset = (scrollY - offset) * 0.2;
            
            // 应用视差效果到背景
            if (section.classList.contains('hero-section')) {
                const background = section.querySelector('.hero-background');
                if (background) {
                    background.style.transform = `translateY(${parallaxOffset}px)`;
                }
            }
            
            // 为元素添加淡入效果
            const elements = section.querySelectorAll('.feature-card, .fortune-card, .testimonial-card');
            elements.forEach((el, index) => {
                if (scrollY > offset - window.innerHeight * 0.8) {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }
    });
}

// 初始化按钮事件
function initButtonEvents() {
    // 主按钮点击事件
    const primaryBtns = document.querySelectorAll('.primary-btn');
    primaryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 根据按钮文本判断行为
            if (this.textContent === '开始测算') {
                window.location.href = 'bazi.html';
            } else if (this.textContent === '免费注册获取') {
                showModal('register-modal');
            } else if (this.textContent.includes('立即测算') || this.textContent.includes('立即查询')) {
                const parent = this.closest('.feature-card');
                if (parent) {
                    const title = parent.querySelector('.feature-title').textContent;
                    if (title.includes('八字')) {
                        window.location.href = 'bazi.html';
                    } else if (title.includes('紫微')) {
                        window.location.href = 'ziwei.html';
                    } else if (title.includes('运势')) {
                        window.location.href = 'fortune.html';
                    }
                }
            }
        });
    });
    
    // 次要按钮点击事件
    const secondaryBtns = document.querySelectorAll('.secondary-btn');
    secondaryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent === '了解更多') {
                // 平滑滚动到功能区域
                const featuresSection = document.querySelector('.features-section');
                if (featuresSection) {
                    featuresSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // 登录按钮点击事件
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            showModal('login-modal');
        });
    }
    
    // 注册按钮点击事件
    const registerBtn = document.querySelector('.register-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            showModal('register-modal');
        });
    }
}

// 显示模态框
function showModal(modalId) {
    // 模态框功能将在实际实现时添加
    console.log(`显示模态框: ${modalId}`);
    alert('此功能正在开发中，敬请期待！');
}

// 添加卡片初始化样式
document.addEventListener('DOMContentLoaded', function() {
    // 为卡片添加初始透明度和位移
    const cards = document.querySelectorAll('.feature-card, .fortune-card, .testimonial-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // 初次触发视差效果，显示可见区域内的元素
    setTimeout(() => {
        parallaxEffect();
    }, 100);
}); 