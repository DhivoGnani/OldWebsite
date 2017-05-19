function Snake()
{
	this.coordinates = [];

}

Snake.prototype.pop = function()
{
	return this.coordinates.pop();
}

Snake.prototype.push = function(x_coord,y_coord)
{
	return this.coordinates.push({x: x_coord, y: y_coord});
}

Snake.prototype.length = function ()
{
	return this.coordinates.length;
}

Snake.prototype.head = function()
{
	// Return first element
	if (this.length() != 0)
	{	
		return this.coordinates[0];
	}
	return null;
}

Snake.prototype.isEmpty = function()
{
	return this.length() == 0;
}

Snake.prototype.unShift = function(x_coord, y_coord)
{
	return this.coordinates.unshift({x: x_coord, y: y_coord});
}

Snake.prototype.get = function(index)
{
	return this.coordinates[index];
}