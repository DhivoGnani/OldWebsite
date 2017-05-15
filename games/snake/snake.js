	// TODO Create snake clas to for encapsulation of game functionality
	(function(){


	// Global variables
	var canvas = document.getElementById("snakeCanvas");
	var ctx = canvas.getContext("2d");
	var timer;
    var game_started = false;
	var canvas_width = canvas.width;
	var canvas_height = canvas.height;
	var cell_width = 10;
	var x_position = Math.round(canvas_width * Math.random()); 
	var y_Position = Math.round(canvas_height * Math.random()); 
	var snakeArray;	

	// Direction enum
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
	var snake_array; 
    
    function start_game()
    {
    	 document.getElementById("start").style.display = 'none';
    	 document.getElementById("snakeCanvas").style.display = 'block';
    	 initialize();

    	 timer = setInterval(start, 60);
    }

    // set necessary variables
    function initialize()
    {
		snake_array = [{x: 0,y:0}];
		food = create_food();
		score = 0;
		current_direction= direction.RIGHT;
    }

	function start() 
	{
		// Repaint canvas to remove previous painted snake 
		paint_canvas();
		paint_snake();
        paint_food();
		var head_xposition = snake_array[0].x;
		var head_yposition = snake_array[0].y;

	    if (food_eaten())
	    {
	    	snake_array.push({});

	    	// create new random food
	    	food = create_food();
	    	++score;
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

		var tail = snake_array.pop();

		tail.x = head_xposition;
		tail.y = head_yposition;


		if (check_wall_collision(tail.x, tail.y) || check_body_collision(tail.x, tail.y))
	    {
	    	end_game();
	    }

	    else 
	    {
	    	snake_array.unshift(tail);
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
    	return (snake_array[0].x == food.x  && snake_array[0].y == food.y)
    }

	function paint_food()
	{
		paint_cell(food.x, food.y);
		var scoreText = "Score:" + score;
		ctx.fillText(scoreText, canvas_width - 45, canvas_height-5);
	}

	function paint_canvas()
	{
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, canvas_width, canvas_height);
		ctx.strokeStyle = "white";
		ctx.strokeRect(0, 0, canvas_width, canvas_height);
	}

	/**
	 * Returns a random integer between min (inclusive) and max (inclusive)
	 * Using Math.round() will give you a non-uniform distribution!
	 */
	function random_num(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function paint_cell(x, y)
	{
		ctx.fillStyle = "red";
		ctx.fillRect(x, y, cell_width, cell_width);
		ctx.strokeStyle = "white";
		ctx.stroke();
	}

	function paint_snake()
	{
		for (var i = 0; i < snake_array.length; ++i)
		{
			paint_cell(snake_array[i].x, snake_array[i].y)
		}
	}
    
    function check_body_collision(x,y)
    {
   		for (var  i = 0; i < snake_array.length; ++i)
   		{
   			if(snake_array[i].x == x && snake_array[i].y == y)
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

	function end_game()
	{
    	clearInterval(timer);

    	// change text of start element
    	document.getElementById("start").innerHTML =  "Score: " + score + "<br/><br/>Restart Game<br/><br/>Press Enter";

    	// display start element
    	document.getElementById("start").style.display = 'block';

    	// hide canvas
	    document.getElementById("snakeCanvas").style.display = 'none';

	    // clear canvas
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