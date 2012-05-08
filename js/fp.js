var GRID_SIZE = 4;
var CELL_SIZE = 50;


function cell(row, col, x, y, originalLoc, currentLoc, isEmpty) {
	this.r = row;
	this.c = col;
	this.x = x;
	this.y = y;
	this.originalLoc = originalLoc;
	this.currentLoc = currentLoc;
	this.isEmpty = isEmpty;
}

cell.prototype.drawCell = function(ctx, txt) {
	var padding = 1;
	var fontSize = 30 ;
	this.face = txt;	
	console.log("original: " + this.originalLoc + " currentLoc: " + this.currentLoc + " isEmpty: " + this.isEmpty + " R: " + this.r + " C: " + this.c);
	if (this.face == GRID_SIZE * GRID_SIZE)
		return;
	else{
		ctx.fillStyle = "#336C9F";
		ctx.fillRect(this.x + padding, this.y + padding, CELL_SIZE - 2 * padding, CELL_SIZE - 2 * padding);
		ctx.fillStyle = "#CCCC00";
		ctx.font = fontSize + "px Arial";
		ctx.fillText(txt, this.x + (CELL_SIZE - ctx.measureText(txt).width) / 2, this.y + (CELL_SIZE - fontSize) / 2 + fontSize);
	} // (100- fontsize)/2+fontsize
};

var cells = new Array(GRID_SIZE);
for(var i = 0; i < GRID_SIZE; i++) {
	cells[i] = new Array(GRID_SIZE);
} 	

$(function() {
	var canvas = document.getElementById("grid");
	var ctx = canvas.getContext("2d");
	canvas.width = GRID_SIZE * CELL_SIZE;
	canvas.height = GRID_SIZE * CELL_SIZE;
	ctx.strokeStyle = "yellow";
	
	for (var c = 0; c < GRID_SIZE; c++) {
		for (var r = 0; r < GRID_SIZE; r++) {
			ctx.strokeRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
			if ((r != GRID_SIZE - 1) || (c != GRID_SIZE - 1))
				cells[r][c] = new cell(r, c, c * CELL_SIZE, r * CELL_SIZE, GRID_SIZE * r + c + 1, GRID_SIZE * r + c + 1, false);
			else
				cells[r][c] = new cell(r, c, c * CELL_SIZE, r * CELL_SIZE, GRID_SIZE * r + c + 1, GRID_SIZE * r + c + 1, true);
		}
	}

	for (var r = 0; r < cells.length; r++)
		for (var c = 0; c < cells[r].length; c++) {
				cells[r][c].drawCell(ctx, GRID_SIZE * r + c + 1);			
		}

	$("#grid").click(function(e) {
		//if(e.offsetX>=)
		mouseX = e.offsetX;
		mouseY = e.offsetY;

		console.log("X: " + mouseX + " Y: " + mouseY);

		for (var r = 0; r < cells.length; r++)
			for (var c = 0; c < cells[r].length; c++) { 
				if ((cells[r][c].x <= mouseX && mouseX < (cells[r][c].x + CELL_SIZE)) && (cells[r][c].y <= mouseY && mouseY < (cells[r][c].y + CELL_SIZE))) { 
					var cellCliked = cells[r][c];
				}
			}
		console.log(cellCliked.face);

		if (cellCliked.r != 0) {
		 	var up = true;
		 	var upCell = cells[cellCliked.r - 1][cellCliked.c];
		}
		if (cellCliked.r != GRID_SIZE - 1) {
			var bottom = true;
			var bottomCell = cells[cellCliked.r + 1][cellCliked.c];
		}
		if (cellCliked.c != 0) {
			var left = true;
			var leftCell = cells[cellCliked.r][cellCliked.c - 1];
		}
		if (cellCliked.c != GRID_SIZE - 1) {
			var right = true;
			var rightCell = cells[cellCliked.r][cellCliked.c + 1];
		}

		if (up == true && upCell.isEmpty == true) 

			console.log ("yes move to up");
		else if (bottom == true && bottomCell.isEmpty == true) {
			console.log(cells[cellCliked.r][cellCliked.c].face);
			console.log ("yes move to  bottom");
			var temp = cells[cellCliked.r][cellCliked.c];
			cells[cellCliked.r][cellCliked.c] = cells[cellCliked.r + 1][cellCliked.c];
			cells[cellCliked.r + 1][cellCliked.c] = temp;
			//cells[cellCliked.r][cellCliked.c].r = bottomCell.r;
			//cells[cellCliked.r][cellCliked.c].c = bottomCell.c;
			console.log(cells[cellCliked.r][cellCliked.c].face);
			console.log(cells[cellCliked.r][cellCliked.c].r);
		}


		//	console.log ("yes move to  bottom");
		else if (right == true && rightCell.isEmpty == true)
			console.log ("yes move to right ");		
		else if (left == true && leftCell.isEmpty == true)
			console.log ("yes move to left ");
		else
			console.log("No move");

		/*if(cellCliked.r != 0)
		 var Up = cells[cellCliked.r - 1][cellCliked.c];
		if(cellCliked.r != GRID_SIZE - 1)
			var bottom = cells[cellCliked.r + 1][cellCliked.c];
		if(cellCliked.c != 0)
			var left = cells[cellCliked.r][cellCliked.c - 1];
		if(cellCliked.c != GRID_SIZE - 1)
			var right = cells[cellCliked.r][cellCliked.c + 1]; */
		/*if(right == true)
			console.log("R: " + right.face );
		else
			console.log("No R cell");*/
	});
});