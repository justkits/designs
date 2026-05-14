export function colorWithOpacity(color: string, percent: number) {
  return `color-mix(in srgb, ${color} ${percent}%, light-dark(#ffffff, #000000))`;
}
