define(function(require) {	const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");		var _data = {		_enabled: false,		_suspended: false	};	var data = {		get _enabled() {			return _data._enabled;		},		set _enabled(val) {			if (val && !_data._enabled) {				_data._enabled = true;				if (!_data._suspended) {					msgBus.publish("Game.AltAutoPlayStart");				}			} else if (!val && _data._enabled) {				_data._enabled = false;				if (!_data._suspended) {					msgBus.publish("Game.AltAutoPlayStop");				}			}		},		get _suspended() {			return _data._suspended;		},		set _suspended(val) {			if (val && !_data._suspended) {				_data._suspended = true;				if (_data._enabled) {					msgBus.publish("Game.AltAutoPlayStop");				}			} else if (!val && _data._suspended) {				_data._suspended = false;				if (_data._enabled) {					msgBus.publish("Game.AltAutoPlayStart");				}			}		},		get enabled() {			return _data._enabled && !_data._suspended;		}	};	return data;});