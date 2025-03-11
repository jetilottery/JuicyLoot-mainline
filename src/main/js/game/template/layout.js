define({
	_BASE_APP: {
		children: [
			"cityParallax0",
			"cityParallax1",
			"cityParallax2",
			"background",
			"highScores",
			"backgroundOverlay",
			"game0",
			"game1Shadow",
			"logoLarge",
			"logoSmall",
			"winUpTo",
			"game1",
			"game1Tagline",
			"meterBar",
			"particleLayer",
			"midGameResult",
			"messageLayer"
		]
	},

	/*
	* BACKGROUND
	*/
	cityParallax0: {
		type: "container",
		landscape: {
			x: 218,
			y: 200
		},
		portrait: {
			x: 0,
			y: 160
		}
	},

	cityParallax1: {
		type: "container",
		landscape: {
			x: 218,
			y: 240
		},
		portrait: {
			x: 0,
			y: 240
		}
	},

	cityParallax2: {
		type: "container",
		landscape: {
			x: 218,
			y: 250
		},
		portrait: {
			x: 0,
			y: 230
		}
	},

	background: {
		type: "container",
		children: [
			"counterSurface",
			"blender",
			"cups"
		]
	},

		counterSurface: {
			type: "sprite",
			landscape: {
				texture: "BGCounterSurface_landscape",
				x: 0,
				y: 0
			},
			portrait: {
				texture: "BGCounterSurface_portrait",
				x: 0,
				y: 0
			}
		},

		blender: {
			type: "container",
			children: ["blenderBase", "blenderJuice", "blenderJuiceFull", "blenderJuiceEmpty", "blenderMask", "blenderGlass"],
			landscape: {
				x: 1575,
				y: 756,
				pivot: {
					x: 189,
					y: 550
				}
			},
			portrait: {
				x: 1030,
				y: 742,
				pivot: {
					x: 130,
					y: 450
				}
			}
		},

			blenderBase: {
				type: "sprite",
				landscape: {
					x: 0,
					y: 60,
					texture: "blenderBase_landscape"
				},
				portrait: {
					x: 10,
					y: 20,
					texture: "blenderBase_portrait"
				}
			},
			blenderMask: {
				type: "sprite",
				landscape: {
					x: 22,
					y: -12,
					texture: "blenderMask_landscape"
				},
				portrait: {
					x: 20,
					y: -20,
					texture: "blenderMask_portrait"
				}
			},

			blenderJuice: {
				type: "sprite",
				landscape: {
					x: 26,
					y: 460,
					texture: "blenderJuice_landscape"
				},
				portrait: {
					x: 18,
					y: 260,
					texture: "blenderJuice_portrait"
				}
			},

			blenderJuiceFull: {
				type: "container",
				landscape: {
					y: 75
				},
				portrait: {
					y: 0
				}
			},

			blenderJuiceEmpty: {
				type: "container",
				landscape: {
					y: 450
				},
				portrait: {
					y: 260
				}
			},

			blenderGlass: {
				type: "sprite",
				landscape: {
					x: 22,
					y: 0,
					texture: "blenderGlass_landscape"
				},
				portrait: {
					x: 18,
					y: -16,
					texture: "blenderGlass_portrait"
				}
			},

		cups: {
			type: "sprite",
			landscape: {
				x: 1670,
				y: 658,
				texture: "cups_landscape"
			},
			portrait: {
				x: 1080,
				y: 450,
				texture: "cups_portrait"
			}
		},

	backgroundOverlay: {
		type: "container",
		children: [
			"overlayTop",
			"overlayOranges",
			"overlayApples",
			"overlayBottom"
		]
	},

		overlayTop: {
			type: "sprite",
			landscape: {
				x: 0,
				y: 0,
				texture: "BGOverlayTop_landscape"
			},
			portrait: {
				x: 0,
				y: 0,
				texture: "BGOverlayTop_portrait"
			}
		},

		overlayOranges: {
			type: "sprite",
			landscape: {
				x: -84,
				y: 900
			},
			portrait: {
				x: -187,
				y: 1574
			},
			texture: "orangeBasket"
		},

		overlayApples: {
			type: "sprite",
			landscape: {
				x: 1500,
				y: 900
			},
			portrait: {
				x: 886,
				y: 1560
			},
			texture: "appleBasket"
		},

		overlayBottom: {
			type: "sprite",
			landscape: {
				texture: "BGOverlayBottom_landscape",
				x: 0,
				y: 1200,
				anchor: {
					x: 0,
					y: 1
				}
			},
			portrait: {
				texture: "BGOverlayBottom_portrait",
				x: 0,
				y: 1920,
				anchor: {
					x: 0,
					y: 1
				}
			}
		},

	/*
	 * GAME 0 - see match3Layout.js
	 */
	game0: {
		type: "container",
		landscape: {x: 108, y: 10},
		portrait: {x:0, y: 646}
	},

	game1Shadow: {
		type: "sprite",
		anchor: 0,
		landscape: {
			x: 0,
			y: 0,
			texture: "shadowLandscape"
		},
		portrait: {
			x: 0,
			y: 0,
			texture: "shadowPortrait"
		},
		alpha: 0
	},

	/*
	 * HIGH SCORES
	 */
	highScores: {
		type: "container",
		anchor: 0.5,
		children: ["highScoreBG", "highScoreLabel", "highScore2", "highScore1", "highScore0"],
		landscape: {
			x: 1584,
			y: 670
		},
		portrait: {
			x: 866,
			y: 616
		}
	},
		highScoreBG: {
			type: "sprite",
			anchor: 0.5,
			x: 0,
			y: 0,
			texture: "highScoresPanel"
		},
		highScoreLabel: {
			type: "text",
			style: "highScoresLabel",
			string: "highScores_label",
			anchor: 0.5,
			maxWidth: 500,
			rotation: 0.35,
			x: 90,
			y: -162
		},
		highScore2: {
			type: "text",
			style: "highScores",
			string: "",
			anchor: 0.5,
			maxWidth: 500,
			rotation: 0.35,
			x: 60,
			y: -110
		},
		highScore1: {
			type: "text",
			style: "highScores",
			string: "",
			anchor: 0.5,
			maxWidth: 500,
			rotation: 0.35,
			x: 34,
			y: -35
		},
		highScore0: {
			type: "text",
			style: "highScores",
			string: "",
			anchor: 0.5,
			maxWidth: 500,
			rotation: 0.35,
			x: 9,
			y: 40
		},
	/*
	 * LARGE(ANIMATED) LOGO
	 */
	logoLarge: {
		type: "container",
		anchor: 0.5,
		landscape: {
			x: 955,
			y: 500
		},
		portrait: {
			x: 600,
			y: 1140
		}
	},

	/*
	* SMALL(STILL) LOGO
	*/
	logoSmall: {
		type: "sprite",
		anchor: 0.5,
		texture: "logoSmall",
		visible: false,
		landscape: {
			x: 1586,
			y: 170
		},
		portrait: {
			x: 600,
			y: 170
		}
	},

	/*
	* WIN UP TO
	*/
	winUpTo: {
		type: "container",
		children: ["winUpToLabel", "winUpToIn", "winUpToOut"],
		landscape: { x: 960, y: 464 },
		portrait: { x: 600, y: 1090 }
	},
		winUpToLabel: {
			type: "text",
			style: "winUpToLabel",
			string: "winUpToLabel",
			anchor: 0.5,
			maxWidth: 500
		},
		winUpToIn: {
			type: "container",
			children: ["winUpToInText"],
			landscape: { x: 0, y: 95 },
			portrait: { x: 0, y: 95 }
		},
			winUpToInText: {
				type: "text",
				style: "winUpToValue",
				string: "winUpToValue",
				anchor: 0.5,
				maxWidth: 1000
			},
		winUpToOut: {
			type: "container",
			children: ["winUpToOutText"],
			landscape: { x: 0, y: 95 },
			portrait: { x: 0, y: 95 }
		},
			winUpToOutText: {
				type: "text",
				style: "winUpToValue",
				string: "winUpToValue",
				anchor: 0.5,
				maxWidth: 1000
			},

	/*
	 * GAME 1
	 */
	game1: {
		type: "container",
		children: [
			"game1Tiles5",
			"game1Tiles6",
			"game1Tiles7",
			"game1Tiles8",
			"game1Tiles9",
			"game1Tiles10",
			"game1Tiles11",
			"game1Tiles12",
			"game1Tiles13",
			"game1Tiles14",
			"game1Tiles15",
			"game1Tiles16",
			"game1Tiles17",
			"game1Tiles18"
		],
		landscape: {
			x: 388,
			y: 300
		},
		portrait: {
			x: 28,
			y: 640
		},
		alpha: 0,
		visible: false
	},
		"game1Tiles5": {
			type: "container",
			children: [
				"g1t05_00",
				"g1t05_01",
				"g1t05_02",
				"g1t05_03",
				"g1t05_04"
			]
		},
			g1t05_00: { type: "container", landscape: {x: 383, y: 110}, portrait: {x: 383, y: 110}},
			g1t05_01: { type: "container", landscape: {x: 767, y: 110}, portrait: {x: 767, y: 110}},
			g1t05_02: { type: "container", landscape: {x: 575, y: 324}, portrait: {x: 575, y: 388}},
			g1t05_03: { type: "container", landscape: {x: 383, y: 538}, portrait: {x: 383, y: 666}},
			g1t05_04: { type: "container", landscape: {x: 767, y: 538}, portrait: {x: 767, y: 666}},
		"game1Tiles6": {
			type: "container",
			children: [
				"g1t06_00",
				"g1t06_01",
				"g1t06_02",
				"g1t06_03",
				"g1t06_04",
				"g1t06_05"
			]
		},
			g1t06_00: { type: "container", landscape: {x: 479, y: 110}, portrait: {x: 479, y: 110}},
			g1t06_01: { type: "container", landscape: {x: 671, y: 110}, portrait: {x: 671, y: 110}},
			g1t06_02: { type: "container", landscape: {x: 287, y: 324}, portrait: {x: 287, y: 388}},
			g1t06_03: { type: "container", landscape: {x: 863, y: 324}, portrait: {x: 863, y: 388}},
			g1t06_04: { type: "container", landscape: {x: 479, y: 538}, portrait: {x: 479, y: 666}},
			g1t06_05: { type: "container", landscape: {x: 671, y: 538}, portrait: {x: 671, y: 666}},
		"game1Tiles7": {
			type: "container",
			children: [
				"g1t07_00",
				"g1t07_01",
				"g1t07_02",
				"g1t07_03",
				"g1t07_04",
				"g1t07_05",
				"g1t07_06"
			]
		},
			g1t07_00: { type: "container", landscape: {x: 479, y: 110}, portrait: {x: 479, y: 110}},
			g1t07_01: { type: "container", landscape: {x: 671, y: 110}, portrait: {x: 671, y: 110}},
			g1t07_02: { type: "container", landscape: {x: 383, y: 324}, portrait: {x: 383, y: 388}},
			g1t07_03: { type: "container", landscape: {x: 575, y: 324}, portrait: {x: 575, y: 388}},
			g1t07_04: { type: "container", landscape: {x: 767, y: 324}, portrait: {x: 767, y: 388}},
			g1t07_05: { type: "container", landscape: {x: 479, y: 538}, portrait: {x: 479, y: 666}},
			g1t07_06: { type: "container", landscape: {x: 671, y: 538}, portrait: {x: 671, y: 666}},
		"game1Tiles8": {
			type: "container",
			children: [
				"g1t08_00",
				"g1t08_01",
				"g1t08_02",
				"g1t08_03",
				"g1t08_04",
				"g1t08_05",
				"g1t08_06",
				"g1t08_07"
			]
		},
			g1t08_00: { type: "container", landscape: {x: 479, y: 110}, portrait: {x: 479, y: 110}},
			g1t08_01: { type: "container", landscape: {x: 671, y: 110}, portrait: {x: 671, y: 110}},
			g1t08_02: { type: "container", landscape: {x: 287, y: 324}, portrait: {x: 287, y: 388}},
			g1t08_03: { type: "container", landscape: {x: 479, y: 324}, portrait: {x: 479, y: 388}},
			g1t08_04: { type: "container", landscape: {x: 671, y: 324}, portrait: {x: 671, y: 388}},
			g1t08_05: { type: "container", landscape: {x: 863, y: 324}, portrait: {x: 863, y: 388}},
			g1t08_06: { type: "container", landscape: {x: 479, y: 538}, portrait: {x: 479, y: 666}},
			g1t08_07: { type: "container", landscape: {x: 671, y: 538}, portrait: {x: 671, y: 666}},
		"game1Tiles9": {
			type: "container",
			children: [
				"g1t09_00",
				"g1t09_01",
				"g1t09_02",
				"g1t09_03",
				"g1t09_04",
				"g1t09_05",
				"g1t09_06",
				"g1t09_07",
				"g1t09_08"
			]
		},
			g1t09_00: { type: "container", landscape: {x: 479, y: 110}, portrait: {x: 479, y: 110}},
			g1t09_01: { type: "container", landscape: {x: 671, y: 110}, portrait: {x: 671, y: 110}},
			g1t09_02: { type: "container", landscape: {x: 383, y: 324}, portrait: {x: 383, y: 388}},
			g1t09_03: { type: "container", landscape: {x: 575, y: 324}, portrait: {x: 575, y: 388}},
			g1t09_04: { type: "container", landscape: {x: 767, y: 324}, portrait: {x: 767, y: 388}},
			g1t09_05: { type: "container", landscape: {x: 287, y: 538}, portrait: {x: 287, y: 666}},
			g1t09_06: { type: "container", landscape: {x: 479, y: 538}, portrait: {x: 479, y: 666}},
			g1t09_07: { type: "container", landscape: {x: 671, y: 538}, portrait: {x: 671, y: 666}},
			g1t09_08: { type: "container", landscape: {x: 863, y: 538}, portrait: {x: 863, y: 666}},
		"game1Tiles10": {
			type: "container",
			children: [
				"g1t10_00",
				"g1t10_01",
				"g1t10_02",
				"g1t10_03",
				"g1t10_04",
				"g1t10_05",
				"g1t10_06",
				"g1t10_07",
				"g1t10_08",
				"g1t10_09"
			]
		},
			g1t10_00: { type: "container", landscape: {x: 287, y: 110}, portrait: {x: 287, y: 110}},
			g1t10_01: { type: "container", landscape: {x: 479, y: 110}, portrait: {x: 479, y: 110}},
			g1t10_02: { type: "container", landscape: {x: 671, y: 110}, portrait: {x: 671, y: 110}},
			g1t10_03: { type: "container", landscape: {x: 863, y: 110}, portrait: {x: 863, y: 110}},
			g1t10_04: { type: "container", landscape: {x: 287, y: 324}, portrait: {x: 287, y: 388}},
			g1t10_05: { type: "container", landscape: {x: 863, y: 324}, portrait: {x: 863, y: 388}},
			g1t10_06: { type: "container", landscape: {x: 287, y: 538}, portrait: {x: 287, y: 666}},
			g1t10_07: { type: "container", landscape: {x: 479, y: 538}, portrait: {x: 479, y: 666}},
			g1t10_08: { type: "container", landscape: {x: 671, y: 538}, portrait: {x: 671, y: 666}},
			g1t10_09: { type: "container", landscape: {x: 863, y: 538}, portrait: {x: 863, y: 666}},
		"game1Tiles11": {
			type: "container",
			children: [
				"g1t11_00",
				"g1t11_01",
				"g1t11_02",
				"g1t11_03",
				"g1t11_04",
				"g1t11_05",
				"g1t11_06",
				"g1t11_07",
				"g1t11_08",
				"g1t11_09",
				"g1t11_10"
			]
		},
			g1t11_00: { type: "container", landscape: {x: 287, y: 110}, portrait: {x: 287, y: 110}},
			g1t11_01: { type: "container", landscape: {x: 479, y: 110}, portrait: {x: 479, y: 110}},
			g1t11_02: { type: "container", landscape: {x: 671, y: 110}, portrait: {x: 671, y: 110}},
			g1t11_03: { type: "container", landscape: {x: 863, y: 110}, portrait: {x: 863, y: 110}},
			g1t11_04: { type: "container", landscape: {x: 383, y: 324}, portrait: {x: 383, y: 388}},
			g1t11_05: { type: "container", landscape: {x: 575, y: 324}, portrait: {x: 575, y: 388}},
			g1t11_06: { type: "container", landscape: {x: 767, y: 324}, portrait: {x: 767, y: 388}},
			g1t11_07: { type: "container", landscape: {x: 287, y: 538}, portrait: {x: 287, y: 666}},
			g1t11_08: { type: "container", landscape: {x: 479, y: 538}, portrait: {x: 479, y: 666}},
			g1t11_09: { type: "container", landscape: {x: 671, y: 538}, portrait: {x: 671, y: 666}},
			g1t11_10: { type: "container", landscape: {x: 863, y: 538}, portrait: {x: 863, y: 666}},
		"game1Tiles12": {
			type: "container",
			children: [
				"g1t12_00",
				"g1t12_01",
				"g1t12_02",
				"g1t12_03",
				"g1t12_04",
				"g1t12_05",
				"g1t12_06",
				"g1t12_07",
				"g1t12_08",
				"g1t12_09",
				"g1t12_10",
				"g1t12_11"
			]
		},
			g1t12_00: { type: "container", landscape: {x: 287, y: 110}, portrait: {x: 287, y: 110}},
			g1t12_01: { type: "container", landscape: {x: 479, y: 110}, portrait: {x: 479, y: 110}},
			g1t12_02: { type: "container", landscape: {x: 671, y: 110}, portrait: {x: 671, y: 110}},
			g1t12_03: { type: "container", landscape: {x: 863, y: 110}, portrait: {x: 863, y: 110}},
			g1t12_04: { type: "container", landscape: {x: 287, y: 324}, portrait: {x: 287, y: 388}},
			g1t12_05: { type: "container", landscape: {x: 479, y: 324}, portrait: {x: 479, y: 388}},
			g1t12_06: { type: "container", landscape: {x: 671, y: 324}, portrait: {x: 671, y: 388}},
			g1t12_07: { type: "container", landscape: {x: 863, y: 324}, portrait: {x: 863, y: 388}},
			g1t12_08: { type: "container", landscape: {x: 287, y: 538}, portrait: {x: 287, y: 666}},
			g1t12_09: { type: "container", landscape: {x: 479, y: 538}, portrait: {x: 479, y: 666}},
			g1t12_10: { type: "container", landscape: {x: 671, y: 538}, portrait: {x: 671, y: 666}},
			g1t12_11: { type: "container", landscape: {x: 863, y: 538}, portrait: {x: 863, y: 666}},
		"game1Tiles13": {
			type: "container",
			children: [
				"g1t13_00",
				"g1t13_01",
				"g1t13_02",
				"g1t13_03",
				"g1t13_04",
				"g1t13_05",
				"g1t13_06",
				"g1t13_07",
				"g1t13_08",
				"g1t13_09",
				"g1t13_10",
				"g1t13_11",
				"g1t13_12"
			]
		},
			g1t13_00: { type: "container", landscape: {x: 191, y: 110}, portrait: {x: 191, y: 110}},
			g1t13_01: { type: "container", landscape: {x: 383, y: 110}, portrait: {x: 383, y: 110}},
			g1t13_02: { type: "container", landscape: {x: 575, y: 110}, portrait: {x: 575, y: 110}},
			g1t13_03: { type: "container", landscape: {x: 767, y: 110}, portrait: {x: 767, y: 110}},
			g1t13_04: { type: "container", landscape: {x: 959, y: 110}, portrait: {x: 959, y: 110}},
			g1t13_05: { type: "container", landscape: {x: 191, y: 324}, portrait: {x: 191, y: 388}},
			g1t13_06: { type: "container", landscape: {x: 575, y: 324}, portrait: {x: 575, y: 388}},
			g1t13_07: { type: "container", landscape: {x: 959, y: 324}, portrait: {x: 959, y: 388}},
			g1t13_08: { type: "container", landscape: {x: 191, y: 538}, portrait: {x: 191, y: 666}},
			g1t13_09: { type: "container", landscape: {x: 383, y: 538}, portrait: {x: 383, y: 666}},
			g1t13_10: { type: "container", landscape: {x: 575, y: 538}, portrait: {x: 575, y: 666}},
			g1t13_11: { type: "container", landscape: {x: 767, y: 538}, portrait: {x: 767, y: 666}},
			g1t13_12: { type: "container", landscape: {x: 959, y: 538}, portrait: {x: 959, y: 666}},
		"game1Tiles14": {
			type: "container",
			children: [
				"g1t14_00",
				"g1t14_01",
				"g1t14_02",
				"g1t14_03",
				"g1t14_04",
				"g1t14_05",
				"g1t14_06",
				"g1t14_07",
				"g1t14_08",
				"g1t14_09",
				"g1t14_10",
				"g1t14_11",
				"g1t14_12",
				"g1t14_13"
			]
		},
			g1t14_00: { type: "container", landscape: {x: 191, y: 110}, portrait: {x: 191, y: 110}},
			g1t14_01: { type: "container", landscape: {x: 383, y: 110}, portrait: {x: 383, y: 110}},
			g1t14_02: { type: "container", landscape: {x: 575, y: 110}, portrait: {x: 575, y: 110}},
			g1t14_03: { type: "container", landscape: {x: 767, y: 110}, portrait: {x: 767, y: 110}},
			g1t14_04: { type: "container", landscape: {x: 959, y: 110}, portrait: {x: 959, y: 110}},
			g1t14_05: { type: "container", landscape: {x: 191, y: 324}, portrait: {x: 191, y: 388}},
			g1t14_06: { type: "container", landscape: {x: 383, y: 324}, portrait: {x: 383, y: 388}},
			g1t14_07: { type: "container", landscape: {x: 767, y: 324}, portrait: {x: 767, y: 388}},
			g1t14_08: { type: "container", landscape: {x: 959, y: 324}, portrait: {x: 959, y: 388}},
			g1t14_09: { type: "container", landscape: {x: 191, y: 538}, portrait: {x: 191, y: 666}},
			g1t14_10: { type: "container", landscape: {x: 383, y: 538}, portrait: {x: 383, y: 666}},
			g1t14_11: { type: "container", landscape: {x: 575, y: 538}, portrait: {x: 575, y: 666}},
			g1t14_12: { type: "container", landscape: {x: 767, y: 538}, portrait: {x: 767, y: 666}},
			g1t14_13: { type: "container", landscape: {x: 959, y: 538}, portrait: {x: 959, y: 666}},
		"game1Tiles15": {
			type: "container",
			children: [
				"g1t15_00",
				"g1t15_01",
				"g1t15_02",
				"g1t15_03",
				"g1t15_04",
				"g1t15_05",
				"g1t15_06",
				"g1t15_07",
				"g1t15_08",
				"g1t15_09",
				"g1t15_10",
				"g1t15_11",
				"g1t15_12",
				"g1t15_13",
				"g1t15_14"
			]
		},
			g1t15_00: { type: "container", landscape: {x: 191, y: 110}, portrait: {x: 191, y: 110}},
			g1t15_01: { type: "container", landscape: {x: 383, y: 110}, portrait: {x: 383, y: 110}},
			g1t15_02: { type: "container", landscape: {x: 575, y: 110}, portrait: {x: 575, y: 110}},
			g1t15_03: { type: "container", landscape: {x: 767, y: 110}, portrait: {x: 767, y: 110}},
			g1t15_04: { type: "container", landscape: {x: 959, y: 110}, portrait: {x: 959, y: 110}},
			g1t15_05: { type: "container", landscape: {x: 191, y: 324}, portrait: {x: 191, y: 388}},
			g1t15_06: { type: "container", landscape: {x: 383, y: 324}, portrait: {x: 383, y: 388}},
			g1t15_07: { type: "container", landscape: {x: 575, y: 324}, portrait: {x: 575, y: 388}},
			g1t15_08: { type: "container", landscape: {x: 767, y: 324}, portrait: {x: 767, y: 388}},
			g1t15_09: { type: "container", landscape: {x: 959, y: 324}, portrait: {x: 959, y: 388}},
			g1t15_10: { type: "container", landscape: {x: 191, y: 538}, portrait: {x: 191, y: 666}},
			g1t15_11: { type: "container", landscape: {x: 383, y: 538}, portrait: {x: 383, y: 666}},
			g1t15_12: { type: "container", landscape: {x: 575, y: 538}, portrait: {x: 575, y: 666}},
			g1t15_13: { type: "container", landscape: {x: 767, y: 538}, portrait: {x: 767, y: 666}},
			g1t15_14: { type: "container", landscape: {x: 959, y: 538}, portrait: {x: 959, y: 666}},

		"game1Tiles16": {
			type: "container",
			children: [
				"g1t16_00",
				"g1t16_01",
				"g1t16_02",
				"g1t16_03",
				"g1t16_04",
				"g1t16_05",
				"g1t16_06",
				"g1t16_07",
				"g1t16_08",
				"g1t16_09",
				"g1t16_10",
				"g1t16_11",
				"g1t16_12",
				"g1t16_13",
				"g1t16_14",
				"g1t16_15"
			]
		},
			g1t16_00: { type: "container", landscape: {x: 95, y: 110}, portrait: {x: 95, y: 110}},
			g1t16_01: { type: "container", landscape: {x: 287, y: 110}, portrait: {x: 287, y: 110}},
			g1t16_02: { type: "container", landscape: {x: 479, y: 110}, portrait: {x: 479, y: 110}},
			g1t16_03: { type: "container", landscape: {x: 671, y: 110}, portrait: {x: 671, y: 110}},
			g1t16_04: { type: "container", landscape: {x: 863, y: 110}, portrait: {x: 863, y: 110}},
			g1t16_05: { type: "container", landscape: {x: 1055, y: 110}, portrait: {x: 1055, y: 110}},
			g1t16_06: { type: "container", landscape: {x: 95, y: 324}, portrait: {x: 95, y: 388}},
			g1t16_07: { type: "container", landscape: {x: 287, y: 324}, portrait: {x: 287, y: 388}},
			g1t16_08: { type: "container", landscape: {x: 863, y: 324}, portrait: {x: 863, y: 388}},
			g1t16_09: { type: "container", landscape: {x: 1055, y: 324}, portrait: {x: 1055, y: 388}},
			g1t16_10: { type: "container", landscape: {x: 95, y: 538}, portrait: {x: 95, y: 666}},
			g1t16_11: { type: "container", landscape: {x: 287, y: 538}, portrait: {x: 287, y: 666}},
			g1t16_12: { type: "container", landscape: {x: 479, y: 538}, portrait: {x: 479, y: 666}},
			g1t16_13: { type: "container", landscape: {x: 671, y: 538}, portrait: {x: 671, y: 666}},
			g1t16_14: { type: "container", landscape: {x: 863, y: 538}, portrait: {x: 863, y: 666}},
			g1t16_15: { type: "container", landscape: {x: 1055, y: 538}, portrait: {x: 1055, y: 666}},

		"game1Tiles17": {
			type: "container",
			children: [
				"g1t17_00",
				"g1t17_01",
				"g1t17_02",
				"g1t17_03",
				"g1t17_04",
				"g1t17_05",
				"g1t17_06",
				"g1t17_07",
				"g1t17_08",
				"g1t17_09",
				"g1t17_10",
				"g1t17_11",
				"g1t17_12",
				"g1t17_13",
				"g1t17_14",
				"g1t17_15",
				"g1t17_16"
			]
		},
			g1t17_00: { type: "container", landscape: {x: 95, y: 110}, portrait: {x: 95, y: 110}},
			g1t17_01: { type: "container", landscape: {x: 287, y: 110}, portrait: {x: 287, y: 110}},
			g1t17_02: { type: "container", landscape: {x: 479, y: 110}, portrait: {x: 479, y: 110}},
			g1t17_03: { type: "container", landscape: {x: 671, y: 110}, portrait: {x: 671, y: 110}},
			g1t17_04: { type: "container", landscape: {x: 863, y: 110}, portrait: {x: 863, y: 110}},
			g1t17_05: { type: "container", landscape: {x: 1055, y: 110}, portrait: {x: 1055, y: 110}},
			g1t17_06: { type: "container", landscape: {x: 191, y: 324}, portrait: {x: 191, y: 388}},
			g1t17_07: { type: "container", landscape: {x: 383, y: 324}, portrait: {x: 383, y: 388}},
			g1t17_08: { type: "container", landscape: {x: 575, y: 324}, portrait: {x: 575, y: 388}},
			g1t17_09: { type: "container", landscape: {x: 767, y: 324}, portrait: {x: 767, y: 388}},
			g1t17_10: { type: "container", landscape: {x: 959, y: 324}, portrait: {x: 959, y: 388}},
			g1t17_11: { type: "container", landscape: {x: 95, y: 538}, portrait: {x: 95, y: 666}},
			g1t17_12: { type: "container", landscape: {x: 287, y: 538}, portrait: {x: 287, y: 666}},
			g1t17_13: { type: "container", landscape: {x: 479, y: 538}, portrait: {x: 479, y: 666}},
			g1t17_14: { type: "container", landscape: {x: 671, y: 538}, portrait: {x: 671, y: 666}},
			g1t17_15: { type: "container", landscape: {x: 863, y: 538}, portrait: {x: 863, y: 666}},
			g1t17_16: { type: "container", landscape: {x: 1055, y: 538}, portrait: {x: 1055, y: 666}},
		"game1Tiles18": {
			type: "container",
			children: [
				"g1t18_00",
				"g1t18_01",
				"g1t18_02",
				"g1t18_03",
				"g1t18_04",
				"g1t18_05",
				"g1t18_06",
				"g1t18_07",
				"g1t18_08",
				"g1t18_09",
				"g1t18_10",
				"g1t18_11",
				"g1t18_12",
				"g1t18_13",
				"g1t18_14",
				"g1t18_15",
				"g1t18_16",
				"g1t18_17"
			]
		},
			g1t18_00: { type: "container", landscape: {x: 95, y: 110}, portrait: {x: 95, y: 110}},
			g1t18_01: { type: "container", landscape: {x: 287, y: 110}, portrait: {x: 287, y: 110}},
			g1t18_02: { type: "container", landscape: {x: 479, y: 110}, portrait: {x: 479, y: 110}},
			g1t18_03: { type: "container", landscape: {x: 671, y: 110}, portrait: {x: 671, y: 110}},
			g1t18_04: { type: "container", landscape: {x: 863, y: 110}, portrait: {x: 863, y: 110}},
			g1t18_05: { type: "container", landscape: {x: 1055, y: 110}, portrait: {x: 1055, y: 110}},
			g1t18_06: { type: "container", landscape: {x: 95, y: 324}, portrait: {x: 95, y: 388}},
			g1t18_07: { type: "container", landscape: {x: 287, y: 324}, portrait: {x: 287, y: 388}},
			g1t18_08: { type: "container", landscape: {x: 479, y: 324}, portrait: {x: 479, y: 388}},
			g1t18_09: { type: "container", landscape: {x: 671, y: 324}, portrait: {x: 671, y: 388}},
			g1t18_10: { type: "container", landscape: {x: 863, y: 324}, portrait: {x: 863, y: 388}},
			g1t18_11: { type: "container", landscape: {x: 1055, y: 324}, portrait: {x: 1055, y: 388}},
			g1t18_12: { type: "container", landscape: {x: 95, y: 538}, portrait: {x: 95, y: 666}},
			g1t18_13: { type: "container", landscape: {x: 287, y: 538}, portrait: {x: 287, y: 666}},
			g1t18_14: { type: "container", landscape: {x: 479, y: 538}, portrait: {x: 479, y: 666}},
			g1t18_15: { type: "container", landscape: {x: 671, y: 538}, portrait: {x: 671, y: 666}},
			g1t18_16: { type: "container", landscape: {x: 863, y: 538}, portrait: {x: 863, y: 666}},
			g1t18_17: { type: "container", landscape: {x: 1055, y: 538}, portrait: {x: 1055, y: 666}},

	game1Tagline: {
		type: "container",
		landscape: { x: 960, y: -125 },
		portrait: { x: 600, y: -125 }
	},
	
	/*
	 * Particles
	 */
	particleLayer: {
		type: "container"
	},

	/*
	 * Messages
	 */
	messageLayer: {
		type: "container",
		landscape: { x: 665, y: 500 },
		portrait: { x: 600, y: 1050 }
	},

	/*
	 * Meters
	 */
	meterBar: {
		type: "container",
		children: ["meterBarObjectives", "meterBarMoves", "meterBarScore"]
	},

	meterBarObjectives: {
		type: "animatedSprite",
		children: ["meterBarObjectivesLabel", "meterBarObjectivesValue"],
		landscape: { x: 146, y: 1028 },
		portrait: { x: 166, y: 546 },
		anchor: 0.5,
		loop: false,
		textures: "windowDrinksWobble"
	},

		meterBarObjectivesLabel: {
			type: "text",
			string: "objectiveMeter_label",
			style: "meterBarLabel",
			anchor: 0.5,
			landscape: { x: 2, y: 28 },
			portrait: { x: 2, y: 28 },
			tint: 0x0174ff,
			maxWidth: 20
		},

		meterBarObjectivesValue: {
			type: "text",
			style: "meterBarValue",
			maxWidth: 70,
			landscape: {
				x: 90,
				y: 28,
				anchor: {x: 1, y: 0.5}
			},
			portrait: {
				x: 90,
				y: 28,
				anchor: {x: 1, y: 0.5}
			},
			tint: 0x0174ff
		},

	meterBarMoves: {
		type: "animatedSprite",
		children: ["meterBarMovesLabel", "meterBarMovesValue"],
		landscape: { x: 563, y: 1056 },
		portrait: { x: 530, y: 574 },
		anchor: 0.5,
		loop: false,
		textures: "windowMovesMade"
	},

		meterBarMovesLabel: {
			type: "text",
			string: "moveMeter_label",
			style: "meterBarLabel",
			anchor: {x: 0, y: 0.5},
			landscape: { x: 8, y: -2 },
			portrait: { x: 8, y: -2 },
			tint: 0x0174ff,
			maxWidth: 20
		},

		meterBarMovesValue: {
			type: "text",
			style: "meterBarValue",
			anchor: {x: 1, y: 0.5},
			maxWidth: 70,
			landscape: { x: 94,	y: -2 },
			portrait: { x: 94,	y: -2 },
			tint: 0x0174ff,
		},

	meterBarScore: {
		type: "sprite",
		children: ["meterBarScoreLabel", "meterBarScoreValue"],
		landscape: { x: 1411, y: 1058, texture: "scoreMeterBG_landscape" },
		portrait: { x: 960, y: 580, texture: "scoreMeterBG_portrait" },
		anchor: 0.5
	},

		meterBarScoreLabel: {
			type: "text",
			string: "scoreMeter_label",
			style: "meterBarLabel",
			anchor: {x: 0, y: 0.5},
			landscape: {x: -230, y: -4, maxWidth: 260},
			portrait: {x: -180, y: -4, maxWidth: 180},
			tint: 0x0174ff
		},

		meterBarScoreValue: {
			type: "text",
			style: "meterBarValue",
			anchor: {x: 1, y: 0.5},
			landscape: {x: 230, y: -4, maxWidth: 200},
			portrait: {x: 169, y: -4, maxWidth: 165},
			tint: 0x0174ff
		},


	/*
	* How To Play
	*/
	howToPlayBackground: {
		type: "sprite",
		anchor: { x: 0.5 },
		landscape: {
			x: 960,
			y: 130,
			texture: "landscapeTutorialBackground"
		},
		portrait: {
			x: 600,
			y: 236,
			texture: "portraitTutorialBackground"
		}
	},

	howToPlayPages: {
		type: "container",
		children: [
			"howToPlayPage1",
			"howToPlayPage2",
			"howToPlayPage3",
			"howToPlayPage4",
			"howToPlayPage5",
			"howToPlayPage6",
			"howToPlayPage7",
			"howToPlayPage8",
			"howToPlayPage9",
			"howToPlayPage10"
		]
	},
		howToPlayPage1: {
			type: "container",
			children: ["page1Subtitle", "page1Title", "page1Text0", "page1Text1", "page1Text2", "page1Text3", "page1Image0", "page1Image1", "page1Image2"]
		},
			page1Subtitle: {
				type: "text",
				string: "tutorialTitle0",
				style: "howToPlaySubtitle",
				anchor: {x: 1, y: 0.5},
				landscape: { x: 960, y: 263, maxWidth: 900},
				portrait: { x: 600, y: 370, maxWidth: 530 }
			},
			page1Title: {
				type: "text",
				string: "tutorialTitle1",
				style: "howToPlayTitle",
				anchor: {x: 0, y: 0.5},
				landscape: { x: 964, y: 259, maxWidth: 900 },
				portrait: { x: 604, y: 366, maxWidth: 530 }
			},
			page1Text0: {
				type: "text",
				string: "page1_0",
				style: "howToPlayText",
				anchor: 0.5,
				landscape: { x: 579, y: 369, wordWrapWidth: 650 },
				portrait: { x: 600, y: 477, wordWrapWidth: 650 }
			},
			page1Text1: {
				type: "text",
				string: "page1_1",
				style: "howToPlayText",
				anchor: 0.5,
				landscape: { x: 580, y: 577, wordWrapWidth: 650 },
				portrait: { x: 600, y: 711, wordWrapWidth: 650 }
			},
			page1Text2: {
				type: "text",
				string: "page1_2",
				style: "howToPlayText",
				anchor: 0.5,
				landscape: { x: 572, y: 696, wordWrapWidth: 650 },
				portrait: { x: 600, y: 1342, wordWrapWidth: 650 }
			},
			page1Text3: {
				type: "text",
				string: "page1_3",
				style: "howToPlayTitle",
				anchor: 0.5,
				maxWidth: 105,
				landscape: { x: 1392, y: 684 },
				portrait: { x: 728, y: 1077 }
			},
			page1Image0: {
				type: "sprite",
				texture: "tutorialPage1Pic1",
				anchor: 0.5,
				landscape: { x: 570, y: 473 },
				portrait: { x: 600, y: 596 }
			},
			page1Image1: {
				type: "sprite",
				texture: "tutorialPage1Pic2",
				anchor: 0.5,
				landscape: { x: 1320, y: 450 },
				portrait: { x: 596, y: 870 }
			},
			page1Image2: {
				type: "sprite",
				texture: "tutorialPage1Pic3",
				anchor: 0.5,
				landscape: { x: 1265, y: 691 },
				portrait: { x: 600, y: 1084 }
			},
		howToPlayPage2: {
			type: "container",
			children: ["page2Title", "page2Image0", "page2Text0", "page2Image1"]
		},
			page2Title: {
				type: "text",
				string: "tutorialTitle2",
				style: "howToPlayTitle",
				anchor: 0.5,
				landscape: { x: 957, y: 258 },
				portrait: { x: 600, y: 362 }
			},
			page2Image0: {
				type: "sprite",
				texture: "tutorialPage2Pic1",
				anchor: 0.5,
				landscape: { x: 645, y: 579 },
				portrait: { x: 600, y: 692 }
			},
			page2Text0: {
				type: "text",
				string: "page2_0",
				style: "howToPlayText",
				anchor: 0.5,
				landscape: { x: 1363, y: 467, wordWrapWidth: 650, align: "left" },
				portrait: { x: 600, y: 1277, wordWrapWidth: 650, align: "center" }
			},
			page2Image1: {
				type: "sprite",
				texture: "tutorialPage2Pic2",
				anchor: 0.5,
				landscape: { x: 1339, y: 639 },
				portrait: { x: 600, y: 1050 }
			},
		howToPlayPage3: {
			type: "container",
			children: ["page3Title", "page3Image0", "page3Text0"]
		},
			page3Title: {
				type: "text",
				string: "tutorialTitle3",
				style: "howToPlayTitle",
				anchor: 0.5,
				landscape: { x: 957, y: 258 },
				portrait: { x: 600, y: 362 }
			},
			page3Image0: {
				type: "sprite",
				texture: "tutorialPage3Pic1",
				anchor: 0.5,
				landscape: { x: 645, y: 569 },
				portrait: { x: 600, y: 792 }
			},
			page3Text0: {
				type: "text",
				string: "page3_0",
				style: "howToPlayText",
				anchor: 0.5,
				landscape: { x: 1349, y: 569, wordWrapWidth: 650 },
				portrait: { x: 600, y: 1097, wordWrapWidth: 650 }
			},
		howToPlayPage4: {
			type: "container",
			children: ["page4Title", "page4Image0", "page4Text0"]
		},
			page4Title: {
				type: "text",
				string: "tutorialTitle4",
				style: "howToPlayTitle",
				anchor: 0.5,
				landscape: { x: 957, y: 258 },
				portrait: { x: 600, y: 362 }
			},
			page4Image0: {
				type: "sprite",
				texture: "tutorialPage4Pic1",
				anchor: 0.5,
				landscape: { x: 553, y: 569 },
				portrait: { x: 600, y: 837 }
			},
			page4Text0: {
				type: "text",
				string: "page4_0",
				style: "howToPlayText",
				anchor: 0.5,
				landscape: { x: 1229, y: 575, wordWrapWidth: 650 },
				portrait: { x: 600, y: 1207, wordWrapWidth: 650 }
			},
		howToPlayPage5: {
			type: "container",
			children: ["page5Title", "page5Image0", "page5Text0"]
		},
			page5Title: {
				type: "text",
				string: "tutorialTitle5",
				style: "howToPlayTitle",
				anchor: 0.5,
				landscape: { x: 957, y: 258 },
				portrait: { x: 600, y: 362 }
			},
			page5Image0: {
				type: "sprite",
				texture: "tutorialPage5Pic1",
				anchor: 0.5,
				landscape: { x: 705, y: 569 },
				portrait: { x: 600, y: 691 }
			},
			page5Text0: {
				type: "text",
				string: "page5_0",
				style: "howToPlayText",
				anchor: 0.5,
				landscape: { x: 1439, y: 569, wordWrapWidth: 500, align: "left" },
				portrait: { x: 600, y: 1080, wordWrapWidth: 600, align: "center" }
			},
		howToPlayPage6: {
			type: "container",
			children: ["page6Title", "page6Text0", "page6Text1", "page6Text2", "page6Text3", "page6Image0", "page6Image1"]
		},
			page6Title: {
				type: "text",
				string: "tutorialTitle6",
				style: "howToPlayTitle",
				anchor: 0.5,
				landscape: { x: 957, y: 258 },
				portrait: { x: 600, y: 362 }
			},
			page6Text0: {
				type: "text",
				string: "page6_0",
				style: "howToPlayText",
				anchor: 0.5,
				landscape: { x: 960, y: 414, maxWidth: 1800, wordWrapWidth: 1800 },
				portrait: { x: 600, y: 560, maxWidth: 700, wordWrapWidth: 700 }
			},
			page6Text1: {
				type: "text",
				string: "page6_1",
				style: "howToPlayText",
				anchor: 0.5,
				landscape: { x: 960, y: 753, maxWidth: 1800, wordWrapWidth: 1800 },
				portrait: { x: 600, y: 1284, maxWidth: 800, wordWrapWidth: 800 }
			},
			page6Text2: {
				type: "text",
				string: "page6_2",
				style: "howToPlayTitle",
				anchor: 0.5,
				maxWidth: 105,
				landscape: { x: 636, y: 592},
				portrait: { x: 610, y: 790}
			},
			page6Text3: {
				type: "text",
				string: "page6_3",
				style: "howToPlayTitle",
				anchor: 0.5,
				maxWidth: 105,
				landscape: { x: 960, y: 592 },
				portrait: { x: 307, y: 1050 }
			},
			page6Image0: {
				type: "sprite",
				texture: "tutorialPage6Pic1",
				anchor: 0.5,
				landscape: { x: 633, y: 610 },
				portrait: { x: 605, y: 816 }
			},
			page6Image1: {
				type: "sprite",
				texture: "tutorialPage6Pic2",
				anchor: 0.5,
				landscape: { x: 1295, y: 603 },
				portrait: { x: 653, y: 1058}
			},
		howToPlayPage7: {
			type: "container",
			children: ["page7Title", "page7Text0", "page7Image0"]
		},
			page7Title: {
				type: "text",
				string: "tutorialTitle7",
				style: "howToPlayTitle",
				anchor: 0.5,
				landscape: { x: 957, y: 258 },
				portrait: { x: 600, y: 362 }
			},
			page7Text0: {
				type: "text",
				string: "page7_0",
				style: "howToPlayText",
				anchor: 0.5,
				landscape: { x: 1350, y: 602, maxWidth: 630, wordWrapWidth: 630 },
				portrait: { x: 600, y: 1150, maxWidth: 650, wordWrapWidth: 650 }
			},
			page7Image0: {
				type: "sprite",
				texture: "tutorialPage7Pic1",
				anchor: 0.5,
				maxWidth: 600,
				landscape: { x: 665, y: 558 },
				portrait: { x: 600, y: 750}
			},
		howToPlayPage8: {
			type: "container",
			children: ["page8Title", "page8Text0", "page8Image0"]
		},
			page8Title: {
				type: "text",
				string: "tutorialTitle8",
				style: "howToPlayTitle",
				anchor: 0.5,
				landscape: { x: 957, y: 258 },
				portrait: { x: 600, y: 362 }
			},
			page8Text0: {
				type: "text",
				string: "page8_0",
				style: "howToPlayText",
				anchor: 0.5,
				landscape: { x: 1330, y: 584, wordWrapWidth: 600 },
				portrait: { x: 600, y: 1157, wordWrapWidth: 600 }
			},
			page8Image0: {
				type: "sprite",
				texture: "tutorialPage8Pic1",
				anchor: 0.5,
				landscape: { x: 665, y: 558 },
				portrait: { x: 600, y: 748}
			},
		howToPlayPage9: {
			type: "container",
			children: ["page9Title", "page9Text0", "page9Image0"]
		},
			page9Title: {
				type: "text",
				string: "tutorialTitle9",
				style: "howToPlayTitle",
				anchor: 0.5,
				landscape: { x: 957, y: 258 },
				portrait: { x: 600, y: 362 }
			},
			page9Text0: {
				type: "text",
				string: "page9_0",
				style: "howToPlayText",
				anchor: 0.5,
				landscape: { x: 619, y: 522, wordWrapWidth: 600 },
				portrait: { x: 608, y: 1138, wordWrapWidth: 600 }
			},
			page9Image0: {
				type: "sprite",
				texture: "tutorialPage9Pic1",
				anchor: 0.5,
				landscape: { x: 1318, y: 540 },
				portrait: { x: 604, y: 780}
			},
		howToPlayPage10: {
			type: "container",
			children: ["page10Title", "page10Text0", "page10Text1", "page10Image0"]
		},
			page10Title: {
				type: "text",
				string: "tutorialTitle10",
				style: "howToPlayTitle",
				anchor: 0.5,
				landscape: { x: 957, y: 258 },
				portrait: { x: 600, y: 362 }
			},
			page10Text0: {
				type: "text",
				string: "page10_0",
				style: "howToPlayText",
				anchor: 0.5,
				landscape: { x: 585, y: 436, wordWrapWidth: 650, align: "left" },
				portrait: { x: 600, y: 542, wordWrapWidth: 650, align: "center" }
			},
			page10Text1: {
				type: "text",
				string: "page10_1",
				style: "howToPlayText",
				anchor: 0.5,
				landscape: { x: 585, y: 624, wordWrapWidth: 650, align: "left" },
				portrait: { x: 600, y: 1260, wordWrapWidth: 650, align: "center" }
			},
			page10Image0: {
				type: "sprite",
				texture: "tutorialPage10Pic1",
				anchor: 0.5,
				landscape: { x: 1336, y: 541 },
				portrait: { x: 620, y: 863}
			},
		howToPlayClose: {
			type: "button",
			string: "button_ok",
			landscape: { x: 960, y: 900 },
			portrait: { x: 600, y: 1552, scale: 1.3 },
			textures: {
				enabled: "tutorialOKButtonEnabled",
				over: "tutorialOKButtonOver",
				pressed: "tutorialOKButtonPressed"
			},
			style: {
				enabled: "mainButtonEnabled",
				over: "mainButtonOver",
				pressed: "mainButtonPressed",
				disabled: "mainButtonDisabled"
			}
		},

		howToPlayPrevious: {
			type: "button",
			landscape: { x: 100, y: 560 },
			portrait: { x: 104, y: 888 },
			textures: {
				enabled: "tutorialLeftButtonEnabled",
				disabled: "tutorialLeftButtonDisabled",
				over: "tutorialLeftButtonOver",
				pressed: "tutorialLeftButtonPressed"
			}
		},
		howToPlayNext: {
			type: "button",
			landscape: { x: 1818, y: 560 },
			portrait: { x: 1090, y: 888 },
			textures: {
				enabled: "tutorialRightButtonEnabled",
				disabled: "tutorialRightButtonDisabled",
				over: "tutorialRightButtonOver",
				pressed: "tutorialRightButtonPressed"
			}
		},

		howToPlayIndicators: {
			type: "container",
			children: ["howToPlayIndicatorActive", "howToPlayIndicatorInactive"],
			landscape: { x: 972, y: 818 },
			portrait: { x: 612, y: 1468 }
		},

		audioButtonContainer: {
			type: "container",
			landscape: { x: 110, y: 902, scale: 1 },
			portrait: { x: 138, y: 1556, scale: 1.3 }
		},

		versionText: {
			type: "text",
			style: "versionText",
			alpha: 0.5,
			landscape: { x: 55, y: 160 },
			portrait: { x: 55, y: 264 }
		},

	/*
	 * NETWORK ACTIVITY
	 */
	networkActivity: {
		type: "animatedSprite",
		landscape: { x: 960, y: 600 },
		portrait: { x: 600, y: 614 },
		anchor: 0.5,
		textures: "loaderAnim"
	},

	/*
	 * FOOTER
	 */
	footerContainer: {
		type: "container",
		children: ["footerBG", "balanceMeter", "ticketCostMeter", "winMeter", "divider_1_3", "divider_2_3", "divider_1_2"],
		landscape: { y: 1122 },
		portrait: { y: 1800 }
	},

	balanceMeter: {
		type: "container",
		children: ["balanceLabel", "balanceValue"],
		landscape: { x: 420, y: 39 },
		portrait: { x: 200, y: 0 }
	},
	balanceLabel: {
		type: "text",
		string: "footer_balance",
		anchor: 0.5,
		landscape: {
			y: 0,
			anchor: { x: 0 },
			maxWidth: 390,
			fontSize: 30
		},
		portrait: {
			y: 80,
			anchor: { x: 0.5 },
			maxWidth: 390,
			fontSize: 45
		},
		style: "footerLabel"
	},
	balanceValue: {
		type: "text",
		anchor: 0.5,
		alpha: 0,
		landscape: {
			y: 0,
			anchor: { x: 0 },
			maxWidth: 390,
			fontSize: 30
		},
		portrait: {
			y: 35,
			anchor: { x: 0.5 },
			maxWidth: 390,
			fontSize: 45
		},
		style: "footerValue"
	},

	ticketCostMeter: {
		type: "container",
		children: ["ticketCostLabel", "ticketCostValue"]
	},
	ticketCostLabel: {
		type: "text",
		string: "footer_ticketCost",
		anchor: 0.5,
		landscape: {
			y: 0,
			anchor: { x: 0 },
			maxWidth: 390,
			fontSize: 30
		},
		portrait: {
			y: 80,
			anchor: { x: 0.5 },
			maxWidth: 390,
			fontSize: 45
		},
		style: "footerLabel"
	},
	ticketCostValue: {
		type: "text",
		anchor: 0.5,
		landscape: {
			y: 0,
			anchor: { x: 0 },
			maxWidth: 390,
			fontSize: 30
		},
		portrait: {
			y: 35,
			anchor: { x: 0.5 },
			maxWidth: 390,
			fontSize: 45
		},
		style: "footerValue"
	},

	winMeter: {
		type: "container",
		children: ["winLabel", "winValue"]
	},
	winLabel: {
		type: "text",
		string: "footer_win",
		anchor: 0.5,
		landscape: {
			y: 0,
			anchor: { x: 0 },
			maxWidth: 390,
			fontSize: 30
		},
		portrait: {
			y: 80,
			anchor: { x: 0.5 },
			maxWidth: 390,
			fontSize: 45
		},
		style: "footerLabel"
	},
	winValue: {
		type: "text",
		anchor: 0.5,
		landscape: {
			y: 0,
			anchor: { x: 0 },
			maxWidth: 390,
			fontSize: 30
		},
		portrait: {
			y: 35,
			anchor: { x: 0.5 },
			maxWidth: 390,
			fontSize: 45
		},
		style: "footerValue"
	},

	divider_1_3: {
		type: "sprite",
		landscape: {
			texture: "landscape_footerDivider",
			x: 690,
			y: 39
		},
		portrait: {
			texture: "portrait_footerDivider",
			x: 400,
			y: 50
		},
		anchor: 0.5
	},
	divider_2_3: {
		type: "sprite",
		landscape: {
			texture: "landscape_footerDivider",
			x: 1230,
			y: 39
		},
		portrait: {
			texture: "portrait_footerDivider",
			x: 800,
			y: 50
		},
		anchor: 0.5
	},
	divider_1_2: {
		type: "sprite",
		landscape: {
			texture: "landscape_footerDivider",
			x: 960,
			y: 39
		},
		portrait: {
			texture: "portrait_footerDivider",
			x: 600,
			y: 50
		},
		anchor: 0.5
	},

	meter_2_3: {
		type: "point",
		portrait: { x: 600, y: 0 },
		landscape: { x: 960, y: 39 }
	},
	meter_3_3: {
		type: "point",
		portrait: { x: 1000, y: 0 },
		landscape: { x: 1500, y: 39 }
	},
	meter_1_2: {
		type: "point",
		portrait: { x: 350, y: 0 },
		landscape: { x: 560, y: 39 }
	},
	meter_2_2: {
		type: "point",
		portrait: { x: 850, y: 0 },
		landscape: { x: 1360, y: 39 }
	},

	/*
	 * BUTTON BAR
	 */
	buttonBar: {
		type: "container",
		landscape: { x: 0, y: 1008, scale: 1 },
		portrait: { x: 0, y: 1660, scale: 1.3 },
		children: [
			"helpButton",
			"homeButton",
			"exitButton",
			"playAgainButton",
			"tryAgainButton",
			"buyButton",
			"tryButton",
			"moveToMoneyButton",
			"retryButton"
		]
	},
	/*
	debugButton: {
		type: "button",
		landscape: { x: 1824, y: -960 },
		portrait: { x: 846, y: -1230 },
		textures: {
			enabled: "debugButtonEnabled",
			disabled: "debugButtonDisabled",
			over: "debugButtonOver",
			pressed: "debugButtonPressed"
		},
		alpha: 0
	},
	*/
	helpButton: {
		type: "button",
		landscape: { x: 1824, y: 50 },
		portrait: { x: 846, y: 50 },
		textures: {
			enabled: "tutorialButtonEnabled",
			disabled: "tutorialButtonDisabled",
			over: "tutorialButtonOver",
			pressed: "tutorialButtonPressed"
		}
	},
	homeButton: {
		type: "button",
		landscape: { x: 96, y: 50 },
		portrait: { x: 76, y: 50 },
		textures: {
			enabled: "homeButtonEnabled",
			over: "homeButtonOver",
			pressed: "homeButtonPressed",
			disabled: "homeButtonDisabled"
		}
	},
	exitButton: {
		type: "button",
		landscape: { x: 960, y: 50 },
		portrait: { x: 460, y: 50 },
		string: "button_exit",
		textures: {
			enabled: "mainButtonEnabled",
			over: "mainButtonOver",
			pressed: "mainButtonPressed",
			disabled: "mainButtonDisabled"
		},
		style: {
			enabled: "mainButtonEnabled",
			over: "mainButtonOver",
			pressed: "mainButtonPressed",
			disabled: "mainButtonDisabled"
		}
	},
	buyButton: {
		type: "button",
		landscape: { x: 960, y: 50 },
		portrait: { x: 460, y: 50 },
		string: "button_buy",
		textures: {
			enabled: "mainButtonEnabled",
			over: "mainButtonOver",
			pressed: "mainButtonPressed",
			disabled: "mainButtonDisabled"
		},
		style: {
			enabled: "mainButtonEnabled",
			over: "mainButtonOver",
			pressed: "mainButtonPressed",
			disabled: "mainButtonDisabled"
		}
	},
	tryButton: {
		type: "button",
		landscape: { x: 1110, y: 50 },
		portrait: { x: 610, y: 50 },
		string: "button_try",
		textures: {
			enabled: "mainButtonEnabled",
			over: "mainButtonOver",
			pressed: "mainButtonPressed",
			disabled: "mainButtonDisabled"
		},
		style: {
			enabled: "mainButtonEnabled",
			over: "mainButtonOver",
			pressed: "mainButtonPressed",
			disabled: "mainButtonDisabled"
		}
	},
	moveToMoneyButton: {
		type: "button",
		landscape: { x: 810, y: 50 },
		portrait: { x: 310, y: 50 },
		string: "button_moveToMoney",
		textures: {
			enabled: "mainButtonEnabled",
			over: "mainButtonOver",
			pressed: "mainButtonPressed",
			disabled: "mainButtonDisabled"
		},
		style: {
			enabled: "mainButtonEnabled",
			over: "mainButtonOver",
			pressed: "mainButtonPressed",
			disabled: "mainButtonDisabled"
		}
	},
	tryAgainButton: {
		type: "button",
		landscape: { x: 1110, y: 50 },
		portrait: { x: 610, y: 50 },
		string: "button_tryAgain",
		textures: {
			enabled: "mainButtonEnabled",
			over: "mainButtonOver",
			pressed: "mainButtonPressed",
			disabled: "mainButtonDisabled"
		},
		style: {
			enabled: "mainButtonEnabled",
			over: "mainButtonOver",
			pressed: "mainButtonPressed",
			disabled: "mainButtonDisabled"
		}

	},
	playAgainButton: {
		type: "button",
		landscape: { x: 960, y: 50 },
		portrait: { x: 460, y: 50 },
		string: "button_playAgain",
		textures: {
			enabled: "mainButtonEnabled",
			over: "mainButtonOver",
			pressed: "mainButtonPressed",
			disabled: "mainButtonDisabled"
		},
		style: {
			enabled: "mainButtonEnabled",
			over: "mainButtonOver",
			pressed: "mainButtonPressed",
			disabled: "mainButtonDisabled"
		}
	},
	retryButton: {
		type: "button",
		landscape: { x: 960, y: 50 },
		portrait: { x: 460, y: 50 },
		string: "button_buy",
		textures: {
			enabled: "mainButtonEnabled",
			over: "mainButtonOver",
			pressed: "mainButtonPressed",
			disabled: "mainButtonDisabled"
		},
		style: {
			enabled: "mainButtonEnabled",
			over: "mainButtonOver",
			pressed: "mainButtonPressed",
			disabled: "mainButtonDisabled"
		}
	},

	/*
	 * TICKET SELECT
	 */

	ticketSelectBar: {
		type: "container",
		landscape: { x: 920, y: 854 },
		portrait: { x: 578, y: 1490 },
		children: [
			"ticketSelectBarBG",
			"ticketSelectCostValue",
			"ticketSelectCostLabel",
			"ticketCostDownButton",
			"ticketCostUpButton",
			"ticketCostIndicators"
		]
	},
	ticketCostDownButton: {
		type: "button",
		landscape: { x: -426, y: -12 },
		portrait: { x: -424, y: 4 },
		textures: {
			enabled: "minusButtonEnabled",
			disabled: "minusButtonDisabled",
			over: "minusButtonOver",
			pressed: "minusButtonPressed"
		}
	},
	ticketCostUpButton: {
		type: "button",
		landscape: { x: 502, y: -12 },
		portrait: {x: 468, y: 4},
		textures: {
			enabled: "plusButtonEnabled",
			disabled: "plusButtonDisabled",
			over: "plusButtonOver",
			pressed: "plusButtonPressed"
		}
	},
	ticketCostIndicators: {
		type: "container",
		children: ["ticketCostIndicatorActive", "ticketCostIndicatorInactive"],
		landscape: { x: 50, y: 72 },
		portrait: {x: 30, y: 98 }
	},
	ticketSelectCostValue: {
		type: "text",
		portrait: {x: 23, y: -40},
		landscape: { x: 40, y: -60 },
		anchor: 0.5,
		maxWidth: 355,
		style: "ticketSelectCostValue"
	},
	ticketSelectCostLabel: {
		type: "text",
		string: "ticketSelect_ticketCost",
		portrait: {x: 23, y: 39},
		landscape: { x: 40, y: 24 },
		anchor: 0.5,
		maxWidth: 355,
		style: "ticketSelectCostLabel"
	},
	
	/*
	 * AUTO PLAY BUTTON
	 */
	autoPlayButton: {
		type: "container",
		children: ["autoPlayStartButton", "autoPlayStopButton"],
		landscape: { x: 960, y: 1058, scale: 1 },
		portrait: { x: 600, y: 1724, scale: 1.3 }
	},

	autoPlayButton_default: {
		type: 'point',
		landscape: { x: 960, y: 1058 },
		portrait: { x: 600, y: 1724 }, 
	},
	autoPlayButton_multi: {
		type: 'point',
		landscape: { x: 960, y: 1058 },
		portrait: { x: 600, y: 1724 }, 
	},

	altAutoPlayButton: {
		type: "container",
		children: ["altAutoPlayStartButton", "altAutoPlayStopButton"],
		landscape: { x: 960, y: 1058, scale: 1 },
		portrait: { x: 600, y: 1724, scale: 1.3 }
	},

	/*
	 * MID-GAME RESULT PAGE
	 */
	midGameResult: {
		type: "container",
		children: [	"mgrOverlay", "mgrPlaque", "mgrScoreLabel", "mgrScoreAmount"],
		landscape: { x: 960, y: 600	},
		portrait: { x: 600, y: 960 }
	},
	mgrOverlay: {
		type: "rectangle",
		landscape: { x: -960, y: -960 },
		portrait: { x: -960, y: -960 },
		width: 1920,
		height: 1920,
		fill: 0x000000,
		fillAlpha: 0.8
	},
	mgrPlaque: {
		"type": "container",
		children: [
			"mgrBoard",
			"mgrDrink",
			"mgrStar0",
			"mgrStar1",
			"mgrStar2",
			"mgrDrinksLabel",
			"mgrDrinksAmount",
			"mgrContinueButton"
		],
		x: 0,
		y: -48
	},
		mgrBoard: {
			type: "sprite",
			texture: "midGameResult",
			anchor: 0.5,
			x: -23,
			y: 11
		},
		mgrDrink: {
			type: "sprite",
			texture: "drinksMadeIcon",
			anchor: 0.5,
			x: -286,
			y: 262
		},
		mgrStar0: {
			type: "container",
			children: ["burst0", "star0", "shine0"],
			x: -232,
			y: -202
		},
			burst0: {
				type: "sprite",
				texture: "sparkle"
			},
			star0: {
				type: "sprite",
				texture: "starHighlighted1",
				anchor: 0.5
			},
			shine0: {
				type: "sprite",
				texture: "ballsOfLight"
			},
		mgrStar1: {
			type: "container",
			children: ["burst1", "star1", "shine1"],
			x: 0,
			y: -273
		},
			burst1: {
				type: "sprite",
				texture: "sparkle"
			},
			star1: {
				type: "sprite",
				texture: "starHighlighted2",
				anchor: 0.5
			},
			shine1: {
				type: "sprite",
				texture: "ballsOfLight"
			},
		mgrStar2: {
			type: "container",
			children: ["burst2", "star2", "shine2"],
			x: 229,
			y: -203
		},
			burst2: {
				type: "sprite",
				texture: "sparkle"
			},
			star2: {
				type: "sprite",
				texture: "starHighlighted3",
				anchor: 0.5
			},
			shine2: {
				type: "sprite",
				texture: "ballsOfLight"
			},
		mgrDrinksLabel: {
			type: "text",
			x: 0,
			y: 258,
			string: "objectives_label",
			style: "match3ResultLabel",
			anchor: 0.5,
			maxWidth: 700
		},
		mgrDrinksAmount: {
			type: "text",
			style: "match3ResultAmount",
			anchor: 0.5,
			maxWidth: 700,
			x: 0,
			y: 350
		},
		mgrContinueButton: {
			type: "button",
			x: 0,
			y: 500,
			string: "button_continue",
			textures: {
				enabled: "mainButtonEnabled",
				over: "mainButtonOver",
				pressed: "mainButtonPressed",
				disabled: "mainButtonDisabled"
			},
			style: {
				enabled: "mainButtonEnabled",
				over: "mainButtonOver",
				pressed: "mainButtonPressed",
				disabled: "mainButtonDisabled"
			}
		},
	mgrScoreLabel: {
		type: "text",
		x: 0,
		y: -9,
		string: "score_label",
		style: "match3ResultLabel",
		anchor: 0.5,
		maxWidth: 800
	},
	mgrScoreAmount: {
		type: "text",
		style: "match3ResultAmount",
		anchor: 0.5,
		maxWidth: 800,
		x: 0,
		y: 86
	},

	/*
	 * END GAME RESULT PLAQUES
	 */
	resultPlaquesContainer: {
		type: "container",
		children: [
			"resultPlaqueOverlay",
			"winPlaqueBG",
			"winPlaqueMessage",
			"winPlaqueValue",
			"winPlaqueCloseButton",
			"losePlaqueBG",
			"losePlaqueMessage",
			"losePlaqueCloseButton",
			"winPlaqueEffects"
		],
		landscape: { x: 960, y: 600 },
		portrait: { x: 600, y: 960 }
	},

		resultPlaqueOverlay: {
			type: "rectangle",
			x: -960,
			y: -960,
			width: 1920,
			height: 1920,
			fill: 0x000000,
			fillAlpha: 0.8
		},

		winPlaqueBG: {
			type: "sprite",
			anchor: 0.5,
			landscape: { texture: "popUpBaseWin" },
			portrait: { texture: "popUpBaseWinPortrait" },
			children: ["winLemon"]
		},
			winLemon: {
				type: "container",
				landscape: {x: 0},
				portrait: {x: -150}
			},
		winPlaqueEffects: {
			type: "container",
			children: ["plaqueBurst0", "plaqueShine0", "plaqueBurst1", "plaqueShine1", "plaqueBurst2", "plaqueShine2"],
			alpha: 0
		},
			plaqueBurst0: {
				type: "sprite",
				texture: "sparkle",
				anchor: 0.5,
				portrait: {
					x: -400,
					y: -150
				},
				landscape: {
					x: -600,
					y: -200
				}
			},
			plaqueShine0: {
				type: "sprite",
				texture: "ballsOfLight",
				anchor: 0.5,
				portrait: {
					x: -400,
					y: -150
				},
				landscape: {
					x: -600,
					y: -200
				}
			},
			plaqueBurst1: {
				type: "sprite",
				texture: "sparkle",
				anchor: 0.5,
				portrait: {
					x: 100,
					y: -500
				},
				landscape: {
					x: 100,
					y: -500
				}
			},
			plaqueShine1: {
				type: "sprite",
				texture: "ballsOfLight",
				anchor: 0.5,
				portrait: {
					x: 100,
					y: -500
				},
				landscape: {
					x: 100,
					y: -500
				}
			},
			plaqueBurst2: {
				type: "sprite",
				texture: "sparkle",
				anchor: 0.5,
				portrait: {
					x: 400,
					y: 30
				},
				landscape: {
					x: 600,
					y: 0
				}
			},
			plaqueShine2: {
				type: "sprite",
				texture: "ballsOfLight",
				anchor: 0.5,
				portrait: {
					x: 400,
					y: 30
				},
				landscape: {
					x: 600,
					y: 0
				}
			},
		winPlaqueMessage: {
			type: "text",
			string: "message_win",
			style: "winPlaqueBody",
			children: ["winPlaqueMessage1"],
			anchor: 0.5,
			portrait: { y: -140, maxWidth: 700 },
			landscape: { y: -140, maxWidth: 1200 }
		},
			winPlaqueMessage1: {
				type: "text",
				string: "message_win1",
				style: "winPlaqueBody1",
				anchor: 0.5,
				portrait: { y: 140, maxWidth: 700 },
				landscape: { y: 110, maxWidth: 1200 }
			},
		winPlaqueValue: {
			type: "text",
			style: "winPlaqueValue",
			y: 110,
			anchor: 0.5
		},
		winPlaqueCloseButton: {
			type: "button",
			landscape: { y: 292 },
			portrait: { y: 345 },
			string: "button_ok",
			textures: {
				enabled: "endOfGameMessageCloseButtonEnabled",
				over: "endOfGameMessageCloseButtonOver",
				pressed: "endOfGameMessageCloseButtonPressed"
			},
			style: {
				enabled: "mainButtonEnabled",
				over: "mainButtonOver",
				pressed: "mainButtonPressed",
				disabled: "mainButtonDisabled"
			}
		},
		losePlaqueBG: {
			type: "sprite",
			anchor: 0.5,
			landscape: { texture: "popUpBaseLose" },
			portrait: { texture: "popUpBaseLosePortrait" },
			children: ["loseLemon"]
		},
			loseLemon: {
				type: "container",
				landscape: {x: 0},
				portrait: {x: -150}
			},
		losePlaqueMessage: {
			type: "text",
			string: "message_nonWin",
			style: "losePlaqueBody",
			y: 0,
			anchor: 0.5,
			portrait: { maxWidth: 700 },
			landscape: { maxWidth: 1200 },
		},
		losePlaqueCloseButton: {
			type: "button",
			landscape: { y: 205 },
			portrait: { y: 345 },
			string: "button_ok",
			textures: {
				enabled: "endOfGameMessageCloseButtonEnabled",
				over: "endOfGameMessageCloseButtonOver",
				pressed: "endOfGameMessageCloseButtonPressed"
			},
			style: {
				enabled: "mainButtonEnabled",
				over: "mainButtonOver",
				pressed: "mainButtonPressed",
				disabled: "mainButtonDisabled"
			}
		},

	/*
	 * ERROR PLAQUES
	 */
	errorContainer: {
		type: "container",
		children: [
			"errorOverlay",
			"errorBackground",
			"errorTitle",
			"errorMessage",
			"errorExit",
			"timeoutExit",
			"timeoutContinue"
		],
		landscape: { x: 960, y: 600 },
		portrait: { x: 600, y: 960 }
	},
		errorOverlay: {
			type: "rectangle",
			x: -960,
			y: -960,
			width: 1920,
			height: 1920,
			fill: 0x000000,
			fillAlpha: 0.8
		},
		errorBackground: {
			type: "sprite",
			anchor: 0.5,
			landscape: {
				texture: "popUpBaseLose"
			},
			portrait: {
				texture: "popUpBaseLosePortrait"
			}
		},
		errorTitle: {
			type: "text",
			style: "errorTitle",
			anchor: 0.5,
			x: 0,
			y: -300
		},
		errorMessage: {
			type: "text",
			style: "errorMessage",
			anchor: 0.5,
			wordWrap: true,
			x: 0,
			y: 0,
			landscape: { wordWrapWidth: 750 },
			portrait: { wordWrapWidth: 700 }
		},
		errorExit: {
			type: "button",
			string: "button_exit",
			anchor: 0.5,
			landscape: { x: 0, y: 340 },
			portrait: { x: 0, y: 380 },
			style: {
				enabled: "mainButtonEnabled",
				over: "mainButtonOver",
				pressed: "mainButtonPressed",
				disabled: "mainButtonDisabled"
			},
			textures: {
				enabled: "mainButtonEnabled",
				over: "mainButtonOver",
				pressed: "mainButtonPressed",
				disabled: "mainButtonDisabled"
			}
		},
		timeoutExit: {
			type: "button",
			anchor: 0.5,
			landscape: { x: -160, y: 340 },
			portrait: { x: -160, y: 380 },
			style: {
				enabled: "mainButtonEnabled",
				over: "mainButtonOver",
				pressed: "mainButtonPressed",
				disabled: "mainButtonDisabled"
			},
			textures: {
				enabled: "mainButtonEnabled",
				over: "mainButtonOver",
				pressed: "mainButtonPressed",
				disabled: "mainButtonDisabled"
			}
		},
		timeoutContinue: {
			type: "button",
			anchor: 0.5,
			landscape: { x: 160, y: 340 },
			portrait: { x: 160, y: 380 },
			style: {
				enabled: "mainButtonEnabled",
				over: "mainButtonOver",
				pressed: "mainButtonPressed",
				disabled: "mainButtonDisabled"
			},
			textures: {
				enabled: "mainButtonEnabled",
				over: "mainButtonOver",
				pressed: "mainButtonPressed",
				disabled: "mainButtonDisabled"
			}
		}
});

