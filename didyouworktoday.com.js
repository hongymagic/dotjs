//
// DOM element detection

var $calendar = $('.calendar');
var $days     = $calendar.find('li');

//
// CSS styles to be applied initially (preferrably via .css files). This is
// run once on startup.

function initialize() {
	$('*').css({
		'backface-visibility': 'hidden'
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
		'transform'       : 'translate3d(0, 0, 0) rotate3d(0, 1, 0, -140deg)',
		'transform-origin': offsetX
	});
}

function animationState ($element, column, row) {
	var seed     = random (1, 5);
	var duration = random (0.3, 0.7);
	var delay    = random(column || 1, column * seed) * 40;
	setTimeout(function () {
		$element.css({
			'transform'  : 'rotate3d(0, 1, 0, 0deg)',
			'transition' : 'all ' + duration + 's'
		});

		$element.one('transitionEnd', function (event) {
			$element.removeAttr('style');
		});
	}, delay);
}

$calendar.css({
	'perspective': '800px'
});

if ($days) {
	$days.each(function (index, element) {
		var column = index % 7;
		var row = parseInt(index / 7, 10);
		var $element = initialState($(element), column);
		animationState($element, column, row);
	});

	$days.on('click', 'a', function (event) {
		event.preventDefault();

		var $link   = $(this);
		var $day    = $link.parents('li');
		var command = new Command(this);
		var result  = command.execute();
		result
			.then(command.success, command.failed)
			.then(function () {
				var angle = 0;
				if (command.worked) {
					$link.css({ 'background': 'green' });
				} else {
					angle = 180;
					$link.css({ 'background': 'red' });
				}
				$day.css({
					'transform': 'rotate3d(0, 1, 0, ' + angle + 'deg)',
					'transition': 'all 1s'
				});
			});
	});
}

function Command (anchor) {
	var url   = anchor.getAttribute('href');
	var $p    = $(anchor).find('p');
	var state = $p.text().search(/yes/i) > -1;
	var date  = /\?date=([^&]*)(.*)$/i.exec(anchor.search)[1];

	this.anchor = anchor;
	this.$p     = $p;
	this.url    = url;
	this.date   = date;
	this.worked = !state;
}

Command.prototype = {
	execute: function () {
		var result = $.ajax(this.url, { context: this, data: this.toJSON() });
		return result.then(this.success, this.failed);
	},

	success: function () {
		var text = this.worked ? "Yes" : "No";
		this.$p.text(text);
	},

	failed: function () {
		console.error('Failed!', this, arguments);
	},

	toJSON: function () {
		return {
			'Command.Date': this.date,
			'Command.DidYouWork': this.worked
		};
	}
};

console.log('didyouworktoday.com.js loaded');