window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var grass = new Image();
    var dirt = new Image();
    var tree = new Image();
    var water = new Image();

    grass.src = "images/grass.png";
    dirt.src = "images/dirt.png";
    tree.src = "images/tree.png";
    water.src = "images/water.png";

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
        RIGHT: 39
    };

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

        draw();
    }

    function handleMouseClick(e) {
        e.preventDefault();

        // SEE:
        // http://gamedev.stackexchange.com/questions/38320/is-it-possible-to-map-mouse-coordinates-to-isometric-tiles-with-this-coordinate
        // http://gamedev.stackexchange.com/questions/45103/staggered-isometric-map-calculate-map-coordinates-for-point-on-screen?lq=1

        var hWidth = grass.width / 2;
        var hHeight = grass.height / 2;

        var pX = e.clientX - hWidth;
        var pY = e.clientY - hHeight;

        //console.log('pX: ' + pX + ' pY: ' + pY);

        var x = Math.floor((pX + (pY - hHeight) * 2) / grass.width);
        var y = Math.floor((pY - (pX - hWidth) * 0.5) / grass.height);

        //console.log('x: ' + x + ' y: ' + y);

        var ty = y + x + 2 - 1;
        var xOffset = 0;
        if(ty % 2 != 0) {
            xOffset = -1;
        }

        var tx = Math.floor((x + xOffset - y) / 2) + 1;

        // There seems to be a bug here if developer tools overlaps part of the canvas that causes tile picking to be off.
        if(scrollPosition.y > 0) {
            ty = ty + 2*Math.ceil(scrollPosition.y/grass.height);
        }

        if(scrollPosition.x > 0) {
            tx = tx + Math.ceil(scrollPosition.x/grass.width);
        }

        map[ty][tx] = 2;
        draw();
    }
};