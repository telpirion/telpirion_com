var game = {}; 
 
(function () {
	
	var grid, _grid;
	
	function Cell(row, col) {
		this.row = row;
		this.col = col;
	}
	
	function initBoard(width, height, cells){
		
		grid = [],
		_grid = [];
		
		for (var i = 0; i < width; i++){
			grid.push([]);
			_grid.push([]);
			for (var j = 0; j < height; j++){
				grid[i].push(false);
				_grid[i].push(false)
			}
		}
		
		for (var k = 0; k < cells.length; k++){
			var cell = cells[k];
			grid[cell.row][cell.col] = true;
		}
		
	} 
	
	function printBoard(){
		var boardStr = "";
		for (var i = 0; i < grid.length; i++){
			for (var j = 0; j < grid[i].length; j++){
				boardStr += grid[i][j] ? 
					"0" : "_";
			}
			boardStr += "\n";
		}
		return boardStr;
	}
	
	function tick() {
		for (var r = 0; r < grid.length; r++){
			for (var c = 0; c < grid.length; c++){
				isAlive(r, c);
			}
		}
		grid = _grid;
	}
	
	function isAlive(row, col){
		var status = grid[row][col],
			neighbors = getNeighbors(row, col);
			
		_grid[row][col] = status;
		
		if (status){
			_grid[row][col] = (neighbors == 3) || 
				(neighbors == 2);
		} else {
			_grid[row][col] = (neighbors == 3);
		}
	}
	
	function getCell(row, col) {
		return grid[row][col];
	}
	
	function setCell(cell) {
		if (grid[cell.row][cell.col]) {
			grid[cell.row][cell.col] = false; 
		} else {
			grid[cell.row][cell.col] = true;
		}
		return grid[cell.row][cell.col];
	}
	
	function getNeighbors(row, col){
		var startRow = (row - 1 < 0) ?
			0 : row - 1;
		var startCol = (col - 1 < 0) ?
			0 : col - 1;
		var endRow = (row + 2 >= grid.length) ?
			grid.length : row + 2;
		var endCol = (col + 2 >= grid[row].length) ?
			grid[row].length : col + 2;
		var count = 0;
		
		for (var r = startRow; r < endRow; r++) {
			for (var c = startCol; c < endCol; c++){
				if (grid[r][c]){
					count++;
				}
			}
		}
		
		if (grid[row][col]) {
			count--;
		}
		
		return count;
	}
	
	game = {
		tick: tick,
		printBoard: printBoard,
		initBoard: initBoard,
		setCell: setCell,
		getCell: getCell,
		getBoard: function () { return grid; },
		Cell: Cell
	};
	
})();