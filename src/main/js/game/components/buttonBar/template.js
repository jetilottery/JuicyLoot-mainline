//Same as the standardIW buttonbar template, except it calls the custom component
define(function(require) {
  var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  var layoutEngine = require('skbJet/componentManchester/standardIW/layout/engine');
  var orientation = require('skbJet/componentManchester/standardIW/orientation');
  var layout = require('skbJet/componentManchester/standardIW/layout');
  var textStyles = require('skbJet/componentManchester/standardIW/textStyles');
  var buttonBarLayout = require('skbJet/componentManchester/standardIW/ui/buttonBar/layout');
  var buttonBarTextStyles = require('skbJet/componentManchester/standardIW/ui/buttonBar/textStyles');
  var buttonBarComponent = require('game/components/buttonBar/component');

  layout.register(buttonBarLayout);
  textStyles.register(buttonBarTextStyles);

  return function buttonBarTemplate() {
    var displayList = layoutEngine.createFromTree(
      buttonBarLayout._BASE_PANEL,
      null,
      layout.layouts,
      orientation.get()
    );


    function updateLayout() {
      layoutEngine.update(
        buttonBarLayout._BASE_PANEL,
        layout.layouts,
        orientation.get()
      );
    }

    msgBus.subscribe('GameSize.OrientationChange', updateLayout);


    buttonBarComponent({
      background: displayList.buttonBar,
      helpButton: displayList.helpButton,
      buyButton: displayList.buyButton,
      tryButton: displayList.tryButton,
      playAgainButton: displayList.playAgainButton,
      tryAgainButton: displayList.tryAgainButton,
      moveToMoneyButton: displayList.moveToMoneyButton,
      homeButton: displayList.homeButton,
      exitButton: displayList.exitButton,
      retryButton: displayList.retryButton,
    });

    return displayList.buttonBar;
  };
});
