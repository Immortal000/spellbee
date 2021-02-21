import arrayShuffle from "array-shuffle";

export default function filter(words) {
  let easy_words = [];
  let hard_words = [];

  for (let word in words) {
    let count = words[word];
    if (count < 8) {
      hard_words.push(word);
    } else {
      easy_words.push(word);
    }
  }

  easy_words = arrayShuffle(arrayShuffle(easy_words));
  hard_words = arrayShuffle(arrayShuffle(hard_words));

  return { easy_words, hard_words };
}
