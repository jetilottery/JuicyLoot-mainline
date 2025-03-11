define(require => {
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
	const config = require("skbJet/componentManchester/standardIW/gameConfig");
	const SKBeInstant = require("skbJet/component/SKBeInstant/SKBeInstant");
	const scenarioData = require("skbJet/componentManchester/standardIW/scenarioData");
	const scenarioTransform = require("game/scenarioTransform");

	const _state = {
		ss: "",					//scenarioString
        g1: [],					//game1
        sc: 0,					//score
		scTS: 0,				//scoreTimeStamp
		obj: 0,					//objectives
		objM: [],				//objectiveMeters
		m: config.MOVE_LIMIT,	//moves
		gI: -1,					//gameIndex
		gS: false,				//gameStarting
		hS: [0, 0, 0],			//highScores
		hSTS: [0, 0, 0],		//highScoresTimeStamps
		g0S: 0,					//game0Seed
		g0B: "",				//game0Board
		g0BD: []				//game0BoardData
    };
	let _highScore = false;
	let _error = false;
	let _game1Cleared = false;
	let _resolve;
	let _dataLoaded = new Promise(resolve => _resolve = resolve);

	function init() {
		if(!config.disableLocalStorage) {
			try{
				_state.hS = JSON.parse(localStorage.getItem("game0_highScores"));
				_state.hSTS = JSON.parse(localStorage.getItem("game0_highScoresTS"));
			} catch(e) {
				_state.hS = [0, 0, 0];
				_state.hSTS = [0, 0, 0];
			}


			if( _state.hS === "" || _state.hS === null || _state.hS === undefined || _state.hS === "null" ||
				_state.hSTS === "" || _state.hSTS === null || _state.hSTS === undefined || _state.hSTS === "null"
			) {
				_state.hS = [0, 0, 0];
				_state.hSTS = [0, 0, 0];
			}
		}
	}

	function error() {
		_error = true;
	}

	function loadRevealData(data) {
		let parsedWagerData, parsedRevealData, parsedPackage;
		if(data) {
			if(SKBeInstant.isSKB()) {
				if(data.wagerData !== "" && data.wagerData !== null && data.wagerData !== undefined && data.wagerData !== "null") {
					parsedWagerData = data.wagerData;
				}
				if(data.revealData !== "" && data.revealData !== null && data.revealData !== undefined && data.revealData !== "null") {
					parsedRevealData = data.revealData;
				}
			} else if(data.revealData !== "" && data.revealData !== null && data.revealData !== undefined && data.revealData !== "null" && data.revealData.split) {
				parsedPackage = data.revealData.split("___");
				if(parsedPackage[0] !== "" && parsedPackage[0] !== null && parsedPackage[0] !== undefined && parsedPackage[0] !== "null") {
					parsedWagerData = JSON.parse(parsedPackage[0].replace(/\\/g, "").replace(/#/g, "\""));
				}
				if(parsedPackage[1] !== "" && parsedPackage[1] !== null && parsedPackage[1] !== undefined && parsedPackage[1] !== "null") {
					parsedRevealData = JSON.parse(parsedPackage[1].replace(/\\/g, "").replace(/#/g, "\"").replace(/\"\{/g, "\{").replace(/\}\"/g, "\}"));
				}
			}
		}

		if(parsedWagerData) {
			_state.ss = (parsedWagerData.ss !== undefined) ? parsedWagerData.ss : "";
			_state.g1 = (parsedWagerData.g1 !== undefined) ? parsedWagerData.g1 : [];
			_state.sc = (parsedWagerData.sc !== undefined) ? parsedWagerData.sc : 0;
			_state.scTS = (parsedWagerData.scTS !== undefined) ? parsedWagerData.scTS : 0;
			_state.obj = (parsedWagerData.obj !== undefined) ? parsedWagerData.obj : 0;
			_state.objM = (parsedWagerData.objM !== undefined) ? parsedWagerData.objM : config.familyKeys.map(() => 0);
			_state.m = (parsedWagerData.m !== undefined) ? parsedWagerData.m : 0;
			_state.gI = (parsedWagerData.gI !== undefined) ? parsedWagerData.gI : -1;
			_state.gS = (parsedWagerData.gS !== undefined) ? parsedWagerData.gS : false;
			_state.g0S = (parsedWagerData.g0S !== undefined) ? parsedWagerData.g0S : [0, 0, 0];
			_state.g0B = (parsedWagerData.g0B !== undefined) ? parsedWagerData.g0B : [0, 0, 0];
			_state.g0BD = (parsedWagerData.g0BD !== undefined) ? parsedWagerData.g0BD : 0;

			//Data integrity checks
			if (_state.objM.length !== config.familyKeys.length) {
				_state.objM = config.familyKeys.map(() => 0);
			}

			for (let i = 0; i < _state.g1.length; i++) {
				if (typeof _state.g1[i].tI !== "number") {
					console.log("-----PURGE GAME1 REVEALDATA------");
					_state.g1 = [];
					break;
				}
			}

			//Hey, did you know that RGS can save data up to 4000 bytes, but will crash your game at game end if the data is > 1024 characters? Because it will!
			if (_state.ss.replace(/IW/g, "") !== data.scenario.replace(/IW/g, "") || JSON.stringify(parsedWagerData).length > 1023) {
				console.log("-----PURGE GAME0 REVEALDATA------"); //DEBUG
				purgeRevealData(data.scenario);
			}
		}

		if(parsedRevealData) {
			updateHighScores(parsedRevealData.hS, parsedRevealData.hSTS);
		}

		_resolve();
	}

	function saveRevealData() {
		if(!config.disableLocalStorage) {
			localStorage.setItem("game0_highScores", JSON.stringify(_state.hS));
			localStorage.setItem("game0_highScoresTS", JSON.stringify(_state.hSTS));
		}
		if(SKBeInstant.config.wagerType !== "TRY" && config.revealDataSaveEnabled && !_error) {
			if(scenarioData.scenario && scenarioData.scenario.length) {
				_state.ss = scenarioTransform.stringify(scenarioData.scenario); //Acts as a checksum in case a user somehow retained GIP data from a finished ticket
			}

			//skip saving revealdata during game0 when disableGame0Save is true
			if(config.disableGame0Save && _state.gI === 0) {
				stripGame0Data();
				return; //don't save during game0
			}

			let wgrStr = JSON.stringify(_state);
			let rdsStr = JSON.stringify({
				hS: _state.hS,
				hSTS: _state.hSTS
			});
			if(SKBeInstant.isSKB()) {
				//Test for going over the revealData save limit
				if((wgrStr.length + rdsStr.length) > 1023) {
					purgeRevealData(_state.scenario, _state.gI);
					saveRevealData();
					return;
				}

				msgBus.publish("jLotteryGame.revealDataSave", {
					wagerDataSave: JSON.parse(wgrStr),
					revealDataSave: JSON.parse(rdsStr) //Just convert back so we copy the current object instead of using the one in use
				});
			} else {
				//Here's a fun piece of trivia. If you stringify a string with escaped backslashes, it re-escapes the backslash and the quote, so '\"' becomes '\\\\\\\"'.
				//JLottery.js stringifies this string.
				let revealDataPackage = wgrStr.replace(/\"/g, '#') + "___" + rdsStr.replace(/\"/g, '#');

				//Test for going over the revealData save limit
				if((revealDataPackage.length) > 1023) {
					purgeRevealData(_state.scenario);
					saveRevealData();
					return;
				}

				//...on WLA, we also have to pack the reveal and wagerData objects into a single property to send to Jlottery, as it does NOT save wagerdata.
				msgBus.publish("jLotteryGame.revealDataSave", {
					revealDataSave: revealDataPackage
				});
			}
		}
	}

	// Last-resort clear of game0 state data to reduce save string size
	function stripGame0Data() {
		_state.g0B = "";
		_state.g0BD = [];
	}

	//Reset non-persistent data
	function purgeRevealData(scenario, gameIndex) {
		_state.scenario = scenario || "";
		_state.g1 = [];
		_state.sc = 0;
		_state.scTS = 0;
		_state.obj = 0;
		_state.objM = config.familyKeys.map(() => 0);
		_state.m = config.MOVE_LIMIT;
		_state.gI = (typeof gameIndex === "number" && gameIndex > -1) ? gameIndex : -1;
		_state.gS = false;
		_state.g0S = 0;
		_state.g0B = "";
		_state.g0BD = [];
	}

	function updateHighScores(newScores, newScoresTS) {
		if(newScores && newScores.length && newScoresTS && newScoresTS.length && (newScores.length === newScoresTS.length)) {
			for(let i = 0; i < newScores.length; i++) {
				addHighScore(newScores[i], newScoresTS[i]);
			}
		}
		saveRevealData();
	}

	function addHighScore(score, timeStamp) {
		let i = 0;
		while(_state.hS[i] !== undefined && (parseFloat(score) > parseFloat(_state.hS[i]))) {
			i++;
		}
		if(!(parseFloat(_state.hS[i]) === parseFloat(score) && parseFloat(_state.hSTS[i]) === parseFloat(timeStamp))) {
			//avoid adding the same score twice
			_state.hS.splice(i, 0, score);
			_state.hSTS.splice(i, 0, timeStamp);
		}

		if(_state.hS.length > 3) {
			_state.hS.shift();
			_state.hSTS.shift();
		}
	}

    function reset() {
		if(_highScore) {
			saveRevealData();
			_highScore = false;
		}

		if(!config.disableLocalStorage) {
			localStorage.setItem("game0_highScores", JSON.stringify(_state.hS));
			localStorage.setItem("game0_highScoresTS", JSON.stringify(_state.hSTS));
		}

		_state.scenario = "";
		_state.g1 = [];
        _state.sc = 0;
		_state.scTS = 0;
        _state.obj = 0;
		_state.objM = config.familyKeys.map(() => 0);
		_state.m = config.MOVE_LIMIT;
		_state.gI = -1;
		_state.gS = false;
		_state.g0S = 0;
		_state.g0B = "";
		_state.g0BD = [];
	}
	
	function compressObjectiveData(objData) {
		_state.objM[config.familyKeys.indexOf(objData.family)] = objData.amount;
	}

	function decompressObjectiveData(family) {
		return _state.objM[config.familyKeys.indexOf(family)];
	}

	function compressBoardData(boardData) {
		let output = [];
		for(var i = 0; i < boardData.length; i++) {
			output.push(config.iconSave[boardData[i].icon]);
		}
		return output;
	}

	function findKey(board) {
		let k = config.keyFind[board];
		return function f(elem) {
			return elem.indexOf(k) > -1;
		};
	}
	function decompressBoardData(board, data) {
		let keys = config.tileKeys.slice(config.tileKeys.findIndex(findKey(board)));
		let output = [];
		for(let i = 0; i < data.length; i++) {
			output.push({key: keys[i], icon: config.iconLoad[data[i]]});
		}
		return output;
	}

	msgBus.subscribe("Game0.objectiveMeter", (data) => {
		if(config.familyKeys.indexOf(data.family) > -1) {
			_state.objM[config.familyKeys.indexOf(data.family)] = data.amount;
		}
		saveRevealData();
	});
    msgBus.subscribe("Game0.objectiveComplete", () => {
		_state.obj = Math.min(config.OBJECTIVES_TOTAL, _state.obj + 1);
		saveRevealData();
	});
	msgBus.subscribe("Game.saveState", (data) => {
		//Save game state and moves
		if(data) {
			if (data.objectives) {
				_state.obj = data.objectives;
			}
			if (data.objectiveMeters) {
				Object.keys(data.objectiveMeters).forEach((meterData) => {
					compressObjectiveData(meterData.family, meterData.amount);
				});
			}
			if (data.moves) {
				_state.m = data.moves;
			}
			if (data.score) {
				_state.sc = data.score;
			}
			if (data.scoreTS) {
				_state.scTS = data.scoreTS;
			}
			if (data.board) {
				_state.g0B = data.board;
			}
			if (data.boardData) {
				_state.g0BD = compressBoardData(data.boardData);
			}
			if (data.seed) {
				_state.g0S = data.seed;
			}
		}
		saveRevealData();
	});
	msgBus.subscribe("Game0.addMove", () => {
		_state.m++;
		saveRevealData();
	});
	msgBus.subscribe("Game0.removeMove", () => {
		_state.m = Math.max(0, _state.m - 1);
		saveRevealData();
	});
    msgBus.subscribe("Game0.addPoints", data => {
		_state.sc += data.score;
		_state.scTS = new Date().getTime();
		if(parseFloat(_state.hS[0]) < _state.sc) {
			_highScore = true;
		}
		saveRevealData();
	});
	msgBus.subscribe("Game0.start", () => {
		_state.gS = true;
	});
	msgBus.subscribe("Game0.finish", () => {
		addHighScore(_state.sc, _state.scTS);
		saveRevealData();
	});
	msgBus.subscribe("Game1.start", () => {
		_state.gS = true;
	});
	msgBus.subscribe("Game0.started", () => {
		_state.gI = 0;
		_state.gS = false;
		saveRevealData();
	});
	msgBus.subscribe("Game1.started", () => {
		_state.gI = 1;
		_state.gS = false;
		_game1Cleared = false;
		saveRevealData();
	});
	msgBus.subscribe("Game1.finish", () => {
		saveRevealData();
		//clear out all game0 data
		purgeRevealData();
		_state.gI = 2;
	});
	
	msgBus.subscribe("Game1.PlayerTile", (data) => {
		if(!_game1Cleared) {
			_state.g1 = [];
			_game1Cleared = true;
		}
		_state.g1.push(data);
		saveRevealData();
	});
	
	msgBus.subscribe('jLottery.startUserInteraction', loadRevealData);
	msgBus.subscribe('jLottery.reStartUserInteraction', loadRevealData);

	return {
        get game1() {
            return _state.g1;
        },
        get score() {
            return Math.round(_state.sc);
        },
		get objectives() {
			return _state.obj;
		},
		get objectiveMeters() {
			let ret = {};
			config.familyKeys.forEach(fam => {
				ret[fam] = decompressObjectiveData(fam);
			});
			return ret;
		},
		get gameIndex() {
			return _state.gI;
		},
		get moves() {
			return _state.m;
		},
		get gameStarting() {
			return _state.gS;
		},
		get highScores() {
			return _state.hS;
		},
		get game0Seed() {
			return _state.g0S;
		},
		get game0Board() {
			return _state.g0B;
		},
		get game0BoardData() {
			return decompressBoardData(_state.g0B, _state.g0BD);
		},
		get scenarioString() {
			return _state.ss;
		},
		get dataLoaded() {
			return _dataLoaded;
		},
		init,
		error,
		reset
    };
});