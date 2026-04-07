class ParticleNetwork {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        
        // Interação com o mouse
        window.addEventListener('mousemove', (e) => {
            // Precisamos ajustar para o scroll e a posição da hero section
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });

        // Interação com o touch (mobile)
        window.addEventListener('touchmove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.touches[0].clientX - rect.left;
            this.mouse.y = e.touches[0].clientY - rect.top;
        });
        window.addEventListener('touchend', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    init() {
        this.resize();
    }

    resize() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        this.canvas.width = hero.offsetWidth;
        this.canvas.height = hero.offsetHeight;
        this.createParticles();
    }

    createParticles() {
        this.particles = [];
        // Quantidade de partículas baseada no tamanho da tela (para ser responsivo)
        const numParticles = Math.min((this.canvas.width * this.canvas.height) / 8000, 150); 
        
        for (let i = 0; i < numParticles; i++) {
            const size = (Math.random() * 2) + 0.5;
            const x = Math.random() * (this.canvas.width - size * 2) + size * 2;
            const y = Math.random() * (this.canvas.height - size * 2) + size * 2;
            const dirX = (Math.random() - 0.5) * 1.5;
            const dirY = (Math.random() - 0.5) * 1.5;
            const color = 'rgba(255, 255, 255, 0.8)';
            this.particles.push(new Particle(x, y, dirX, dirY, size, color, this.canvas, this.ctx));
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update(this.mouse);
            this.particles[i].draw();
        }
        this.connect();
    }

    connect() {
        let opacityValue = 1;
        // Distância para conectar as linhas
        const connectDistance = (this.canvas.width / 15) * (this.canvas.height / 15);
        
        for (let a = 0; a < this.particles.length; a++) {
            for (let b = a; b < this.particles.length; b++) {
                const distance = ((this.particles[a].x - this.particles[b].x) * (this.particles[a].x - this.particles[b].x)) +
                                 ((this.particles[a].y - this.particles[b].y) * (this.particles[a].y - this.particles[b].y));
                
                if (distance < connectDistance) {
                    // Opacidade cai conforme a distância aumenta
                    opacityValue = 1 - (distance / connectDistance);
                    // Usando um tom esbranquiçado sutil
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.25})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
                    this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

class Particle {
    constructor(x, y, dirX, dirY, size, color, canvas, ctx) {
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.size = size;
        this.color = color;
        this.canvas = canvas;
        this.ctx = ctx;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    update(mouse) {
        // Colisão com as bordas
        if (this.x > this.canvas.width || this.x < 0) {
            this.dirX = -this.dirX;
        }
        if (this.y > this.canvas.height || this.y < 0) {
            this.dirY = -this.dirY;
        }

        // Interação com o mouse (repulsão)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius && mouse.x != null) {
            this.x -= directionX;
            this.y -= directionY;
        }

        // Movimentação normal e atualização das posições base 
        // para que não voltem ao mesmo exato lugar sempre
        this.x += this.dirX;
        this.y += this.dirY;
        this.baseX += this.dirX;
        this.baseY += this.dirY;
    }
}

// Inicializar quando o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    new ParticleNetwork('particle-canvas');
});
