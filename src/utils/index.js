function rgb2hsl(r, g, b) {
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const d = max - min;
  let h = 0;
  let s = 0;
  const l = (min + max) / 2;
  if (d) {
    s = l < 0.5 ? d / (max + min) : d / (2 - max - min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return [h, s, l];
}

export default rgb2hsl;
