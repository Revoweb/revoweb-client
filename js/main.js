
$(document).ready(function() {

	var loader = new PxLoader();
	var imagesJquery = $('img');
	var p;var canvas = document.createElement("canvas");


	for (var i = 0; i < imagesJquery.length; i++) {
		loader.addImage(imagesJquery[i].src);
	};

	loader.addCompletionListener(function() {
	    $('body').addClass('loaded');
		$('h1').css('color','#222222');
	});

	loader.start();

	for (var i = 0; i < imagesJquery.length; i++) {

		 localStorage[i] =  Base64String.compressToUTF16(getBase64Image(imagesJquery[i]));

		 var test = $(document.createElement('img'));
		 test.attr('src', Base64String.decompressFromUTF16(localStorage[i]));
		 $("body").append(test);
	}

});

function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}
