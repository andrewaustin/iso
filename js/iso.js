window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var grass = new Image();
    var dirt = new Image();
    var tree = new Image();

    grass.src = "images/grass.png";
    dirt.src = "images/dirt.png";
    tree.src = "images/tree.png";

    var map = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ];

    draw();

    canvas.addEventListener('click', handleMouseClick, false);

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

                if(map[y][x] == 0) {
                    ctx.drawImage(grass, Math.round(tilePosX), Math.round(tilePosY), grass.width, grass.height);
                } else {
                    ctx.drawImage(dirt, Math.round(tilePosX), Math.round(tilePosY), grass.width, grass.height);
                }
            }

        }

    }

    function handleMouseClick(e) {
        e.preventDefault();

        console.log('X: ' + e.clientX + ' Y:' + e.clientY);

        var tileX = Math.round(e.clientX / grass.width);
        var tileY = Math.round(e.clientY / grass.height);

        map[tileY][tileX] = 1;
        console.log('(' + tileX + ', ' + tileY + ')');
        draw();
    }
}