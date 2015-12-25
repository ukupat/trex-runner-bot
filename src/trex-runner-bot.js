function TrexRunnerBot() {
  var upKeyArgs = { keyCode: 38 };
  var downKeyArgs = { keyCode: 40, preventDefault: function () {} };

  function conquerTheGame() {
    if (!Runner || !Runner().horizon.obstacles[0])
      return;

    var obstacle = Runner().horizon.obstacles[0];

    if (needsToTackle(obstacle) && closeEnoughToTackle(obstacle))
      tackle(obstacle);
  }

  function needsToTackle(obstacle) {
    return obstacle.yPos !== 50;
  }

  function closeEnoughToTackle(obstacle) {
    return obstacle.xPos <= Runner().currentSpeed * 18;
  }

  function tackle(obstacle) {
    if (isDuckable(obstacle))
      duck();
    else
      jumpOver(obstacle);
  }

  function isDuckable(obstacle) {
    return obstacle.yPos === 75;
  }

  function duck() {
    Runner().onKeyDown(downKeyArgs);

    setTimeout(function () {
      Runner().onKeyUp(downKeyArgs);
    }, 500);
  }

  function jumpOver(obstacle) {
    if (isNextObstacleCloseTo(obstacle))
      jumpFast();
    else
      Runner().onKeyDown(upKeyArgs);
  }

  function isNextObstacleCloseTo(currentObstacle) {
    var nextObstacle = Runner().horizon.obstacles[1];

    return nextObstacle && nextObstacle.xPos - currentObstacle.xPos <= Runner().currentSpeed * 42;
  }

  function jumpFast() {
    Runner().onKeyDown(upKeyArgs);
    Runner().onKeyUp(upKeyArgs);
  }

  return { conquerTheGame: conquerTheGame };
}

var bot = TrexRunnerBot();
var botInterval = setInterval(bot.conquerTheGame, 2);
