define((require) => {
	const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    const displayList = require("skbJet/componentManchester/standardIW/displayList");
    const filterStyles = require("game/template/filterStyles");
	const config = require("skbJet/componentManchester/standardIW/gameConfig");
	const Match3Tile = require("game/components/game0/Match3Tile");
	const resLib = require("skbJet/component/resourceLoader/resourceLib");
	const PIXI = require("com/pixijs/pixi");
	const audio = require("skbJet/componentManchester/standardIW/audio");
	const MeshText = require("game/components/MeshText");
	const maths = require("skbJet/componentLondon/utils/maths");

	const gameState = require("game/state/gameState");

	require("com/gsap/TweenMax");
    require("com/gsap/TimelineLite");
    const CustomEase = require("com/gsap/easing/CustomEase");

	const Tween = window.TweenMax;
	const Timeline = window.TimelineMax;

	//Vibration tween created using CustomWiggle, then copied over for use with CustomEase
	const wiggle = CustomEase.create("custom", "M0,0 C0.001,0 0.002,0 0.005,0 0.01,0 0.009,-0.002 0.015,-0.002 0.02,-0.002 0.02,0.011 0.025,0.011 0.03,0.011 0.03,-0.024 0.035,-0.024 0.04,-0.024 0.04,0.041 0.045,0.041 0.05,0.041 0.05,-0.062 0.055,-0.062 0.06,-0.062 0.06,0.086 0.065,0.086 0.07,0.086 0.069,-0.113 0.075,-0.113 0.08,-0.113 0.079,0.141 0.084,0.141 0.09,0.141 0.089,-0.172 0.094,-0.172 0.099,-0.172 0.099,0.204 0.104,0.204 0.109,0.204 0.109,-0.237 0.114,-0.237 0.12,-0.237 0.119,0.271 0.124,0.271 0.129,0.271 0.129,-0.306 0.134,-0.306 0.139,-0.306 0.139,0.341 0.145,0.341 0.15,0.341 0.15,-0.376 0.155,-0.376 0.16,-0.376 0.16,0.411 0.165,0.411 0.17,0.411 0.17,-0.446 0.175,-0.446 0.18,-0.446 0.18,0.481 0.185,0.481 0.19,0.481 0.19,-0.516 0.195,-0.516 0.2,-0.516 0.2,0.549 0.205,0.549 0.21,0.549 0.21,-0.582 0.215,-0.582 0.22,-0.582 0.22,0.615 0.225,0.615 0.23,0.615 0.23,-0.646 0.235,-0.646 0.24,-0.646 0.24,0.676 0.245,0.676 0.25,0.676 0.25,-0.706 0.255,-0.706 0.26,-0.706 0.26,0.734 0.265,0.734 0.27,0.734 0.27,-0.761 0.275,-0.761 0.28,-0.761 0.28,0.786 0.285,0.786 0.29,0.786 0.29,-0.811 0.295,-0.811 0.3,-0.811 0.3,0.834 0.305,0.834 0.31,0.834 0.31,-0.856 0.315,-0.856 0.32,-0.856 0.32,0.876 0.325,0.876 0.33,0.876 0.33,-0.895 0.335,-0.895 0.34,-0.895 0.34,0.912 0.345,0.912 0.35,0.912 0.35,-0.928 0.355,-0.928 0.36,-0.928 0.36,0.942 0.365,0.942 0.37,0.942 0.37,-0.955 0.375,-0.955 0.38,-0.955 0.38,0.966 0.385,0.966 0.39,0.966 0.39,-0.976 0.395,-0.976 0.4,-0.976 0.4,0.984 0.405,0.984 0.41,0.984 0.41,-0.99 0.415,-0.99 0.42,-0.99 0.42,0.995 0.425,0.995 0.43,0.995 0.43,-0.998 0.435,-0.998 0.44,-0.998 0.44,0.999 0.445,0.999 0.45,0.999 0.45,-0.999 0.455,-0.999 0.46,-0.999 0.46,0.997 0.465,0.997 0.47,0.997 0.47,-0.993 0.475,-0.993 0.48,-0.993 0.48,0.987 0.485,0.987 0.49,0.987 0.49,-0.979 0.495,-0.979 0.5,-0.979 0.5,0.969 0.505,0.969 0.51,0.969 0.51,-0.955 0.515,-0.955 0.52,-0.955 0.52,0.939 0.525,0.939 0.53,0.939 0.53,-0.92 0.535,-0.92 0.54,-0.92 0.54,0.897 0.545,0.897 0.55,0.897 0.55,-0.872 0.555,-0.872 0.56,-0.872 0.56,0.843 0.565,0.843 0.57,0.843 0.57,-0.812 0.575,-0.812 0.58,-0.812 0.58,0.777 0.585,0.777 0.59,0.777 0.59,-0.74 0.595,-0.74 0.6,-0.74 0.6,0.701 0.605,0.701 0.61,0.701 0.61,-0.66 0.615,-0.66 0.62,-0.66 0.62,0.62 0.625,0.62 0.63,0.62 0.63,-0.579 0.635,-0.579 0.64,-0.579 0.64,0.539 0.645,0.539 0.65,0.539 0.65,-0.5 0.655,-0.5 0.66,-0.5 0.66,0.462 0.665,0.462 0.67,0.462 0.67,-0.426 0.675,-0.426 0.68,-0.426 0.68,0.392 0.685,0.392 0.69,0.392 0.69,-0.36 0.695,-0.36 0.7,-0.36 0.7,0.33 0.705,0.33 0.71,0.33 0.71,-0.301 0.715,-0.301 0.72,-0.301 0.72,0.274 0.725,0.274 0.73,0.274 0.73,-0.249 0.735,-0.249 0.74,-0.249 0.74,0.226 0.745,0.226 0.75,0.226 0.75,-0.205 0.755,-0.205 0.76,-0.205 0.76,0.185 0.765,0.185 0.77,0.185 0.77,-0.166 0.775,-0.166 0.78,-0.166 0.78,0.149 0.785,0.149 0.79,0.149 0.79,-0.133 0.795,-0.133 0.8,-0.133 0.8,0.118 0.805,0.118 0.81,0.118 0.81,-0.105 0.815,-0.105 0.82,-0.105 0.82,0.092 0.825,0.092 0.83,0.092 0.83,-0.081 0.835,-0.081 0.84,-0.081 0.84,0.07 0.845,0.07 0.85,0.07 0.85,-0.061 0.855,-0.061 0.86,-0.061 0.86,0.052 0.865,0.052 0.87,0.052 0.87,-0.044 0.875,-0.044 0.88,-0.044 0.88,0.037 0.885,0.037 0.89,0.037 0.89,-0.03 0.895,-0.03 0.9,-0.03 0.9,0.025 0.905,0.025 0.91,0.025 0.91,-0.02 0.915,-0.02 0.92,-0.02 0.92,0.015 0.925,0.015 0.93,0.015 0.93,-0.011 0.935,-0.011 0.94,-0.011 0.94,0.008 0.945,0.008 0.95,0.008 0.95,-0.005 0.955,-0.005 0.96,-0.005 0.96,0.003 0.965,0.003 0.97,0.003 0.97,-0.002 0.975,-0.002 0.98,-0.002 0.98,0 0.985,0 0.99,0 0.99,0 0.995,0 0.997,0 0.997,0 1,0");

	let popTotalScore = 0;
	let turnTotalScore = 0;
	let multiplier = 1;
	let panelFruit = {};	//Refs to the fruit Spine sprites
	let blenderBubbles;		//Ref to the bubble animation in the blender

	let floatieTotal = 0;	//The total number of floaties on the screen
	let floatieCount = {};	//Counters for each type of floatie on the screen
	let animFlags = {};		//Animation flags for the spines. Somehow the animationState object doesn't have this
	let gameFinishing = false;	//True when the game is ending (waiting for final floaties)

	let meshes = {};		//References to created meshes

	function init() {
        displayList.game0Objectives.filters = [filterStyles.game0Objectives];
		displayList.blenderJuice.mask = displayList.blenderMask;

		blenderBubbles = new PIXI.spine.Spine(resLib.spine.juiceBubbles.spineData);
		displayList.blenderJuice.addChild(blenderBubbles);

		panelFruit.pear = new PIXI.spine.Spine(resLib.spine.pearPanelAnims.spineData);
		floatieCount.pear = 0;
		animFlags.pear = false;
		panelFruit.apple = new PIXI.spine.Spine(resLib.spine.applePanelAnims.spineData);
		floatieCount.apple = 0;
		animFlags.apple = false;
		panelFruit.blueberry = new PIXI.spine.Spine(resLib.spine.blueberryPanelAnims.spineData);
		floatieCount.blueberry = 0;
		animFlags.blueberry = false;
		panelFruit.lemon = new PIXI.spine.Spine(resLib.spine.lemonPanelAnims.spineData);
		floatieCount.lemon = 0;
		animFlags.lemon = false;
		panelFruit.orange = new PIXI.spine.Spine(resLib.spine.orangePanelAnims.spineData);
		floatieCount.orange = 0;
		animFlags.orange = false;
		panelFruit.blackberry = new PIXI.spine.Spine(resLib.spine.blackberryPanelAnims.spineData);
		floatieCount.blackberry = 0;
		animFlags.blackberry = false;

		Object.keys(panelFruit).forEach(key => {
			let spine = panelFruit[key];
			let cappedKey = key[0].toUpperCase() + key.slice(1);
			let intro = "intro" + cappedKey;
			//let loop = "loop" + cappedKey;
			let outro = "outro" + cappedKey;

			displayList[key + "Fruit"].addChild(spine);

			spine.state.addListener({
				complete: (entry) => {
					//Handle which animation to go to next
					let name = entry.animation.name;
					if(!name.includes("outro")) {
						//End the animation if it's not ending already
						spine.state.addAnimation(0, outro);
					} else if(floatieCount[key] > 0) {
						//Restart
						spine.state.addAnimation(0, intro);
					} else {
						//Animation finished
						animFlags[key] = false;
					}
				}
			});
		});

		meshes[resLib.i18n.game.Game.message_score_high] = new MeshText(resLib.i18n.game.Game.message_score_high, "orange3D");
		meshes[resLib.i18n.game.Game.message_score_medium] = new MeshText(resLib.i18n.game.Game.message_score_medium, "orange3D");
		meshes[resLib.i18n.game.Game.message_score_low] = new MeshText(resLib.i18n.game.Game.message_score_low, "orange3D");

		msgBus.subscribe("Game0.started", onGameStarted);
		msgBus.subscribe("Game0.objectiveComplete", onObjectiveComplete);
		msgBus.subscribe("Game0.addMove", onAddMove);
		msgBus.subscribe("Game0.swapFinished", onSwapFinished);
		msgBus.subscribe("Game0.addPoints", onAddPoints);
		msgBus.subscribe("Game0.allDropsFinished", onAllDropsFinished);
		msgBus.subscribe("Game0.allPopsFinished", onAllPopsFinished);
		msgBus.subscribe("Game0.turnComplete", onTurnComplete);
		msgBus.subscribe("Game0.outOfSwaps", onOutOfSwaps);
		msgBus.subscribe("Game.updateBlender", onUpdateBlender);

		reset();
		if(gameState.gameIndex < 0) {
			gameState.reset();
		}
	}

	function reset() {
		displayList.pearAmount.text = format(0);
		displayList.appleAmount.text = format(0);
		displayList.blueberryAmount.text = format(0);
		displayList.lemonAmount.text = format(0);
		displayList.orangeAmount.text = format(0);
		displayList.blackberryAmount.text = format(0);
		displayList.pearSlash.text = resLib.i18n.game.Game.juice_slash;
		displayList.appleSlash.text= resLib.i18n.game.Game.juice_slash;
		displayList.blueberrySlash.text= resLib.i18n.game.Game.juice_slash;
		displayList.lemonSlash.text= resLib.i18n.game.Game.juice_slash;
		displayList.orangeSlash.text = resLib.i18n.game.Game.juice_slash;
		displayList.blackberrySlash.text = resLib.i18n.game.Game.juice_slash;
		displayList.pearTotal.text = format(config.OBJECTIVES[0]);
		displayList.appleTotal.text = format(config.OBJECTIVES[0]);
		displayList.blueberryTotal.text = format(config.OBJECTIVES[0]);
		displayList.lemonTotal.text = format(config.OBJECTIVES[0]);
		displayList.orangeTotal.text = format(config.OBJECTIVES[0]);
		displayList.blackberryTotal.text = format(config.OBJECTIVES[0]);
		displayList.pearMax.text = "";
		displayList.appleMax.text = "";
		displayList.blueberryMax.text = "";
		displayList.lemonMax.text = "";
		displayList.orangeMax.text = "";
		displayList.blackberryMax.text = "";

		displayList.blenderJuice.y = displayList.blenderJuiceEmpty.y;

		displayList.meterBarObjectivesValue.text = "0";
		displayList.meterBarObjectivesValue.tint = 0x0174ff;
		displayList.meterBarObjectivesValue.scale.set(1);
		displayList.meterBarMovesValue.text = String(config.MOVE_LIMIT);
		displayList.meterBarMovesValue.tint = 0x0174ff;
		displayList.meterBarMovesValue.scale.set(1);
		displayList.meterBarScoreValue.text = "0";
		displayList.meterBarScoreValue.tint = 0x0174ff;
		displayList.meterBarScoreValue.scale.set(1);

		displayList.meterBar.visible = false;
		displayList.game0Objectives.visible = false;

		gameFinishing = false;
		floatieTotal = 0;
		Object.keys(floatieCount).forEach(key => {floatieCount[key] = 0;});
	}

	function format(val) {
		if(val < 10) {
			return "0" + val;
		} else {
			return String(val);
		}
	}

	//Avoid using maths.iRandomRange so we don't pollute the seed
	function iRandomRange(min, max) {
		return (Math.random() * (max - min)) + min;
	}

	function plotFloatiePoints(start, end) {
		let s = start.getGlobalPosition(new PIXI.Point());
		let e = end.getGlobalPosition(new PIXI.Point());

		//We want the floaties to wiggle normal to their direction of travel
		let angle = maths.pointAngle(s, e);
		let dist = maths.pointDistance(s, e);
		let curve = iRandomRange(config.FLOAT_CURVE_MIN, config.FLOAT_CURVE_MAX) * (Math.random() >= 0.5 ? -1 : 1);

		let p1 = maths.pointPivot(new PIXI.Point(s.x + dist / 3, s.y + curve), s, angle);
		let p2 = maths.pointPivot(new PIXI.Point(s.x + dist / 1.5, s.y - curve), s, angle);

		return [s, p1, p2, e];
	}

	//Spawn floaties to fly to the scoreboards on popping relevant icons
    function onPop(data) {
		let end, allCompleteCallback, perFloatieCallback;
		if(data.icon === "symbolGlass" && data.family !== "none") {
			//full glass pop
			msgBus.publish("Game0.addPoints", {score: multiplier * config.GLASS_POINTS});
			end = displayList.meterBarObjectives;

			allCompleteCallback = function() {
				msgBus.publish("Game0.objectiveComplete");
				audio.play("match3Bonus");
			};
		} else if(data.icon === "symbolJug" && data.family !== "none") {
			//full jug pop
			msgBus.publish("Game0.addPoints", {score: multiplier * config.JUG_POINTS});
			end = displayList.meterBarMoves;

			allCompleteCallback = function () {
				msgBus.publish("Game0.addMove");
				audio.play("match3TurnAdded");
			};
		} else if(data.type === "base") {
			//Normal fruit pop
			msgBus.publish("Game0.addPoints", {score: multiplier * (config.POP_POINTS + (data.popVal * config.POP_POINTS))});
			end = displayList[data.family + "Fruit"];

			allCompleteCallback = function(family) {
				updateScores({family: family});
			};
			perFloatieCallback = function(family) {
				//Start animating panel fruit if required
				if(!animFlags[family]) {
					panelFruit[family].state.setAnimation(0, "intro" +  family[0].toUpperCase() + family.slice(1));
					animFlags[family] = true;
				}
			};
		} else {
			//Only spawn floaties on popped fruit or tinted wilds
            return;
        }

		let points = plotFloatiePoints(data.tile, end);

        sendFloaties({
			family: data.family,
			amount: 3 + data.popVal,
			points: points,
			onFloatie: perFloatieCallback,
			onComplete: allCompleteCallback
		});
    }
    msgBus.subscribe("Game0.popStarted", onPop);

    function spawnFloatie(family, x, y) {
        let floatie = new PIXI.Container();
        floatie.container = new PIXI.Container();
        floatie.glow = new PIXI.Sprite(PIXI.Texture.fromFrame("winParticleGlow"));
        floatie.star = new PIXI.Sprite(PIXI.Texture.fromFrame("winParticle"));
        floatie.glow.name = "glow";
        floatie.glow.anchor.set(0.5);
        floatie.glow.tint = config.tintLookup[family];
        floatie.star.name = "star";
        floatie.star.anchor.set(0.5);
		floatie.family = family;

        floatie.container.addChild(floatie.glow);
        floatie.container.addChild(floatie.star);
        floatie.addChild(floatie.container);

        floatie.position.set(
            x + iRandomRange(-Match3Tile.WIDTH / 2, Match3Tile.WIDTH / 2),
            y + iRandomRange(-Match3Tile.HEIGHT / 2, Match3Tile.HEIGHT / 2)
        );
        floatie.scale.set(0);

		floatieCount[family]++;
		floatieTotal++;
        displayList.particleLayer.addChild(floatie);
        return floatie;
    }

    function sendFloaties(data) {
		let floaties = [];
		for(let i = 0; i < data.amount; i++) {
			floaties.push(spawnFloatie(data.family, data.points[0].x, data.points[0].y));
		}

		Tween.staggerTo(floaties, 0.3, {
			pixi: {
				scaleX: 1,
				scaleY: 1
			},
			onComplete: (tween) => {
				tween.target.hover = new Timeline({repeat: -1})
					.to(tween.target.container, 0.7, {pixi: {y: config.FLOAT_UP, ease: "Sine.easeInOut"}})
					.to(tween.target.container, 0.7, {pixi: {y: config.FLOAT_DOWN, ease: "Sine.easeInOut"}});
				tween.target.spin = Tween.to(tween.target.star, 5, {
					pixi:{
						rotation: 360
					},
					repeat: -1,
					onComplete: () => {
						tween.target.star.rotation = 0;
					},
					ease: "Linear.easeNone"
				});
			},
			onCompleteParams: ["{self}"]
		});

		Tween.staggerTo(floaties, config.FLOAT_TIME,
            {
				delay: config.FLOAT_WAIT,
                bezier: {
                    type: "cubic",
                    curviness: 5,
                    timeResolution: 6,
                    values: data.points,
                    autoRotate: false
                },
                ease: "Linear.easeNone",
				onUpdate: function(tween, data) {
					var dist = maths.pointDistance(tween.target.position, data.points[data.points.length - 1]);
					if(dist <= config.FLOAT_FADE_MAX) {
						tween.target.alpha = Math.max(0, (dist - config.FLOAT_FADE_MIN) / (config.FLOAT_FADE_MAX - config.FLOAT_FADE_MIN));
					}
				},
				onUpdateParams: ["{self}", data],
                onComplete: function(tween, data) {
                    tween.target.hover.kill();
                    tween.target.spin.kill();
                    tween.target.parent.removeChild(tween.target);

					if(typeof data.onFloatie === "function") {
						data.onFloatie(data.family);
					}

					floatieCount[data.family]--;
					floatieTotal--;
					if(floatieTotal === 0 && gameFinishing) {
						finishGame();
					}
                },
                onCompleteParams: ["{self}", data]
            },
            0.1,
            function() {
				if(typeof data.onComplete === "function") {
					data.onComplete(data.family);
				}
            }
        );
    }

	//Sets an objective meter's text values depending on the current fruit amount. Returns index of current objective.
	function updateMeterText(family, amount) {
		let newObjectiveIndex;
		for(newObjectiveIndex = 0; newObjectiveIndex < config.OBJECTIVES.length; newObjectiveIndex++) {
			if (config.OBJECTIVES[newObjectiveIndex] > amount) {
				break;
			}
		}

		if (amount >= config.OBJECTIVES[config.OBJECTIVES.length - 1]) {
			//Maxed out, just show "max"
			displayList[family + "Amount"].text = "";
			displayList[family + "Slash"].text = "";
			displayList[family + "Total"].text = "";
			displayList[family + "Max"].text = resLib.i18n.game.Game.juice_max;
		} else {
			//Set amount and total
			displayList[family + "Amount"].text = format(amount);
			displayList[family + "Slash"].text = resLib.i18n.game.Game.juice_slash;
			displayList[family + "Total"].text = format(config.OBJECTIVES[newObjectiveIndex]);
			displayList[family + "Max"].text = "";
		}

		return newObjectiveIndex;
	}

	//Loads in the objective meter values when starting an unfinished game
	function loadScores() {
		let objectiveMeters = gameState.objectiveMeters;
		let keys = Object.keys(objectiveMeters);

		//Set meters
		for(let i = 0; i < keys.length; i++) {
			updateMeterText(keys[i], objectiveMeters[keys[i]]);
		}

		//Fill blender
		let juiceFull = displayList.blenderJuiceFull.y;
		let juiceEmpty = displayList.blenderJuiceEmpty.y;
		let fillDist = Math.abs(juiceFull - juiceEmpty) * (gameState.objectives / config.OBJECTIVES_TOTAL);
		displayList.blenderJuice.y = juiceEmpty - fillDist; //Reducing Y increases fill
	}

	//Updates an objective meter when the floaties arrive.
    function updateScores(data) {
		if (displayList[data.family + "Max"].text === resLib.i18n.game.Game.juice_max) { //Already maxed out
			return;
		}

		let newObjectiveIndex, amount, currentObjectiveIndex;

		//Get current amount for this icon and increment it
		amount = Number(displayList[data.family + "Amount"].text) + 1;
		currentObjectiveIndex = config.OBJECTIVES.indexOf(Number(displayList[data.family + "Total"].text));

		newObjectiveIndex = updateMeterText(data.family, amount);

		//Publish when an objective is reached
		while(currentObjectiveIndex < newObjectiveIndex && currentObjectiveIndex <= config.OBJECTIVES_TOTAL) {
			//Pulse panel when spawning floaties
			Tween.fromTo(displayList[data.family + "Panel"], 0.2, {pixi: {scaleX: 1, scaleY: 1}}, {pixi: {scaleX: 1.2, scaleY: 1.2}, yoyo: true, repeat: 1});
			sendFloaties({
				family: data.family,
				amount: 5,
				points: plotFloatiePoints(displayList[data.family + "Panel"], displayList.meterBarObjectives),
				onComplete: () => {
					msgBus.publish("Game0.objectiveComplete");
					audio.play("match3Objective");
				}
			});
			currentObjectiveIndex++;
		}

		//Fill blender
		let juiceFull = displayList.blenderJuiceFull.y;
		let juiceEmpty = displayList.blenderJuiceEmpty.y;
		let fillDist = Math.abs(juiceFull - juiceEmpty) * (gameState.objectives / config.OBJECTIVES_TOTAL);
		let yTarget = juiceEmpty - fillDist; //Reducing Y increases fill
		if(Math.abs(displayList.blenderJuice.y - yTarget) > 1) {
			//Always add juice, but only vibrate when the blender sound plays
			Tween.to(displayList.blenderJuice, config.BLENDER_FILL_TIME, {y: yTarget});


			//blenderBubbles.state.setAnimation(0, "animation", false);

			if (!audio.isPlaying("blender")) {
				Tween.to(
					displayList.blender,
					config.BLENDER_FILL_TIME,
					{
						pixi: {rotation: 1},
						ease: wiggle,
						onComplete: () => {
							displayList.blender.rotation = 0;
						}
					}
				);
				audio.play("blender");
			}
		}
		
		//Save state
		msgBus.publish("Game0.objectiveMeter", {family: data.family, amount: amount});
		
		//Handle game end
		if(floatieTotal === 0 && gameFinishing) {
			finishGame();
		}
	}

	//SCORE LISTENERS
	function flashText(obj, val, callback) {
		new Timeline()
			.to(obj, config.OBJECTIVES_FLASH_TIME / 3, {
				pixi: { scaleX: config.OBJECTIVES_FLASH_SCALE, scaleY: config.OBJECTIVES_FLASH_SCALE },
				ease: "Expo.easeIn",
				onComplete: (tween) => {
					tween.target.text = String(val);
					tween.target.tint = 0xffffff;
					if(typeof callback === "function") {
						callback();
					}
					obj.maxWidth = obj.maxWidth.valueOf(); // Have to set this again to force it to resize if necessary
				},
				onCompleteParams: ["{self}"]
			}, "0")
			.to(obj, config.OBJECTIVES_FLASH_TIME / 3, {
				pixi: {scaleX: 1, scaleY: 1},
				ease: "Power1.easeIn",
				onComplete: (tween) => {
					tween.target.tint = 0x0174ff;
					obj.maxWidth = obj.maxWidth.valueOf(); // Have to set this again to force it to resize if necessary
				},
				onCompleteParams: ["{self}"]
			}, config.OBJECTIVES_FLASH_TIME / 1.5);
	}

	function waveMessage(string) {
		msgBus.publish("Game0.messageStarted", {string: string});

		if(!meshes[string]) {
			meshes[string] = new MeshText(string, "orange3D");
		}

		let mesh = meshes[string];
		if(mesh.width > (config.MESH_WIDTH_MAX)) {
			mesh.scale.x = config.MESH_WIDTH_MAX / mesh.width;
		}

		mesh.gotoAndPlay(0);
		mesh.scale.y = 0;
		mesh.position.set(-mesh.width / 2, -mesh.height / 2);

		displayList.messageLayer.addChild(mesh);
		Tween.fromTo(
			mesh,
			config.BIG_SCORE_DISPLAY_SECONDS,
			{pixi: {scaleY: 0}},
			{pixi: {scaleY: 2}, repeat:1, yoyo: true, onComplete: () => {
				mesh.parent.removeChild(mesh);
				mesh.gotoAndStop(0);
				msgBus.publish("Game0.messageFinished", {string: string});
			}}
		);
	}

	//Game start
	function onGameStarted() {
		displayList.meterBarObjectivesValue.text = gameState.objectives;
		displayList.meterBarMovesValue.text = gameState.moves;
		displayList.meterBarScoreValue.text = gameState.score;
		loadScores();
		Tween.fromTo(displayList.meterBar, config.POPUP_FADE_TIME, {alpha: 0, visible: false}, {alpha: 1, visible: true});
		Tween.fromTo(displayList.game0Objectives, config.POPUP_FADE_TIME, {alpha: 0, visible: false}, {alpha: 1, visible: true});
	}

	//Objective complete / wild fill
	function onObjectiveComplete() {
		flashText(displayList.meterBarObjectivesValue, gameState.objectives, () => { displayList.meterBarObjectives.gotoAndPlay(0); });
	}

	//Moves remaining.
	function onAddMove() {
		flashText(displayList.meterBarMovesValue, gameState.moves, () => { displayList.meterBarMoves.gotoAndPlay(0); });
	}
	//Subtract moves on successful swap
	function onSwapFinished() {
		displayList.meterBarMovesValue.text =  String(gameState.moves);

		if(gameState.moves <= config.MOVE_LIMIT_WARNING) {
			displayList.meterBarMoves.gotoAndPlay(0);
			if(!audio.isPlaying("musicHurry")) {
				audio.crossFade("musicHurry", "musicMain", config.AUDIO_CROSSFADE, true);
			}
		}

		//reset multiplier
		multiplier = 1;
	}

	//Score multiplier increases after each drop cycle
	function onAllDropsFinished() {
		multiplier = multiplier * config.COMBO_MULTIPLIER;
	}

	//Points on scoreboard
	function onAddPoints(data) {
		popTotalScore += data.score;
	}

	//Keep a running total of the player's score during a cascade and play appropriate SFX
	function onAllPopsFinished() {
		if(popTotalScore >= config.BIG_POINTS) {
			audio.play("match3BigPoints");
		} else {
			audio.playSequential("match3Points");
		}
		turnTotalScore += popTotalScore;
		popTotalScore = 0;

		flashText(displayList.meterBarScoreValue, Math.round(gameState.score));
	}

	//Test for big score and/or no moves left at end of a turn
	function onTurnComplete() {
		console.log("--- TURN COMPLETE: " + turnTotalScore + " POINTS ---");
		if(turnTotalScore > config.BIG_SCORE_LOW) {
			//Show the wavy grats message
			let str;
			if(turnTotalScore >= config.BIG_SCORE_HIGH) {
				str = resLib.i18n.game.Game.message_score_high;
				audio.play("match3Slurptastic");
			} else if(turnTotalScore >= config.BIG_SCORE_MEDIUM) {
				str = resLib.i18n.game.Game.message_score_medium;
				audio.play("match3Delicious");
			} else {
				str = resLib.i18n.game.Game.message_score_low;
				audio.play("match3Juicy");
			}
			waveMessage(str);
		}
		turnTotalScore = 0;

		if(gameState.moves === 0) {
			//no more moves allowed
			msgBus.publish("Game0.disable");
			gameFinishing = true;

			//finish game now if there are no floaties to count
			if(floatieTotal === 0) {
				finishGame();
			}
		}
	}

	//Hide the scores and autoplay button on game end
	function finishGame() {
		gameFinishing = false; //Game is finished now
		new Timeline({
			onComplete: () => {
				msgBus.publish("Game0.finish");
			}
		})
			.to(displayList.meterBar, config.POPUP_FADE_TIME, {alpha: 0})
			.to(displayList.autoPlayButton, config.POPUP_FADE_TIME, {alpha: 0});
	}

	function onOutOfSwaps() {
		waveMessage(resLib.i18n.game.Game.message_out_of_swaps);
	}

	function onUpdateBlender() {
		let juiceFull = displayList.blenderJuiceFull.y;
		let juiceEmpty = displayList.blenderJuiceEmpty.y;
		let fillDist = gameState.gameIndex >= 1 ? 0 : Math.abs(juiceFull - juiceEmpty) * (gameState.objectives / config.OBJECTIVES_TOTAL);
		displayList.blenderJuice.y = juiceEmpty - fillDist;
	}

    return {
        init,
		reset,
		waveMessage
    };
});