window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var grass = new Image();
    var dirt = new Image();
    var tree = new Image();
    var water = new Image();
    var hittest = new Image();

    grass.src = "images/grass.png";
    dirt.src = "images/dirt.png";
    tree.src = "images/tree.png";
    water.src = "images/water.png";
    hittest.src = "images/hittest.png";

    var scrollPosition = { x: 0, y: 0 };

    var map = [
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
    ];

    var Keys = {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        W: 87,
        A: 65,
        S: 83,
        D: 68,
        Z: 90,
        X: 88,
        R: 82
    };

   /* var hitTest = [];
    hittest.onload = function() {
        var offScreenCanvas = document.createElement('canvas');
        var offctx = offScreenCanvas.getContext('2d');
        offScreenCanvas.width = 128;
        offScreenCanvas.height = 64;
        offctx.clearRect(0, 0, 128, 64);
        offctx.drawImage(hittest, 0, 0);
        var imgData = offctx.getImageData(0, 0, 128, 64);
        console.dir(imgData);
        console.log('Length: ' + imgData.data.length);
        var length = imgData.data.length;
        for (var i = 3; i < length; i+=4) {
            if(imgData.data[i] !== 0) {console.log(imgData.data[i]); }
            hitTest[(i+1)/4] = imgData.data[i];
        }
    };*/

    draw();
    canvas.addEventListener('click', handleMouseClick, false);
    window.addEventListener('keydown', handleKeyDown, false);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(var y = 0; y < map.length; y++) {
            var xOffset = 0;
            if (y % 2 != 0) {
                xOffset = grass.width / 2;
            }

            for(var x = 0; x < map[0].length; x++) {
                var tilePosX = (x * grass.width) + xOffset;
                var tilePosY = (y * grass.height) / 2;

                tilePosX -= scrollPosition.x;
                tilePosY -= scrollPosition.y;

                if(map[y][x] == 0) {
                    ctx.drawImage(grass, Math.round(tilePosX), Math.round(tilePosY), grass.width, grass.height);
                } else if (map[y][x] == 1) {
                    ctx.drawImage(dirt, Math.round(tilePosX), Math.round(tilePosY), grass.width, grass.height);
                } else {
                    ctx.drawImage(water, Math.round(tilePosX), Math.round(tilePosY), grass.width, grass.height);
                }
            }

        }

    }

    function handleKeyDown(e) {
        switch (e.keyCode) {
            case Keys.UP:
                e.preventDefault();
                scrollPosition.y -= grass.height;
                break;
            case Keys.DOWN:
                e.preventDefault();
                scrollPosition.y += grass.height;
                break;
            case Keys.LEFT:
                e.preventDefault();
                scrollPosition.x -= grass.width;
                break;
            case Keys.RIGHT:
                e.preventDefault();
                scrollPosition.x += grass.width;
                break;
        }

        console.log(map.length);
        console.dir(scrollPosition.y);

        // Don't scroll too far. It probably looks better if canvas.width % tile.width === 0.
        if(scrollPosition.x < 0) {
            scrollPosition.x = 0;
        } else if(scrollPosition.x >= (map[0].length+1)*grass.width - canvas.width) {
            scrollPosition.x = (map[0].length+1)*grass.width - canvas.width;
        }

        // No idea why its /4 but it works.
        if(scrollPosition.y < 0) {
            scrollPosition.y = 0;
        } else if(scrollPosition.y >= (map.length*grass.height - canvas.height) / 4) {
            scrollPosition.y = (map.length*grass.height - canvas.height) / 4;
        }

        console.log(map.length);
        console.dir(scrollPosition.y);

        draw();
    }

    function handleMouseClick(e) {
        e.preventDefault();

        //console.log('X: ' + e.clientX + ' Y:' + e.clientY);
        //var coords = worldToTilePos(e.clientX, e.clientY, scrollPosition);
        //console.log('X: ' + coords.x + ' Y:' + coords.y);

        var hWidth = grass.width / 2;
        var hHeight = grass.height / 2;

        var pX = e.clientX - hWidth;
        var pY = e.clientY - hHeight;

        //console.log('pX: ' + pX + ' pY: ' + pY);

        var x = Math.floor((pX + (pY - hHeight) * 2) / grass.width);
        var y = Math.floor((pY - (pX - hWidth) * 0.5) / grass.height);

        //console.log('x: ' + x + ' y: ' + y);

        // http://gamedev.stackexchange.com/questions/38320/is-it-possible-to-map-mouse-coordinates-to-isometric-tiles-with-this-coordinate
        // http://gamedev.stackexchange.com/questions/45103/staggered-isometric-map-calculate-map-coordinates-for-point-on-screen?lq=1
        var ty = y + x + 2 - 1;
        var xOffset = 0;
        if(ty % 2 != 0) {
            xOffset = -1;
        }
        ty = ty + 2*(scrollPosition.y/grass.height);

        var tx = Math.floor((x + xOffset - y) / 2) + 1;
        tx = tx + scrollPosition.x/grass.width;

        //console.log('tx: ' + tx + ' ty: ' + ty);
        //var ty = coords.y;
        //var tx = coords.x;
        map[ty][tx] = 2;
        draw();
    }

    function worldToTilePos(x, y, scrollPosition) {
        // TODO: The code doesn't work anymore.

        var th = grass.height;
        var tw = grass.width;
        var eventilex = Math.floor(x % tw);
        var eventiley = Math.floor(y % th);
        console.log(eventilex + eventiley * tw);
        console.log(hitTest[eventilex + eventiley * tw]);
        var scrollOffsetY = scrollPosition.y / grass.height;
        var scrollOffsetX = scrollPosition.x / grass.width;
        if (hitTest[eventilex + eventiley * tw] !== 255) {
            /* On even tile */
            console.log('even');
            return {
                x: Math.floor((x + tw) / tw) - 1 - scrollOffsetX,
                y: 2 * (Math.floor((y + th) / th) - 1) - scrollOffsetY
            };
        } else {
            /* On odd tile */
            console.log('odd');
            return {
                x: Math.floor((x + tw / 2) / tw) - 1 - scrollOffsetX,
                y: 2 * (Math.floor((y + th / 2) / th)) - 1 - scrollOffsetY
            };
        }
    }
};