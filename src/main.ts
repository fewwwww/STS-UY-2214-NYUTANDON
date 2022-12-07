import * as PIXI from 'pixi.js';

const baseUrl = 'https://fewwwww.github.io/STS-UY-2214-NYUTANDON/';

const load = (app: PIXI.Application) => {
  return new Promise<void>((resolve) => {
    app.loader
      .add('mosaic0', 'assets/mosaic0.jpg')
      .add('mosaic1', 'assets/mosaic1.jpg')
      .add('mosaic2', 'assets/mosaic2.webp')
      .add('mosaic3', 'assets/mosaic3.jpg')
      .load(() => {
        resolve();
      });
  });
};

// https://codepen.io/jasonsturges/pen/abNOZYX
function drawGear(
  target: PIXI.Graphics,
  x: number,
  y: number,
  sides: number,
  innerRadius = 80,
  outerRadius = 4,
  angle = 0,
  holeSides = 2,
  holeRadius = 0,
) {
  let step = (Math.PI * 2) / sides;
  let qtrStep = step / 4;
  let start = (angle / 180) * Math.PI;
  let n, dx, dy;

  target.moveTo(
    x + Math.cos(start) * outerRadius,
    y - Math.sin(start) * outerRadius,
  );

  for (n = 1; n <= sides; ++n) {
    dx = x + Math.cos(start + step * n - qtrStep * 3) * innerRadius;
    dy = y - Math.sin(start + step * n - qtrStep * 3) * innerRadius;
    target.lineTo(dx, dy);
    dx = x + Math.cos(start + step * n - qtrStep * 2) * innerRadius;
    dy = y - Math.sin(start + step * n - qtrStep * 2) * innerRadius;
    target.lineTo(dx, dy);
    dx = x + Math.cos(start + step * n - qtrStep) * outerRadius;
    dy = y - Math.sin(start + step * n - qtrStep) * outerRadius;
    target.lineTo(dx, dy);
    dx = x + Math.cos(start + step * n) * outerRadius;
    dy = y - Math.sin(start + step * n) * outerRadius;
    target.lineTo(dx, dy);
  }

  step = (Math.PI * 2) / holeSides;

  target.moveTo(
    x + Math.cos(start) * holeRadius,
    y - Math.sin(start) * holeRadius,
  );

  for (n = 1; n <= holeSides; ++n) {
    dx = x + Math.cos(start + step * n) * holeRadius;
    dy = y - Math.sin(start + step * n) * holeRadius;
    target.lineTo(dx, dy);
  }
}

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const state = {
  stroke: 2,
  color: 0x000000,
  fill: 0xffffff,
  sides: 8,
  innerRadius: 25,
  outerRadius: 50,
  holeSides: 8,
  holeRadius: 20,
  angle: 90,
};

