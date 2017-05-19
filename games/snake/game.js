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

	var canvas = document.getElementById("snakeCanvas");
	var ctx = canvas.getContext("2d");
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;
	var cellWidth = 10;

	var timer;
	var snake; 
	var enemyAI;
	var gameState = new GameState();

	var gameFinished;
	var wantEat = true;

	var food;
	var score;
	var currentDirection;

    
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
    	enemyAI = {x: 1, y :42};
    	snake = new Snake();
		snake.push(0,0);
		food = create_food();
		score = 0;
		currentDirection= direction.RIGHT;
		gameFinished = false;
    }
    
    function getShortestPath(start, end)
	{
		var grid = new Grid(50,50);
		return grid.search(start, end);
	}	

	function start() 
	{
		if (gameFinished)
		{
			gameState.resetLevel();
			end_game();
		}
		else {
			paint_canvas();
			paint_snake();
	        paint_food();
	        if(gameState.getLevel() != 1)
	        {
	        	paint_enemyAI();
	        }
			var head_xposition = snake.head().x;
			var head_yposition = snake.head().y;

		    if (food_eaten())
		    {
		    	snake.push(null, null);
		    	food = create_food();
		    	document.getElementById("Score").innerHTML =  "Score: " + gameState.addPoint();
		    	if (gameState.getScore() == 10 && gameState.getLevel() != 2)
		    	{
		    		gameState.nextLevel();
		    		end_game();
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


			if (check_wall_collision(tail.x, tail.y) || check_body_collision(tail.x, tail.y) || check_eat_collision(tail.x, tail.y))
		    {
		    	gameFinished = true;
		    }

		    else 
		    {
		    	snake.unShift(tail.x , tail.y);

		    	if (wantEat && gameState.getLevel() != 1)
		    	{
			    	var path = getShortestPath(enemyAI, { x: snake.head().x, y: snake.head().y}); 
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
	}
    
    function create_food()
    {
    	var food = {
   			x : random_num(0,49),
   			y : random_num(0,49)
   		};

   		return food;
    }

    function food_eaten()
    {
    	return (snake.head().x == food.x  && snake.head().y == food.y)
    }

	function paint_food()
	{
		paint_cell(food.x*10, food.y*10, "blue");
	}

	function paint_enemyAI()
	{
		paint_cell(enemyAI.x* cellWidth, enemyAI.y* cellWidth, "red");
	}

	function paint_canvas()
	{
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);
		ctx.strokeStyle = "white";
		ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
	}

	/**
	 * Returns a random integer between min (inclusive) and max (inclusive)
	 */
	function random_num(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function paint_cell(x, y, color)
	{
		ctx.fillStyle = color;
		ctx.fillRect(x, y, cellWidth, cellWidth);
		ctx.strokeStyle = color;
		ctx.stroke();
	}

	function paint_snake()
	{
		for (var i = 0; i < snake.length(); ++i)
		{
			var element = snake.get(i);
			paint_cell(element.x*10, element.y*10, "white");
		}
	}
    
    function check_body_collision(x,y)
    {
   		for (var  i = 0; i < snake.length(); ++i)
   		{
   			var element = snake.get(i);
   			if(element.x == x && element.y == y)
   			{
   				return true;
   			}
   		}

   		return false;
    }

    function check_eat_collision(x,y)
    {
		if(enemyAI.x == x && enemyAI.y == y)
		{
			return true;
		}

		for (var  i = 0; i < snake.length(); ++i)
   		{
   			var element = snake.get(i);
   			if(element.x == enemyAI.x && element.y == enemyAI.y)
   			{
   				return true;
   			}
   		}
   		return false;
    }
    
	function check_wall_collision(x,y)
	{
		if (x >= canvasWidth/cellWidth || x < 0 || y < 0 || y >= canvasHeight/cellWidth)
		{
			return true;
		}

		return false;
	}

	// FIXME: Refactor
	function end_game()
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
	    ctx.clearRect(0,0, canvasWidth, canvasHeight);
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