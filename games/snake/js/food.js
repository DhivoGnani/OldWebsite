function Food(xCoord, yCoord)
{
	this.x = xCoord;
	this.y = yCoord;
}


Food.prototype.setX = function(xCoord)
{
	this.x = xCoord;
}

Food.prototype.setY = function(yCoord)
{
	this.y = yCoord;
}

Food.prototype.get = function()
{
	return {x: this.x, y: this.y};
}