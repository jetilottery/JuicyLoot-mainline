//Same as the standardIW component except it hides the demo buttons on move to money
define(function(require) {
	var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
	var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
	var machine = require('skbJet/componentManchester/standardIW/stateMachine/machine');
	var gameData = require('skbJet/componentManchester/standardIW/gameData');
	var gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
	var audio = require('skbJet/componentManchester/standardIW/audio');
    var gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');

	return function buttonBarComponent(parts) {
		var buttons = {
			buy: parts.buyButton,
			try: parts.tryButton,
			moveToMoney: parts.moveToMoneyButton,
			playAgain: parts.playAgainButton,
			tryAgain: parts.tryAgainButton,
			home: parts.homeButton,
			exit: parts.exitButton,
			help: parts.helpButton,
			retry: parts.retryButton,
		};

		// Button overrides. Some buttons should *never* show based on env or config
		var overrides = {
			home: !SKBeInstant.isSKB(),
			exit: !SKBeInstant.isSKB(),
		};

		// Keep track of scheduled button updates so we can cancel if needed
		var timeouts = {};

		// Keep track of whether the how to play screen is open
        var helpOpen = false;

        // Keep track of whether we have a wager in progress
        var wagerInProgress = false;

		// Hide everything initially
		buttons.buy.visible = false;
		buttons.try.visible = false;
		buttons.moveToMoney.visible = false;
		buttons.playAgain.visible = false;
		buttons.tryAgain.visible = false;
		buttons.home.visible = false;
		buttons.exit.visible = false;
		buttons.retry.visible = false;

		function updateButtons(buttonConf) {
			Object.keys(buttonConf).forEach(function updateButton(buttonName) {
				// Skip if not a named button
				if (buttons[buttonName] === undefined) {
					return;
				}

				var bConf = buttonConf[buttonName];

				// If we're altering visibility cancel any scheduled updates to this button
				if (
					timeouts[buttonName] !== undefined &&
					(bConf.visible !== undefined || typeof bConf === 'number' || typeof bConf === 'boolean')
				) {
					clearTimeout(timeouts[buttonName]);
					timeouts[buttonName] = undefined;
				}

				// Update button visibility
				if (bConf === true || bConf.visible === true) {
					// Button will be shown if it isn't blocked in this environment
					buttons[buttonName].visible = overrides[buttonName] !== false;
					// Check WLA console
					enableWLAConsole(buttons[buttonName], overrides[buttonName] !== false);
				} else if (bConf === false || bConf.visible === false) {
					// Button will be hidden
					buttons[buttonName].visible = false;
					// Check WLA console
					enableWLAConsole(buttons[buttonName], false);
				} else if (typeof bConf === 'number') {
					// Button will be shown after the specified delay
					timeouts[buttonName] = setTimeout(function showButtonAfterDelay() {
						buttons[buttonName].visible = true;
						// Check WLA console
						enableWLAConsole(buttons[buttonName], true);
						timeouts[buttonName] = undefined;
					}, bConf * 1000);
				}

				// Enable/disable if specified
				if (bConf.enabled !== undefined) {
					buttons[buttonName].enabled = bConf.enabled;
					// Check WLA console
					enableWLAConsole(buttons[buttonName], bConf.enabled);
				}
			});
		}
		msgBus.subscribe('UI.updateButtons', updateButtons);

		// JUILOO-379 - IXF_Poland - Help/Paytable buttons are not enabled during idle state
        // JUILOO-380 - IXF_Poland - Help/Paytable buttons not enabled during bonus before player interaction
        function enableWLAConsole(button, show){          
            // If this is the help button, we need to check if we're on SKB AND WLA (IW IXF)
            if (button === buttons.help && 
                (SKBeInstant.isSKB() && SKBeInstant.isWLA()) && 
                gameConfig.consoleEnabledDuringPlay){
                // Enable or disable console depending on value of show
                var param = show ? 1 : 0;
                // If there is no wager in progress, default to show
                if (!wagerInProgress){
                    // We are not in a wager
                    param = 1;
                }else{
                    // If there is a wager in progress, we need to check if help is open
                    // If help open, we can still keep the buttons enabled
                    // If not, we are okay to enable/disable the buttons
                    if (helpOpen){
                        param = 1;
                    }
                }

                // Publish to platform
                msgBus.publish('toPlatform', {
                  channel: 'Game',
                  topic: 'Game.Control',
                  data: { name: 'howToPlay', event: 'enable', params: [param] },
                });
                msgBus.publish('toPlatform', {
                  channel: 'Game',
                  topic: 'Game.Control',
                  data: { name: 'paytable', event: 'enable', params: [param] },
                });
            }
        }


		// Attach event listeners

		buttons.help.on('press', function onHelpOpen() {
			// Set helpOpen to true here, otherwise we have a race condition
			helpOpen = true;
			msgBus.publish('UI.showHelp');
			if (audio.exists('click')) {
				audio.play('click');
			}
		});

		buttons.home.on('press', function onHomePress() {
			if (audio.exists('click')) {
				audio.play('click');
			}
			gameFlow.next('GAME_EXIT');
		});

		buttons.exit.on('press', function onExitPress() {
			if (audio.exists('click')) {
				audio.play('click');
			}
			gameFlow.next('GAME_EXIT');
		});

		function onBuyPress() {
			buttons.buy.visible = false;
			buttons.try.visible = false;
			buttons.home.visible = false;
			buttons.moveToMoney.visible = false;
			buttons.help.visible = false;

			if (audio.exists('buy')) {
				audio.play('buy');
			} else if (audio.exists('click')) {
				audio.play('click');
			}

			machine.next(gameData.timeoutTriggered ? 'TIMEOUT' : 'TICKET_REQUEST');
		}

		buttons.buy.on('press', onBuyPress);
		buttons.try.on('press', onBuyPress);

		function onPlayAgainPress() {
			buttons.moveToMoney.visible = false;
			if (audio.exists('click')) {
				audio.play('click');
			}
			machine.next();
		}
		
		function onRetryPress() {
            if (audio.exists('click')) {
                audio.play('click');
            }
            msgBus.publish('UI.startNetworkActivity', 0);
            msgBus.publish('UI.updateButtons', {
                retry: false
            }); 
            machine.next('REVEAL_COMPLETE');
        }
		
		buttons.playAgain.on('press', onPlayAgainPress);
		buttons.tryAgain.on('press', onPlayAgainPress);
		
		buttons.retry.on('press', onRetryPress);

		function onMoveToMoneyPress() {
			if (audio.exists('click')) {
				audio.play('click');
			}

			//Hide this button and the try button
			buttons.try.visible = false;
			buttons.moveToMoney.visible = false;
			machine.next('MOVE_TO_MONEY');
		}
		buttons.moveToMoney.on('press', onMoveToMoneyPress);
	
		// Attach helpOpen flag to showHelp message
        msgBus.subscribe('UI.showHelp', function() {
          helpOpen = true;
        });
        
        // Attach helpOpen flag to hideHelp message
        msgBus.subscribe('UI.hideHelp', function() {
          helpOpen = false;
        });

		msgBus.subscribe('jLottery.initialize', function(){wagerInProgress=false;});    
        msgBus.subscribe('jLottery.startUserInteraction', function(){wagerInProgress=true;});
        msgBus.subscribe('jLottery.reStartUserInteraction', function(){wagerInProgress=true;});
        msgBus.subscribe('jLottery.enterResultScreenState', function(){wagerInProgress=false;});
	};
});
