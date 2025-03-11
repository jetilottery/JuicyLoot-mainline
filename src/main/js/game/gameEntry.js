define(function(require) {
	require("polyfill");
	const PIXI = require("com/pixijs/pixi");
	const app = require("skbJet/componentManchester/standardIW/app");
	const layout = require("skbJet/componentManchester/standardIW/layout");
	const config = require("skbJet/componentManchester/standardIW/gameConfig");
	const audio = require("skbJet/componentManchester/standardIW/audio");
	const textStyles = require("skbJet/componentManchester/standardIW/textStyles");
	const gameSize = require("skbJet/componentManchester/standardIW/gameSize");
	const gameFlow = require("skbJet/componentManchester/standardIW/gameFlow");
	const documents = require("skbJet/componentManchester/standardIW/documents");
	const scenarioData = require("skbJet/componentManchester/standardIW/scenarioData");
	const displayList = require("skbJet/componentManchester/standardIW/displayList");
	const SKBeInstant = require("skbJet/component/SKBeInstant/SKBeInstant");

	const prizestructureTransform = require("game/prizestructureTransform");
	const prizetableTransform = require("game/prizetableTransform");
	const scenarioTransform = require("game/scenarioTransform");

	const templateLayout = require("game/template/layout");
	const gameLayout = require("game/custom/layout");
	const templateConfig = require("game/template/config");
	const gameConfig = require("game/custom/config");
	const templateAudioMap = require("game/template/audioMap");
	const gameAudioMap = require("game/custom/audioMap");
	const templateTextStyles = require("game/template/textStyles");
	const gameTextStyles = require("game/custom/textStyles");
	const dimensions = require("game/template/dimensions");

	// Require StandardIW component templates
	let autoPlayButton = require("skbJet/componentManchester/standardIW/ui/autoPlayButton/template");
	let resultPlaques = require("skbJet/componentManchester/standardIW/ui/resultPlaques/template");
	let howToPlay = require("game/components/howToPlay/template");
	let errorPlaque = require("skbJet/componentManchester/standardIW/ui/errorPlaque/template");
	let networkActivity = require("skbJet/componentManchester/standardIW/ui/networkActivity/template");
	let buttonBar = require("game/components/buttonBar/template");
	let ticketSelectBar = require("skbJet/componentManchester/standardIW/ui/ticketSelectBar/template");
	let footer = require("skbJet/componentManchester/standardIW/ui/footer/template");

	// Require all game specific components that need initializing
	let altAutoPlayButton = require("game/components/altAutoPlayButton/template");

	const gameState = require("game/state/gameState");
	const gameController = require("game/gameController");

	const game0Board = require("game/components/game0/match3Board");
	const game0Scores = require("game/components/game0/match3Scores");
	const game0Result = require("game/components/game0/match3Result");
	const game0Reveal = require("game/components/game0/match3Reveal");

	const game0Layout = require("game/components/game0/match3Layout");
	const game0Config = require("game/components/game0/match3Config");

	require("game/components/winUpTo");

	// Require game side state handlers.
									require("game/ticketAcquired");
									require("game/startReveal");
									require("game/endReveal");
	const resultScreen =			require("game/resultScreen");
									require("game/gameReset");
									require("game/error");

	// Register template configs and game overrides
	layout.register(templateLayout, gameLayout);
	layout.register(templateLayout, game0Layout);
	audio.register(templateAudioMap, gameAudioMap);
	config.register(templateConfig, gameConfig);
	config.register(templateConfig, game0Config);
	textStyles.register(templateTextStyles, gameTextStyles);

	// Set game size for portrait and landscape
	gameSize.set(dimensions);

	//Fix anchors on nonstandard sprites (don't know where to put this tbh. Here will do..)
	function findAndCentre(obj) {
		if(obj.texture && obj.texture.defaultAnchor.x && obj.texture.defaultAnchor.y) {
			obj.anchor.set(obj.texture.defaultAnchor.x, obj.texture.defaultAnchor.y);
		}
		for(let i = 0; i < obj.children.length; i++) {
			findAndCentre(obj.children[i]);
		}
	}

	window.app = app;

	function gameInit() {
		PIXI.TextMetrics.METRICS_STRING += "g"; //"g" char is unusually large in luckiest guy font

		// Register a transform function that can be used to turn the prizetable data into structured
		// data representing the prizetables in the paytable document
		
		if (SKBeInstant.isWLA()){
			documents.registerPrizestructureTransform(prizestructureTransform);
		}
		else{
			documents.registerPrizetableTransform(prizetableTransform);
		}		
		// Register a transform function that can be used to turn the scenario string into useable data
		scenarioData.registerTransform(scenarioTransform.parse);

		// Init StandardIW UI templates
		howToPlay = howToPlay();
		resultPlaques = resultPlaques();
		errorPlaque = errorPlaque();
		buttonBar = buttonBar();
		autoPlayButton = autoPlayButton();
		ticketSelectBar = ticketSelectBar();
		footer = footer();
		networkActivity = networkActivity();

		altAutoPlayButton = altAutoPlayButton();

		gameState.init();
		gameController.init();
		resultScreen.init();
		
		// Inititialize game0 components
		game0Board.init();
		game0Scores.init();
		game0Result.init();
		game0Reveal.init();

		// Add everything to the stage
		app.stage.addChild(
			layout.container,
			resultPlaques,
			buttonBar,
			autoPlayButton,
			altAutoPlayButton,
			ticketSelectBar,
			howToPlay,
			footer,
			errorPlaque,
			networkActivity
		);

		findAndCentre(app.stage);

		localise();

		// Once everything is initialized continue to next state
		gameFlow.next();
	}
	gameFlow.handle(gameInit, "GAME_INIT");

	function localise() {
		//Apparently this game was localised by psychopaths so now we have to scale down a bunch of text to fit
		function collidesWith(r1, r2) {
			return ((r1.right >= r2.left) && (r1.left <= r2.right) && (r1.bottom >= r2.top) && (r1.top <= r2.bottom));
		}
		function containedWithin(big, small) {
			return ((small.right < big.right) && (small.left > big.left) && (small.top > big.top) && (small.bottom < big.bottom));
		}
		function fixTextCollisions(list) {
			var text = [];
			var sprites = [];

			list.forEach(function(elem) {
				if(elem.updateText) {
					text.push(elem);
				} else {
					sprites.push(elem);
				}
			});

			sprites.forEach(function(sprite) {
				var sprBounds = sprite.getBounds();
				text.forEach(function(text) {
					//skip if text if fully contained in a sprite
					var textBounds = text.getBounds();
					while(!containedWithin(sprBounds, textBounds) && collidesWith(sprBounds, textBounds)) {
						text.style.fontSize--;
						text.style.lineHeight--;
						text.updateText();
						textBounds = text.getBounds();
					}
				});
			});
		}
		//fix any localisation overlaps. Skip the titles after page 1
		fixTextCollisions(displayList.howToPlayPage1.children);
		fixTextCollisions(displayList.howToPlayPage2.children.slice(1));
		fixTextCollisions(displayList.howToPlayPage3.children.slice(1));
		fixTextCollisions(displayList.howToPlayPage4.children.slice(1));
		fixTextCollisions(displayList.howToPlayPage5.children.slice(1));
		fixTextCollisions([displayList.page6Image0, displayList.page6Image1, displayList.page6Text0, displayList.page6Text1]);
		fixTextCollisions(displayList.howToPlayPage7.children.slice(1));
		fixTextCollisions(displayList.howToPlayPage8.children.slice(1));
		fixTextCollisions(displayList.howToPlayPage9.children.slice(1));
		fixTextCollisions(displayList.howToPlayPage10.children.slice(1));
	}
});
