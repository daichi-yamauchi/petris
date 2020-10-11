import * as conf from "./config.js";

const canvas = {
  back: document.getElementById("back"),
  field: document.getElementById("field"),
  next: document.getElementById("next"),
  hold: document.getElementById("hold"),
};
const ctx = {
  back: canvas.back.getContext("2d"),
  field: canvas.field.getContext("2d"),
  next: canvas.next.getContext("2d"),
  hold: canvas.hold.getContext("2d"),
};

/*
キャンバスの調整
  ・キャンバスの大きさ
  ・キャンバスのスケール
*/
export const canvasResize = () => {
  // 背景キャンバス
  canvas.back.width = conf.game.fieldSize[0] * conf.display.blockSize;
  canvas.back.height = conf.game.fieldSize[1] * conf.display.blockSize;

  // フィールドキャンバス
  canvas.field.width = conf.game.fieldSize[0] * conf.display.blockSize;
  canvas.field.height = conf.game.fieldSize[1] * conf.display.blockSize;

  // 次のミノのキャンバス
  canvas.next.width = 5 * conf.display.blockSize * conf.display.nextScale;
  canvas.next.height =
    4 *
      conf.game.numNextMino *
      conf.display.blockSize *
      conf.display.nextScale +
    1;
  ctx.next.scale(conf.display.nextScale, conf.display.nextScale);

  // ホールドミノのキャンバス
  canvas.hold.width = 5 * conf.display.blockSize * conf.display.holdScale;
  canvas.hold.height = 4 * conf.display.blockSize * conf.display.holdScale;
  ctx.hold.scale(conf.display.holdScale, conf.display.holdScale);
};

/*
フィールド背景を生成する関数
*/
export const createBack = () => {
  ctx.back.beginPath();
  // 縦線
  for (let i = 1; i < conf.game.fieldSize[0]; i++) {
    ctx.back.moveTo(conf.display.blockSize * i, 0);
    ctx.back.lineTo(
      conf.display.blockSize * i,
      conf.display.blockSize * conf.game.fieldSize[1]
    );
  }
  // 横線
  for (let i = 1; i < conf.game.fieldSize[1]; i++) {
    ctx.back.moveTo(0, conf.display.blockSize * i);
    ctx.back.lineTo(
      conf.display.blockSize * conf.game.fieldSize[0],
      conf.display.blockSize * i
    );
  }
  ctx.back.closePath();
  ctx.back.strokeStyle = conf.field.strokeColor;
  ctx.back.lineWidth = conf.field.lineWidth;
  ctx.back.stroke();
};

// キャンバスの描画をクリアする関数
export const clearDraw = (canvasName) => {
  ctx[canvasName].clearRect(
    0,
    0,
    canvas[canvasName].width / conf.display[canvasName + "Scale"],
    canvas[canvasName].height / conf.display[canvasName + "Scale"]
  );
};

// ブロックをキャンバスへ描画するメソッド
export const drawBlock = (position, color, ctxName) => {
  ctx[ctxName].fillStyle = color;
  ctx[ctxName].strokeStyle = conf.display.blockStroke;
  ctx[ctxName].lineWidth = conf.display.blockLineWidth;
  ctx[ctxName].fillRect(
    position[0] * conf.display.blockSize,
    position[1] * conf.display.blockSize,
    conf.display.blockSize,
    conf.display.blockSize
  );
  ctx[ctxName].strokeRect(
    position[0] * conf.display.blockSize,
    position[1] * conf.display.blockSize,
    conf.display.blockSize,
    conf.display.blockSize
  );
};

// 中心位置と各相対位置から各ブロック位置を計算するメソッド
export const blocksPos = (position, blocks) => {
  let result = [];
  blocks.forEach((block, i) => {
    result[i] = [position[0] + block[0], position[1] + block[1]];
  });
  return result;
};
