export const X_Length = 10;
export const Y_Length = 10;

export const MINE_RATE = 0.2; // 炸弹的概率

export const isDev = false;

export const SIBLING_POSITIONS = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
];

const isCorrectPosition = (x, y) => {
  return x >= 0 && x < X_Length && y < Y_Length && y >= 0;
};

export const getSiblingBlock = (blocks, block) => {
  return SIBLING_POSITIONS.map(([x, y]) => {
    const x1 = block.x + x;
    const y1 = block.y + y;
    return isCorrectPosition(x1, y1) ? blocks[x1][y1] : null;
  }).filter(Boolean);
};

export const aroundBombNumberColors = [
  "transparent",
  "blue",
  "green",
  "yellow",
  "orange",
  "red",
  "purple",
  "pink",
  "teal",
];
