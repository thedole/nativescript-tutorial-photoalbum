var observable = require("data/observable");
var observableArrayModule = require("data/observable-array");
var imageSourceModule = require("image-source");
var Everlive = require('./everlive.all.min');
var everlive = new Everlive("PubHOnjM6z195qe7");
var fileSystemModule = require("file-system");



var array = new observableArrayModule.ObservableArray();

function imageFromSource(imageName) {
	return imageSourceModule.fromFile(fileSystemModule.path.join(__dirname, directory + imageName));
};

var __extends = this.__extends || function (d, b) {
	for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	function __() { this.constructor = d; }
	__.prototype = b.prototype;
	d.prototype = new __();
};

var PhotoAlbumModel = (function (_super) {
	__extends(PhotoAlbumModel, _super);
	function PhotoAlbumModel() {
		_super.call(this);
		this.set("message", "Add new images");
	}
	return PhotoAlbumModel;
})(observable.Observable);

Object.defineProperty(PhotoAlbumModel.prototype, "photoItems", {
	get: function () {
		return array;
	},
	enumerable: true,
	configurable: true
});

PhotoAlbumModel.prototype.tapAction = function () {
	everlive.Files.get()
		.then(function (files) {
			var len = files.length;

			//file = {
			//	"Filename": Math.random().toString(36).substring(2, 15) + ".jpg",
			//	"ContentType": "image/jpeg",
			//	"base64": image.itemImage.toBase64String("JPEG", 100)
			//};
			for (var i = 0; i < len; i++) {
				array.push(files[i].base64);
			}
		});
};

exports.PhotoAlbumModel = PhotoAlbumModel;