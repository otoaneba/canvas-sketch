const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions:
   [ 1080, 1080 ],
   animate: true,
   playbackRate: 'throttle',
   fps: 6
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black'; //the background
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'white';

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;
    let x,y;

    const hours = 40;
    const radius = width * 0.3;

    for (let i = 0; i < hours; i++) {
      const slice = math.degToRad(360/hours)
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);


      context.save();
      context.translate(x,y);
      context.rotate(-angle);
      context.scale(random.range(0.1, 2), random.range(0.2,0.5))
  
      context.beginPath();
      context.rect(-w*0.5,random.range(0,-h*0.7), w, h);
      context.fill();
      context.restore();

      context.lineWidth = random.range(2,15);

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.beginPath();
      context.arc(0,0, radius * random.range(0.7, 1.3), slice * random.range(1, -8), slice* random.range(1, 5));
      context.strokeStyle = 'white';
      context.stroke();

      context.restore();
    }
    // const loop = 50;

    // for (let i = 0; i < loop; i++) {
    //   let rippleX = 0;
    //   let rippleY = 0;
      
    //   context.save();
    //   context.beginPath();
    //   context.arc(0,0, 100 + (loop * i), 0, math.degToRad(360/4));
    //   context.strokeStyle = 'white';
    //   context.lineWidth = i*(1.1) + 1
    //   context.stroke();
    //   context.restore();
    // }

  };
};

canvasSketch(sketch, settings);
