import WORDS from "an-array-of-english-words";
import { add, startOfDay } from "date-fns";

export const RUNTIME_IN_HOURS = 2;
export const WORDS_PER_HOUR = WORDS.length / RUNTIME_IN_HOURS;
export const WORDS_PER_MINUTE = WORDS_PER_HOUR / 60;
export const WORDS_PER_SECOND = WORDS_PER_MINUTE / 60;
export const NUMBER_OF_INTERVALS = 24 / RUNTIME_IN_HOURS;
export const INTERVALS = Array.from({ length: NUMBER_OF_INTERVALS }, (_, i) => {
  const start = add(startOfDay(new Date()), { hours: i * RUNTIME_IN_HOURS });
  const end = add(start, { hours: RUNTIME_IN_HOURS });
  return { start, end };
});

export const $EL = document.getElementById("root");

const index = () => {
  const currentInterval = INTERVALS.find(
    ({ start, end }) => start < new Date() && end > new Date()
  );

  const percentageThroughCurrentInterval =
    ((new Date().getTime() - currentInterval.start.getTime()) /
      (currentInterval.end.getTime() - currentInterval.start.getTime())) *
    100;

  return Math.floor((WORDS.length / 100) * percentageThroughCurrentInterval);
};

export const init = () => {
  const tick = () => {
    $EL.innerHTML = WORDS[index()];
    window.requestAnimationFrame(tick);
  };

  window.requestAnimationFrame(tick);
};
