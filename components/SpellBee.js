import Head from "next/head";
import { useEffect, useState } from "react";
import { Button, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

import Word from "../components/Word";

export default function SpellBee({ easy_words, medium_words, hard_words }) {
  const words = hard_words;
  console.log(hard_words);
  const [wordIndex, setIndex] = useState(1);

  useEffect(() => {
    // console.log(wordIndex);
  }, [wordIndex]);

  const [speechRate, setRate] = useState(1);

  const speak = (word, rate) => {
    word = word.split("_").join("");
    const speech = new SpeechSynthesisUtterance();
    speech.text = word;
    speech.rate = rate;

    window.speechSynthesis.speak(speech);
  };

  const next = () => {
    setIndex(wordIndex + 1);
    if (wordIndex > words.length - 2) {
      setIndex(0);
    }
    speak(words[wordIndex], speechRate);
  };

  const repeat = () => {
    speak(words[wordIndex - 1], speechRate);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Button onClick={() => next()}>Start</Button>

      <Flex>
        <Word word={words[wordIndex - 1]} />
        <IconButton icon={<ArrowRightIcon />} onClick={() => next()}></IconButton>
      </Flex>

      <Text>Word Origin: {}</Text>
      <Text>Word Length: {words[wordIndex - 1].length}</Text>

      <Flex>
        <Button onClick={() => setRate(speechRate == 1 ? 0.5 : 1)}>{speechRate == 1 ? "Slower" : "Faster"}</Button>
        <Button onClick={() => repeat()}>Repeat Word</Button>
      </Flex>
    </>
  );
}
