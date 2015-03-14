// Application logic
var modelModule = require("./view-model");
var model = new modelModule.PhotoAlbumModel();

exports.onPageLoaded = onPageLoaded;

function onPageLoaded(args) {
	var page = args.object;
	page.bindingContext = model;
}

function buttonTap(args) {
	model.tapAction();
}