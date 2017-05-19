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

	var food;
	var timer;
	var snake; 
	var enemyAI;
	var gameState = new GameState();
	var canvas;
	
	var updateEnemyAICoord;
	var currentDirection;
	// number of food needed to eat before going to level 2
	var level2Req;

    
    function startGame()
    {
    	 hideMenu();
    	 showGame();

    	 initialize();
    	 timer = setInterval(start, 60);
    }

    function initialize()
    {
    	gameState.resetScore();

    	if (gameState.getLevel() == 2) {
    		enemyAI = new EnemyAI(5, 24, true);
    	} else {
    		enemyAI = new EnemyAI(null, null, false);
    	}

    	snake = new Snake();
		snake.push(0,0);
		food = new Food(randomNum(0,49),randomNum(0,49));
		updateEnemyAICoord = false;
		canvas = new SnakeCanvas(snake,food, enemyAI);
		currentDirection= direction.RIGHT;
		level2Req = 10;
    }
    
	function start() 
	{
		// Check if any wall collisions or EnemyAI collisions occured
		if (checkWallCollision(snake.head().x, snake.head().y) || checkEnemyCollision(snake.head().x, snake.head().y))
	    {
	    	gameState.reset();
	    	endGame();
	    	return;
	    }

	    // paint canvas
		canvas.paint();

		var head_xposition = snake.head().x;
		var head_yposition = snake.head().y;

	    if (foodEaten())
	    {
	    	snake.push(null, null);
	    	
	    	food.setX(randomNum(0,49));
	    	food.setY(randomNum(0,49));
	    	
	    	updateUIScore(gameState.addPoint());

	    	if (gameState.getScore() == level2Req && gameState.getLevel() != 2)
	    	{
	    		gameState.nextLevel();
	    		endGame();
	    		updateMenuText("Level: 2<br/><br/><Score:" + gameState.getScore()  + "<br/><br/>Press Enter");
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

	    	if (updateEnemyAICoord && enemyAI.enabled && (snake.head().x < 50) && (snake.head().y <50))
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
		    	updateEnemyAICoord = false;
		    }
		    else {
		    	updateEnemyAICoord = true;
		    }
		}
		
	}
    
    function foodEaten()
    {
    	return (snake.head().x == food.x  && snake.head().y == food.y);
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


	/************* End game*************/
	function endGame()
	{
    	clearInterval(timer);

    	var currentScore = gameState.getScore();
    	updateMenuText("Score:" + currentScore + "<br/><br/>Restart Game<br/><br/>Press Enter");
    	showMenu();
	    hideGame();
	   
	    updateUIScore(0);
	    updateUILevel(gameState.getLevel());

	    canvas.clear();
	    gameState.stop();
	}

	/************* Functions that manipulate DOM *************/
	function hideMenu()
	{
		document.getElementById("menu").style.display = 'none';
	}

	function showMenu()
	{
		document.getElementById("menu").style.display = 'block';
	}

	function hideGame()
	{
		 document.getElementById("game").style.display = 'none';
	}

	function showGame()
	{
		document.getElementById("game").style.display = 'block';
	}

	function updateUIScore(score)
	{
		document.getElementById("score").innerHTML =  "Score:" + score;
	}

	function updateUILevel(level)
	{
		document.getElementById("level").innerHTML =  "Level:" + level;
	}

	function updateMenuText(text)
	{
		document.getElementById("start").innerHTML =  text;
	}

	/************* Helper Functions *************/
	
	// Returns a random integer between min (inclusive) and max (inclusive)
	function randomNum(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function getShortestPath(start, end)
	{
		var grid = new Grid(50,50);
		return grid.search(start, end);
	}	

	/************* User Event Handlers *************/
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