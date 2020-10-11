import { game as gameConf } from "./config.js";
import { clearDraw, drawBlock } from "./functions.js";

// フィールドオブジェクト
export default class Field {
  constructor() {
    this.blocks = this.createBlocksArray(
      gameConf.fieldSize[1] + gameConf.hideFieldHeight
    );
  }

  // 空のブロック配列を生成
  createBlocksArray(rowNum) {
    let result = [];
    for (let i = 0; i < rowNum; i++) {
      result[i] = Array(gameConf.fieldSize[0]).fill(null);
    }
    return result;
  }

  // フィールドのブロックをキャンバスへ描画するメソッド
  draw() {
    clearDraw("field");
    this.blocks.forEach((row, y) => {
      row.forEach((color, x) => {
        if (color) {
          drawBlock([x, y - gameConf.hideFieldHeight], color, "field");
        }
      });
    });
  }

  // ある座標にブロックを移動できるかどうかを判定する関数, 返り値;あり:1, なし:0
  checkBlock([x, y]) {
    let result;
    if (
      x < 0 ||
      x > gameConf.fieldSize[0] - 1 ||
      y > gameConf.fieldSize[1] + gameConf.hideFieldHeight - 1
    )
      result = 1;
    else if (this.blocks[y][x]) result = 1;
    else result = 0;
    return result;
  }

  // 一列揃ったら消すメソッド
  deleteLine() {
    this.blocks = this.blocks.filter((row) => row.includes(null));
    const deleteNum =
      gameConf.fieldSize[1] + gameConf.hideFieldHeight - this.blocks.length;
    console.log(deleteNum);
    if (deleteNum) {
      this.blocks.unshift(...this.createBlocksArray(deleteNum));
      clearDraw("field");
      this.draw();
    }
  }

  /*
   *  ラインを受け取って、下へ追加する関数
   *
   */
  receiveLine() {

  }
}
