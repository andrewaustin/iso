window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var grass = new Image();
    var dirt = new Image();
    var tree = new Image();

    grass.src = "images/grass.png";
    dirt.src = "images/dirt.png";
    tree.src = "images/tree.png";

    draw();

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(var y = 0; y < 100; y++) {
            var xOffset = 0;
            if (y % 2 != 0) {
                xOffset = grass.width / 2;
            }

            for(var x = 0; x < 100; x++) {
                var tilePosX = (x * grass.width) + xOffset;
                var tilePosY = (y * grass.height) / 2;

                ctx.drawImage(grass, Math.round(tilePosX), Math.round(tilePosY), grass.width, grass.height);
            }

        }

    }
}