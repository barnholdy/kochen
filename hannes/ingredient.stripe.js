

Gui.INGREDIENT_STRIPE = "createStripe";

function createStripe(rsr){
	
//((path_[a-z]{1,2})\..*?;)
/*
$1
	onion.push($2);
*/
	
	var stripe = rsr.set();
	stripe.attr({'name': 'stripe'});
	stripe.attr({'class': 'stripe'});
	//stripe.node.setAttribute('class', 'stripe');
	
	
	var path = rsr.path("M"+(0+50)+","+(0)+"c-28,0-50,11.193-50,25s22,25,50,25V"+(0)+"z");
	path.attr({'stroke-width': '0','stroke-opacity': '1','fill': '#008BD2'});
	stripe.push(path);
	
	var img = rsr.image("img/stripe.png", 0, 0, 80, 80);
	//img.attr({ "clip-rect": "20,20,30,30" });
	stripe.push(img);
	
	//stripe.attr({'stroke-width': '0','stroke-opacity': '1','fill': '#008BD2'});
	
	stripe.offsetX = 19;
	stripe.offsetY = 22;
	
	return stripe;
}
