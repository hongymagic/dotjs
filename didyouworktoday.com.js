var $calendar = $('.calendar');
var $days     = $calendar.find('li');

function initialize ($element, column) {
	var offsetX = (-1 * column * 130) + 'px';

	$element.css({
		'-webkit-transform'           : 'perspective(1500px) rotateY(-90deg)',
		'-webkit-transform-origin-x'  : offsetX,
		'-webkit-transition'          : 'all ' + column + 's'
	});

	return $element;
}

$calendar.css({
	'overflow': 'visible'
});

if ($days) {
	$days.each(function (index, element) {
		var column = index % 7;
		var row = parseInt(index / 7, 10);
		var $element = initialize($(element), column);
	});
}