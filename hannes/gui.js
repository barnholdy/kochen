function Gui(paper) {
   	
	var that = this;

	this.paper = paper;
	
	this.ingredients = new Array();
	this.ellipse_ids = new Array();
	
	//contains ellipse ids
	this.ellipse_ids = new Array();
	
	this.eventListeners = new Array();
	
	this.createEllipse = function(x, y){

		//var ellipse = paper.path("M"+(x+50)+","+(y)+"c-28,0-50,11.193-50,25s22,25,50,25V"+(y)+"z");
		var ellipse = this.paper.path("M"+(0+50)+","+(0)+"c-28,0-50,11.193-50,25s22,25,50,25V"+(0)+"z");
		ellipse.attr({'stroke-width': '0','stroke-opacity': '1','fill': '#000000'});
		ellipse.transform("t"+x+","+y);
		ellipse.node.setAttribute('class', Gui.ELLIPSES_CLASS);
		ellipse.attr("class", Gui.ELLIPSES_CLASS);
		ellipse.x=x;
		ellipse.y=y;
		ellipse.angle=0;
		ellipse.quadrant=0;
		ellipse.anglePlus=0;

		ellipse.start = function(){
		};
		ellipse.move = function(dx, dy, x, y){
			this.transform("t"+x+","+y);
			this.x = x;
			this.y = y;
			
			//console.log(Gui.SELECTION_ID);
			
			this.rotate(this.paper.getById(Gui.SELECTION_ID).attr("x"), this.paper.getById(Gui.SELECTION_ID).attr("y"));
		};
		ellipse.up = function(){
		};
		
		ellipse.rotate = function(toX, toY, lookAtSelection){

			if(lookAtSelection == undefined){
				lookAtSelection = true;
			}

			//console.log("rotate, tox: " + toX + ", toy: " + toY + ", lookAtSelection: " + lookAtSelection);

			var r=this.y-this.x;
			var normalX = this.x+1;
			var normalY = Math.tan(0)*normalX+r;

			var normalXn = normalX-this.x;
			var normalYn = normalY-this.y;

			if(this.x>toX){
				var xN = this.x-toX;
				var yN = this.y-toY;
			}
			else{
				var xN = toX-this.x;
				var yN = toY-this.y;
			}

			var rotate = Math.acos(
				(xN*normalXn+yN*normalYn)/
				(Math.sqrt(Math.pow(xN,2)+Math.pow(yN,2))*Math.sqrt(Math.pow(normalXn,2)+Math.pow(normalYn,2)))
			)/Math.PI*180;

			//align
			if(this.x>toX){
				rotate = rotate+90;
			}
			else{
				rotate = rotate-90;
			}

			//point with tip
			if(lookAtSelection){
				rotate = rotate+180;
			}

			//provide fluet rotation
			var new_quadrant;
			if(this.x<=toX && this.y<=toY){
				new_quadrant=0;
			}
			else if(this.x>toX && this.y<=toY){
				new_quadrant=1;
			}
			else if(this.x>toX && this.y>toY){
				new_quadrant=2;
			}
			else if(this.x<=toX && this.y>toY){
				new_quadrant=3;
			}
			if(this.quadrant==2 && new_quadrant==3){
				this.anglePlus=this.anglePlus+360;
			}
			if(this.quadrant==3 && new_quadrant==2){
				this.anglePlus=this.anglePlus-360;
			}
			rotate=rotate+this.anglePlus;
			this.quadrant=new_quadrant;

			this.angle=rotate;	

			/*
			console.log("toX: "+toX);
			console.log("toY: "+toY);
			console.log("cx: "+this.x);
			console.log("cy: "+this.y);
			console.log("vx: "+normalX);
			console.log("vy"+normalY);
			console.log("nx: "+normalXn);
			console.log("ny: "+normalYn);
			console.log("r: "+r);
			console.log("rotate"+rotate);
			console.log("angle"+this.angle);
			console.log("quadrant: "+this.quadrant);
			*/

			//rotate
			//this.arrow.animate({transform: "r" + rotate}, 200);
			this.transform("t"+this.x+","+this.y+"r" + rotate);
		};
		
		this.ellipse_ids.push(ellipse.id);
		
		return ellipse;
	};

	this.createSelection = function(x, y){

		var selection = this.paper.rect(x, y, 50, 50);
		selection.attr("fill", "#f00");
		selection.id = Gui.SELECTION_ID;

		selection.start = function(){
			this.sox = this.attr("x");
			this.soy = this.attr("y");
			this.animate({opacity:0.5}, 100, ">");
		};
		selection.move = function(dx, dy){
			this.attr({x: this.sox + dx , y: this.soy + dy});

			//rotate ellipses
			for (var i in that.ellipse_ids){
				var ellipse = this.paper.getById(that.ellipse_ids[i]);
				ellipse.rotate(this.attr("x"), this.attr("y"));
			}
		};
		selection.up = function(){
			this.animate({opacity:1}, 100, ">");
		};

		selection.drag(selection.move, selection.start, selection.up);

		return selection;
	};

	this.createIngredient = function(func, x, y){

		var ingredient = window[func].apply(null, [this.paper]);		
		ingredient.transform("t"+(x-ingredient.offsetX)+","+(y-ingredient.offsetY));
		ingredient.id = this.ingredients.length
		ingredient.ellipse = this.createEllipse(x-ingredient.offsetX, y-ingredient.offsetY);
		ingredient.ellipse.toBack();
		ingredient.angle=0;
		ingredient.quadrant=0;
		ingredient.anglePlus=0;
		
		
		ingredient.start = function(x, y){
			ingredient.ellipse.start(x, y);
		};
		ingredient.move = function(dx, dy, x, y){
			ingredient.transform("t"+(x-ingredient.offsetX)+","+(y-ingredient.offsetY));
			//ingredient.attr("x", x);
			//ingredient.attr("y", y);
			ingredient.x=x;
			ingredient.y=y;
			
			//destroy ingredient images
			ingredient.rotate(this.paper.getById(Gui.SELECTION_ID).attr("x"), this.paper.getById(Gui.SELECTION_ID).attr("y"));
			
			ingredient.ellipse.move(dx,dy, x-ingredient.offsetX, y-ingredient.offsetY);
			
			that.fireEvent(ingredient, Gui.eventTypeDrag);
		};
		ingredient.up = function(){
			ingredient.ellipse.up();
			
			that.fireEvent(ingredient, Gui.eventTypeDrop);
		};
		ingredient.lookAt = function(x, y, face){
			ingredient.ellipse.rotate(x, y, face);
		};
		
		
		ingredient.rotate = function(toX, toY, lookAtSelection){

			if(lookAtSelection == undefined){
				lookAtSelection = true;
			}

			//console.log("rotate, tox: " + toX + ", toy: " + toY + ", lookAtSelection: " + lookAtSelection);

			var r=this.y-this.x;
			var normalX = this.x+1;
			var normalY = Math.tan(0)*normalX+r;

			var normalXn = normalX-this.x;
			var normalYn = normalY-this.y;

			if(this.x>toX){
				var xN = this.x-toX;
				var yN = this.y-toY;
			}
			else{
				var xN = toX-this.x;
				var yN = toY-this.y;
			}

			var rotate = Math.acos(
				(xN*normalXn+yN*normalYn)/
				(Math.sqrt(Math.pow(xN,2)+Math.pow(yN,2))*Math.sqrt(Math.pow(normalXn,2)+Math.pow(normalYn,2)))
			)/Math.PI*180;
			
			//align
			if(this.x>toX){
				rotate = rotate+90;
			}
			else{
				rotate = rotate-90;
			}
			
			//point with tip
			if(lookAtSelection){
				rotate = rotate+180;
			}
			
			//provide fluet rotation
			var new_quadrant;
			if(this.x<=toX && this.y<=toY){
				new_quadrant=0;
			}
			else if(this.x>toX && this.y<=toY){
				new_quadrant=1;
			}
			else if(this.x>toX && this.y>toY){
				new_quadrant=2;
			}
			else if(this.x<=toX && this.y>toY){
				new_quadrant=3;
			}
			if(this.quadrant==2 && new_quadrant==3){
				this.anglePlus=this.anglePlus+360;
			}
			if(this.quadrant==3 && new_quadrant==2){
				this.anglePlus=this.anglePlus-360;
			}
			rotate=rotate+this.anglePlus;
			this.quadrant=new_quadrant;

			this.angle=rotate;	

			/*
			console.log("toX: "+toX);
			console.log("toY: "+toY);
			console.log("cx: "+this.x);
			console.log("cy: "+this.y);
			console.log("vx: "+normalX);
			console.log("vy"+normalY);
			console.log("nx: "+normalXn);
			console.log("ny: "+normalYn);
			console.log("xN: "+xN);
			console.log("yN: "+yN);
			console.log("r: "+r);
			console.log("rotate: "+rotate);
			console.log("angle: "+this.angle);
			console.log("quadrant: "+this.quadrant);
			*/

			//rotate
			//this.arrow.animate({transform: "r" + rotate}, 200);
			this.transform("t"+(this.x-this.offsetX)+","+(this.y-this.offsetY)+"r" + rotate);
		};
		
		
		ingredient.drag(ingredient.move, ingredient.start, ingredient.up);
		
		this.ingredients[ingredient.id] = ingredient;
		
		return ingredient;
	};
	
	
	
	
	this.getIngredient = function(id){
		
		return this.ingredients[id];
	}
	
	this.getIngredients = function(){
		
		return this.ingredients;
	}
	
	this.addEventListerner = function(type, callback){
		
		this.eventListeners.push({"type" : type, "callback" : callback});
	}
	
	this.fireEvent = function(target, type){
		
		for(i in this.eventListeners){
			
			var eventListener = this.eventListeners[i];
			
			if(eventListener.type == type){
				
				eventListener.callback(target);
			}
		}
	}
}


Gui.SELECTION_ID = "selection";
Gui.ELLIPSES_CLASS = "ellipses";
Gui.eventTypeDrag = "drag";
Gui.eventTypeDrop = "drop";