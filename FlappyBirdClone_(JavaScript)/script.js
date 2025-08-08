let config = {
  renderer: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let game = new Phaser.Game(config);

function preload(){
  this.load.image('background', 'assets/background.png');
  this.load.image('road', 'assets/road.png');
  this.load.image('column', 'assets/column.png');
  this.load.image('final', 'assets/final.png')
  this.load.spritesheet('bird', 'assets/bird.png', { frameWidth: 64, frameHeight: 96 });
}

let bird,cursors;
let hasLanded = false, hasBumped = false;
let hasWon = false, started = false;

function create(){
 const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
 const bottomColumns = this.physics.add.staticGroup({
  key: 'column',
  repeat: 1,
  setXY: { x: 350, y: 400, stepX: 300 },
});
 bird = this.physics.add.sprite(0, 50, 'bird').setScale(2);
 bird.setCollideWorldBounds(true);
 const final = this.physics.add.staticGroup({
    key: 'final',
    repeat: 0,
    setXY: { x: 788, y: 300, stepX: 0}
 })
 const roads = this.physics.add.staticGroup();
 const road = roads.create(400, 568, 'road').setScale(2).refreshBody();
 const topColumns = this.physics.add.staticGroup({
  key: 'column',
  repeat: 1,
  setXY: { x: 200, y: 0, stepX: 300 }
});
 cursors = this.input.keyboard.createCursorKeys();
 this.physics.add.overlap(bird, road, () => hasLanded = true, null, this);
 this.physics.add.collider(bird, road);
 this.physics.add.overlap(bird, topColumns, () => hasBumped = true, null, this);
 this.physics.add.overlap(bird, bottomColumns, () => hasBumped = true, null, this);
 this.physics.add.collider(bird, topColumns);
 this.physics.add.collider(bird, bottomColumns);
 this.physics.add.overlap(bird, final, () => hasWon=true, null, this);
 this.physics.add.collider(bird,final);
 messageToStart = this.add.text(0, 0, `Press space bar to start!`, { fontFamily: 'Stencil Std, fantasy', fontSize: "30px", color: "#ff0000ff"});
 messageToPlayer = this.add.text(0, 0, ` Press the "^" button to stay upright\n And don\'t hit the columns or ground! `, { fontFamily: '"Comic Sans MS", Times, serif', fontSize: "20px", color: "white", backgroundColor: "black" });
 Phaser.Display.Align.In.Center(messageToPlayer, road, 0,-25);
 Phaser.Display.Align.In.Center(messageToStart,background,-55,5);
}

function restart(){
   hasBumped = false;
   hasLanded = false;
   hasWon = false;
   messageToPlayer.text = ` Press the "^" button to stay upright\n And don\'t hit the columns or ground! `
   bird.setPosition(0, 50);
}

function update(){
 if (cursors.space.isDown && !started) {
    started = true;
    messageToStart.text = ``
  }
 if (!started) {
    bird.setVelocityY(-5);
    bird.body.velocity.x = 0;
  }
 if (cursors.up.isDown && !hasLanded && !hasBumped && started) {
    bird.setVelocityY(-160);
  }
 if (!hasLanded && !hasBumped && started) {
    bird.body.velocity.x = 50;
  }
 if ((hasLanded || hasBumped || hasWon) && started && cursors.space.isDown){
    restart();
} 
 if (hasLanded || hasBumped) {
    bird.body.velocity.x = 0;
    bird.setVelocityY(-5);
    messageToPlayer.text = ` Oh no! You crashed! \n Press space bar to restart `;
  }
 if (hasWon){
    bird.body.velocity.x = 0;
    bird.setVelocityY(-5);
    messageToPlayer.text = ` You won!\n Press space bar to restart `;
 } 
}