const main = async () => {
  // Actual app
  let app = new PIXI.Application({ backgroundColor: 0x000000 });
  // Display application properly
  document.body.style.margin = '0';
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';

  // View size = windows
  app.renderer.resize(window.innerWidth, window.innerHeight);

  // Load assets
  await load(app);

  const center: any = new PIXI.Point(
    window.innerWidth / 2,
    window.innerHeight / 2,
  );

  const texture0 = PIXI.Texture.from(baseUrl + 'week2/assets/metal0.jpg');
  const tilingSprite0 = new PIXI.TilingSprite(
    texture0,
    window.innerWidth,
    window.innerHeight,
  );

  const texture1 = PIXI.Texture.from(baseUrl + 'week2/assets/metal1.jpeg');
  const tilingSprite1 = new PIXI.TilingSprite(
    texture1,
    window.innerWidth,
    window.innerHeight,
  );

  const texture2 = PIXI.Texture.from(baseUrl + 'week2/assets/metal2.jpeg');
  const tilingSprite2 = new PIXI.TilingSprite(
    texture2,
    window.innerWidth,
    window.innerHeight,
  );

  const texture3 = PIXI.Texture.from(baseUrl + 'week2/assets/metal3.jpeg');
  const tilingSprite3 = new PIXI.TilingSprite(
    texture3,
    window.innerWidth,
    window.innerHeight,
  );

  const circle0 = new PIXI.Graphics();
  circle0.lineStyle(2, 0x808080, 1);
  circle0.drawCircle(window.innerWidth / 2, window.innerHeight / 2, 1000);

  const circle1 = new PIXI.Graphics();
  circle1.lineStyle(2, 0x808080, 1);
  circle1.drawCircle(window.innerWidth / 2, window.innerHeight / 2, 500);

  const circle2 = new PIXI.Graphics();
  circle2.lineStyle(2, 0x808080, 1);
  circle2.drawCircle(window.innerWidth / 2, window.innerHeight / 2, 200);

  const circle3 = new PIXI.Graphics();
  circle3.lineStyle(2, 0x808080, 1);
  circle3.drawCircle(window.innerWidth / 2, window.innerHeight / 2, 50);

  // draw gear0
  app.stage.addChild(circle0);
  app.stage.addChild(tilingSprite0);
  const gear0 = new PIXI.Graphics();
  app.stage.addChild(gear0);
  gear0.clear();
  gear0.lineStyle(state.stroke, state.color);
  gear0.beginFill(state.fill);
  drawGear(
    gear0,
    window.innerWidth / 2,
    window.innerHeight / 2,
    state.sides * 10,
    state.innerRadius / 2,
    state.outerRadius * 20,
    state.angle + 65,
    state.holeSides,
    state.holeRadius,
  );
  gear0.pivot = center;
  gear0.x += window.innerWidth / 2;
  gear0.y += window.innerHeight / 2;
  tilingSprite0.mask = gear0;

  // draw gear1
  app.stage.addChild(circle1);
  app.stage.addChild(tilingSprite1);
  const gear1 = new PIXI.Graphics();
  app.stage.addChild(gear1);
  gear1.clear();
  gear1.lineStyle(state.stroke, state.color);
  gear1.beginFill(state.fill);
  drawGear(
    gear1,
    window.innerWidth / 2,
    window.innerHeight / 2,
    state.sides * 5,
    state.innerRadius / 2,
    state.outerRadius * 10,
    state.angle + 20,
    state.holeSides,
    state.holeRadius,
  );
  gear1.pivot = center;
  gear1.x += window.innerWidth / 2;
  gear1.y += window.innerHeight / 2;
  tilingSprite1.mask = gear1;

  // draw gear2
  app.stage.addChild(circle2);
  app.stage.addChild(tilingSprite2);
  const gear2 = new PIXI.Graphics();
  app.stage.addChild(gear2);
  gear2.clear();
  gear2.lineStyle(state.stroke, state.color);
  gear2.beginFill(state.fill);
  drawGear(
    gear2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    state.sides * 2,
    state.innerRadius / 2,
    state.outerRadius * 4,
    state.angle + 70,
    state.holeSides,
    state.holeRadius,
  );
  gear2.pivot = center;
  gear2.x += window.innerWidth / 2;
  gear2.y += window.innerHeight / 2;
  tilingSprite2.mask = gear2;

  // draw gear3
  app.stage.addChild(circle3);
  app.stage.addChild(tilingSprite3);
  const gear3 = new PIXI.Graphics();
  app.stage.addChild(gear3);
  gear3.clear();
  gear3.lineStyle(state.stroke, state.color);
  gear3.beginFill(state.fill);
  drawGear(
    gear3,
    window.innerWidth / 2,
    window.innerHeight / 2,
    state.sides,
    state.innerRadius / 2,
    state.outerRadius,
    state.angle,
    state.holeSides,
    state.holeRadius,
  );
  gear3.pivot = center;
  gear3.x += window.innerWidth / 2;
  gear3.y += window.innerHeight / 2;
  tilingSprite3.mask = gear3;

  //   let sprite = new PIXI.Sprite(
  //       app.loader.resources['assets/'].texture
  //   );
  //   sprite.anchor.set(0.5, 0.5);
  //   sprite.scale.set(0.1, 0.1);
  //   sprite.x = window.innerWidth / 2 - sprite.width / 2;
  //   sprite.y = window.innerHeight / 2 - sprite.height / 2;
  //   sprite.angle = 180;

  // Handle window resizing
  window.addEventListener('resize', (_e) => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    //   sprite.x = window.innerWidth / 2 - sprite.width / 2;
    //   sprite.y = window.innerHeight / 2 - sprite.height / 2;
  });

  document.body.appendChild(app.view);

  let context = {
    velocity: { x: 1, y: 1 },
    //   sprite
  };

  app.ticker.add(update, context);

  const animate = () => {
    requestAnimationFrame(animate);
    gear0.rotation -= 0.0003;
    gear1.rotation += 0.0005;
    gear2.rotation -= 0.001;
    gear3.rotation += 0.005;
  };

  animate();
};

// Cannot be an arrow function. Arrow functions cannot have a 'this' parameter.
function update(this: any, delta: number) {
  //   const newScale = (Math.sin(Date.now()/10000 + 1)) / 2;
  //   this.sprite.scale.set(newScale, newScale);
  //   if (this.sprite.x <= 0 || this.sprite.x >= window.innerWidth - this.sprite.width) {
  //       this.velocity.x = -this.velocity.x;
  //   }
  //   if (this.sprite.y <= 0 || this.sprite.y >= window.innerHeight - this.sprite.height) {
  //       this.velocity.y = -this.velocity.y;
  //   }
  //   this.sprite.x += this.velocity.x * delta;
  //   this.sprite.y += this.velocity.y * delta;
}

main();
