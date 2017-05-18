

function shortest_path(m, n, start, end)
{
	var grid = [];

	// Initialization
	for (var i = 0; i < n; ++i )
	{
		grid[i] = [];
		for (var j = 0; j < m; ++j)
		{
			grid[i][j] =  "Unvisited";
		}
	}
    
    var paths = [];
	paths.push([start]);

	while (paths.length != 0)
	{
		var path = paths.shift();

		var last_node = path[path.length-1];

		if ((last_node.x == end.x) && (last_node.y == end.y))
		{
			return path;
		}

		var x = get_adjacent_elements(last_node);
		for (var i = 0; i < x.length; ++i)
		{
			var xcoord = x[i].x;
			var ycoord = x[i].y;

			if (grid[xcoord][ycoord] == "Unvisited")
			{
				var newPath = path.slice();
				newPath.push({x: x[i].x, y: x[i].y});
				grid[xcoord][ycoord] = "Visiting";
				paths.push(newPath);
			}
		}
	}

}

function get_adjacent_elements(last_node)
{
	var xcoord= last_node.x;
	var ycoord = last_node.y;


	var temp_array = [];
	if (xcoord+1 < 50)
	{
		var red = {x:xcoord+1, y:ycoord};
		temp_array.push(red);
	}

	if (xcoord-1 >= 0)
	{
		var red = {x:xcoord-1, y:ycoord};
		temp_array.push(red);
	}

    if (ycoord+1 < 50)
	{
		var red = {x:xcoord, y:ycoord+1};
		temp_array.push(red);
	}

	if (ycoord-1 >= 0)
	{
		var red = {x:xcoord, y:ycoord-1};
		temp_array.push(red);
	}

	return temp_array;
}