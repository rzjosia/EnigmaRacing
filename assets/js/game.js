const BACKGROUND_IMAGE = "BACKGROUND_IMAGE";

let EnigmaPlayers = [
    {
        name: "GREEN_PLAYER",
        title: "Green",
        ressourcePath: '/Player/p1_spritesheet.png',
        frame: {
            frameWidth: 73,
            frameHeight: 96
        },
        defaultPosition: {
            x: 50,
            y: 125
        },
        direction: {
            right: "GREEN_RIGHT_DIRECTION",
            left: "GREEN_LEFT_DIRECTION",
        },
        keyDirection: {
            left: "Q",
            right: "S"
        },
        velocityX: 1
    },

    {
        name: "BLUE_PLAYER",
        title: "Blue",
        ressourcePath: '/Player/p2_spritesheet.png',
        frame: {
            frameWidth: 71,
            frameHeight: 96
        },
        defaultPosition: {
            x: 50,
            y: 275
        },
        direction: {
            right: "BLUE_RIGHT_DIRECTION",
            left: "BLUE_LEFT_DIRECTION",
        },
        keyDirection: {
            left: "G",
            right: "H"
        },
        velocityX: 1.3
    },

    {
        name: "PINK_PLAYER",
        title: "Pink",
        ressourcePath: '/Player/p3_spritesheet.png',
        frame: {
            frameWidth: 73,
            frameHeight: 96
        },
        defaultPosition: {
            x: 50,
            y: 425
        },
        direction: {
            right: "PINK_RIGHT_DIRECTION",
            left: "PINK_LEFT_DIRECTION",
        },
        keyDirection: {
            left: "L",
            right: "M"
        },
        velocityX: 1.2
    }
]

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000',
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
};

const game = new Phaser.Game(config);
let sprites = [],
    rank = [],
    scoreText;

const getPlatformRessource = (localPath) => `assets/platform/${localPath}`.replaceAll(/\/+/gi, '/');

function preload() {
    this.load.image(BACKGROUND_IMAGE, getPlatformRessource('/bg.png'));

    EnigmaPlayers.forEach((player) => {
        this.load.spritesheet(player.name, getPlatformRessource(player.ressourcePath), player.frame);
    });
}

function create() {
    this.background = this.add.image(0, 0, BACKGROUND_IMAGE).setOrigin(0, 0);
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;

    this.add.image(0, 0, BACKGROUND_IMAGE).setOrigin(0, 0);

    EnigmaPlayers = EnigmaPlayers.map((player) => {
        player.sprite = this.add.sprite(player.defaultPosition.x, player.defaultPosition.y, player.name);

        this.anims.create({
            key: player.direction.right,
            frames: this.anims.generateFrameNumbers(player.name, { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: player.direction.left,
            frames: this.anims.generateFrameNumbers(player.name, { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1,
        });

        player.sprite.anims.play(player.direction.right, true);
        player.velocityX =  Phaser.Math.FloatBetween(1, 2);

        return player;
    })

    scoreText = this.add.text(16, 16, 'Start', { fontSize: '32px', fill: '#000' });
}

function update(time, delta) {
    const escapeKey = this.input.keyboard.addKey('ESC');

    EnigmaPlayers = EnigmaPlayers.map((player, i) => {
        const isBound = player.sprite.x + 71 >= this.sys.canvas.width || player.sprite.x <= 0;
        const rightKey = this.input.keyboard.addKey(player.keyDirection.right);
        const leftKey = this.input.keyboard.addKey(player.keyDirection.left);

        switch (true) {
            case escapeKey.isDown:
                rank = [];
                player.sprite.x = 50;
                player.velocityX =  Phaser.Math.FloatBetween(1, 2);
                break;
            case isBound:
                if (!rank.includes(i)) {
                    rank.push(i);
                }

                player.sprite.anims.stop();
                break;
            case this.input.keyboard.checkDown(rightKey, 1):
                player.sprite.anims.play(player.direction.right, true);
                player.sprite.x += player.velocityX;
                break;
            case this.input.keyboard.checkDown(leftKey, 1):
                player.sprite.anims.play(player.direction.left, true);
                player.sprite.x -= player.velocityX;
                break;
            default:
                player.sprite.anims.stop();
        }

        return player;
    });

    scoreText.setText(rank.map((item, i) => `${i + 1} - ${EnigmaPlayers[item].title}`));

    if (rank.length <= 0) {
        scoreText.setText("Run");
    }
}