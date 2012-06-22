createTomato = function(rsr){
	
//((path_[a-z]{1,2})\..*?;)
/*
$1
	onion.push($2);
*/
		
	var tomato = rsr.set();
	tomato.attr({'name': 'tomato'});
	var path_c = rsr.path("M2.497,31.147c0.729,1.133,1.565,2.134,2.485,3.003c1.16,1.096,2.454,1.984,3.835,2.68    c1.978,0.998,4.134,1.597,6.334,1.84c1.4,0.152,2.819,0.162,4.22,0.039c1.656-0.148,3.318-0.329,4.94-0.721    c1.458-0.353,2.858-0.873,4.23-1.696c1.246-0.751,2.244-1.7,3.221-2.791c1.77-1.971,3.074-4.49,3.787-7.131    c0.262-0.979,0.449-2.001,0.568-3.031c0.168-1.448,0.249-2.948,0.097-4.4c-0.062-0.59-0.165-1.177-0.306-1.757    c-0.156-0.64-0.355-1.271-0.596-1.889c-0.816-2.109-2.06-4.056-3.545-5.713c-2.613-2.914-5.323-3.648-9.028-3.33    c0,0-0.49,0.119-1.247,0.258c-0.789,0.143-1.868,0.304-2.982,0.366c-1.36,0.078-2.992,0.113-4.207-0.634    c-0.344-0.216-1.595,0.1-1.958,0.138c-0.024,0.002-0.048,0.006-0.072,0.006c-1.383,0.151-2.726,0.502-3.994,1.05    C7.393,7.816,6.541,8.292,5.736,8.861c-0.639,0.452-1.25,0.962-1.826,1.527c-1.502,1.476-2.597,3.292-3.155,5.422    c-0.338,1.318-0.542,2.672-0.657,4.026c-0.036,0.42-0.062,0.84-0.079,1.258C0.005,21.474-0.002,21.851,0,22.223    c0.003,0.921,0.06,1.815,0.18,2.633C0.501,27.072,1.307,29.284,2.497,31.147z");
	path_c.attr({fill: '#D30F0F',parent: 'tomato','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_c');
	tomato.push(path_c);
	var path_d = rsr.path("M14.489,9.241c-1.514-0.681-3.346,0.808-4.48,1.919c-1.414,1.385-2.356,5.449-4.117,6.032    c2.179-0.674,3.097-3.074,5.064-4.146c0.861-0.469,1.787-0.706,2.655-1.171c0.612-0.331,1.191-0.996,1.904-0.971    c-0.038,1.354-1.297,2.148-1.128,3.714c0.194,1.805,1.799,4.141,3.069,5.268c-1.12-1.268-1.688-3.234-0.88-4.751    c0.843-1.586,1.959-2.493,0.934-4.511c1.399,0.547,3.028,0.658,4.436,1.324c1.593,0.754,2.78,2.799,3.93,4.229    c-0.214-1.956-0.978-4.156-2.36-5.537c-0.731-0.73-1.645-1.169-2.649-1.399c-0.772-0.178-1.958,0.101-2.469-0.416    c0.752-0.539,2.525-1.125,3.541-1.368c0.996-0.238,2.399-0.48,3.408-0.387c1.122,0.104,2.081,1.072,3.123,1.056    c-0.283-1.732-4.058-2.35-5.382-2.549c-2.062-0.312-3.333,0.278-5.06,1.099C16.347,7.472,16.4,6.292,15.27,5.372    c-1.025-0.834-2.31-1.08-3.152,0.17c0.6,0.856,1.86,1.231,1.827,2.445c-0.736,0.098-1.039-0.539-1.675-0.773    c-0.566-0.21-1.595-0.314-2.194-0.302C8.3,6.95,6.638,7.9,5.736,9.488c2.548-0.463,5.292-1.642,7.695-0.279    c-0.357-0.028-0.812,0.126-1.037,0.169");
	path_d.attr({fill: '#327C35',parent: 'tomato','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_d');
	tomato.push(path_d);
	var path_e = rsr.path("M15.21,8.675c-0.946-0.426-2.092,0.504-2.801,1.197c-0.884,0.865-1.472,3.406-2.574,3.769    c1.363-0.419,1.938-1.92,3.166-2.589c0.539-0.294,1.117-0.44,1.659-0.73c0.401-0.217,0.713-0.598,1.184-0.583    c-0.16,0.713,0.197,1.363,0.146,2.072c-0.079,1.092-0.638,2.11-0.767,3.145c0.737-0.522,1.559-1.426,1.906-2.28    c0.306-0.748,0.284-2.345,0.003-3.1c0.077,0.205,2.161,0.607,2.447,0.707c0.931,0.327,1.755,0.939,2.724,1.157    c0.014,0.002-0.597-1.123-0.769-1.28c-0.392-0.36-0.826-0.559-1.321-0.71c-0.917-0.279-2.136-0.258-2.798-1.086    c0.587-0.498,1.794-0.621,2.524-0.952c0.876-0.394,1.791-0.689,2.705-0.965c-0.291,0.086-1.01-0.172-1.379-0.139    c-0.487,0.041-0.959,0.184-1.449,0.185c-0.914,0.007-1.523,0.164-2.395,0.578c-1.05,0.499-1.018-0.238-1.724-0.814    c-0.641-0.523-1.444-0.677-1.97,0.104c0.375,0.536,1.162,0.771,1.142,1.529c-0.46,0.062-0.648-0.338-1.046-0.483    c-0.354-0.13-0.997-0.195-1.372-0.188c-1.11,0.022-2.148,0.618-2.711,1.61c1.592-0.287,3.307-1.025,4.808-0.173    c-0.222-0.02-0.506,0.077-0.647,0.103");
	path_e.attr({fill: '#34663C',parent: 'tomato','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_e');
	tomato.push(path_e);
	var path_f = rsr.path("M15.816,8.429c0.552-1.331,0.727-3.015,0.792-4.483c0.044-1.019-0.591-3.141,0.124-3.886    c0.546,0.322,2.171,0.56,2.458,0.999c0.517,0.793-0.957,3.139-1.154,3.907c-0.317,1.249,0,2.43-0.258,3.598    C17.43,10.154,15.258,9.724,15.816,8.429");
	path_f.attr({fill: '#34663C',parent: 'tomato','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_f');
	tomato.push(path_f);
	var path_g = rsr.path("M15.957,8.355c0.552-1.331,0.727-3.017,0.792-4.481C16.798,2.753,16.032,0.93,16.873,0    c1.081,0.289,0.701,1.386,0.574,2.233c-0.14,0.943-0.013,1.938-0.139,2.892C17.2,5.942,17.079,9.47,15.965,9.424    C15.954,9.062,15.796,8.728,15.957,8.355");
	path_g.attr({fill: '#429348',parent: 'tomato','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_g');
	tomato.push(path_g);
		
	return tomato;
}
