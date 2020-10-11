export const game = {
  fieldSize: [10, 20], // フィールドサイズ(block)
  hideFieldHeight: 2, // フィールド上部のサイズ
  fallInt: 700, // 落下速度(ms/block)
  fallCountInt: 10, // フォール判定のインターバル(ms)
  nextMinoInt: 30, // 次のミノが落ちてくるまでのインターバル(ms)
  numNextMino: 3, // 次のミノが表示される数
  numMinoType: 7, // ミノのタイプ数
};

export const display = {
  fieldScale: 1,
  nextScale: 0.5,
  holdScale: 0.5,
  blockSize: 40,
  blockStroke: "#fff",
  blockLineWidth: 1,
};

// フィールドの見た目設定
export const field = {
  position: [1000, 1000],
  backColor: "#111",
  strokeColor: "#222",
  lineWidth: 1,
};