var $calendar = $('.calendar');
var $days     = $calendar.find('li');

$('*').css('-webkit-backface-visibility', 'hidden');

function initialize ($element, column) {
	var offsetX = (-1 * column * 130) + 'px';

	return $element.css({
		'-webkit-transform'           : 'translate3d(0, 0, 0) perspective(2500px) rotate3d(0, 1, 0, -90deg)',
		'-webkit-transform-origin-x'  : offsetX
	});
}

function apply ($element, column, row) {
	setTimeout(function () {
		$element.css({
			'-webkit-transform'           : 'perspective(2500px) rotate3d(0, 1, 0, 0deg)',
			'-webkit-transition'          : 'all 1s'
		});
	}, column * (row || 1) * 100);
}

$calendar.css({
	'overflow': 'visible'
});

if ($days) {
	$days.each(function (index, element) {
		var column = index % 7;
		var row = parseInt(index / 7, 10);
		var $element = initialize($(element), column);
		apply($element, column, row);
	});
}