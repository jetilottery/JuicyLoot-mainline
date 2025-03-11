define(function(require) {	const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");	const gameFlow = require("skbJet/componentManchester/standardIW/gameFlow");	const revealGame0 = require("game/components/game0/match3Reveal");	const revealGame1 = require("game/components/game1/instantWinReveal");	const game0Board = require("game/components/game0/match3Board");	const instantWinBoard = require("game/components/game1/instantWinBoard");	const gameState = require("game/state/gameState");	const pressable = require("skbJet/componentManchester/standardIW/components/pressable");	const error = require("game/error");	//Handle different autoPlay settings between games	msgBus.subscribe("Game.AltAutoPlayStart", () => {		revealGame0.start();	});	msgBus.subscribe("Game.AltAutoPlayStop", () => {		revealGame0.stop();	});	//Game1 will use the generic autoPlay	msgBus.subscribe("Game.AutoPlayStart", () => {		revealGame1.start();	});	msgBus.subscribe("Game.AutoPlayStop", () => {		revealGame1.stop();	});	async function startReveal() {		await gameState.dataLoaded;		//Check gameState to see if we are mid-game		if(gameState.gameIndex < 0) {			//new game, reset state			gameState.reset();		}		if(gameState.gameIndex !== 1) {			// Create the game0 tile board and transition from the buy screen to game0			// Start the game with the board data and seed from the revealDataSave			msgBus.publish("Game0.start");			// Start the match-3 game and wait for the player to finish			await game0Board.enable();		} else {			//Jump straight into game 1			msgBus.publish("Game1.restart");		}				// Setup the instant win game based on the result of the match-3, then wait until all tiles are revealed		await instantWinBoard.init();		await Promise.all([...instantWinBoard.enable()]);		msgBus.publish("Game1.enabled");		pressable._lock = null; //Force unlock of all buttons		msgBus.publish("Game1.finish");		// continue to the next state		console.log("CHECK METERDATA AT REVEAL END");				if(!error.isError()) {			gameFlow.next("REVEAL_COMPLETE");		}	}	gameFlow.handle(startReveal, "START_REVEAL");});