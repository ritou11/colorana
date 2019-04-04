function rgb2hsl(r, g, b) {
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;
  const min = Math.min(r1, g1, b1);
  const max = Math.max(r1, g1, b1);
  const d = max - min;
  let h = 0;
  let s = 0;
  const l = (min + max) / 2;
  if (d) {
    s = l < 0.5 ? d / (max + min) : d / (2 - max - min);
    switch (max) {
      case r1: h = (g1 - b1) / d + (g1 < b1 ? 6 : 0); break;
      case g1: h = (b1 - r1) / d + 2; break;
      default: h = (r1 - g1) / d + 4; break;
    }
    h *= 60;
  }
  return [h, s, l];
}

export default rgb2hsl;
