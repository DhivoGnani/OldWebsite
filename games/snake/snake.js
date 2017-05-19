/********** Author: Dhivo Gnani **********/ 

// Constructor
function Snake()
{
	this.coordinates = [];
}

// Return end of snake
Snake.prototype.pop = function()
{
	return this.coordinates.pop();
}

// Add to end of snake
Snake.prototype.push = function(x_coord,y_coord)
{
	return this.coordinates.push({x: x_coord, y: y_coord});
}

// Return length of snake
Snake.prototype.length = function ()
{
	return this.coordinates.length;
}

// Return head of snake
Snake.prototype.head = function()
{
	// Return first element
	if (this.length() != 0)
	{	
		return this.get(0);
	}
	return null;
}

// Check if snake is empty
Snake.prototype.isEmpty = function()
{
	return this.length() == 0;
}

// Add to beginning of snake
Snake.prototype.unShift = function(x_coord, y_coord)
{
	return this.coordinates.unshift({x: x_coord, y: y_coord});
}

// Use index to get specific coordinate of snake
Snake.prototype.get = function(index)
{
	return this.coordinates[index];
}