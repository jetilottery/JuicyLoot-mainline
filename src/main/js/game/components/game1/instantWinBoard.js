define(require => {	const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");	const displayList = require("skbJet/componentManchester/standardIW/displayList");	const InstantWinTile = require("./InstantWinTile");	const gameState = require("game/state/gameState");	const maths = require("skbJet/componentLondon/utils/maths");	const arrays = require("skbJet/componentLondon/utils/arrays");		require("com/gsap/TweenMax");	const Tween = window.TweenMax;	let tiles;	let numbers;	let resolveRef;	function init() {		let objectives = Math.max(gameState.objectives, 5);		let game1Board = displayList["game1Tiles" + objectives];		//Remove unused numbers from the scenario		numbers = numbers.slice(0, objectives);		//Remove the first three numbers from the set and shuffle the remainder		let first3 = numbers.splice(0, 3);		arrays.shuffleArray(numbers);		//Add the first three numbers in randomly, provided that they appear in order		let pos0 = maths.iRandomRange(0, numbers.length - 1);		numbers.splice(pos0, 0, first3[0]);		let pos1 = maths.iRandomRange(pos0 + 1, numbers.length - 1);		numbers.splice(pos1, 0, first3[1]);		let pos2 = maths.iRandomRange(pos1 + 1, numbers.length - 1);		numbers.splice(pos2, 0, first3[2]);		tiles = [];		game1Board.children.forEach(child => {			tiles.push(InstantWinTile.fromContainer(child));		});		//wait for the controller to send the ready signal before proceeding in startReveal		return new Promise(resolve => {			resolveRef = resolve;			msgBus.subscribe("Game1.started", resolver);		});	}	function resolver() {		resolveRef();		msgBus.unsubscribe("Game1.started", resolver);	}	function populate(data) {		numbers = data;	}	function loadState() {		//extract the prize values that were already uncovered		let prizes = [], i, j;		for(i = 0; i < gameState.game1.length; i++) {			if(gameState.game1[i] && (gameState.game1[i].prize !== undefined)) {				numbers.splice(numbers.indexOf(gameState.game1[i].prize), 1);				prizes.push(gameState.game1[i].prize);			}		}		//append the uncovered prize values to the beginning of numbers		numbers = prizes.concat(numbers);		//enable the uncovered tiles in the order they were originally uncovered		for(j = 0; j < gameState.game1.length; j++) {			if(gameState.game1[j] && (gameState.game1[j].tI !== undefined) && tiles[gameState.game1[j].tI].reveal) {				tiles[gameState.game1[j].tI].reveal();			}		}	}	function enable() {		// Return an array of promises for each tile's lifecycle		let ret = tiles.map(async tile => {			// Enable the tile and wait for it to be revealed (manually or automatically)			await tile.enable();			// Populate the tile with the next Player Number, ready to be uncovered			const nextData = numbers.shift();			tile.populate(nextData);			// Wait for the uncover animation (if animated)			await tile.uncover();			//Fix any overlaping text on the results			tile.fixOverlaps();			msgBus.publish("Game1.PlayerTile", {tI: tiles.indexOf(tile)});		});		msgBus.publish("Game1.enabled");		//Check for game in progress		loadState();		return ret;	}	function revealAll() {		// Get all the tiles yet to be revealed		const unrevealed = tiles.filter(number => !number.revealed);		// Return an array of tweens that calls reveal on each tile in turn		//Containers can get mixed up as drawing order changes, so sort by position (left-right, top-bottom)		unrevealed.sort((a, b) => {			if(a.parent.y === b.parent.y) {				return a.parent.x - b.parent.x;			}			return a.parent.y - b.parent.y;		});		return unrevealed.map(number => Tween.delayedCall(0, number.reveal, null, number));	}	function reset() {		if(tiles && tiles.length) {			tiles.forEach(tile => {				tile.reset();			});		}	}	return {		init,		populate,		enable,		revealAll,		reset	};});