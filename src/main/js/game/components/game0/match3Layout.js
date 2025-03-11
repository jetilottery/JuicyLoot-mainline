define({
	/*
	 * GAME BOARDS
	 *
	 * It"s much easier to work out nX and nY values here while you"re setting up the tile positions.
	 * Unfortunately you can't add custom values to containers through the layout engine so once you"re done here copy all the nX/nY values to match3Config.js
	 */
	game0: {
		type: "container",
		children: [
			"game0Boards",
			"game0Objectives"
		],
		landscape: {x: 108, y: 10},
		portrait: {x:0, y: 646}
	},
	game0Boards: {
		type: "container",
		landscape: {
			scale: 0.94,
			y: 56
		},
		portrait: {
			scale: 1,
			y: 0
		},
		children: ["game0BG", "game0Board0", "game0Board1", "game0Board2", "game0Board3", "game0Board4"]
	},

	game0BG: {
		type: "container"
	},

	game0Board0: {
		type: "container",
		children: [
			"b0t000",	"b0t001",	"b0t002",	"b0t003",	"b0t004",	"b0t005",	"b0t006",	"b0t007",	"b0t008",
			"b0t009",	"b0t010",	"b0t011",	"b0t012",	"b0t013",	"b0t014",	"b0t015",	"b0t016",	"b0t017",
			"b0t018",	"b0t019",	"b0t020",	"b0t021",	"b0t022",	"b0t023",	"b0t024",	"b0t025",	"b0t026",
						"b0t027",	"b0t028",	"b0t029",	"b0t030",	"b0t031",	"b0t032",	"b0t033",
									"b0t034",	"b0t035",	"b0t036",	"b0t037",	"b0t038",
						"b0t039",	"b0t040",	"b0t041",	"b0t042",	"b0t043",	"b0t044",	"b0t045",
			"b0t046",	"b0t047",	"b0t048",	"b0t049",	"b0t050",	"b0t051",	"b0t052",	"b0t053",	"b0t054",
			"b0t055",	"b0t056",	"b0t057",	"b0t058",	"b0t059",	"b0t060",	"b0t061",	"b0t062",	"b0t063",
			"b0t064",	"b0t065",	"b0t066",	"b0t067",	"b0t068",	"b0t069",	"b0t070",	"b0t071",	"b0t072"
		],
		x: 0,
		y: 0
	},

		b0t000: { type: "container", anchor: 0.5, x: 88, y: 56},
		b0t001: { type: "container", anchor: 0.5, x: 216, y: 56},
		b0t002: { type: "container", anchor: 0.5, x: 344, y: 56},
		b0t003: { type: "container", anchor: 0.5, x: 472, y: 56},
		b0t004: { type: "container", anchor: 0.5, x: 600, y: 56},
		b0t005: { type: "container", anchor: 0.5, x: 728, y: 56},
		b0t006: { type: "container", anchor: 0.5, x: 856, y: 56},
		b0t007: { type: "container", anchor: 0.5, x: 984, y: 56},
		b0t008: { type: "container", anchor: 0.5, x: 1112, y: 56},

		b0t009: { type: "container", anchor: 0.5, x: 88, y: 167},
		b0t010: { type: "container", anchor: 0.5, x: 216, y: 167},
		b0t011: { type: "container", anchor: 0.5, x: 344, y: 167},
		b0t012: { type: "container", anchor: 0.5, x: 472, y: 167},
		b0t013: { type: "container", anchor: 0.5, x: 600, y: 167},
		b0t014: { type: "container", anchor: 0.5, x: 728, y: 167},
		b0t015: { type: "container", anchor: 0.5, x: 856, y: 167},
		b0t016: { type: "container", anchor: 0.5, x: 984, y: 167},
		b0t017: { type: "container", anchor: 0.5, x: 1112, y: 167},

		b0t018: { type: "container", anchor: 0.5, x: 88, y: 278},
		b0t019: { type: "container", anchor: 0.5, x: 216, y: 278},
		b0t020: { type: "container", anchor: 0.5, x: 344, y: 278},
		b0t021: { type: "container", anchor: 0.5, x: 472, y: 278},
		b0t022: { type: "container", anchor: 0.5, x: 600, y: 278},
		b0t023: { type: "container", anchor: 0.5, x: 728, y: 278},
		b0t024: { type: "container", anchor: 0.5, x: 856, y: 278},
		b0t025: { type: "container", anchor: 0.5, x: 984, y: 278},
		b0t026: { type: "container", anchor: 0.5, x: 1112, y: 278},

		b0t027: { type: "container", anchor: 0.5, x: 216, y: 389},
		b0t028: { type: "container", anchor: 0.5, x: 344, y: 389},
		b0t029: { type: "container", anchor: 0.5, x: 472, y: 389},
		b0t030: { type: "container", anchor: 0.5, x: 600, y: 389},
		b0t031: { type: "container", anchor: 0.5, x: 728, y: 389},
		b0t032: { type: "container", anchor: 0.5, x: 856, y: 389},
		b0t033: { type: "container", anchor: 0.5, x: 984, y: 389},

		b0t034: { type: "container", anchor: 0.5, x: 344, y: 500},
		b0t035: { type: "container", anchor: 0.5, x: 472, y: 500},
		b0t036: { type: "container", anchor: 0.5, x: 600, y: 500},
		b0t037: { type: "container", anchor: 0.5, x: 728, y: 500},
		b0t038: { type: "container", anchor: 0.5, x: 856, y: 500},

		b0t039: { type: "container", anchor: 0.5, x: 216, y: 611},
		b0t040: { type: "container", anchor: 0.5, x: 344, y: 611},
		b0t041: { type: "container", anchor: 0.5, x: 472, y: 611},
		b0t042: { type: "container", anchor: 0.5, x: 600, y: 611},
		b0t043: { type: "container", anchor: 0.5, x: 728, y: 611},
		b0t044: { type: "container", anchor: 0.5, x: 856, y: 611},
		b0t045: { type: "container", anchor: 0.5, x: 984, y: 611},

		b0t046: { type: "container", anchor: 0.5, x: 88, y: 722},
		b0t047: { type: "container", anchor: 0.5, x: 216, y: 722},
		b0t048: { type: "container", anchor: 0.5, x: 344, y: 722},
		b0t049: { type: "container", anchor: 0.5, x: 472, y: 722},
		b0t050: { type: "container", anchor: 0.5, x: 600, y: 722},
		b0t051: { type: "container", anchor: 0.5, x: 728, y: 722},
		b0t052: { type: "container", anchor: 0.5, x: 856, y: 722},
		b0t053: { type: "container", anchor: 0.5, x: 984, y: 722},
		b0t054: { type: "container", anchor: 0.5, x: 1112, y: 722},

		b0t055: { type: "container", anchor: 0.5, x: 88, y: 833},
		b0t056: { type: "container", anchor: 0.5, x: 216, y: 833},
		b0t057: { type: "container", anchor: 0.5, x: 344, y: 833},
		b0t058: { type: "container", anchor: 0.5, x: 472, y: 833},
		b0t059: { type: "container", anchor: 0.5, x: 600, y: 833},
		b0t060: { type: "container", anchor: 0.5, x: 728, y: 833},
		b0t061: { type: "container", anchor: 0.5, x: 856, y: 833},
		b0t062: { type: "container", anchor: 0.5, x: 984, y: 833},
		b0t063: { type: "container", anchor: 0.5, x: 1112, y: 833},

		b0t064: { type: "container", anchor: 0.5, x: 88, y: 944},
		b0t065: { type: "container", anchor: 0.5, x: 216, y: 944},
		b0t066: { type: "container", anchor: 0.5, x: 344, y: 944},
		b0t067: { type: "container", anchor: 0.5, x: 472, y: 944},
		b0t068: { type: "container", anchor: 0.5, x: 600, y: 944},
		b0t069: { type: "container", anchor: 0.5, x: 728, y: 944},
		b0t070: { type: "container", anchor: 0.5, x: 856, y: 944},
		b0t071: { type: "container", anchor: 0.5, x: 984, y: 944},
		b0t072: { type: "container", anchor: 0.5, x: 1112, y: 944},

	game0Board1: {
		type: "container",
		children: [
									"b1t000",	"b1t001",	"b1t002",	"b1t003",	"b1t004",
						"b1t005",	"b1t006",	"b1t007",	"b1t008",	"b1t009",	"b1t010",	"b1t011",
			"b1t012",	"b1t013",	"b1t014",	"b1t015",	"b1t016",	"b1t017", 	"b1t018",	"b1t019",	"b1t020",
			"b1t021",	"b1t022",	"b1t023",	"b1t024",				"b1t025",	"b1t026",	"b1t027",	"b1t028",
			"b1t029",	"b1t030",	"b1t031",										"b1t032",	"b1t033",	"b1t034",
			"b1t035",	"b1t036",	"b1t037",	"b1t038",	 			"b1t039",	"b1t040",	"b1t041",	"b1t042",
			"b1t043",	"b1t044",	"b1t045",	"b1t046",	"b1t047",	"b1t048",	"b1t049",	"b1t050",	"b1t051",
						"b1t052",	"b1t053",	"b1t054",	"b1t055",	"b1t056",	"b1t057",	"b1t058",
									"b1t059",	"b1t060",	"b1t061",	"b1t062",	"b1t063"
		],
		x: 0,
		y: 0
	},

		b1t000: { type: "container", anchor: 0.5, x: 344, y: 56},
		b1t001: { type: "container", anchor: 0.5, x: 472, y: 56},
		b1t002: { type: "container", anchor: 0.5, x: 600, y: 56},
		b1t003: { type: "container", anchor: 0.5, x: 728, y: 56},
		b1t004: { type: "container", anchor: 0.5, x: 856, y: 56},

		b1t005: { type: "container", anchor: 0.5, x: 216, y: 167},
		b1t006: { type: "container", anchor: 0.5, x: 344, y: 167},
		b1t007: { type: "container", anchor: 0.5, x: 472, y: 167},
		b1t008: { type: "container", anchor: 0.5, x: 600, y: 167},
		b1t009: { type: "container", anchor: 0.5, x: 728, y: 167},
		b1t010: { type: "container", anchor: 0.5, x: 856, y: 167},
		b1t011: { type: "container", anchor: 0.5, x: 984, y: 167},

		b1t012: { type: "container", anchor: 0.5, x: 88, y: 278},
		b1t013: { type: "container", anchor: 0.5, x: 216, y: 278},
		b1t014: { type: "container", anchor: 0.5, x: 344, y: 278},
		b1t015: { type: "container", anchor: 0.5, x: 472, y: 278},
		b1t016: { type: "container", anchor: 0.5, x: 600, y: 278},
		b1t017: { type: "container", anchor: 0.5, x: 728, y: 278},
		b1t018: { type: "container", anchor: 0.5, x: 856, y: 278},
		b1t019: { type: "container", anchor: 0.5, x: 984, y: 278},
		b1t020: { type: "container", anchor: 0.5, x: 1112, y: 278},

		b1t021: { type: "container", anchor: 0.5, x: 88, y: 389},
		b1t022: { type: "container", anchor: 0.5, x: 216, y: 389},
		b1t023: { type: "container", anchor: 0.5, x: 344, y: 389},
		b1t024: { type: "container", anchor: 0.5, x: 472, y: 389},
		b1t025: { type: "container", anchor: 0.5, x: 728, y: 389},
		b1t026: { type: "container", anchor: 0.5, x: 856, y: 389},
		b1t027: { type: "container", anchor: 0.5, x: 984, y: 389},
		b1t028: { type: "container", anchor: 0.5, x: 1112, y: 389},

		b1t029: { type: "container", anchor: 0.5, x: 88, y: 500},
		b1t030: { type: "container", anchor: 0.5, x: 216, y: 500},
		b1t031: { type: "container", anchor: 0.5, x: 344, y: 500},
		b1t032: { type: "container", anchor: 0.5, x: 856, y: 500},
		b1t033: { type: "container", anchor: 0.5, x: 984, y: 500},
		b1t034: { type: "container", anchor: 0.5, x: 1112, y: 500},

		b1t035: { type: "container", anchor: 0.5, x: 88, y: 611},
		b1t036: { type: "container", anchor: 0.5, x: 216, y: 611},
		b1t037: { type: "container", anchor: 0.5, x: 344, y: 611},
		b1t038: { type: "container", anchor: 0.5, x: 472, y: 611},
		b1t039: { type: "container", anchor: 0.5, x: 728, y: 611},
		b1t040: { type: "container", anchor: 0.5, x: 856, y: 611},
		b1t041: { type: "container", anchor: 0.5, x: 984, y: 611},
		b1t042: { type: "container", anchor: 0.5, x: 1112, y: 611},

		b1t043: { type: "container", anchor: 0.5, x: 88, y: 722},
		b1t044: { type: "container", anchor: 0.5, x: 216, y: 722},
		b1t045: { type: "container", anchor: 0.5, x: 344, y: 722},
		b1t046: { type: "container", anchor: 0.5, x: 472, y: 722},
		b1t047: { type: "container", anchor: 0.5, x: 600, y: 722},
		b1t048: { type: "container", anchor: 0.5, x: 728, y: 722},
		b1t049: { type: "container", anchor: 0.5, x: 856, y: 722},
		b1t050: { type: "container", anchor: 0.5, x: 984, y: 722},
		b1t051: { type: "container", anchor: 0.5, x: 1112, y: 722},

		b1t052: { type: "container", anchor: 0.5, x: 216, y: 833},
		b1t053: { type: "container", anchor: 0.5, x: 344, y: 833},
		b1t054: { type: "container", anchor: 0.5, x: 472, y: 833},
		b1t055: { type: "container", anchor: 0.5, x: 600, y: 833},
		b1t056: { type: "container", anchor: 0.5, x: 728, y: 833},
		b1t057: { type: "container", anchor: 0.5, x: 856, y: 833},
		b1t058: { type: "container", anchor: 0.5, x: 984, y: 833},

		b1t059: { type: "container", anchor: 0.5, x: 344, y: 944},
		b1t060: { type: "container", anchor: 0.5, x: 472, y: 944},
		b1t061: { type: "container", anchor: 0.5, x: 600, y: 944},
		b1t062: { type: "container", anchor: 0.5, x: 728, y: 944},
		b1t063: { type: "container", anchor: 0.5, x: 856, y: 944},

	game0Board2: {
		type: "container",
		children: [
						"b2t001",	"b2t002",										"b2t006",	"b2t007",
			"b2t009",	"b2t010",	"b2t011",	"b2t012",				"b2t014",	"b2t015",	"b2t016",	"b2t017",
			"b2t018",	"b2t019",	"b2t020",	"b2t021",	"b2t022",	"b2t023",	"b2t024",	"b2t025",	"b2t026",
			"b2t027",	"b2t028",	"b2t029",	"b2t030",	"b2t031",	"b2t032",	"b2t033",	"b2t034",	"b2t035",
			"b2t036",	"b2t037",	"b2t038",	"b2t039",	"b2t040",	"b2t041",	"b2t042",	"b2t043",	"b2t044",
			"b2t045",	"b2t046",	"b2t047",	"b2t048",	"b2t049",	"b2t050",	"b2t051",	"b2t052",	"b2t053",
						"b2t055",	"b2t056",	"b2t057",	"b2t058",	"b2t059",	"b2t060",	"b2t061",
									"b2t065",	"b2t066",	"b2t067",	"b2t068",	"b2t069",
												"b2t075",	"b2t076",	"b2t077"
		],
		x: 0,
		y: 0
	},
	
		b2t001: { type: "container", anchor: 0.5, x: 216, y: 56},
		b2t002: { type: "container", anchor: 0.5, x: 344, y: 56},
		b2t006: { type: "container", anchor: 0.5, x: 856, y: 56},
		b2t007: { type: "container", anchor: 0.5, x: 984, y: 56},

		b2t009: { type: "container", anchor: 0.5, x: 88, y: 167},
		b2t010: { type: "container", anchor: 0.5, x: 216, y: 167},
		b2t011: { type: "container", anchor: 0.5, x: 344, y: 167},
		b2t012: { type: "container", anchor: 0.5, x: 472, y: 167},
		b2t014: { type: "container", anchor: 0.5, x: 728, y: 167},
		b2t015: { type: "container", anchor: 0.5, x: 856, y: 167},
		b2t016: { type: "container", anchor: 0.5, x: 984, y: 167},
		b2t017: { type: "container", anchor: 0.5, x: 1112, y: 167},

		b2t018: { type: "container", anchor: 0.5, x: 88, y: 278},
		b2t019: { type: "container", anchor: 0.5, x: 216, y: 278},
		b2t020: { type: "container", anchor: 0.5, x: 344, y: 278},
		b2t021: { type: "container", anchor: 0.5, x: 472, y: 278},
		b2t022: { type: "container", anchor: 0.5, x: 600, y: 278},
		b2t023: { type: "container", anchor: 0.5, x: 728, y: 278},
		b2t024: { type: "container", anchor: 0.5, x: 856, y: 278},
		b2t025: { type: "container", anchor: 0.5, x: 984, y: 278},
		b2t026: { type: "container", anchor: 0.5, x: 1112, y: 278},

		b2t027: { type: "container", anchor: 0.5, x: 88, y: 389},
		b2t028: { type: "container", anchor: 0.5, x: 216, y: 389},
		b2t029: { type: "container", anchor: 0.5, x: 344, y: 389},
		b2t030: { type: "container", anchor: 0.5, x: 472, y: 389},
		b2t031: { type: "container", anchor: 0.5, x: 600, y: 389},
		b2t032: { type: "container", anchor: 0.5, x: 728, y: 389},
		b2t033: { type: "container", anchor: 0.5, x: 856, y: 389},
		b2t034: { type: "container", anchor: 0.5, x: 984, y: 389},
		b2t035: { type: "container", anchor: 0.5, x: 1112, y: 389},

		b2t036: { type: "container", anchor: 0.5, x: 88, y: 500},
		b2t037: { type: "container", anchor: 0.5, x: 216, y: 500},
		b2t038: { type: "container", anchor: 0.5, x: 344, y: 500},
		b2t039: { type: "container", anchor: 0.5, x: 472, y: 500},
		b2t040: { type: "container", anchor: 0.5, x: 600, y: 500},
		b2t041: { type: "container", anchor: 0.5, x: 728, y: 500},
		b2t042: { type: "container", anchor: 0.5, x: 856, y: 500},
		b2t043: { type: "container", anchor: 0.5, x: 984, y: 500},
		b2t044: { type: "container", anchor: 0.5, x: 1112, y: 500},

		b2t045: { type: "container", anchor: 0.5, x: 88, y: 611},
		b2t046: { type: "container", anchor: 0.5, x: 216, y: 611},
		b2t047: { type: "container", anchor: 0.5, x: 344, y: 611},
		b2t048: { type: "container", anchor: 0.5, x: 472, y: 611},
		b2t049: { type: "container", anchor: 0.5, x: 600, y: 611},
		b2t050: { type: "container", anchor: 0.5, x: 728, y: 611},
		b2t051: { type: "container", anchor: 0.5, x: 856, y: 611},
		b2t052: { type: "container", anchor: 0.5, x: 984, y: 611},
		b2t053: { type: "container", anchor: 0.5, x: 1112, y: 611},

		b2t055: { type: "container", anchor: 0.5, x: 216, y: 722},
		b2t056: { type: "container", anchor: 0.5, x: 344, y: 722},
		b2t057: { type: "container", anchor: 0.5, x: 472, y: 722},
		b2t058: { type: "container", anchor: 0.5, x: 600, y: 722},
		b2t059: { type: "container", anchor: 0.5, x: 728, y: 722},
		b2t060: { type: "container", anchor: 0.5, x: 856, y: 722},
		b2t061: { type: "container", anchor: 0.5, x: 984, y: 722},

		b2t065: { type: "container", anchor: 0.5, x: 344, y: 833},
		b2t066: { type: "container", anchor: 0.5, x: 472, y: 833},
		b2t067: { type: "container", anchor: 0.5, x: 600, y: 833},
		b2t068: { type: "container", anchor: 0.5, x: 728, y: 833},
		b2t069: { type: "container", anchor: 0.5, x: 856, y: 833},

		b2t075: { type: "container", anchor: 0.5, x: 472, y: 944},
		b2t076: { type: "container", anchor: 0.5, x: 600, y: 944},
		b2t077: { type: "container", anchor: 0.5, x: 728, y: 944},


	game0Board3: {
		type: "container",
		children: [
						"b3t001",	"b3t002",	"b3t003",	"b3t004",	"b3t005",	"b3t006",	"b3t007",
			"b3t009",	"b3t010",	"b3t011",	"b3t012",	"b3t013",	"b3t014",	"b3t015",	"b3t016",	"b3t017",
			"b3t018",	"b3t019",				"b3t021",	"b3t022",	"b3t023",				"b3t025",	"b3t026",
			"b3t027",	"b3t028",				"b3t030",	"b3t031",	"b3t032",				"b3t034",	"b3t035",
			"b3t036",	"b3t037",	"b3t038",	"b3t039",	"b3t040",	"b3t041",	"b3t042",	"b3t043",	"b3t044",
			"b3t045",	"b3t046",				"b3t048",	"b3t049",	"b3t050",				"b3t052",	"b3t053",
			"b3t054",	"b3t055",	"b3t056",										"b3t060",	"b3t061",	"b3t062",
			"b3t063",	"b3t064",	"b3t065",	"b3t066",	"b3t067",	"b3t068",	"b3t069",	"b3t070",	"b3t071",
						"b3t073",	"b3t074",	"b3t075",	"b3t076",	"b3t077",	"b3t078",	"b3t079"
		],
		x: 0,
		y: 0
	},
	
		b3t001: { type: "container", anchor: 0.5, x: 216, y: 56},
		b3t002: { type: "container", anchor: 0.5, x: 344, y: 56},
		b3t003: { type: "container", anchor: 0.5, x: 472, y: 56},
		b3t004: { type: "container", anchor: 0.5, x: 600, y: 56},
		b3t005: { type: "container", anchor: 0.5, x: 728, y: 56},
		b3t006: { type: "container", anchor: 0.5, x: 856, y: 56},
		b3t007: { type: "container", anchor: 0.5, x: 984, y: 56},

		b3t009: { type: "container", anchor: 0.5, x: 88, y: 167},
		b3t010: { type: "container", anchor: 0.5, x: 216, y: 167},
		b3t011: { type: "container", anchor: 0.5, x: 344, y: 167},
		b3t012: { type: "container", anchor: 0.5, x: 472, y: 167},
		b3t013: { type: "container", anchor: 0.5, x: 600, y: 167},
		b3t014: { type: "container", anchor: 0.5, x: 728, y: 167},
		b3t015: { type: "container", anchor: 0.5, x: 856, y: 167},
		b3t016: { type: "container", anchor: 0.5, x: 984, y: 167},
		b3t017: { type: "container", anchor: 0.5, x: 1112, y: 167},

		b3t018: { type: "container", anchor: 0.5, x: 88, y: 278},
		b3t019: { type: "container", anchor: 0.5, x: 216, y: 278},
		b3t021: { type: "container", anchor: 0.5, x: 472, y: 278},
		b3t022: { type: "container", anchor: 0.5, x: 600, y: 278},
		b3t023: { type: "container", anchor: 0.5, x: 728, y: 278},
		b3t025: { type: "container", anchor: 0.5, x: 984, y: 278},
		b3t026: { type: "container", anchor: 0.5, x: 1112, y: 278},

		b3t027: { type: "container", anchor: 0.5, x: 88, y: 389},
		b3t028: { type: "container", anchor: 0.5, x: 216, y: 389},
		b3t030: { type: "container", anchor: 0.5, x: 472, y: 389},
		b3t031: { type: "container", anchor: 0.5, x: 600, y: 389},
		b3t032: { type: "container", anchor: 0.5, x: 728, y: 389},
		b3t034: { type: "container", anchor: 0.5, x: 984, y: 389},
		b3t035: { type: "container", anchor: 0.5, x: 1112, y: 389},

		b3t036: { type: "container", anchor: 0.5, x: 88, y: 500},
		b3t037: { type: "container", anchor: 0.5, x: 216, y: 500},
		b3t038: { type: "container", anchor: 0.5, x: 344, y: 500},
		b3t039: { type: "container", anchor: 0.5, x: 472, y: 500},
		b3t040: { type: "container", anchor: 0.5, x: 600, y: 500},
		b3t041: { type: "container", anchor: 0.5, x: 728, y: 500},
		b3t042: { type: "container", anchor: 0.5, x: 856, y: 500},
		b3t043: { type: "container", anchor: 0.5, x: 984, y: 500},
		b3t044: { type: "container", anchor: 0.5, x: 1112, y: 500},

		b3t045: { type: "container", anchor: 0.5, x: 88, y: 611},
		b3t046: { type: "container", anchor: 0.5, x: 216, y: 611},
		b3t048: { type: "container", anchor: 0.5, x: 472, y: 611},
		b3t049: { type: "container", anchor: 0.5, x: 600, y: 611},
		b3t050: { type: "container", anchor: 0.5, x: 728, y: 611},
		b3t052: { type: "container", anchor: 0.5, x: 984, y: 611},
		b3t053: { type: "container", anchor: 0.5, x: 1112, y: 611},

		b3t054: { type: "container", anchor: 0.5, x: 88, y: 722},
		b3t055: { type: "container", anchor: 0.5, x: 216, y: 722},
		b3t056: { type: "container", anchor: 0.5, x: 344, y: 722},
		b3t060: { type: "container", anchor: 0.5, x: 856, y: 722},
		b3t061: { type: "container", anchor: 0.5, x: 984, y: 722},
		b3t062: { type: "container", anchor: 0.5, x: 1112, y: 722},

		b3t063: { type: "container", anchor: 0.5, x: 88, y: 833},
		b3t064: { type: "container", anchor: 0.5, x: 216, y: 833},
		b3t065: { type: "container", anchor: 0.5, x: 344, y: 833},
		b3t066: { type: "container", anchor: 0.5, x: 472, y: 833},
		b3t067: { type: "container", anchor: 0.5, x: 600, y: 833},
		b3t068: { type: "container", anchor: 0.5, x: 728, y: 833},
		b3t069: { type: "container", anchor: 0.5, x: 856, y: 833},
		b3t070: { type: "container", anchor: 0.5, x: 984, y: 833},
		b3t071: { type: "container", anchor: 0.5, x: 1112, y: 833},

		b3t073: { type: "container", anchor: 0.5, x: 216, y: 944},
		b3t074: { type: "container", anchor: 0.5, x: 344, y: 944},
		b3t075: { type: "container", anchor: 0.5, x: 472, y: 944},
		b3t076: { type: "container", anchor: 0.5, x: 600, y: 944},
		b3t077: { type: "container", anchor: 0.5, x: 728, y: 944},
		b3t078: { type: "container", anchor: 0.5, x: 856, y: 944},
		b3t079: { type: "container", anchor: 0.5, x: 984, y: 944},

	game0Board4: {
		type: "container",
		children: [
												"b4t003",	"b4t004",	"b4t005",
						"b4t010",	"b4t011",	"b4t012",	"b4t013",	"b4t014",	"b4t015",	"b4t016",
			"b4t018",	"b4t019",	"b4t020",	"b4t021",	"b4t022",	"b4t023",	"b4t024",	"b4t025",	"b4t026",
			"b4t027",	"b4t028",				"b4t030",	"b4t031",	"b4t032",				"b4t034",	"b4t035",
			"b4t036",	"b4t037",				"b4t039",	"b4t040",	"b4t041",				"b4t043",	"b4t044",
			"b4t045",	"b4t046",	"b4t047",	"b4t048",	"b4t049",	"b4t050",	"b4t051",	"b4t052",	"b4t053",
			"b4t054",	"b4t055",	"b4t056",	"b4t057",	"b4t058",	"b4t059",	"b4t060",	"b4t061",	"b4t062",
			"b4t063",	"b4t064",	"b4t065",	"b4t066",	"b4t067",	"b4t068",	"b4t069",	"b4t070",	"b4t071",
			"b4t072",				"b4t074",	"b4t075",				"b4t077",	"b4t078",				"b4t080"
		],
		x: 0,
		y: 0
	},

		b4t003: { type: "container", anchor: 0.5, x: 472,  y: 56},
		b4t004: { type: "container", anchor: 0.5, x: 600,  y: 56},
		b4t005: { type: "container", anchor: 0.5, x: 728,  y: 56},

		b4t010: { type: "container", anchor: 0.5, x: 216,  y: 167},
		b4t011: { type: "container", anchor: 0.5, x: 344,  y: 167},
		b4t012: { type: "container", anchor: 0.5, x: 472,  y: 167},
		b4t013: { type: "container", anchor: 0.5, x: 600,  y: 167},
		b4t014: { type: "container", anchor: 0.5, x: 728,  y: 167},
		b4t015: { type: "container", anchor: 0.5, x: 856,  y: 167},
		b4t016: { type: "container", anchor: 0.5, x: 984,  y: 167},

		b4t018: { type: "container", anchor: 0.5, x: 88,   y: 278},
		b4t019: { type: "container", anchor: 0.5, x: 216,  y: 278},
		b4t020: { type: "container", anchor: 0.5, x: 344,  y: 278},
		b4t021: { type: "container", anchor: 0.5, x: 472,  y: 278},
		b4t022: { type: "container", anchor: 0.5, x: 600,  y: 278},
		b4t023: { type: "container", anchor: 0.5, x: 728,  y: 278},
		b4t024: { type: "container", anchor: 0.5, x: 856,  y: 278},
		b4t025: { type: "container", anchor: 0.5, x: 984,  y: 278},
		b4t026: { type: "container", anchor: 0.5, x: 1112, y: 278},

		b4t027: { type: "container", anchor: 0.5, x: 88,   y: 389},
		b4t028: { type: "container", anchor: 0.5, x: 216,  y: 389},
		b4t030: { type: "container", anchor: 0.5, x: 472,  y: 389},
		b4t031: { type: "container", anchor: 0.5, x: 600,  y: 389},
		b4t032: { type: "container", anchor: 0.5, x: 728,  y: 389},
		b4t034: { type: "container", anchor: 0.5, x: 984,  y: 389},
		b4t035: { type: "container", anchor: 0.5, x: 1112, y: 389},

		b4t036: { type: "container", anchor: 0.5, x: 88,   y: 500},
		b4t037: { type: "container", anchor: 0.5, x: 216,  y: 500},
		b4t039: { type: "container", anchor: 0.5, x: 472,  y: 500},
		b4t040: { type: "container", anchor: 0.5, x: 600,  y: 500},
		b4t041: { type: "container", anchor: 0.5, x: 728,  y: 500},
		b4t043: { type: "container", anchor: 0.5, x: 984,  y: 500},
		b4t044: { type: "container", anchor: 0.5, x: 1112, y: 500},

		b4t045: { type: "container", anchor: 0.5, x: 88,   y: 611},
		b4t046: { type: "container", anchor: 0.5, x: 216,  y: 611},
		b4t047: { type: "container", anchor: 0.5, x: 344,  y: 611},
		b4t048: { type: "container", anchor: 0.5, x: 472,  y: 611},
		b4t049: { type: "container", anchor: 0.5, x: 600,  y: 611},
		b4t050: { type: "container", anchor: 0.5, x: 728,  y: 611},
		b4t051: { type: "container", anchor: 0.5, x: 856,  y: 611},
		b4t052: { type: "container", anchor: 0.5, x: 984,  y: 611},
		b4t053: { type: "container", anchor: 0.5, x: 1112, y: 611},

		b4t054: { type: "container", anchor: 0.5, x: 88,   y: 722},
		b4t055: { type: "container", anchor: 0.5, x: 216,  y: 722},
		b4t056: { type: "container", anchor: 0.5, x: 344,  y: 722},
		b4t057: { type: "container", anchor: 0.5, x: 472,  y: 722},
		b4t058: { type: "container", anchor: 0.5, x: 600,  y: 722},
		b4t059: { type: "container", anchor: 0.5, x: 728,  y: 722},
		b4t060: { type: "container", anchor: 0.5, x: 856,  y: 722},
		b4t061: { type: "container", anchor: 0.5, x: 984,  y: 722},
		b4t062: { type: "container", anchor: 0.5, x: 1112, y: 722},

		b4t063: { type: "container", anchor: 0.5, x: 88,   y: 833},
		b4t064: { type: "container", anchor: 0.5, x: 216,  y: 833},
		b4t065: { type: "container", anchor: 0.5, x: 344,  y: 833},
		b4t066: { type: "container", anchor: 0.5, x: 472,  y: 833},
		b4t067: { type: "container", anchor: 0.5, x: 600,  y: 833},
		b4t068: { type: "container", anchor: 0.5, x: 728,  y: 833},
		b4t069: { type: "container", anchor: 0.5, x: 856,  y: 833},
		b4t070: { type: "container", anchor: 0.5, x: 984,  y: 833},
		b4t071: { type: "container", anchor: 0.5, x: 1112, y: 833},

		b4t072: { type: "container", anchor: 0.5, x: 88,   y: 944},
		b4t074: { type: "container", anchor: 0.5, x: 344,  y: 944},
		b4t075: { type: "container", anchor: 0.5, x: 472,  y: 944},
		b4t077: { type: "container", anchor: 0.5, x: 728,  y: 944},
		b4t078: { type: "container", anchor: 0.5, x: 856,  y: 944},
		b4t080: { type: "container", anchor: 0.5, x: 1112, y: 944},

/*
 * OBJECTIVE COUNTERS
 */
	game0Objectives: {
		type: "container",
		children: ["pearMeter", "appleMeter", "blueberryMeter", "lemonMeter", "orangeMeter", "blackberryMeter"],
		x: 0,
		y: 0
	},

	pearMeter: {
		type: "container",
		children: ["pearPanel", "pearFruit"],
		landscape: {
			x: 1340,
			y: 484
		},
		portrait: {
			x: 149,
			y: -235
		}
	},
		pearPanel: {
			type: "sprite",
			children: ["pearAmount", "pearSlash", "pearMax", "pearTotal"],
			texture: "basePanelPear",
			x: 0,
			y: 0
		},
		pearAmount: {
			type: "text",
			style: "objectiveMeters",
			x: -30,
			y: -34,
			anchor: 0.5,
			maxWidth: 50
		},
		pearSlash: {
			type: "text",
			style: "objectiveMeters",
			x: 0,
			y: -4,
			anchor: 0.5,
			maxWidth: 50
		},
		pearMax: {
			type: "text",
			style: "objectiveMeters",
			x: 0,
			y: -10,
			anchor: 0.5,
			maxWidth: 100
		},
		pearTotal: {
			type: "text",
			style: "objectiveMeters",
			x: 30,
			y: 26,
			anchor: 0.5,
			maxWidth: 50
		},
		pearFruit: {
			type: "container",
			x: -45,
			y: 100
		},

	appleMeter: {
		type: "container",
		children: ["applePanel", "appleFruit"],
		landscape: {
			x: 1640,
			y: 484
		},
		portrait: {
			x: 729,
			y: -235
		}
	},
		applePanel: {
			type: "sprite",
			children: ["appleAmount", "appleSlash", "appleMax", "appleTotal"],
			texture: "basePanelApple",
			x: 0,
			y: 0
		},
		appleAmount: {
			type: "text",
			style: "objectiveMeters",
			x: -30,
			y: -34,
			anchor: 0.5,
			maxWidth: 50
		},
		appleSlash: {
			type: "text",
			style: "objectiveMeters",
			x: 0,
			y: -4,
			anchor: 0.5,
			maxWidth: 50
		},
		appleMax: {
			type: "text",
			style: "objectiveMeters",
			x: 0,
			y: -10,
			anchor: 0.5,
			maxWidth: 100
		},
		appleTotal: {
			type: "text",
			style: "objectiveMeters",
			x: 30,
			y: 26,
			anchor: 0.5,
			maxWidth: 50
		},
		appleFruit: {
			type: "container",
			x: -50,
			y: 105
		},
	blueberryMeter: {
		type: "container",
		children: ["blueberryPanel", "blueberryFruit"],
		landscape: {
			x: 1340,
			y: 684
		},
		portrait: {
			x: 355,
			y: -235
		}
	},
		blueberryPanel: {
			type: "sprite",
			children: ["blueberryAmount", "blueberrySlash", "blueberryMax", "blueberryTotal"],
			texture: "basePanelBlueberry",
			x: 0,
			y: 0
		},
		blueberryAmount: {
			type: "text",
			style: "objectiveMeters",
			x: -30,
			y: -34,
			anchor: 0.5,
			maxWidth: 50
		},
		blueberrySlash: {
			type: "text",
			style: "objectiveMeters",
			x: 0,
			y: -4,
			anchor: 0.5,
			maxWidth: 50
		},
		blueberryMax: {
			type: "text",
			style: "objectiveMeters",
			x: 0,
			y: -10,
			anchor: 0.5,
			maxWidth: 100
		},
		blueberryTotal: {
			type: "text",
			style: "objectiveMeters",
			x: 30,
			y: 26,
			anchor: 0.5,
			maxWidth: 50
		},
		blueberryFruit: {
			type: "container",
			x: -68,
			y: 111
		},
	lemonMeter: {
		type: "container",
		children: ["lemonPanel", "lemonFruit"],
		landscape: {
			x: 1640,
			y: 684
		},
		portrait: {
			x: 912,
			y: -235
		}
	},
		lemonPanel: {
			type: "sprite",
			children: ["lemonAmount", "lemonSlash", "lemonMax", "lemonTotal"],
			texture: "basePanelLemon",
			x: 0,
			y: 0
		},
		lemonAmount: {
			type: "text",
			style: "objectiveMeters",
			x: -30,
			y: -34,
			anchor: 0.5,
			maxWidth: 50
		},
		lemonSlash: {
			type: "text",
			style: "objectiveMeters",
			x: 0,
			y: -4,
			anchor: 0.5,
			maxWidth: 50
		},
		lemonMax: {
			type: "text",
			style: "objectiveMeters",
			x: 0,
			y: -10,
			anchor: 0.5,
			maxWidth: 100
		},
		lemonTotal: {
			type: "text",
			style: "objectiveMeters",
			x: 30,
			y: 26,
			anchor: 0.5,
			maxWidth: 50
		},
		lemonFruit: {
			type: "container",
			x: -50,
			y: 92
		},
	orangeMeter: {
		type: "container",
		children: ["orangePanel", "orangeFruit"],
		landscape: {
			x: 1340,
			y: 884
		},
		portrait: {
			x: 541,
			y: -235
		}
	},
		orangePanel: {
			type: "sprite",
			children: ["orangeAmount", "orangeSlash", "orangeMax", "orangeTotal"],
			texture: "basePanelOrange",
			x: 0,
			y: 0
		},
		orangeAmount: {
			type: "text",
			style: "objectiveMeters",
			x: -30,
			y: -34,
			anchor: 0.5,
			maxWidth: 50
		},
		orangeSlash: {
			type: "text",
			style: "objectiveMeters",
			x: 0,
			y: -4,
			anchor: 0.5,
			maxWidth: 50
		},
		orangeMax: {
			type: "text",
			style: "objectiveMeters",
			x: 0,
			y: -10,
			anchor: 0.5,
			maxWidth: 100
		},
		orangeTotal: {
			type: "text",
			style: "objectiveMeters",
			x: 30,
			y: 26,
			anchor: 0.5,
			maxWidth: 50
		},
		orangeFruit: {
			type: "container",
			x: -62,
			y: 107
		},
	blackberryMeter: {
		type: "container",
		children: ["blackberryPanel", "blackberryFruit"],
		landscape: {
			x: 1640,
			y: 884
		},
		portrait: {
			x: 1097,
			y: -235
		}
	},
		blackberryPanel: {
			type: "sprite",
			children: ["blackberryAmount", "blackberrySlash", "blackberryMax", "blackberryTotal"],
			texture: "basePanelBlackberry",
			x: 0,
			y: 0
		},
		blackberryAmount: {
			type: "text",
			style: "objectiveMeters",
			x: -30,
			y: -34,
			anchor: 0.5,
			maxWidth: 50
		},
		blackberrySlash: {
			type: "text",
			style: "objectiveMeters",
			x: 0,
			y: -4,
			anchor: 0.5,
			maxWidth: 50
		},
		blackberryMax: {
			type: "text",
			style: "objectiveMeters",
			x: 0,
			y: -10,
			anchor: 0.5,
			maxWidth: 100
		},
		blackberryTotal: {
			type: "text",
			style: "objectiveMeters",
			x: 30,
			y: 26,
			anchor: 0.5,
			maxWidth: 50
		},
		blackberryFruit: {
			type: "container",
			x: -50,
			y: 100
		}
});