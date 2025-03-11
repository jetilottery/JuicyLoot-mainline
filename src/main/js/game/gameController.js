define((require) => {
	// gameController.js
	// Controller functions for transitioning between game0, game1 and the buy screen.
	const PIXI = require("com/pixijs/pixi");
	const config = require("skbJet/componentManchester/standardIW/gameConfig");
	const filterStyles = require("game/template/filterStyles");
	const displayList = require("skbJet/componentManchester/standardIW/displayList");
	const resLib = require("skbJet/component/resourceLoader/resourceLib");
	const SKBeInstant = require("skbJet/component/SKBeInstant/SKBeInstant");
	const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
	const audio = require("skbJet/componentManchester/standardIW/audio");
	const arrays = require("skbJet/componentLondon/utils/arrays");

	const layoutEngine = require("skbJet/componentManchester/standardIW/layout/engine");
	const layout = require("skbJet/componentManchester/standardIW/layout");
	const baseLayout = require("game/template/layout");
	const orientation = require("skbJet/componentManchester/standardIW/orientation");

	const MeshText = require("game/components/MeshText");
	const maths = require("skbJet/componentLondon/utils/maths");

	const game0Board = require("game/components/game0/match3Board");
	const gameState = require("game/state/gameState");
	const Match3Tile = require("game/components/game0/Match3Tile"); //DEBUG
	const altAutoPlay = require("game/altAutoPlay");

	require("com/gsap/TweenMax");
	const Tween = window.TweenMax;

	require("com/gsap/TimelineLite");
	const Timeline = window.TimelineLite;

	let parallax = {
		layers: [],		//[PIXI.TilingSprite]
		speed: 0		//px per frame
	};

	const betUpSounds = ["bet0Up", "bet1Up", "bet2Up", "bet3Up", "bet4Up", "bet5Up", "bet6Up", "bet7Up", "bet8Up", "bet9Up", "bet10Up", "bet11Up", "bet12Up"];
	let betUpIndexMin, betUpIndex;
	let fullAutoPlayStarted;

	//Handle app resize on orientation change
	function updateLayout(data) {
		layoutEngine.update(
			baseLayout._BASE_APP,
			layout.layouts,
			orientation.get()
		);

		let l = (data === "landscape");
		
		
		if(gameState.gameStarting) {
			displayList.game0.alpha = 0;
			displayList.game1.alpha = 0;
			displayList.game1Shadow.alpha = 0;
		} else if(gameState.gameIndex === -1) {
			displayList.logoLarge.alpha = displayList.logoLarge.visible = 1;
			displayList.logoSmall.alpha = displayList.logoSmall.visible = 0;
			displayList.highScores.alpha = displayList.highScores.visible = 1;
			displayList.winUpTo.alpha = displayList.winUpTo.visible = 1;
			displayList.game1Shadow.alpha = 0;
		} else {
			displayList.logoLarge.alpha = displayList.logoLarge.visible = 0;
			displayList.highScores.alpha = displayList.highScores.visible = 0;
			displayList.winUpTo.alpha = 0;
			displayList.logoSmall.x = l ? 1586 : 600;
			displayList.logoSmall.y = l ? 210 : 170;
			displayList.logoSmall.alpha = displayList.logoSmall.visible = 1;
			if (gameState.gameIndex === 0) {
				displayList.game0.alpha = displayList.game0.visible = 1;
				displayList.background.y = l ? 0 : -280;
				displayList.cityParallax0.y = l ? 200 : 0;
				displayList.cityParallax1.y = l ? 240 : 80;
				displayList.cityParallax2.y = l ? 250 : 70;
				displayList.winUpTo.x = l ? 1600 : 600;
				displayList.winUpTo.y = l ? 302 : 240;
				displayList.winUpTo.alpha = displayList.winUpTo.visible = 1;
				displayList.altAutoPlayButton.alpha = 1;
				displayList.logoSmall.x = l ? 1586 : 600;
			} else if (gameState.gameIndex >= 1) {
				displayList.game1.alpha = displayList.game1.visible = 1;
				displayList.game1Shadow.alpha = 1;
				displayList.winUpTo.y = -125;
				displayList.winUpTo.alpha = 0;
				displayList.mgrPlaque.y = -104;
				displayList.mgrPlaque.alpha = 0;
				displayList.mgrOverlay.alpha = 0;
				displayList.game1.x = l ? 388 : 28;
				displayList.game1.y = l ? 300 : 640;
				displayList.background.y = l ? -610 : -280;
				displayList.cityParallax0.y = l ? -402 : 0;
				displayList.cityParallax1.y = l ? -302 : 80;
				displayList.cityParallax2.y = l ? -300 : 70;
				displayList.logoSmall.x = l ? 960 : 600;
				displayList.logoSmall.y = 140;
				displayList.game1Tagline.x = l ? 960 : 600;
				displayList.game1Tagline.y = 300;
				displayList.game1Tagline.alpha = displayList.game1Tagline.visible = 1;
				displayList.autoPlayButton.alpha = displayList.autoPlayButton.visible = 1;
				displayList.meterBar.alpha = 0;
			}
		}
		updateHighScores();
		msgBus.publish("Game.updateBlender"); //We have to set this after layour update to fix the blender juice level
	}

	//Format score numbers to spaced strings e.g "100 000"
	function formatScore(score) {
		if(!score) { return ""; }
		return String(Math.round(score)).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");
	}

	//Update highscore table as required
	function updateHighScores() {
		if(gameState.highScores[2] === 0) {
			//No high scores recorded yet
			displayList.highScores.visible = false;
		} else {
			displayList.highScores.visible = true;
			displayList.highScore2.text = formatScore(gameState.highScores[2]);
			displayList.highScore1.text = formatScore(gameState.highScores[1]);
			displayList.highScore0.text = formatScore(gameState.highScores[0]);
		}
	}

	function init() {
		betUpIndexMin = betUpSounds.length - SKBeInstant.config.gameConfigurationDetails.availablePrices.length;
		betUpIndex = betUpIndexMin;


		//Shuffle game board selection
		arrays.shuffleArray(config.gameBoards);

		//Add main logo
		let logo = new PIXI.spine.Spine(resLib.spine.logo.spineData);
		displayList.logoLarge.addChild(logo);
		displayList.logoLarge.filters = [filterStyles.game0Objectives];

		logo.state.setAnimation(0, "animation", true);

		//Add parallax background
		let c0Tex = PIXI.Texture.fromFrame("cityParallax0_landscape");
		let c0 = new PIXI.extras.TilingSprite(c0Tex, c0Tex.width, c0Tex.height);
		displayList.cityParallax0.addChild(c0);
		let c1Tex = PIXI.Texture.fromFrame("cityParallax1_landscape");
		let c1 = new PIXI.extras.TilingSprite(c1Tex, c1Tex.width, c1Tex.height);
		displayList.cityParallax1.addChild(c1);
		let c2Tex = PIXI.Texture.fromFrame("cityParallax2_landscape");
		let c2 = new PIXI.extras.TilingSprite(c2Tex, c2Tex.width, c2Tex.height);
		displayList.cityParallax2.addChild(c2);

		parallax.layers = [c0, c1, c2];
		parallax.speed = config.TRUCK_SPEED / PIXI.ticker.shared.FPS;

		//Start parallax speed control
		PIXI.ticker.shared.add(moveLayers);

		//You can't set button label maxwidth in the layout, so we'll just force it here
		displayList.buttonBar.children.forEach(child => {
			if(child.label && child.label.maxWidth) {
				child.label.maxWidth = 258;
			}
		});

		//Add game1 tagline
		let g1Tagline = new MeshText(resLib.i18n.game.Game.game1Tagline, "luckiestGuy", 0xFDA329, [filterStyles.prizeNoWin, filterStyles.prizeShadow], 0.5);
		g1Tagline.position.set(-g1Tagline.width / 2,-g1Tagline.height / 2);
		displayList.game1Tagline.addChild(g1Tagline);
		g1Tagline.gotoAndStop(0.4);

		//Buy screen audio listener
		if(gameState.gameIndex === -1) {
			audio.play("musicBonus", true); //Only play theme tune if going into the buy screen.
		}

		//Betup tracks need to play sequentially, but the sequence has to reverse on betDown
		msgBus.subscribe("TicketSelect.CostUp", () => {
			betUpIndex = Math.min(betUpIndex + 1, betUpSounds.length - 1);
			audio.play(betUpSounds[betUpIndex]);
		});
		msgBus.subscribe("TicketSelect.CostMax", audio.play.bind(audio, "betMax"));
		msgBus.subscribe("TicketSelect.CostDown", () => {
			audio.play("betDown");
			betUpIndex = Math.max(betUpIndex - 1, betUpIndexMin);
		});

		updateHighScores();

		msgBus.subscribe("GameSize.OrientationChange", updateLayout);

		/* DEBUG */
		/*displayList.debugButton.on("press", () => {
			var debugStr = "";

			debugStr += "\n--------DEBUG LOG--------\n";
			debugStr += "\n                         \n";
			debugStr += "\n         BOARDS          \n";
			debugStr += JSON.stringify(Match3Tile.logBoard);
			debugStr += "\n-------------------------\n";
			debugStr += "\n                         \n";
			debugStr += "\n          SEEDS          \n";
			debugStr += JSON.stringify(Match3Tile.logSeed);
			debugStr += "\n-------------------------\n";
			debugStr += "\n                         \n";
			debugStr += "\n          SWAPS          \n";
			debugStr += JSON.stringify(Match3Tile.logSwap);
			debugStr += "\n-------------------------\n";

			const el = document.createElement('textarea');
			el.value = debugStr;
			document.body.appendChild(el);
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);

			alert("Debug log copied to clipboard!");
		});
		displayList.debugButton.enabled = false;
		//*/
		
		
	}

	function moveLayers(delta) {
		for(let i = 0; i < parallax.layers.length; i++) {
			parallax.layers[i].tilePosition.x += (parallax.speed * config.PARALLAX[i] * delta);
		}
	}

	function setFoodTruckSpeed(data) {
		let time = Math.abs((data.speed - (parallax.speed * PIXI.ticker.shared.FPS)) / config.TRUCK_ACCELERATION);

		Tween.to(parallax, time, {speed: data.speed / PIXI.ticker.shared.FPS, ease: "Power2.easeOut", onComplete: data.onComplete});
	}
	msgBus.subscribe("Game.setTruckSpeed", setFoodTruckSpeed);

	//Transition to game 0 from the buy screen
	function startGame0() {
		updateLayout(orientation.get());

		let l = orientation.get() === "landscape";
		let board;
		let tileArray;

		if(gameState.gameIndex > -1 && config.gameBoards.indexOf(gameState.game0Board) >= 0 && gameState.game0BoardData && gameState.game0BoardData.length) {
			//Loading revealData - remove the required board from the "deck"
			let ind = config.gameBoards.indexOf(gameState.game0Board);
			board = config.gameBoards.splice(ind, 1)[0];

			//Load the game state after creating the board
			tileArray = game0Board.createBoard(board);
			console.log("--- GAME 0 RESUME ---");
			Match3Tile.load(gameState.game0BoardData);
		} else {
			//Get the next gameBoard from the top of the deck
			board = config.gameBoards.pop();
			tileArray = game0Board.createBoard(board);
		}

		//Put the current board at the bottom of the deck
		config.gameBoards.unshift(board);

		//displayList.debugButton.enabled = true; //DEBUG

		audio.play("truckStop");
		setFoodTruckSpeed({
			speed: 0,
			onComplete: () => {
				new Timeline({onComplete: () => {
					msgBus.publish("Game0.started", this);
					msgBus.publish("UI.updateButtons", { altAutoPlay: {visible: true, enabled: !displayList.howToPlayContainer.children[1].visible } }); //disable autoplay if help is visible at game start
					msgBus.publish("Game.AltAutoPlayReady");

					msgBus.publish("Game0.saveState", {
						objectives: gameState.objectives,
						moves: gameState.moves,
						score: gameState.score,
						scoreTS: new Date().getTime(),
						board: board,
						boardData: Match3Tile.save(),
						seed: maths.getSeed()
					});
					msgBus.publish("Game0.swapFinished"); //Simple test for refreshing game midway through a cascade
					msgBus.publish("Game0.turnComplete"); //Simple test for 0 moves left (e.g. refresh on mid-game result)

					if(!audio.isPlaying("musicMain")) {
						if(audio.isPlaying("musicBonus")) {
							audio.crossFade("musicMain", "musicBonus", config.AUDIO_CROSSFADE, true);
						} else {
							audio.play("musicMain", true);
						}
					}

					//Some iOS devices are determined to play both songs at once. Sanity check here for double audio.
					setTimeout(() => {
						audio.stop("musicBonus");
					}, config.AUDIO_CROSSFADE * 2);

					//Check orientation in case user flipped phone during animation sequence
					updateLayout(orientation.get());
				}
			})
				.to(displayList.game0, 0, {y: l ? 10 : 646, alpha: 1, visible: true}, 0)
				.to(displayList.background, 0.3, {y: l ? 0 : -280, ease: "Linear.easeNone"}, 0)
				.to(displayList.cityParallax0, 0.3, {y: l ? 200 : 0, ease: "Linear.easeNone"}, 0)
				.to(displayList.cityParallax1, 0.3, {y: l ? 240 : 80, ease: "Linear.easeNone"}, 0)
				.to(displayList.cityParallax2, 0.3, {y: l ? 250 : 70, ease: "Linear.easeNone"}, 0)
				.to(displayList.logoLarge, config.POPUP_FADE_TIME, {alpha: 0, visible: false}, 0)
				.fromTo(
					displayList.highScores,
					config.POPUP_FADE_TIME,
					{alpha: 1, visible: gameState.highScores[2] !== 0},
					{alpha: 0, visible: false},
					0
				)
				.to(displayList.winUpTo, config.POPUP_FADE_TIME, {alpha: 0}, 0)
				.staggerTo(
					displayList.game0BG.children,
					config.SHOW_BG_TIME_SINGLE,
					{pixi: {scaleX: 1, scaleY: 1}},
					{stagger: {amount: config.SHOW_BG_TIME_ALL, from: "start"}}
				)
				.staggerTo(
					tileArray,
					config.SHOW_ICON_TIME_SINGLE,
					{pixi: {scaleX: 1, scaleY: 1}},
					{stagger: {amount: config.SHOW_ICON_TIME_ALL, from: "start"}}
				)
				.fromTo(
					displayList.logoSmall,
					0.625,
					{x: l ? 1586 : 600, y: 0, alpha: 0, visible: false},
					{y: l ? 210 : 170, alpha: 1, visible: true}
				)
				.fromTo(
					displayList.winUpTo,
					0.625,
					{pixi: {scaleX: 0.6, scaleY: 0.6}, x: l ? 1600: 600, y: 70, alpha: 0, visible: false},
					{y: l ? 302 : 240, alpha: 1, visible: true},
					"-=0.625"
				)
				.fromTo(displayList.autoPlayButton, config.POPUP_FADE_TIME, {alpha: 0}, {alpha: 1});
		}});
	}
	msgBus.subscribe("Game0.start", startGame0);

	//Transition to game 1 from the buy screen (restarting an unfinished game)
	function restartGame1() {
		let l = orientation.get() === "landscape";

		audio.play("truckStop");
		setFoodTruckSpeed({speed: 0, onComplete: () => {
			new Timeline({
				onComplete: () => {
					msgBus.publish("Game1.started", this);
					msgBus.publish("UI.updateButtons", { autoPlay: true });

					//Additional check to avoid playing both audios at once
					audio.stop("musicMain");
					audio.stop("musicHurry");
					audio.play("musicBonus", true);

					//Check orientation in case user flipped phone during animation sequence
					updateLayout(orientation.get());
				}
			})
				.fromTo(displayList.game1Shadow, 0.83333, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 0)
				.to(displayList.game0, 0.625, {y: -600, alpha: 0, ease: "Linear.easeNone"}, 0)
				.to(displayList.logoLarge, config.POPUP_FADE_TIME, {alpha: 0, visible: false}, 0)
				.fromTo(
					displayList.highScores,
					config.POPUP_FADE_TIME,
					{alpha: 1, visible: gameState.highScores[2] !== 0},
					{alpha: 0, visible: false},
					0
				)
				.to(displayList.logoSmall, 0.625, {y: -131, alpha: 0, ease: "Linear.easeNone"}, 0)
				.to(displayList.winUpTo, config.POPUP_FADE_TIME, {alpha: 0}, 0)
				.to(displayList.mgrPlaque, 0.58333, {y: -104, alpha: 0, ease: "Back.easeIn.config(2)"}, 0.2083)
				.to(displayList.mgrOverlay, 0.83333, {alpha: 0, ease: "Linear.easeNone"}, 0.625)
				.fromTo(displayList.game1, 1.04167, {x: l ? 388 : 28, y: l ? 1090 : 1810}, {x: l ? 388 : 28, y: l ? 300 : 640, alpha: 1, visible: true, ease: "Back.easeOut.config(2)"}, 0.625)
				.fromTo(displayList.background, 0.83333, {y: l ? 0 : -280}, {y: l ? -610 : -280, ease: "Linear.easeNone"}, 0.625)
				.fromTo(displayList.cityParallax0, 0.83333, {y: l ? 200 : 0}, {y: l ? -402 : 0, ease: "Linear.easeNone"}, 0.625)
				.fromTo(displayList.cityParallax1, 0.83333, {y: l ? 240 : 80}, {y: l ? -302 : 80, ease: "Linear.easeNone"}, 0.625)
				.fromTo(displayList.cityParallax2, 0.83333, {y: l ? 250 : 70}, {y: l ? -300 : 70, ease: "Linear.easeNone"}, 0.625)
				.to(displayList.blenderJuice, config.BLENDER_FILL_TIME, {y: displayList.blenderJuiceEmpty.y}, 0.625)
				.fromTo(displayList.logoSmall, 0.625, {x: l ? 960 : 600, y: -131, alpha: 0, visible: false}, {y: l ? 140 : 140, alpha: 1, visible: true, ease: "Back.easeOut.config(2)"}, 1.0417)
				.fromTo(displayList.game1Tagline, 0.625, {x: l ? 960 : 600, y: -125, alpha: 0, visible: false}, {y: 300, alpha: 1, visible: true, ease: "Back.easeOut.config(2)"}, 1.0417)
				.fromTo(displayList.autoPlayButton, config.POPUP_FADE_TIME, {alpha: 0}, {alpha: 1}, 1.0417);
		}});
	}
	msgBus.subscribe("Game1.restart", restartGame1);

	//Hide game0 result plaque, then transition to game1
	function startGame1() {
		//displayList.debugButton.enabled = false; //DEBUG

		let l = orientation.get() === "landscape";
		fullAutoPlayStarted = config.fullGameAutoPlay && altAutoPlay._enabled;
		altAutoPlay._enabled = false;
		msgBus.publish("UI.updateButtons", { altAutoPlay: false});

		new Timeline({
			onComplete: () => {
				msgBus.publish("Game1.started", this);
				msgBus.publish("UI.updateButtons", { autoPlay: !fullAutoPlayStarted});
				game0Board.reset(); //Remove all the game0 tiles

				audio.stop("musicMain");
				audio.stop("musicHurry");

				//Check orientation in case user flipped phone during animation sequence
				updateLayout(orientation.get());
			}
		})
			.fromTo(displayList.game1Shadow, 0.83333, {alpha: 0}, {alpha: 1, ease: "Linear.easeNone"}, 0)
			.to(displayList.game0, 0.625, {y: -600, alpha: 0, ease: "Linear.easeNone"}, 0)
			.to(displayList.logoSmall, 0.625, {y: -131, alpha: 0, ease: "Linear.easeNone"}, 0)
			.to(displayList.winUpTo, 0.625, {y: -125, alpha: 0, ease: "Linear.easeNone"}, 0)
			.to(displayList.mgrPlaque, 0.58333, {y: -104, alpha: 0, ease: "Back.easeIn.config(2)"}, 0.2083)
			.to(displayList.mgrOverlay, 0.83333, {alpha: 0, ease: "Linear.easeNone"}, 0.625)
			.fromTo(displayList.game1, 1.04167, {x: l ? 388 : 28, y: l ? 1090 : 1810}, {x: l ? 388 : 28, y: l ? 300 : 640, alpha: 1, visible: true, ease: "Back.easeOut.config(2)"}, 0.625)
			.to(displayList.background, 0.83333, {y: l ? -610 : -280, ease: "Linear.easeNone"}, 0.625)
			.to(displayList.cityParallax0, 0.83333, {y: l ? -402 : 0, ease: "Linear.easeNone"}, 0.625)
			.to(displayList.cityParallax1, 0.83333, {y: l ? -302 : 80, ease: "Linear.easeNone"}, 0.625)
			.to(displayList.cityParallax2, 0.83333, {y: l ? -300 : 70, ease: "Linear.easeNone"}, 0.625)
			.to(displayList.blenderJuice, config.BLENDER_FILL_TIME, {y: displayList.blenderJuiceEmpty.y}, 0.625)
			.fromTo(displayList.logoSmall, 0.625, {x: l ? 960 : 600, y: -131, alpha: 0}, {y: l ? 140 : 140, alpha: 1, ease: "Back.easeOut.config(2)"}, 1.0417)
			.fromTo(displayList.game1Tagline, 0.625, {x: l ? 960 : 600, y: -125, alpha: 0}, {y: 300, alpha: 1, ease: "Back.easeOut.config(2)"}, 1.0417)
			.fromTo(displayList.autoPlayButton, config.POPUP_FADE_TIME, {alpha: 0}, {alpha: 1}, 1.0417);

		audio.stop("musicMain");
		audio.stop("musicHurry");
		audio.play("musicBonus", true);
	}
	msgBus.subscribe("Game1.start", startGame1);

	//Start autoplaying game1 if the fullgame autoplay is on
	msgBus.subscribe("Game1.enabled", () => {
		if(fullAutoPlayStarted) {
			msgBus.publish("Game.AutoPlayStart");
			msgBus.publish("UI.updateButtons", { autoPlay: false }); //hide the stop button
		}
	});

	//Show/hide help plaque
	msgBus.subscribe("UI.showHelp", () => {
		if(displayList.logoLarge.visible) {
			Tween.to(displayList.logoLarge, config.POPUP_FADE_TIME, {alpha: 0});
		}
	});

	msgBus.subscribe("UI.hideHelp", () => {
		if(displayList.logoLarge.visible) {
			Tween.to(displayList.logoLarge, config.POPUP_FADE_TIME, {alpha: 1});
		}

		//Some piece of code is forcing both musics to play simultaneously. This is to stop that.
		if(gameState.gameIndex === 0) {
			audio.stop("musicBonus");
		}
	});

	return {
		init: init,
		updateHighScores: updateHighScores
	};
});
