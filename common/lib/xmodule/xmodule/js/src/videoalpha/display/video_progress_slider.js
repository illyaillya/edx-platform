// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.VideoProgressSliderAlpha = (function(_super) {

    __extends(VideoProgressSliderAlpha, _super);

    function VideoProgressSliderAlpha() {
      this.onStop = __bind(this.onStop, this);

      this.onChange = __bind(this.onChange, this);

      this.onSlide = __bind(this.onSlide, this);

      this.play = __bind(this.play, this);
      return VideoProgressSliderAlpha.__super__.constructor.apply(this, arguments);
    }

    VideoProgressSliderAlpha.prototype.initialize = function() {
      if (!onTouchBasedDevice()) {
        return this.buildSlider();
      }
    };

    VideoProgressSliderAlpha.prototype.buildSlider = function() {
      this.slider = this.el.slider({
        range: 'min',
        change: this.onChange,
        slide: this.onSlide,
        stop: this.onStop
      });
      return this.buildHandle();
    };

    VideoProgressSliderAlpha.prototype.buildHandle = function() {
      this.handle = this.$('.slider .ui-slider-handle');
      return this.handle.qtip({
        content: "" + (Time.format(this.slider.slider('value'))),
        position: {
          my: 'bottom center',
          at: 'top center',
          container: this.handle
        },
        hide: {
          delay: 700
        },
        style: {
          classes: 'ui-tooltip-slider',
          widget: true
        }
      });
    };

    VideoProgressSliderAlpha.prototype.play = function() {
      if (!this.slider) {
        return this.buildSlider();
      }
    };

    VideoProgressSliderAlpha.prototype.updatePlayTime = function(currentTime, duration) {
      if (this.slider && !this.frozen) {
        this.slider.slider('option', 'max', duration);
        return this.slider.slider('value', currentTime);
      }
    };

    VideoProgressSliderAlpha.prototype.onSlide = function(event, ui) {
      this.frozen = true;
      this.updateTooltip(ui.value);
      return $(this).trigger('seek', ui.value);
    };

    VideoProgressSliderAlpha.prototype.onChange = function(event, ui) {
      return this.updateTooltip(ui.value);
    };

    VideoProgressSliderAlpha.prototype.onStop = function(event, ui) {
      var _this = this;
      this.frozen = true;
      $(this).trigger('seek', ui.value);
      return setTimeout((function() {
        return _this.frozen = false;
      }), 200);
    };

    VideoProgressSliderAlpha.prototype.updateTooltip = function(value) {
      return this.handle.qtip('option', 'content.text', "" + (Time.format(value)));
    };

    return VideoProgressSliderAlpha;

  })(SubviewAlpha);

}).call(this);