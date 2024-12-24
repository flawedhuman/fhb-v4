export const colorPalettes = {
  neon: ['#ff00ff', '#00ff00', '#ff0000', '#00ffff'],
  pastel: ['#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA'],
  dark: ['#2C3E50', '#E74C3C', '#8E44AD', '#2980B9']
};

export function getRandomColorFromPalette(paletteName) {
  const palette = colorPalettes[paletteName];
  return palette[Math.floor(Math.random() * palette.length)];
}