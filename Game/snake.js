	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");

	var canvas_width = canvas.width;
	var canvas_height = canvas.height;


	var cw = 10;
	var d;
	var food;
	var score;

	var xPosition = Math.round(canvas_width * Math.random()); 
	var yPosition = Math.round(canvas_height * Math.random()); 
	var snakeArray;

	paint_cell(xPosition,yPosition);

	function paint_cell(x, y)
	{
		ctx.fillStyle = "blue";
		ctx.fillRect(x, y, cw, cw);
		ctx.strokeStyle = "white";
		ctx.stroke();
	}