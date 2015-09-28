$catlist = $('#catlist');
$catdisplay = $('#catdisplay');
$catNumShow = $('#catnumshow');

var cats = [];


//model: create all the cats in an array;
var model = {
	genCats: function() {
		var Cat = function(id, name, img) {
			this.name = name;
			this.img = img;
			this.idNumber = id;
			this.count = 0;
		};
		var cat1 = new Cat(0, "Amy", "cat_picture1.jpg");
		var cat2 = new Cat(1, "brandy", "cat_picture2.jpeg");
		var cat3 = new Cat(2, "Bob", "cat_picture3.jpeg");
		var cat4 = new Cat(3, "Lulu", "cat_picture4.jpeg");
		var cat5 = new Cat(4, "Duke", "cat_picture5.jpeg");
		var cats = [cat1, cat2, cat3, cat4, cat5];
		return cats;
	}
};
//octopus: 1. getCatName for button 2. getCatimg name and clickcount for display area 3. select cat 4. click
var octopus = {
	init: function() {
		cats = model.genCats();
		catButtons.init();
		catDisplay.init();
		catNumShow.init();
	},

	counterClick: function(cat) {
		cat.count += 1;
		catNumShow.render(cat.idNumber);
	},

	adminMode: function() {
		document.getElementById("form1").className = "formon";
	},
	nonAdminMode: function() {
		document.getElementById("form1").className = "formoff";
	},
	catUpdate: function(cat) {

		cat.name = document.getElementById("catname").value;
		cat.img = document.getElementById("caturl").value;
		cat.count = document.getElementById("catclick").value;
		console.log(cat);
		$catlist.empty();
		$catdisplay.empty();
		$catNumShow.empty();
		catButtons.render();
		catDisplay.render(cat.idNumber);
		catNumShow.render(cat.idNumber);
	}
};

//view 1. buttons 2. display
var catButtons = {

	init: function() {
		this.render();

	},

	render: function() {
		var htmlStr = '';
		cats.forEach(function(cat) {
			htmlStr += '<button id="button' + cat.idNumber +
				'"onclick="catDisplay.render(' + cat.idNumber + ');catNumShow.render(' +
				cat.idNumber + ');">' + cat.name + '</button>';
		});
		($catlist).append(htmlStr);
	}

};

var catDisplay = {

	init: function() {
		this.render(0);

	},

	render: function(id) {
		$('#catdisplay').empty();
		var htmlStr = '';
		var cat = cats[id];
		var idNumber = cat.idNumber;
		htmlStr = '<img id="' + idNumber + '"src="' + cat.img + '">';
		($catdisplay).append(htmlStr);
		var imgTag = document.getElementsByTagName("img");
		var newCat = document.getElementById("save");
		imgTag[0].onclick = function() {
			octopus.counterClick(cat);
		};
		newCat.onclick = function() {
			octopus.catUpdate(cat);
		};

	}
};
var catNumShow = {
	init: function() {
		this.render(0);

	},
	render: function(id) {
		$('#catnumshow').empty();
		var htmlStr = '';
		var cat = cats[id];
		var clickCount = cat.count;
		htmlStr = '<h1>' + cat.name + " " + clickCount + '</h1>';
		($catNumShow).append(htmlStr);
	}
};
octopus.init();