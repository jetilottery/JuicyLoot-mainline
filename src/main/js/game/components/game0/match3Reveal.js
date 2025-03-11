define(require => {
	const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
	const config = require("skbJet/componentManchester/standardIW/gameConfig");
	const gameState = require("game/state/gameState");
	const Match3Tile = require("game/components/game0/Match3Tile");
	const altAutoPlay = require("game/altAutoPlay");

	require("com/gsap/TweenMax");
	const Tween = window.TweenMax;

	require("com/gsap/TimelineLite");
	const Timeline = window.TimelineLite;

	let autoPlaying = false;
	let autoPlayTimeline = {isActive: () => {return false;}};
	let doingSwap = false;
	let outOfSwaps = false;
	let messagePlaying = false;

	function start() {
		console.log("START AUTOPLAY"); //DEBUG
		autoPlaying = true;
		autoSwap();
	}

	function stop() {
		console.log("STOP AUTOPLAY"); //DEBUG
		autoPlaying = false;
		if(!autoPlayTimeline.isActive()) {
			testReady("stop");
		}
	}

	function init() {
		//Wait for message popups to complete before continuing
		msgBus.subscribe("Game0.messageStarted", () => {messagePlaying = true;});

		msgBus.subscribe("Game0.turnComplete", autoSwap);

		msgBus.subscribe("Game0.finish", () => {
			msgBus.unsubscribe("Game0.turnComplete", readyAtTurnEnd); //Possible edge case of ending autoplay on the final turn
		});
	}

	//----

	function autoSwap() {
		// Do random available swaps until the game ends
		if(gameState.moves <= 0) {
			altAutoPlay._enabled = (config.fullGameAutoPlay && altAutoPlay._enabled);
		} else if(autoPlaying && !doingSwap) { //safety check to avoid firing multiple timelines
			doingSwap = true;
			if(messagePlaying) {
				Tween.delayedCall(config.BIG_SCORE_DISPLAY_SECONDS, () => {
					doingSwap = false;
					autoSwap();
				});
				messagePlaying = false;
			} else {
				Tween.delayedCall(config.SQUISH_TIME, () => {
					doSwap(Match3Tile.allSwaps);
				});
			}
		} else if(outOfSwaps) {
			doingSwap = false;
			outOfSwaps = false;
			autoSwap();
		}
	}

	//get a list of available swaps and do the highest scoring one
	function doSwap(allSwaps) {
		if(allSwaps.length) {
			//Get the highest-scoring swap
			let topScore = allSwaps.reduce((acc, curr) => {
				if (curr.score > acc.score) {
					return curr;
				}
				return acc;
			}, {score: 0}).score;

			//We want to pick a value that's not the first available match-3, but keep it consistent with autoplay
			let swaps = allSwaps.filter(curr => curr.score === topScore);
			let [tile0, tile1] = swaps[Math.floor(swaps.length * 0.5)].swap; //Pick the one in the middle

			autoPlayTimeline = new Timeline({
				onComplete: () => {
					if (autoPlaying && !(Match3Tile.swapping || Match3Tile.popping || Match3Tile.tinting || Match3Tile.dropping)) {
						//Swap as normal (Plus sanity check. No new swaps if a game is still resolving!)
						tile0.swap(tile1);
					} else {
						//autoPlay cancelled - send ready signal to re-enable autoPlayStart button
						testReady("cancel");
					}
					doingSwap = false;
				}
			})
				.call(Match3Tile.select, [tile0], tile0, 0)
				.to(tile0, config.AUTO_SWAP_DELAY / 2, {pixi: {scaleX: 1.2, scaleY: 1.2}}, 0)
				.to(tile1, config.AUTO_SWAP_DELAY / 2, {pixi: {scaleX: 1.2, scaleY: 1.2}}, 0)
				.to(tile0, config.AUTO_SWAP_DELAY / 2, {pixi: {scaleX: 1, scaleY: 1}}, config.AUTO_SWAP_DELAY / 2)
				.to(tile1, config.AUTO_SWAP_DELAY / 2, {pixi: {scaleX: 1, scaleY: 1}}, config.AUTO_SWAP_DELAY / 2);
		} else {
			if(!allSwaps.length) {
				//There are no swaps! Blow up the board and continue
				msgBus.publish("Game0.outOfSwaps");
				outOfSwaps = true;
				Object.keys(Match3Tile.tiles).forEach(key => {
					Match3Tile.tiles[key].pop(true);
				});
			}
		}
	}

	//Test if there is a swap, tint or drop in progress. Either fire the ready signal or wait for the turn to end first.
	function testReady(callerString) {
		console.log("TESTREADY: " + callerString); //DEBUG
		if(Match3Tile.swapping || Match3Tile.popping || Match3Tile.tinting || Match3Tile.dropping) {
			msgBus.subscribe("Game0.turnComplete", readyAtTurnEnd);
			console.log("AutoSwap stop: wait -----------------"); //DEBUG
		} else { //if(!readySignalSent) {
			msgBus.publish("Game.AltAutoPlayReady");
			console.log("AutoSwap stop: readyNow -------------"); //DEBUG
		}
	}

	function readyAtTurnEnd() {
		msgBus.publish("Game.AltAutoPlayReady");
		console.log("AutoSwap wait: ready ----------------"); //DEBUG
		msgBus.unsubscribe("Game0.turnComplete", readyAtTurnEnd);
	}

	return {
		start,
		stop,
		init
	};
});