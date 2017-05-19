function SnakeCanvas(snake, food, enemyAI)
{
	this.canvas = document.getElementById("snakeCanvas");
	this.ctx = this.canvas.getContext("2d");
	this.canvasWidth = this.canvas.width;
	this.canvasHeight = this.canvas.height;
	this.cellWidth = 10;

	this.snake = snake;
	this.food = food;
	this.enemyAI = enemyAI;
}

SnakeCanvas.prototype.paintCell = function(xCoord, yCoord, color)
{
	this.ctx.fillStyle = color;
	this.ctx.fillRect(xCoord, yCoord, this.cellWidth, this.cellWidth);
	this.ctx.strokeStyle = color;
	this.ctx.stroke();
}

SnakeCanvas.prototype.paintSnake = function()
{
	for (var i = 0; i < this.snake.length(); ++i)
	{
		var element = this.snake.get(i);
		this.paintCell(element.x*this.cellWidth, element.y*this.cellWidth, "white");
	}
}

SnakeCanvas.prototype.paintFood = function()
{
	this.paintCell(this.food.x*10, this.food.y*10, "blue");
}

SnakeCanvas.prototype.paintEnemyAI = function()
{
	this.paintCell(this.enemyAI.x* this.cellWidth, this.enemyAI.y* this.cellWidth, "red");
}

SnakeCanvas.prototype.paintCanvas = function()
{
	this.ctx.fillStyle = "black";
	this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
	this.ctx.strokeStyle = "white";
	this.ctx.strokeRect(0, 0, this.canvasWidth, this.canvasHeight);
}

SnakeCanvas.prototype.paint = function()
{
	this.paintCanvas();
	this.paintSnake();
	this.paintFood();
	if(this.enemyAI.enabled)
	{
		this.paintEnemyAI();
	}
}

SnakeCanvas.prototype.clear = function()
{
	this.ctx.clearRect(0,0, this.canvasWidth, this.canvasHeight);
}