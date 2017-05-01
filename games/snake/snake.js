	var canvas = document.getElementById("snakeCanvas");
	var ctx = canvas.getContext("2d");

    var game_started = false;
	var canvas_width = canvas.width;
	var canvas_height = canvas.height;
	var cell_width = 10;
	var x_position = Math.round(canvas_width * Math.random()); 
	var y_Position = Math.round(canvas_height * Math.random()); 
	var snakeArray;	
	
	// Best way to define enum?
	var direction = 
	{
		RIGHT: "Right",
		LEFT: "Left",
		UP: "Up",
		DOWN: "Down"
	}

	var food = {x: 200, y:0}

	var current_direction = "Right";
	// initial position
	var snake_array = [{x: 0,y:0}];

    
    function start_game()
    {
    	 document.getElementById("start").style.display = 'none';
    	 setInterval(start, 60);
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
	    	food.x = random_num(0,44)* cell_width;
	    	food.y = random_num(0,44)* cell_width;
	    }
	    // TODO use switch statement
		if (current_direction == direction.RIGHT) head_xposition += cell_width;
		if (current_direction == direction.LEFT) head_xposition -= cell_width;
		if (current_direction == direction.UP) head_yposition -= cell_width;
		if (current_direction == direction.DOWN) head_yposition += cell_width;

		var tail = snake_array.pop();
		tail.x = head_xposition;
		tail.y = head_yposition;

		

		if (check_wall_collision(tail.x, tail.y) || check_body_collision(tail.x, tail.y))
	    {
	    	// snake_array[0].x = 0
	    	// snake_array[0].y = 0;
	    	// current_direction = direction.RIGHT;
	    	location.reload();
	    }

	    snake_array.unshift(tail);
	}
    
    function food_eaten()
    {
    	return (snake_array[0].x == food.x  && snake_array[0].y == food.y)
    }

	function paint_food()
	{
		paint_cell(food.x, food.y);
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
		ctx.fillStyle = "blue";
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

	$(document).keydown(function(e){

		var key = e.which;
		if(key == "37" && current_direction != direction.RIGHT) current_direction = direction.LEFT;
		else if(key == "38" && current_direction != direction.DOWN) current_direction = direction.UP;
		else if(key == "39" && current_direction != direction.LEFT)current_direction = direction.RIGHT;
		else if(key == "40" && current_direction != direction.UP) current_direction = direction.DOWN;
	})

	$(document).keypress(function(e) {
	    if(e.which == 32) {
	    	if (!game_started)
	    	{
	    		game_started = true;
	    		start_game();
	    	}
	    }
	});