define((require) => {
	const app = require("skbJet/componentManchester/standardIW/app");
	const PIXI = require("com/pixijs/pixi");
	const filterStyles = require("game/template/filterStyles");
	const config = require("skbJet/componentManchester/standardIW/gameConfig");
	const maths = require("skbJet/componentLondon/utils/maths");

	class MeshText extends PIXI.mesh.Plane {
		static getVertexArray(vertices) {
			//Converts mesh vertices into a more useful 2D array
			var point, points, yy, col;
			var vertexArray = [];

			points = Array.from(vertices);
			yy = vertices[1]; //first Y coordinate
			col = [];
			while(points.length > 0) {
				point = new PIXI.Point(points.shift(), points.shift());
				if(point.y != yy) {
					//new rowumn
					vertexArray.push(col);
					col = [point];
					yy = point.y;
				} else {
					col.push(point);
				}
			}
			vertexArray.push(col);

			return vertexArray;
		}

		static waveWiggle(mesh, amplitude) {
			let row, col;
			let amp = amplitude || 1;
			let t = mesh._time / 10;
			for (row = 0; row < config.MESH_TEXT_ROWS; row++) {
				for (col = 0; col < config.MESH_TEXT_COLUMNS; col++) {
					mesh.vertexArray[row][col].y = ((0.4 * (row - 2) * mesh._hh) * (1 + Math.sin((col * (0.2 * amp)) - t))) + (Math.sin((col * 0.5) - t) * 30 * amp) + (0.6 * (row - 2) * mesh._hh);
					mesh.vertexArray[row][col].x = (col * mesh._ww + Math.cos((col * 0.2) + t) * 20);
				}
			}
		}

		static pinch(vertices, factor) {
			let centroid = vertices.reduce((acc, curr) => { return {x: acc.x + curr.x, y: acc.y + curr.y}; });
			centroid.x /= vertices.length;
			centroid.y /= vertices.length;

			return vertices.map(vertex => maths.lerp(centroid, vertex, factor));
		}

		static pull(vertices, point, strength) {
			return vertices.map(vertex => {
				let stretch = Math.max(0, (1 / maths.pointDistance(vertex, point)) - (1 - strength));
				maths.lerp(vertex, point, stretch);
			});
		}

		static debug(meshText) {
			//Setup graphics drawing for points (renderPoints)
			meshText.g = new PIXI.Graphics();
			meshText.g.x = meshText.x;
			meshText.g.y = meshText.y;
			meshText.parent.addChild(meshText.g);

			meshText._debug = true;
		}

		constructor(string, font, tint = 0xFFFFFF, filters, waveAmplitude) {
			let bitmapText = new PIXI.extras.BitmapText(string, {font: font, align: "center", tint: tint});
			bitmapText.filters = filters || [filterStyles.message0, filterStyles.message1, filterStyles.messageGlow];
			bitmapText.cacheAsBitmap = true;

			let hiddenRenderTex = PIXI.RenderTexture.create(800, 600);
			app.renderer.render(bitmapText, hiddenRenderTex);

			let tex = PIXI.utils.TextureCache[bitmapText._cacheData.textureCacheId];
			super(tex, config.MESH_TEXT_COLUMNS, config.MESH_TEXT_ROWS);

			this.bitmapText = bitmapText;

			this._tickCallback = MeshText.waveWiggle;
			this._tickParams = [this, waveAmplitude];
			this._tex = tex;
			this._time = 0;
			this._ww = this._tex.width / config.MESH_TEXT_COLUMNS;
			this._hh = this._tex.height / config.MESH_TEXT_ROWS;
			this._playing = false;

			this.vertexArray = MeshText.getVertexArray(this.vertices);
			this._vertexArrayDefault = JSON.parse(JSON.stringify(this.vertexArray));

			PIXI.ticker.shared.add(this.tick, this);
		}

		renderPoints() {
			var col, row;

			if(!this.g) {
				MeshText.debug(this);
			}

			this.g.clear();

			this.g.lineStyle(2, 0xffc2c2);
			for(row = 0; row < config.MESH_TEXT_ROWS; row++) {
				this.g.moveTo(this.vertexArray[row][0].x, this.vertexArray[row][0].y);
				for(col = 0; col < config.MESH_TEXT_COLUMNS; col++) {
					this.g.lineTo(this.vertexArray[row][col].x, this.vertexArray[row][col].y);
				}
			}
			for(col = 0; col < this.vertexArray[0].length; col++) {
				this.g.moveTo(this.vertexArray[0][col].x, this.vertexArray[0][col].y);
				for(row = 0; row < config.MESH_TEXT_ROWS; row++) {
					this.g.lineTo(this.vertexArray[row][col].x, this.vertexArray[row][col].y);
				}
			}
			for(row = 0; row < config.MESH_TEXT_ROWS; row++) {
				for(col = 0; col < config.MESH_TEXT_COLUMNS; col++) {
					this.g.beginFill(0xff0022);
					this.g.drawCircle(this.vertexArray[row][col].x, this.vertexArray[row][col].y, 10);
					this.g.endFill();
				}
			}
		}

		tick(deltaTime, time) {
			if(!this._playing) {
				return;
			}

			this._time += deltaTime;
			if(time) {
				this._time = time;
			}
			if(typeof this._tickCallback === "function") {
				this._tickCallback(...this._tickParams);
			}
			let i = 0;
			for (let row = 0; row < config.MESH_TEXT_ROWS; row++) {
				for (let col = 0; col < config.MESH_TEXT_COLUMNS; col++) {
					this.vertices[i] = this.vertexArray[row][col].x;
					i++;
					this.vertices[i] = this.vertexArray[row][col].y;
					i++;
				}
			}

			if(this._debug) { this.renderPoints(); }
		}

		play() {
			if(this._playing) {
				return;
			}

			this._playing = true;

			//PIXI.ticker.shared.add(this.tick, this);
		}

		stop() {
			if(!this._playing) {
				return;
			}

			this._playing = false;

			//PIXI.ticker.shared.remove(this.tick, this);
		}

		row(index) {
			return this.vertexArray[index];
		}

		column(index) {
			return this.vertexArray.map(row => row[index]);
		}

		gotoAndPlay(time) {
			this.tick(0, time || 0);
			this.play();
		}

		gotoAndStop(time) {
			this.tick(0, time || 0);
			this.stop();
		}
	}

	return MeshText;
});