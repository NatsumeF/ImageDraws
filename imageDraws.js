~ function(window, undefined) {
	"use strict"
	var ImageDraws = function(doms) {
		var arr = [];
		if (doms.length) {
			arr = [].slice.call(doms) || doms || document.body;
		} else {
			arr.push(doms)
		}
		this.dom = arr;
		this.init();
	}
	ImageDraws.prototype.init = function() {
			this.createElements();
			this.addEvent();
		}
		//创建基础界面
	ImageDraws.prototype.createElements = function() {
			this.shade = document.createElement("div");
			this.shade.classList.add("shade");
			this.close = document.createElement("button");
			this.close.innerHTML = "×";
			this.share = document.createElement("div");
			this.share.classList.add("share");
			this.max = document.createElement("button");
			this.max.innerHTML = "放大";
			this.min = document.createElement("button");
			this.min.innerHTML = "缩小";
			this.downLoad = document.createElement("button");
			this.downLoad.innerHTML = "下载";
			var shadeStyle = {
					height: "100%",
					width: "100%",
					position: "fixed",
					left: 0,
					top: 0,
					zIndex: 998,
					background: "rgba(212, 203, 212, .8)"
				},
				closeStyle = {
					color: "#fff",
					position: "absolute",
					top: 0,
					right: "2px",
					height: " 50px",
					width: "50px",
					background: "transparent",
					border: 0,
					outline: 0,
					fontSize: "55px",
					lineHeight: "30px",
					borderRadius: "50%",
					cursor: "pointer",
					zIndex: 1000,
					background: "rgba(200, 203, 102, .8)"
				},
				shareStyle = {
					height: "50px",
					width: "250px",
					position: "absolute",
					bottom: "10px",
					left: "50%",
					zIndex: 1000,
					transform: "translateX(-50%)"
				},
				buttonStyle = {
					float: "left",
					height: "30px",
					width: "50px",
					cursor: "pointer",
					borderRadius: "5px",
					margin: " 9px 20px",
					fontSize: "15px",
					lineHeight: 1,
					marginRight: 0,
					background: "#444",
					background: "rgba(200, 203, 102, .8)"
				}
			for (let i in shadeStyle) {
				this.shade.style[i] = shadeStyle[i];
			};
			for (let i in closeStyle) {
				this.close.style[i] = closeStyle[i];
			};
			for (let i in shareStyle) {
				this.share.style[i] = shareStyle[i];
			};
			for (let i in buttonStyle) {
				this.max.style[i] = buttonStyle[i];
				this.min.style[i] = buttonStyle[i];
				this.downLoad.style[i] = buttonStyle[i];
			};
			this.shade.appendChild(this.share);
			this.shade.appendChild(this.close);
			this.share.appendChild(this.max);
			this.share.appendChild(this.min);
			this.share.appendChild(this.downLoad);
		}
		//获取body的宽
	ImageDraws.prototype.getBodyWidth = function() {
			return this.getWidth(document.body)
		}
		//让图片可以移动
	ImageDraws.prototype.move = function() {
		var me = this;
		me.image.addEventListener("mousedown", function(e) {
			e.stopPropagation();
			var x = e.clientX,
				y = e.clientY,
				//这里通过加上一个margin来补偿多减去的offsetLeft
				clickX = x - me.image.offsetLeft + parseInt(window.getComputedStyle(me.image).marginLeft),
				clickY = y - me.image.offsetTop + parseInt(window.getComputedStyle(me.image).marginTop),
				_move = function(e) {
					me.image.style.left = e.clientX - clickX + "px";
					me.image.style.top = e.clientY - clickY + "px";
					e.preventDefault()
				};
			document.addEventListener("mousemove", _move);
			document.addEventListener("mouseup", function() {
				document.removeEventListener("mousemove", _move);
			})
		})
	};
	//创建放大的图片
	ImageDraws.prototype.createImg = function(dom) {
			this.image = document.createElement("img");
			this.image.src = dom.getAttribute("dota-src");
			var height,
				me = this,
				width;
			this.image.onload = function() {
				var height = me.image.height,
					width = me.image.width;
				var imageStyle = {
					height: (me.getBodyWidth() * 0.5 * (height / width)) + "px",
					width: me.getBodyWidth() * 0.5 + "px",
					position: "absolute",
					left: "50%",
					top: "50%",
					zIndex: 999,
					cursor: "move",
					transform: "translate(-50%,-50%)"
				}
				for (let i in imageStyle) {
					me.image.style[i] = imageStyle[i];
				}
				me.shade.appendChild(me.image);
				me.move(me.image)
			}
		}
		//显示图片
	ImageDraws.prototype.show = function() {
			document.body.appendChild(this.shade);
		}
		//移除图片
	ImageDraws.prototype.hide = function() {
			document.body.removeChild(this.shade);
			this.shade.removeChild(this.image);
		}
		//获取元素的高
	ImageDraws.prototype.getHeight = function(dom) {
			return parseInt(window.getComputedStyle(dom).height);
		}
		//获取元素的宽
	ImageDraws.prototype.getWidth = function(dom) {
			return parseInt(window.getComputedStyle(dom).width);
		}
		//图片放大
	ImageDraws.prototype.addSize = function(size) {
			this.image.style.height = this.getHeight(this.image) + this.getHeight(this.image) * size + "px";
			this.image.style.width = this.getWidth(this.image) + this.getWidth(this.image) * size + "px";
		}
		//图片缩小
	ImageDraws.prototype.reduceSize = function(size) {
			this.image.style.height = this.getHeight(this.image) - this.getHeight(this.image) * size + "px";
			this.image.style.width = this.getWidth(this.image) - this.getWidth(this.image) * size + "px";
		}
		//添加事件
	ImageDraws.prototype.addEvent = function() {
			var me = this;
			for (let i = 0; i < this.dom.length; i++) {
				this.dom[i].addEventListener("click", function(e) {
					me.createImg(this);
					me.show();
				})
			};
			this.shade.addEventListener("click", function(e) {
				e.preventDefault()
				if (e.target === me.close) {
					me.hide();
					me.closeCallBackFn&&me.closeCallBackFn();
				} else if (e.target === me.shade) {
					me.hide();
				} else if (e.target === me.downLoad) {
					me.downImage(me.image.src);
				} else if (e.target === me.max) {
					me.addSize(0.2);
				} else if (e.target === me.min) {
					me.reduceSize(0.2);
				}
			})
		}
		//下载图片
	ImageDraws.prototype.downImage = function(src) {
			var a = document.createElement("a");
			a.href = this.image.src;
			a.setAttribute("download", src);
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);

		}
		//下载给定的元素数组所有的图片
	ImageDraws.prototype.downImageAll = function() {
		for (let i = 0; i < this.dom.length; i++) {
			this.downImage(this.dom[i].src)
		}
	}
	ImageDraws.prototype.closeCallBack = function(callback) {
		this.closeCallBackFn=callback;
	}
	window.ImageDraws = window.ImageDraws || ImageDraws;
}(window)