	/* Author: Dhivo Gnani */ 

(function(){
	
	// enum containing possible directions of movement for snake
	var direction = 
	{
		RIGHT: "Right",
		LEFT: "Left",
		UP: "Up",
		DOWN: "Down"
	}

	var timer;
	var snake; 
	var enemyAI;
	var gameState = new GameState();

	
	var wantEat = true;

	var food;
	var score;
	var currentDirection;
	var canvas;

    
    function startGame()
    {
     	 wantEat = false;
    	 document.getElementById("start").style.display = 'none';
    	 document.getElementById("snakeCanvas").style.display = 'block';
    	 document.getElementById("Score").style.display =  'block';
    	 document.getElementById("level").style.display =  'block';
    	 initialize();

    	 timer = setInterval(start, 60);
    }

    function initialize()
    {
    	gameState.resetScore();

    	if (gameState.getLevel() == 2) {
    		enemyAI = new EnemyAI(5, 24, true);
    	} else {
    		enemyAI = new EnemyAI(5, 5, false);
    	}


    	snake = new Snake();
		snake.push(0,0);
		food = new Food(randomNum(0,49),randomNum(0,49));

		canvas = new SnakeCanvas(snake,food, enemyAI);
		currentDirection= direction.RIGHT;
    }
    
    function getShortestPath(start, end)
	{
		var grid = new Grid(50,50);
		return grid.search(start, end);
	}	

	function start() 
	{
		if (checkWallCollision(snake.head().x, snake.head().y) || checkEnemyCollision(snake.head().x, snake.head().y))
	    {
	    	gameState.resetLevel();
	    	endGame();
	    	return;
	    }

		canvas.paint();

		var head_xposition = snake.head().x;
		var head_yposition = snake.head().y;

	    if (foodEaten())
	    {
	    	snake.push(null, null);
	    	
	    	food.setX(randomNum(0,49));
	    	food.setY(randomNum(0,49));
	    	
	    	document.getElementById("Score").innerHTML =  "Score: " + gameState.addPoint();
	    	if (gameState.getScore() == 10 && gameState.getLevel() != 2)
	    	{
	    		gameState.nextLevel();
	    		endGame();
	    		document.getElementById("start").innerHTML =  "Level: 2<br/><br/><Score: " + gameState.getScore()  + "<br/><br/>Press Enter";
	    		return;
	    	}
	    }

	    switch(currentDirection)
	    {
	    	case direction.RIGHT:
	    		head_xposition += 1;
	    		break;
	    	case direction.LEFT:
	    		head_xposition -= 1;
	    		break;
	    	case direction.UP:
	    		head_yposition -= 1;
	    		break;
	    	case direction.DOWN:
	    		head_yposition += 1;
	    		break;
	    }

		var tail = snake.pop();

		tail.x = head_xposition;
		tail.y = head_yposition;


		if (snake.contains(tail.x, tail.y))
	    {
	    	gameState.resetLevel();
	    	endGame();
	    	return;
	    }

	    else 
	    {
	    	snake.unShift(tail.x , tail.y);

	    	if (wantEat && gameState.getLevel() != 1)
	    	{
		    	var path = getShortestPath({x:enemyAI.x, y:enemyAI.y}, { x: snake.head().x, y: snake.head().y}); 
		    	if (path.length < 3)
		    	{
		    		enemyAI.x = path[0].x;
		    		enemyAI.y = path[0].y;
		    	}
		    	else {
		    		enemyAI.x = path[1].x;
		    		enemyAI.y = path[1].y;
		    	}
		    	wantEat = false;
		    }
		    else {
		    	wantEat = true;
		    }
		}
		
	}
    
    function foodEaten()
    {
    	return (snake.head().x == food.x  && snake.head().y == food.y)
    }

	/**
	 * Returns a random integer between min (inclusive) and max (inclusive)
	 */
	function randomNum(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

    function checkEnemyCollision(x,y)
    {
		if(enemyAI.x == x && enemyAI.y == y)
		{
			return true;
		}

		return snake.contains(enemyAI.x, enemyAI.y);
    }
    
	function checkWallCollision(x,y)
	{
		if (x >= canvas.canvasWidth/canvas.cellWidth || x < 0 || y < 0 || y >= canvas.canvasHeight/canvas.cellWidth)
		{
			return true;
		}

		return false;
	}

	// FIXME: Refactor
	function endGame()
	{
		var currentScore = gameState.getScore();
    	clearInterval(timer);
    	document.getElementById("start").innerHTML =  "Score: " + currentScore + "<br/><br/>Restart Game<br/><br/>Press Enter";
    	document.getElementById("start").style.display = 'block';
	    document.getElementById("snakeCanvas").style.display = 'none';
	    document.getElementById("Score").style.display = 'none';
	    document.getElementById("level").style.display = 'none';
	    document.getElementById("Score").innerHTML =  "Score: 0";
	    document.getElementById("level").innerHTML =  "Level: " + gameState.getLevel();
	    canvas.clear();
	    gameState.stop();
	}

	$(document).keydown(function(e) {
	  var key = e.which;

	  if (gameState.hasStarted()) {
		if(key == "37" && currentDirection != direction.RIGHT) currentDirection = direction.LEFT;
		else if(key == "38" && currentDirection != direction.DOWN) currentDirection = direction.UP;
		else if(key == "39" && currentDirection != direction.LEFT)currentDirection = direction.RIGHT;
		else if(key == "40" && currentDirection != direction.UP) currentDirection = direction.DOWN;
	  }
	  else {
  	   if(key == "32") {
    	
    		gameState.start();
    		startGame();
    	}
	  }
	})

})();