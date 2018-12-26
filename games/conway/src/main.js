// Starts the Conway Game of Life.
window.onload = function () {
    game.initBoard(10, 10, []);
    ui.init("canvas");
    ui.setRun("run");
    ui.setClear("clear");
    ui.setPause("pause");
    ui.setClock("time");
};