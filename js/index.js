// 確率（小数で指定）
const CHANCE_DECIMAL = 0.3;
// リール回転速度
const SPEED = 10;
// 自動で回転が止まる時間
const DURATION_SEC = 60;
// リールで使用する画像
const reelImages = [
  "img/0.png",
  "img/1.png",
  "img/2.png",
  "img/3.png",
  "img/4.png",
  "img/5.png",
  "img/6.png",
];

$(document).ready(() => {
  let reelImagesHTML = reelImages.map(image => `<img src="${image}" />`).join('');
  $('.roulette1').append(reelImagesHTML);
  $('.roulette2').append(reelImagesHTML);
  $('.roulette3').append(reelImagesHTML);

  let started = false;
  let stopped = [false, false, false];
  let spinEnd = [false, false, false];

  // ランダムなインデックスを算出する
  const generateRandomIndex = () => {
    return Math.floor(Math.random() * reelImages.length);
  }

  // STOPする画像のインデックス配列
  const generateRandomArray = () => {
    const randomNumber = Math.random();
    if (randomNumber < CHANCE_DECIMAL) {
      const randomValue = generateRandomIndex();
      return [randomValue, randomValue, randomValue];
    } else {
      return [generateRandomIndex(), generateRandomIndex(), generateRandomIndex()];
    }
  }
  let imageNumbers = generateRandomArray();

  // 出力する文字列を作成する
  const generateOutputText = () => {
    if (imageNumbers.every(v => v === imageNumbers[0])) {
      return "大当たり🎯"
    }
    return "残念..！"
  }

  // 全てのリールが止まったかを確認する
  // 止まっていた場合は処理を実行する
  const checkAllSpinEnd = () => {
    if (spinEnd.every(v => v === true)) {
      started = false;
      stopped.fill(false);
      $('.start').prop("disabled", false);
      $('.stop').prop("disabled", true);
      let outputText = generateOutputText();
      $('.output_text').text(outputText);
    }
  }

  // initialize!
  $('div.roulette1').roulette({
    speed: SPEED,
    duration: DURATION_SEC,
    stopImageNumber: imageNumbers[0],
    stopCallback: ($stopElm) => {
      spinEnd[0] = true;
      checkAllSpinEnd();
    },
  });
  $('div.roulette2').roulette({
    speed: SPEED,
    duration: DURATION_SEC,
    stopImageNumber: imageNumbers[1],
    stopCallback: ($stopElm) => {
      spinEnd[1] = true;
      checkAllSpinEnd();
    },
  });
  $('div.roulette3').roulette({
    speed: SPEED,
    duration: DURATION_SEC,
    stopImageNumber: imageNumbers[2],
    stopCallback: ($stopElm) => {
      spinEnd[2] = true;
      checkAllSpinEnd();
    },
  });

  $('.start').click(() => {
    if (!started) {
      $('div.roulette1').roulette('start');
      setTimeout(() => {
        $('div.roulette2').roulette('start');
      }, 200);
      setTimeout(() => {
        $('div.roulette3').roulette('start');
      }, 400);
      started = true;
      $('.start').prop("disabled", true);
      $('.stop').prop("disabled", false);
    }
  });

  $('.stop').click(() => {
    if (started) {
      if (!stopped[0]) {
        $('div.roulette1').roulette('stop');
        stopped[0] = true;
      } else if (!stopped[1]) {
        $('div.roulette2').roulette('stop');
        stopped[1] = true;
      } else if (!stopped[2]) {
        $('div.roulette3').roulette('stop');
        stopped[2] = true;
      }
    }
  });
});
