/********** Author: Dhivo Gnani **********/ 

// Constructor
function Grid(m,n)
{
	this.m = m;
	this.n = n;
	this.grid = [];

	// Initialization
	// FIXME: Move initialization
	for (var i = 0; i < n; ++i )
	{
		this.grid[i] = [];
		for (var j = 0; j < m; ++j)
		{
			this.grid[i][j] =  "Unvisited";
		}
	}
}

// SSP implemented using BFS
// TODO: Implement serach using A* or Dijkstra instead?
Grid.prototype.search = function(start, end)
{
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

		var x = this.get_adjacent_elements(last_node);
		for (var i = 0; i < x.length; ++i)
		{
			var xcoord = x[i].x;
			var ycoord = x[i].y;

			if (this.grid[xcoord][ycoord] == "Unvisited")
			{
				var newPath = path.slice();
				newPath.push({x: x[i].x, y: x[i].y});
				this.grid[xcoord][ycoord] = "Visiting";
				paths.push(newPath);
			}
		}
		this.grid[last_node.x][last_node.y] = "Visited";
	}

}

// Get TOP, BOTTOM, LEFT, RIGHT adjacent elements
Grid.prototype.get_adjacent_elements = function(last_node)
{
	var xcoord= last_node.x;
	var ycoord = last_node.y;


	var temp_array = [];
	if (xcoord+1 < this.m)
	{
		temp_array.push({x:xcoord+1, y:ycoord});
	}

	if (xcoord-1 >= 0)
	{
		temp_array.push({x:xcoord-1, y:ycoord});
	}

    if (ycoord+1 < this.n)
	{
		temp_array.push({x:xcoord, y:ycoord+1});
	}

	if (ycoord-1 >= 0)
	{
		temp_array.push({x:xcoord, y:ycoord-1});
	}

	return temp_array;
}