window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var grass = new Image();
    var dirt = new Image();
    var tree = new Image();

    grass.src = "images/grass.png";
    dirt.src = "images/dirt.png";
    tree.src = "images/tree.png";

    var scrollPosition = { x: 0, y: 0 };

    var map = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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

                tilePosX += scrollPosition.x;
                tilePosY += scrollPosition.y;

                if(map[y][x] == 0) {
                    ctx.drawImage(grass, Math.round(tilePosX), Math.round(tilePosY), grass.width, grass.height);
                } else {
                    ctx.drawImage(dirt, Math.round(tilePosX), Math.round(tilePosY), grass.width, grass.height);
                }
            }

        }

    }

    function handleKeyDown(e) {
        switch (e.keyCode) {
            case Keys.UP:
            case Keys.W:
                e.preventDefault();
                scrollPosition.y += grass.height;
                break;
            case Keys.DOWN:
            case Keys.S:
                e.preventDefault();
                scrollPosition.y -= grass.height;
                break;
            case Keys.LEFT:
            case Keys.A:
                e.preventDefault();
               scrollPosition.x += grass.width;
                break;
            case Keys.RIGHT:
            case Keys.D:
                e.preventDefault();
                scrollPosition.x -= grass.width;
                break;
        }

        draw();
    }

    function handleMouseClick(e) {
        e.preventDefault();

        console.log('X: ' + e.clientX + ' Y:' + e.clientY);

        var hWidth = grass.width / 2;
        var hHeight = grass.height / 2;

        var pX = e.clientX - hWidth;
        var pY = e.clientY - hHeight;

        console.log('pX: ' + pX + ' pY: ' + pY);

        var x = Math.floor((pX + (pY - hHeight) * 2) / grass.width);
        var y = Math.floor((pY - (pX - hWidth) * 0.5) / grass.height);

        console.log('x: ' + x + ' y: ' + y);

        // FIXME: ty is off sometimes:
        // http://gamedev.stackexchange.com/questions/38320/is-it-possible-to-map-mouse-coordinates-to-isometric-tiles-with-this-coordinate
        // http://gamedev.stackexchange.com/questions/45103/staggered-isometric-map-calculate-map-coordinates-for-point-on-screen?lq=1
        // x: 12 y: 25 is correct but x:12 y:26 is out
        var ty = y + x + 2 - 1;
        var xOffset = 0;
        if(ty % 2 != 0) {
            xOffset = -1;
        }

        var tx = Math.floor((x + xOffset - y) / 2) + 1 ;

        console.log('tx: ' + tx + ' ty: ' + ty);

        map[ty][tx] = !map[ty][tx];
        draw();
    }
};