function Gui(paper) {
   	
	this.paper = paper;
	
	//contains ellipse ids
	this.ellipses = new Array();
	
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
			
			this.myRotate(this.paper.getById(Gui.SELECTION_ID).attr("x"), this.paper.getById(Gui.SELECTION_ID).attr("y"));
		};
		ellipse.up = function(){
		};

		ellipse.myRotate = function(toX, toY, lookAtSelection){

			if(lookAtSelection == undefined){
				lookAtSelection = true;
			}

			console.log("rotate, tox: " + toX + ", toy: " + toY + ", lookAtSelection: " + lookAtSelection);

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
			for (var i in this.ellipses){
				var ellipse = this.paper.getById(this.ellipses[i]);
				ellipse.myRotate(this.attr("x"), this.attr("y"));
			}
		};
		selection.up = function(){
			this.animate({opacity:1}, 100, ">");
		};

		selection.drag(selection.move, selection.start, selection.up);

		return selection;
	};

	this.createIngridient = function(func, x, y){

		var ingridient = ingridient = window[func].apply(null, [this.paper]);		
		ingridient.transform("t"+(x-ingridient.offsetX)+","+(y-ingridient.offsetY));

		var ellipse = this.createEllipse(x-ingridient.offsetX, y-ingridient.offsetY);
		ellipse.toBack();
		this.ellipses.push(ellipse.id);

		ingridient.start = function(x, y){
			ellipse.start(x, y);
		};
		ingridient.move = function(dx, dy, x, y){
			ingridient.transform("t"+(x-ingridient.offsetX)+","+(y-ingridient.offsetY));
			this.attr("x", x);
			this.attr("y", y);

			ellipse.move(dx,dy, x-ingridient.offsetX, y-ingridient.offsetY);
		};
		ingridient.up = function(){
			ellipse.up();
		};
		ingridient.lookAt = function(x, y){
			ellipse.myRotate(x, y);
		};

		ingridient.drag(ingridient.move, ingridient.start, ingridient.up);

		return ingridient;
	};
}


Gui.SELECTION_ID = "selection";
Gui.ELLIPSES_CLASS = "ellipses";