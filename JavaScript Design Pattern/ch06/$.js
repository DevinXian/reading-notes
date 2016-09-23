function $() {
	const elements = [];

	for (let i = 0; i < arguments.length; ++i) {
		let ele = arguments[i];
		if (typeof ele === 'string') {
			ele = document.getElementById(ele);
		}
		if (arguments.length === 1) {
			return ele;
		}
		elements.push(ele);
	}
	return elements;
}

(function () {
	//private class
	function _$(els) {
		
	}

	window.$ = function () {
		return new _$(arguments);
	}
})();