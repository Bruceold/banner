(function(window) {
	var banner = function() {
		this._init();
		this._autoPlay();
		this._startAndstop();
		this._dots();
		this._prevAndnext();
	};
	banner.prototype._init = function() {
		this.assets = {
			imgList: document.querySelectorAll('a'),
			banner: document.querySelector('.banner'),
			len: document.querySelectorAll('a').length,
			dots: document.querySelectorAll('.banner-dots li'),
			prev: document.querySelector('.banner-prev'),
			next: document.querySelector('.banner-next'),
			index: 0,
			timer: null,
		};
	};
	// 自动轮播
	banner.prototype._autoPlay = function() {
		var that = this;
		that.assets.timer = setInterval(function() {
			that.assets.index += 1;
			if (that.assets.index >= that.assets.len) {
				that.assets.index = 0;
			}
			that._changeImg();
		}, 3000);
	};
	// 鼠标移入移出控制播放
	banner.prototype._startAndstop = function() {
		var that = this;
		that.assets.banner.addEventListener('mouseenter', function() {
			clearInterval(that.assets.timer)
		}, false);
		that.assets.banner.addEventListener('mouseleave', function() {
			that._autoPlay()
		}, false);
	};
	// 圆点控制切换
	banner.prototype._dots = function() {
		var that = this
		this.assets.dots.forEach(function(dot, index) {
			dot.addEventListener('click', function() {
				that.assets.index = index;
				that._changeImg();
			}, false);
		});
	};
	// 左右切换按钮
	banner.prototype._prevAndnext = function() {
		var that = this;
		// 上一张
		that.assets.prev.addEventListener('click', function() {
			that.assets.index -= 1;
			if (that.assets.index < 0) {
				that.assets.index = that.assets.len - 1;
			}
			that._changeImg();
		}, false);
		// 下一张
		that.assets.next.addEventListener('click', function() {
			that.assets.index += 1;
			if (that.assets.index > that.assets.len - 1) {
				that.assets.index = 0;
			}
			that._changeImg();
		}, false);
	};
	// 切换图片样式控制函数
	banner.prototype._changeImg = function() {
		var o = 0;
		var timer = null;
		var that = this;
		for (var i = 0; i < that.assets.len; i++) {
			that.assets.imgList[i].classList.remove('active');
			that.assets.imgList[i].style.opacity = '0';
			that.assets.dots[i].classList.remove('active');
		}
		that.assets.imgList[that.assets.index].classList.add('active');
		clearInterval(timer);
		timer = setInterval(function() {
			o += 0.2;
			if (o >= 1) {
				o = 1;
				clearInterval(timer);
			}
			that.assets.imgList[that.assets.index].style.opacity = o;
		}, 150);
		that.assets.dots[that.assets.index].classList.add('active');
	};

	window.$banner = banner;
})(window)