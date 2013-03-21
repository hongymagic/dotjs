//
// DOM element detection

var $calendar = $('.calendar');
var $days     = $calendar.find('li');

//
// CSS styles to be applied initially (preferrably via .css files). This is
// run once on startup.

function initialize() {
	$('*').css({
		'-webkit-backface-visibility': 'hidden'
	});
}

initialize();

//
// If calendar exists, let's animate it like Windows 8 style!

function random (min, max) {
    return Math.random() * (max - min) + min;
}

function initialState ($element, column) {
	var offsetX = (-1 * column * 130) + 'px';

	return $element.css({
		'-webkit-transform'          : 'translate3d(0, 0, 0) rotate3d(0, 1, 0, -140deg)',
		'-webkit-transform-origin-x' : offsetX
	});
}

function animationState ($element, column, row) {
	var seed     = random (1, 5);
	var duration = random (0.3, 0.7);
	var delay    = random(column || 1, column * seed) * 40;
	setTimeout(function () {
		$element.css({
			'-webkit-transform'  : 'rotate3d(0, 1, 0, 0deg)',
			'-webkit-transition' : 'all ' + duration + 's'
		});

		$element.one('webkitTransitionEnd', function (event) {
			$element.removeAttr('style');
		});
	}, delay);
}

$calendar.css({
	'-webkit-perspective': '800px',
	'perspective': '800px'
});

if ($days) {
	$days.each(function (index, element) {
		var column = index % 7;
		var row = parseInt(index / 7, 10);
		var $element = initialState($(element), column);
		animationState($element, column, row);
	});
}