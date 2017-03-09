var ui = {};

(function () {

    var canvas, ctx, timer, clockId, clock,
        cellSize = 50, canvasX, canvasY;

    function init(canvasId) {
        canvas = document.getElementById(canvasId);
        canvasX = canvas.offsetLeft;
        canvasY = canvas.offsetTop;
        console.log(canvasX);
        console.log(canvasY);
        canvas.onclick = onClick;
        ctx = canvas.getContext('2d');
        clock = 0;
    }

    function run() {
        try {
            timer = setTimeout(function (){
                clock++;
                updateClock();
                game.tick();
                update();
                run();
            }, 1000);
            /* game.tick();
            //update();*/
        } catch (ex) {
            alert(ex.message);
        }
    }

    function clear() {
        _clear();
        clearTimeout(timer);
        clock = 0;
        updateClock();
        game.initBoard(10, 10, []);
    }

    function _clear() {
        canvas.width = canvas.width;
    }

    function pause() {
        clearTimeout(timer);
    }

    function setRun(id) {
        setHandler(id, run);
    }

    function setClear(id) {
        setHandler(id, clear);
    }

    function setPause(id) {
        setHandler(id, pause);
    }

    function setClock(id) {
        clockId = id;
    }

    function setHandler(id, fn) {
        document.getElementById(id).onclick = fn;
    }

    function updateClock() {
    var timeStr = "";
        if (clock >= 60) {
            timeStr =
                Math.floor(clock / 60) + ":" +
                (clock % 60);
        } else if (clock < 10) {
            timeStr = "0:0" + clock;
        } else {
            timeStr = "0:" + clock;
        }
        document.getElementById(clockId).innerText = timeStr;
    }

    function onClick(evt){
        var point = getGridPosition(evt.clientX - canvasX, evt.clientY - canvasY);
        var result = game.setCell(point);
        update();
    }

    function getGridPosition(x, y) {
        console.log("x: " + x + ", y:" + y)
        var gridX = Math.floor(x / cellSize);
        var gridY = Math.floor(y / cellSize);

        return new game.Cell(gridX, gridY);
    }

    function update() {
        _clear();
        var board = game.getBoard();

        for (var i = 0; i < board.length; i++){
            for (var j = 0; j < board[i].length; j++) {
                if (board[i][j]) {
                    draw(new game.Cell(j, i));
                }
            }
        }
    }

    function draw(cell){
        ctx.fillStyle = "#002288";
        ctx.fillRect(cell.col * cellSize,
            cell.row * cellSize, cellSize, cellSize);
    }

    ui = {
        init: init,
        setClear: setClear,
        setPause: setPause,
        setRun: setRun,
        setClock: setClock
    };
})();