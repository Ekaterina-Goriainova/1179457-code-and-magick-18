'use strict';

var CLOUD_WIDTH = 410;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 135;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 30;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 130;
var BAR_Y = 240;

var renderRect = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var renderText = function (ctx, text, x, y) {
  ctx.fillStyle = '#000';
  ctx.font = 'bold 16px PT Mono';
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderRect(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderRect(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');

  renderText(ctx, 'Ура вы победили!', CLOUD_X + BAR_GAP, CLOUD_Y + FONT_GAP);
  renderText(ctx, 'Список результатов:', CLOUD_X + BAR_GAP, CLOUD_Y + FONT_GAP * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    renderText(ctx, Math.round(times[i]), CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, BAR_Y - (BAR_HEIGHT * times[i]) / maxTime - GAP);
    renderText(ctx, names[i], CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, BAR_Y + 2 * GAP);
    var colorBar = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(' + '240' + ',' + Math.floor(Math.random() * 100) + '%' + ',' + '50%' + ')';
    renderRect(ctx, CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, BAR_Y - (BAR_HEIGHT * times[i]) / maxTime, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime, colorBar);
  }
};
