var observable = require("data/observable");
var observableArrayModule = require("data/observable-array");
var imageSourceModule = require("image-source");
var Everlive = require('./everlive.all.min');
var everlive = new Everlive("PubHOnjM6z195qe7");

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

var backendArray = new observableArrayModule.ObservableArray();
Object.defineProperty(PhotoAlbumModel.prototype, "photoItems", {
	get: function () {
		everlive.Files.get()
			.then(function (data) {
				data.result.forEach(function (fileMetadata) {
					imageSourceModule.fromUrl(fileMetadata.Uri)
						.then(function (result) {
							var item = {
								itemImage: result
							};
							backendArray.push(item);
						});
			});
		},
		function (error) { });

		return backendArray;
	},
	enumerable: true,
	configurable: true
});

var messages = [
	"No milk today",
	"Hasta la vista baby",
	"I ain't nothing but a hound dog",
	"For those about to rock, we salute you!"
];
PhotoAlbumModel.prototype.tapAction = (function(list){
	var len = list.length,
		i = 0;
	return function () {
		this.set("message", list[i]);
		i = ++i === len ? 0 : i;
	};
})(messages);

exports.PhotoAlbumModel = PhotoAlbumModel;