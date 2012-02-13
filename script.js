var canivas = new Canivas(document.getElementById('stage'));

canivas.fullScreen();

var mousedown = false;
var stack = [];

document.getElementById('stage').onmousedown = function(){ mousedown = true; }
document.getElementById('stage').onmouseup = function(){ mousedown = false; }
document.getElementById('stage').onmousemove = function(){
	
	if(!mousedown) return;

	stack.push({
		x: canivas.mouse.position().x,
		y: canivas.mouse.position().y,
		width: 75,
		height: 75,
		centered: true,
		color: {
			red: Math.floor(Math.random() * 256),
			blue: Math.floor(Math.random() * 256),
			green: Math.floor(Math.random() * 256)
		}
	});

};

setInterval(function(){
	canivas.clear();

	for(var i=0; i<stack.length; i++){
		var shape = stack.pop();

		shape.width -= 1;
		shape.height -= 1;

		if(shape.height <= 0 || shape.width <= 0) continue;

		canivas.circle(shape);

		stack.unshift(shape);
	}
}, 10);