var Canivas = function(canvas){

	var canivas = this;
	this.ctx = canvas.getContext('2d');

	var cx = this.ctx;

	this.defaults = {
		x:               0,
		y:               0,
		width:           50,
		height:          50,
		color:          'black',
		mousePosition:   false,
		centered:        false,
		shadow:          false,
		stroke:          false
	};

	this.setDefaults = function(obj){
		for(prop in obj) this.defaults[prop] = obj[prop];
		return this;
	}

	this.getDefaultOptions = function(obj, values){
		var object = {};
		
		for(prop in this.defaults) object[prop] = this.defaults[prop];
		for(prop in values) object[prop] = values[prop];
		for(prop in obj) object[prop] = obj[prop];

		if(object.mousePosition){
			object.x = this.mouse.position().x;
			object.y = this.mouse.position().y;
		}

		if(object.color instanceof Object){
			object.color = this.misc.color(object.color);
		}

		if(object.centered){
			object.x = this.misc.center(object).x;
			object.y = this.misc.center(object).y;
		}

		return object;
	}











	this.circle = function(obj,return_obj){
		opt = this.getDefaultOptions(obj,{
			shape: 'circle'
		});

		cx.fillStyle = opt.color;
		cx.ellipse(opt.x, opt.y, opt.width, opt.height);

		this
			.shadow(obj)
			.stroke(obj);

		cx.fill();

		return return_obj ? opt : this;
	}

	this.square = function(obj,return_obj){
		opt = this.getDefaultOptions(obj,{
			radius: 0,
			shape: 'square'
		});

		cx.fillStyle = opt.color;
		cx.roundRect(opt.x, opt.y, opt.width, opt.height, opt.radius);

		this
			.shadow(obj)
			.stroke(obj);

		cx.fill();

		return return_obj ? opt : this;
	}

	this.triangle = function(obj,return_obj){
		opt = this.getDefaultOptions(obj,{
			shape: 'triangle'
		});

		cx.fillStyle = opt.color;
		cx.triangle(opt.x, opt.y, opt.width, opt.height);

		this
			.shadow(obj)
			.stroke(obj);

		cx.fill();

		return return_obj ? opt : this;
	}

	this.shadow = function(obj){
		if(obj.shadow){

			if(!obj.shadow.x)        obj.shadow.x = 0;
			if(!obj.shadow.y)        obj.shadow.y = 0;
			if(!obj.shadow.blur)     obj.shadow.blur = 0;
			if(!obj.shadow.color)    obj.shadow.color = 'rgba(0,0,0,0.5)';

			cx.shadowOffsetX       = obj.shadow.x;
			cx.shadowOffsetY       = obj.shadow.y;
			cx.shadowBlur          = obj.shadow.blur;
			cx.shadowColor         = obj.shadow.color;
		}

		return this;
	}

	this.stroke = function(obj){
		if(obj.stroke){
			
			if(!obj.stroke.width) obj.stroke.width = 10;
			if(!obj.stroke.color) obj.stroke.color = 'black';

			cx.strokeStyle = obj.stroke.color;
			cx.lineWidth = obj.stroke.width;

			cx.stroke();
		}

		return this;
	}

	this.clear = function(){
		cx.clearRect(0, 0, canvas.width, canvas.height);

		return this;
	}

	this.fullScreen = function(){
		cx.canvas.width  = window.innerWidth;
		cx.canvas.height = window.innerHeight;

		return this;
	}



	this.misc = {

		canvasOffset: function(){
			var obj = canvas;
			var curleft = curtop = 0;

			if (obj.offsetParent) {
				do {
					curleft += obj.offsetLeft;
					curtop += obj.offsetTop;
				} while (obj = obj.offsetParent);
			}
			return {x: curleft, y: curtop};
		},

		center: function(obj){
			return {
				x: result = obj.x - obj.width / 2,
				y: result = obj.y - obj.height / 2
			};
		},

		color: function(obj){

			if(!obj.red)   obj.red   = 127;
			if(!obj.green) obj.green = 127;
			if(!obj.blue)  obj.blue  = 127;
			if(!obj.alpha) obj.alpha = 1;

			var a = !!obj.alpha,
			str = 'rgba';
			str += '(';
			str += obj.red + ',';
			str += obj.green + ',';
			str += obj.blue + ',';
			str += obj.alpha + ')';

			return str;
		}

	}



	this.mouse = {

		position: function(){
			if(!window.event) return {x:0,y:0};

			return {
				x: window.event.clientX - canivas.misc.canvasOffset().x,
				y: window.event.clientY - canivas.misc.canvasOffset().y
			};
		}

	}
}







// http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
	if (w < 2 * r) r = w / 2;
	if (h < 2 * r) r = h / 2;
	this.beginPath();
	this.moveTo(x+r, y);
	this.arcTo(x+w, y,   x+w, y+h, r);
	this.arcTo(x+w, y+h, x,   y+h, r);
	this.arcTo(x,   y+h, x,   y,   r);
	this.arcTo(x,   y,   x+w, y,   r);
	this.closePath();
}

// http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
CanvasRenderingContext2D.prototype.ellipse = function (x, y, w, h) {
	var kappa = .5522848;
		ox = (w / 2) * kappa, // control point offset horizontal
		oy = (h / 2) * kappa, // control point offset vertical
		xe = x + w,           // x-end
		ye = y + h,           // y-end
		xm = x + w / 2,       // x-middle
		ym = y + h / 2;       // y-middle

	this.beginPath();
	this.moveTo(x, ym);
	this.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	this.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	this.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	this.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
	this.closePath();
}

// I wrote this one :D
CanvasRenderingContext2D.prototype.triangle = function(x, y, w, h){
	this.beginPath();
	this.moveTo(x, y + h);
	this.lineTo(x + w, y + h);
	this.lineTo(x + w / 2, y);
	this.closePath();
}