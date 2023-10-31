const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const animate = () => {
  console.log('domestika');
  requestAnimationFrame(animate);
}
// animate();

const sketch = ({ context, width, height }) => {
  const agents = [];
  for (let i = 0; i < 40; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    agents.push(new Agent(x, y))
  }
  

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      for (let j = i+1; j < agents.length; j++) {
        const other = agents[j];
        const dist = agent.pos.getDistance(other.pos);
        
        if (dist > 200) {
          continue; 
        }
        // when the dist is 0 (close), width is 12.
        // if the dist is 200 (far), width is 1.
        context.lineWidth = math.mapRange(dist, 0, 200, 12, 1);
        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      }
    }

    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height)
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy =  this.y - v.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x,y);
    this.vel = new Vector(random.range(-5, 5), random.range(-1, 1))
    this.radius = random.range(5,12);
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  bounce(width, height) {
    if ((this.pos.x) == this.radius || (this.pos.x + this.radius == width )) {
      this.vel.x *= -1; 
    }
    if (this.pos.x < this.radius) {
      this.pos.x += 1;
      this.vel.x *= -1;
    } else if (this.pos.x + this.radius > width) {
      this.pos.x -= 1;
      this.vel.x *= -1;
    }
    if (this.pos.y == this.radius || (this.pos.y + this.radius == height)) {
      this.vel.y *= -1; 
    }
    if (this.pos.y < this.radius) {
      this.pos.y += 1;
      this.vel.y *= -1;
    } else if (this.pos.y + this.radius > height) {
      this.pos.y -= 1;
      this.vel.y *= -1;
    }
  }

  wrap() {
    if (this.pos.x <= 0) {
      this.pos.x = width;
    } else if (this.pos.x >= width) {
       this.pos.x = this.radius;
    }
    if (this.pos.y <= 0) {
      this.pos.y = height; 
    } else if (this.pos.y >= height) {
      this.pos.y = 0;
    }
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y)

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.lineWidth = 2;
    context.fill();
    context.stroke();

    context.restore();
  }
}