import { remap, time } from "./util";
import { WORDS_PER_SECOND, WORDS_PER_HOUR, INTERVALS } from "./init";
import WORDS from "an-array-of-english-words";

type Index = {
  [letter: string]: {
    index: number;
    interval: number;
  };
};

export const info = () => {
  return `There are ${
    WORDS.length
  } words. Running at ${WORDS_PER_SECOND} words per second, the work is ${
    WORDS.length / WORDS_PER_HOUR
  } hours long.`;
};

export const schedule = () => {
  const index = WORDS.reduce((memo: Index, word, i) => {
    const letter = word.charAt(0);

    if (!!memo[letter]) {
      return memo;
    }

    memo[letter] = {
      index: i,
      interval: remap(i, { min: 0, max: WORDS.length }, { min: 0, max: 2 }),
    };

    return memo;
  }, {});

  return INTERVALS.map((interval) => {
    return Object.keys(index).map((letter) => {
      return {
        letter,
        at: time(index[letter].interval + interval.start.getHours()),
      };
    });
  }).reduce((acc, val) => acc.concat(val), []);
};
