define(function(require) {
	//This is just the normal howToPlay template except open & close have different sound effects, and the component is different
	var msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
	var layoutEngine = require("skbJet/componentManchester/standardIW/layout/engine");
	var orientation = require("skbJet/componentManchester/standardIW/orientation");
	var layout = require("skbJet/componentManchester/standardIW/layout");
	var textStyles = require("skbJet/componentManchester/standardIW/textStyles");
	var howToPlayLayout = require("skbJet/componentManchester/standardIW/ui/howToPlay/layout");
	var howToPlayTextStyles = require("skbJet/componentManchester/standardIW/ui/howToPlay/textStyles");
	var audioButton = require("skbJet/componentManchester/standardIW/ui/audioButton/template");
	var howToPlayComponent = require("game/components/howToPlay/component");
	var audio = require("skbJet/componentManchester/standardIW/audio");
	var config = require("skbJet/componentManchester/standardIW/gameConfig");

	layout.register(howToPlayLayout);
	textStyles.register(howToPlayTextStyles);

	return function howToPlayTemplate() {
		var displayList = layoutEngine.createFromTree(
			howToPlayLayout._BASE_HOW_TO_PLAY,
			null,
			layout.layouts,
			orientation.get()
		);

		function updateLayout() {
			layoutEngine.update(
				howToPlayLayout._BASE_HOW_TO_PLAY,
				layout.layouts,
				orientation.get()
			);
		}

		msgBus.subscribe("GameSize.OrientationChange", updateLayout);

		audioButton = audioButton();
		displayList.audioButtonContainer.addChild(audioButton);

		var howToPlayPlaque = howToPlayComponent({
			background: displayList.howToPlayBackground,
			pageContainer: displayList.howToPlayPages,
			versionText: displayList.versionText,
			title: displayList.howToPlayTitle,
			nextButton: displayList.howToPlayNext,
			previousButton: displayList.howToPlayPrevious,
			audioButton: displayList.audioButtonContainer,
			closeButton: displayList.howToPlayClose,
			overlay: displayList.howToPlayOverlay,
			indicatorContainer: displayList.howToPlayIndicators,
			indicatorActive: displayList.howToPlayIndicatorActive,
			indicatorInactive: displayList.howToPlayIndicatorInactive,
		});

		//On some mobile devices it appears that the framework can enable the audio after the user disables it the first time.
		//This checks the state of the audio button and re-disables it if required.
		function checkSoundState() {
			if(displayList.audio_off_btn.visible) {
				audio.disable();
			}
		}
		//we need to poll the audio button state for the entire time the help page is open as it appears to be impossible to get 
		// checksoundState to call *after* first-tap audio init on some devices (iphone SE)
		checkSoundState();
		let pollInterval;
		if(config.showHowToPlayOnLoad) {
			pollInterval = setInterval(checkSoundState, 100);
		}
		msgBus.subscribe("UI.showHelp", () => {
			setInterval(checkSoundState, 100);
		});

		function playOpenClickSound() {
			audio.play("click");
		}

		function playCloseClickSound() {
			audio.play("clickClose");
		}

		if (audio.exists("click")) {
			if (displayList.howToPlayNext) {
				displayList.howToPlayNext.on("press", playOpenClickSound);
			}
			if (displayList.howToPlayPrevious) {
				displayList.howToPlayPrevious.on("press", playOpenClickSound);
			}
		}

		if(audio.exists("clickClose")) {
			displayList.howToPlayClose.on("press", () => {
				playCloseClickSound();
				clearInterval(pollInterval);
			});
		}

		displayList.howToPlayContainer.addChild(howToPlayPlaque);

		return displayList.howToPlayContainer;
	};
});
