const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,
  // playbackRate: 'throttle',
  frame: 0,
  fps: 60,
  duration: 10,
  
};
let radius = 200;
const sketch = () => {
  return ({ context, width, height, frame, playhead, duration  }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'white';

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.025;
    const h = height * 0.1;
    let x,y;

    const hours = 24;
    for (let i = 0; i < hours; i++) {
      // context.strokeStyle = 'white';
      // const slice = math.degToRad(360/ticks);
      // const endSlice = math.degToRad(36/(ticks*2))
      // const angle = ((slice)  * i); // angle of each slice
      // const endAngle = math.degToRad(360/(ticks));

      // context.beginPath();
      // context.lineWidth = 30;
      // context.arc(cx, cy, radius * 2, angle, endAngle)
      // if (i % 2 == 0) {
      //   context.strokeStyle = 'white';
      // } else  {
      //   context.strokeStyle = 'blue'
      // }
      // context.stroke();
      // x = cx + radius * Math.cos(angle); // sin*r = y
      // y = cy + radius * Math.sin(angle); // cos*r = x
      // context.fillRect(cx, cy, 10, 10);

      // context.fillStyle = 'white';
      // // context.fillStyle = 'red';

      // // const scale = (n+1) / 2* 30;
      // // const scale = (n*0.5*0.5) * 30;
      // //const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);
      // const rotation = playhead * Math.PI * i;
      // context.save();


      // let xd = cx  * Math.cos(angle); // sin*r = y
      // let yd = cy  * Math.sin(angle); // cos*r = x
      // context.translate(cx, cy);
      // context.rotate(rotation);
      // context.scale(0.5,3);
  
      // context.beginPath();
      // // context.rect(0,0, w*5,h*0.03);
      // context.rect(0,0, w*3, h/2);
      // context.fill();
      // context.restore();
      
      // context.save();
      // context.translate(x,y);
      // context.rotate(angle);
      // context.scale(0.5,3);
  
      // context.beginPath();
      // // context.rect(0,0, w*5,h*0.03);
      // context.rect(0,0, w*3, h);
      // context.fill();
      // context.restore();
      // console.log(i)
      // console.log(frame, duration)
      // setTimeout(() => {
      //   console.log('timeout')
      // }, 10000);

      const slice = math.degToRad(360/hours)
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);


      context.save();
      context.translate(x,y);
      context.rotate(-angle);
      // context.scale(random.range(0.1, 2), random.range(0.2,0.5))
  
      context.beginPath();
      if (i == 0 || i == 6 || i == 12|| i == 18 ) {
        context.rect(-w*0.5,-h*0.1, w*0.5, h * 0.8);
      } else if (i == 3 || i == 9 || i == 15|| i == 21 ) {
        context.rect(-w*0.5,-h*0.1, w*0.5, h*0.6);
      } else {
        context.rect(-w*0.5,-h*0.1, w*0.5, h*0.3);
      }
      context.fill();
      context.restore();

      context.lineWidth = random.range(2,15);

      context.save();
      context.translate(cx, cy);
      if (frame % 60 == 0) {
        context.rotate(math.degToRad(6));
      } else {
        context.rotate(Math.PI * playhead * 3);
      }
      // context.rotate(Math.PI * playhead * 3);

      context.beginPath();
      context.arc(0,0, radius + 10, slice + 0.5, slice + 1);
      context.lineWidth = 68
      context.strokeStyle = 'white';
      context.stroke();

      context.restore();

      // context.save();
      // context.translate(cx, cy);
      // context.rotate(Math.PI * playhead * 3);

      // context.beginPath();
      // context.arc(0,0, radius + 10, slice - 1, slice);
      // context.lineWidth = 68
      // context.strokeStyle = 'white';
      // context.stroke();

      // context.restore();



    
    }

  };
};

canvasSketch(sketch, settings);
