function taaaaaaan(current, isEnter) {
    debug("configs.enterKeyTaaaaaaanMinSize:", configs.enterKeyTaaaaaaanMinSize);
    debug("configs.enterKeyTaaaaaaanMaxSize:", configs.enterKeyTaaaaaaanMaxSize);
    debug("configs.normalKeyKataKataMinSize:", configs.normalKeyKataKataMinSize);
    debug("configs.normalKeyKataKataMaxSize:", configs.normalKeyKataKataMaxSize);
    debug("configs.animateHorizontalMove:", configs.animateHorizontalMove);
    debug("configs.animateVerticalMove:", configs.animateVerticalMove);
    var prefix = isEnter ? 'tan' : 'kata';
    var size = isEnter ? rand(configs.enterKeyTaaaaaaanMinSize,configs.enterKeyTaaaaaaanMaxSize) : rand(configs.normalKeyKataKataMinSize,configs.normalKeyKataKataMaxSize);
    var caretPosition = Measurement.caretPos(current);
    var imgUrl = chrome.extension.getURL('images/' + prefix + '_' + rand(1,4) + '.svg');
    var $img = $('<img width="' + size + '">');
    $img.attr('src', imgUrl);
    $img.css({
        'position' : 'absolute',
        'top' : caretPosition.top + rand(-10,10),
        'left' : caretPosition.left + rand(-10,10),
        'zIndex' : 99999
    });
    $('body').append($img);
    var verticalMove = rand(-configs.animateVerticalMove,configs.animateVerticalMove);
    var horizontalMove = rand(-configs.animateHorizontalMove,configs.animateHorizontalMove);
    $img.animate({
        'top' : caretPosition.top + verticalMove,
        'left' : caretPosition.left + horizontalMove,
        'width' : size + (isEnter ? rand(30,50) : rand(10,20)),
        'opacity' : 0
    },
    500,
    function(){
	$img.remove();
    })
}

function rand(min,max) {
    return Math.floor(Math.random()*(max-min)+min);
}

configs.$loaded.then(function() {
    document.onkeydown = function(e) {
	var current = document.activeElement;

	if (e.key === 'Backspace') return true;

	if (current.type === 'textarea' || current.type === 'text' || current.type === 'search') {
            var isEnter = e.key === 'Enter';
            taaaaaaan(current, isEnter);
	}
    }

    document.addEventListener("input", (event) => {
	if (!event.isComposing) {
	    return;
	}
	var current = document.activeElement;

	if (current.type === 'textarea' || current.type === 'text' || current.type === 'search') {
            var isEnter = false;
            taaaaaaan(current, isEnter);
	}
    });
    log("loaded: contents.js");
    debug("configs.enterKeyTaaaaaaanMinSize:", configs.enterKeyTaaaaaaanMinSize);
    debug("configs.enterKeyTaaaaaaanMaxSize:", configs.enterKeyTaaaaaaanMaxSize);
    debug("configs.normalKeyKataKataMinSize:", configs.normalKeyKataKataMinSize);
    debug("configs.normalKeyKataKataMaxSize:", configs.normalKeyKataKataMaxSize);
    debug("configs.animateHorizontalMove:", configs.animateHorizontalMove);
    debug("configs.animateVerticalMove:", configs.animateVerticalMove);
});
