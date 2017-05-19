/********** Author: Dhivo Gnani **********/ 

function GameState()
{
	this.level = 1;
	this.score = 0;

	// bool indicating if game has started
	// Default is false
	this.gameHasStarted = false;
}


GameState.prototype.getLevel = function()
{
	return this.level;
}

GameState.prototype.getScore = function()
{
	return this.score;
}

GameState.prototype.addPoint = function()
{ 
	return ++this.score;
}

GameState.prototype.nextLevel = function()
{ 
	return ++this.level;
}

GameState.prototype.resetScore = function()
{
	this.score = 0;
	return this.score;
}

GameState.prototype.reset = function()
{
	this.score = 0;
	this.level = 1;
}

GameState.prototype.resetLevel = function()
{
	this.level = 1;
	return this.level;
}

GameState.prototype.hasStarted = function()
{
	return this.gameHasStarted;
}

GameState.prototype.start = function() 
{
	this.gameHasStarted = true;
}

GameState.prototype.stop = function()
{
	this.gameHasStarted = false;
}