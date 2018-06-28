class Bounce extends Circle {
    constructor(x, y, r, name) {
        super(x, y, r, name);
        this.type = 'bounce';
        this.direction = createVector(random(-1, 1), random(-1, 1));
        this.anguloRotacion = random(0, 2 * PI);
        this.vel = createVector(random(1, 3), random(1, 3));
    }
    applyForce(force) {
        this.acc.add(force);
    }
    update() {
        this.pos.x += this.vel.x * this.direction.x;
        this.pos.y += this.vel.y * this.direction.y;

        if (this.pos.x > width - this.r || this.pos.x < this.r) {
            this.direction.x *= -1
        }
        if (this.pos.y > height - this.r * 2 || this.pos.y < this.r) {
            this.direction.y *= -1;
        }
    }
    show() {
        strokeWeight(2.5);
        stroke(this.c_r, this.c_g, this.c_b);
        fill(this.c_r, this.c_g, this.c_b, this.c_alfa);
        fill(this.c_r, this.c_g + 50, this.c_b + 50);

        beginShape();
        let edge = random(10, 25);
        for (let i = 0; i < 360; i += edge) {
            let x = sin(i) * this.r;
            let y = cos(i) * this.r;
            vertex(x + this.pos.x, y + this.pos.y);
        }
        endShape(CLOSE);
    }
}