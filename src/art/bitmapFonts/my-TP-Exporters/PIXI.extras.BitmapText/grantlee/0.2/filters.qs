var getLength = function(input) {
	var sprites = input.allSprites;
	return String(sprites.length);
};
getLength.filterName = "getLength";
Library.addFilter("getLength");

var hexToDec = function(input) {
	return String(hexToChar(input).charCodeAt(0));
};
hexToDec.filterName = "hexToDec";
Library.addFilter("hexToDec");

function hexToChar(input) {
	var hex = input.trimmedName.match(/[\s\S]{2}/g) || [];
	var output = '';
	for (var i = 0, j = hex.length; i < j; i++) {
		output += '%' + ('0' + hex[i]).slice(-2);
	}
	return decodeURIComponent(output);
}
hexToChar.filterName = "hexToChar";
Library.addFilter("hexToChar");

untrimmedHeight = 0;
var setUntrimmedHeight = function(input) {
	untrimmedHeight = input;
	return "";
};
setUntrimmedHeight.filterName = "setUntrimmedHeight";
Library.addFilter("setUntrimmedHeight");


var getYOffset = function(input) {
	return String((Number(untrimmedHeight) - Number(input)) / 2);
};
getYOffset.filterName = "getYOffset";
Library.addFilter("getYOffset");

var times4 = function(input) {
	return String(Number(input) * 4);
};
times4.filterName = "times4";
Library.addFilter("times4");
