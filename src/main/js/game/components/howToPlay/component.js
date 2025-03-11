//Same as the standardIW howToPlay component except the help button isn't enabled when you start the game with help shown automatically
define(function(require) {
	var msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
	var SKBeInstant = require("skbJet/component/SKBeInstant/SKBeInstant");
	var PagedPlaque = require("skbJet/componentManchester/standardIW/components/pagedPlaque");
	var autoPlay = require("skbJet/componentManchester/standardIW/autoPlay");
	var altAutoPlay = require("game/altAutoPlay");
	var Match3Tile = require("game/components/game0/Match3Tile");

	return function howToPlayComponent(opts) {
		var howToPlayPlaque = new PagedPlaque(
			[
				opts.background,
				opts.pageContainer,
				opts.versionText,
				opts.title,
				opts.audioButton,
				opts.nextButton,
				opts.previousButton,
				opts.closeButton,
				opts.indicatorContainer,
			],
			{
				pages: opts.pageContainer.children,
				overlay: opts.overlay,
				nextButton: opts.nextButton,
				previousButton: opts.previousButton,
				indicatorContainer: opts.indicatorContainer,
				indicatorOnFill: opts.indicatorOnFill,
				indicatorOffFill: opts.indicatorOffFill,
				indicatorActive: opts.indicatorActive,
				indicatorInactive: opts.indicatorInactive
			}
		);
		howToPlayPlaque.name = "HowToPlay";
		window.howToPlayPlaque = howToPlayPlaque;
		var info = window._cacheFlag;
		if (SKBeInstant.isWLA()) {
			opts.versionText.text =
				info.gameVersion +
				(info.changeList ? ".CL" + info.changeList : "") +
				(info.buildNumber ? "_" + info.buildNumber : "");
		}
		function enableUI(toggle) {
			msgBus.publish("UI.updateButtons", {
				buy: {enabled: toggle},
				try: {enabled: toggle},
				playAgain: {enabled: toggle},
				tryAgain: {enabled: toggle},
				moveToMoney: {enabled: toggle},
				help: {enabled: toggle},
				home: {enabled: toggle},
				exit: {enabled: toggle},
				autoPlay: {enabled: toggle},
				altAutoPlay: {enabled: toggle},
				ticketSelect: {enabled: toggle}
			});
		}
		// Attach hide method to close button press event
		var isOpen = false;

		function hidePlaque() {
			msgBus.publish("UI.hideHelp");
			isOpen = false;
			// Disable close button, enable Game UI
			opts.closeButton.enabled = false;
			enableUI(true);
			// Resume autoplay if it was previously active
			autoPlay._suspended = false;
			altAutoPlay._suspended = false;
			// Hide the plaque
			howToPlayPlaque.hide();
		}
		opts.closeButton.on("press", hidePlaque, howToPlayPlaque);
		msgBus.subscribe("UI.forceHideHelp", hidePlaque);

		// Attach show method to showHelp message
		msgBus.subscribe("UI.showHelp", function showHelp() {
			isOpen = true;
			// Pause autoplay (shouldn"t be able to open help whilst in autoplay anyway, but if you did)
			autoPlay._suspended = true;
			altAutoPlay._suspended = true;
			// Disable UI, enable close button
			enableUI(false);
			opts.closeButton.enabled = true;
			// Show the plaque
			howToPlayPlaque.show();
		});

		var betweenGames = false;
		// This method only exists because the buyScreen state handler enables the help button for no reason
		msgBus.subscribe("UI.updateButtons", function forceEnable(conf) {
			if(conf.help !== undefined) {
				if(typeof conf.help === "boolean") {
					conf.help = {enabled: conf.help, visible: conf.help};
				}
				//Disable help when autoplay is running, when between games, or during a board resolve
				conf.help.enabled = !isOpen && !autoPlay._enabled && !altAutoPlay._enabled && !betweenGames && !Match3Tile.resolving;
			}
		});
		// This method stops help being active while the game is starting
		function forceDisable() {
			betweenGames = true;
			msgBus.publish("UI.updateButtons", {help: {enabled: false}});
		}
		function unforceDisable() {
			betweenGames = false;
			msgBus.publish("UI.updateButtons", {help: {enabled: true, visible: true}});
		}

		//Disable during game 0 intro
		msgBus.subscribe("Game0.start", forceDisable);
		msgBus.subscribe("Game0.started", unforceDisable);

		//Disable from mid-game score count to end of game1 intro
		msgBus.subscribe("Game0.finish", forceDisable);
		msgBus.subscribe("Game1.started", unforceDisable);


		return howToPlayPlaque;
	};
});
