# Enigma racing

A small game made by `Phaser.js`

[Production](https://virtual-plating-309512.web.app/)

Requirements :
 - Web Server : [more information](https://phaser.io/tutorials/getting-started-phaser3/part2)


## Integration

You can run directly on your server.

You can also include it in html and point `index.html` in public file:

```html
<iframe src="index.html" width="800" height="600" scrolling="no" frameborder="0">
```

Or include with online link:
```html
<iframe src="https://virtual-plating-309512.web.app/" width="800" height="600" scrolling="no" frameborder="0">
```

## Rules

It is a racing game with 3 players. All players speed are set randomnly.

### Touch
|Players|Moving back|Moving forward|
|-------|:---------:|:-------------:|
|Green  |`Q`        |`S`            |
|Blue   |`G`        |`H`            |
|Pink   |`L`        |`M`            |

To (re)init the game you cans press `ESCAPE`.

The rank of each players is displayed on top left.