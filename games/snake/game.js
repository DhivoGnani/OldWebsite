	/* Author: Dhivo Gnani */ 

	(function(){

	var level = 1;
	var canvas = document.getElementById("snakeCanvas");
	var ctx = canvas.getContext("2d");
	var timer;
    var game_started = false;
	var canvas_width = canvas.width;
	var canvas_height = canvas.height;
	var cell_width = 10;
	var x_position = Math.round(canvas_width * Math.random()); 
	var y_Position = Math.round(canvas_height * Math.random()); 
	var game_finished;
	var eater;
	var want_eat = true;
	var previous_eater;
	var eat_done;
	var direction = 
	{
		RIGHT: "Right",
		LEFT: "Left",
		UP: "Up",
		DOWN: "Down"
	}

	var food;
	var score;
	var current_direction;
	var snake; 
    
    function start_game()
    {
     	 want_eat = false;
    	 document.getElementById("start").style.display = 'none';
    	 document.getElementById("snakeCanvas").style.display = 'block';
    	 document.getElementById("Score").style.display =  'block';
    	 document.getElementById("level").style.display =  'block';
    	 initialize();

    	 timer = setInterval(start, 60);
    }

    function initialize()
    {
    	eat_done = false;
    	previous_eater = {x: 0, y :42};
    	eater = {x: 1, y :42};
    	snake = new Snake();
		snake.push(0,0);
		food = create_food();
		score = 0;
		current_direction= direction.RIGHT;
		game_finished = false;
    }
    
    function get_shortest_path(start, end)
	{
		var grid = new Grid(50,50);
		return grid.search(start, end);
	}	

	function start() 
	{
		if (game_finished)
		{
			level = 1;
			end_game();
		}
		else {
			paint_canvas();
			paint_snake();
	        paint_food();
	        if(level != 1)
	        {
	        	paint_eater();
	        }
			var head_xposition = snake.head().x;
			var head_yposition = snake.head().y;

		    if (food_eaten())
		    {
		    	snake.push(null, null);
		    	food = create_food();

		    	++score;
		    	document.getElementById("Score").innerHTML =  "Score: " + score;
		    	if (score == 10 && level != 2)
		    	{
		    		level = level + 1;
		    		end_game();
		    		document.getElementById("start").innerHTML =  "Level: 2<br/><br/><Score: " + score + "<br/><br/>Press Enter";
		    		return;
		    	}
		    }

		    switch(current_direction)
		    {
		    	case direction.RIGHT:
		    		head_xposition += cell_width;
		    		break;
		    	case direction.LEFT:
		    		head_xposition -= cell_width;
		    		break;
		    	case direction.UP:
		    		head_yposition -= cell_width;
		    		break;
		    	case direction.DOWN:
		    		head_yposition += cell_width;
		    		break;
		    }

			var tail = snake.pop();

			tail.x = head_xposition;
			tail.y = head_yposition;


			if (check_wall_collision(tail.x, tail.y) || check_body_collision(tail.x, tail.y) || check_eat_collision(tail.x, tail.y))
		    {
		    	game_finished = true;
		    }

		    else 
		    {
		    	snake.unShift(tail.x , tail.y);

		    	if (want_eat && level != 1)
		    	{
			    	var path = get_shortest_path(eater, { x: snake.head().x/10, y: snake.head().y/10}); 
			    	previous_eater = eater;

			    	if (path.length < 3)
			    	{
			    		eater.x = path[0].x;
			    		eater.y = path[0].y;
			    		eat_done = true;
			    	}
			    	else {
			    		eater.x = path[1].x;
			    		eater.y = path[1].y;
			    	}
			    	want_eat = false;
			    }
			    else {
			    	want_eat = true;
			    }
			}
		}
	}
    
    function create_food()
    {
    	var food = {
   			x : random_num(0,49)* cell_width,
   			y : random_num(0,49)* cell_width
   		};

   		return food;
    }

    function food_eaten()
    {
    	return (snake.head().x == food.x  && snake.head().y == food.y)
    }

	function paint_food()
	{
		paint_cell(food.x, food.y, "blue");
	}

	function paint_eater()
	{
		paint_cell(eater.x* cell_width, eater.y* cell_width, "red");
	}

	function paint_canvas()
	{
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas_width, canvas_height);
		ctx.strokeStyle = "white";
		ctx.strokeRect(0, 0, canvas_width, canvas_height);
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
		ctx.fillRect(x, y, cell_width, cell_width);
		ctx.strokeStyle = color;
		ctx.stroke();
	}

	function paint_snake()
	{
		for (var i = 0; i < snake.length(); ++i)
		{
			var element = snake.get(i);
			paint_cell(element.x, element.y, "white");
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
		if(eater.x*10 == x && eater.y*10 == y)
		{
			return true;
		}

		for (var  i = 0; i < snake.length(); ++i)
   		{
   			var element = snake.get(i);
   			if(element.x == eater.x*10 && element.y == eater.y*10)
   			{
   				return true;
   			}
   		}
   		return false;
    }
    
	function check_wall_collision(x,y)
	{
		if (x >= canvas_width || x < 0 || y < 0 || y >= canvas_height)
		{
			return true;
		}

		return false;
	}

	// FIXME: Refactor
	function end_game()
	{
    	clearInterval(timer);
    	document.getElementById("start").innerHTML =  "Score: " + score + "<br/><br/>Restart Game<br/><br/>Press Enter";
    	document.getElementById("start").style.display = 'block';
	    document.getElementById("snakeCanvas").style.display = 'none';
	    document.getElementById("Score").style.display = 'none';
	    document.getElementById("level").style.display = 'none';
	    document.getElementById("Score").innerHTML =  "Score: 0";
	    document.getElementById("level").innerHTML =  "Level: " + level;
	    ctx.clearRect(0,0, canvas_width, canvas_height);
	    game_started = false;
	}

	$(document).keydown(function(e) {
	  var key = e.which;

	  if (game_started) {
		if(key == "37" && current_direction != direction.RIGHT) current_direction = direction.LEFT;
		else if(key == "38" && current_direction != direction.DOWN) current_direction = direction.UP;
		else if(key == "39" && current_direction != direction.LEFT)current_direction = direction.RIGHT;
		else if(key == "40" && current_direction != direction.UP) current_direction = direction.DOWN;
	  }
	  else {
  	   if(key == "32") {
    	
    		game_started = true;
    		start_game();
    	}
	  }
	})

})();