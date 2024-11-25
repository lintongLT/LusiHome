class Firework {
    constructor(container) {
        this.container = container;
        this.colors = ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#00ffff', '#ff00ff'];
    }

    launch() {
        // 随机生成烟花发射位置
        const startX = Math.random() * window.innerWidth;
        const targetY = Math.random() * (window.innerHeight * 0.6);

        // 创建上升轨迹
        const trail = document.createElement('div');
        trail.className = 'firework-trail';
        trail.style.left = startX + 'px';
        trail.style.backgroundColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        trail.style.setProperty('--targetY', `-${targetY}px`);
        
        this.container.appendChild(trail);

        // 当上升动画结束时触发爆炸效果
        trail.addEventListener('animationend', () => {
            trail.remove();
            this.explode(startX, window.innerHeight - targetY);
        });
    }

    explode(x, y) {
        const sparkCount = 30; // 火花数量
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];

        for (let i = 0; i < sparkCount; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark';
            spark.style.left = x + 'px';
            spark.style.top = y + 'px';
            spark.style.backgroundColor = color;

            // 设置随机散开方向和距离
            const angle = (i * 360 / sparkCount) + Math.random() * 30;
            const distance = 100 + Math.random() * 100;
            
            spark.style.setProperty('--rotation', `${angle}deg`);
            spark.style.setProperty('--distance', `${distance}px`);

            this.container.appendChild(spark);

            // 动画结束后移除元素
            spark.addEventListener('animationend', () => spark.remove());
        }
    }
}

// 初始化和使用
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('fireworks');
    const firework = new Firework(container);

    // 每隔一段时间发射烟花
    setInterval(() => {
        firework.launch();
    }, 2000);

    // 点击页面任意位置发射烟花
    document.addEventListener('click', (e) => {
        const firework = new Firework(container);
        firework.launch();
    });
}); 