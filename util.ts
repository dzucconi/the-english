export const pad = (n: number): string => (n < 10 ? `0${n}` : `${n}`);

export const time = (dt: number) => {
  dt = dt * 60 * 60;
  const hours = Math.floor(dt / (60 * 60));
  dt = dt - hours * 60 * 60;
  const minutes = Math.floor(dt / 60);
  dt = dt - minutes * 60;
  const seconds = Math.round(dt);
  return [hours, minutes, seconds].map(pad).join(":");
};

export const remap = (
  value: number,
  input: {
    min: number;
    max: number;
  },
  output: {
    min: number;
    max: number;
  }
) => {
  return (
    output.min +
    ((value - input.min) / (input.max - input.min)) * (output.max - output.min)
  );
};
