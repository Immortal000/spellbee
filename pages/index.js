import styles from "../styles/Home.module.css";

import filter from "../functions/filter";

import SpellBee from "../components/SpellBee";
import SpellBeee from "../components/SpellBeee";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

export default function Home({ easy_words, hard_words }) {
  const [start, clicked] = useState(false);

  const startBee = () => {
    console.log(start);
    if (start) {
      return;
    }
    return;
  };
  return (
    <div>
      {/* <SpellBee easy_words={easy_words} medium_words={medium_words} hard_words={hard_words} /> */}
      <SpellBeee easy_words={easy_words} hard_words={hard_words} />
      <footer>
        <p>
          This eBook is for the use of anyone anywhere in the United States and most other parts of the world at no cost
          and with almost no restrictions whatsoever. You may copy it, give it away or re-use it under the terms of the
          Project Gutenberg License included with this eBook or online at www.gutenberg.org. If you are not located in
          the United States, you will have to check the laws of the country where you are located before using this
          eBook.
        </p>
      </footer>
    </div>
  );
}

Home.getInitialProps = async ({ ctx }) => {
  const data = await fetch("http://localhost:3000/filteredWords.json");
  const response = await data.json();

  const { easy_words, hard_words } = filter(response);

  return { easy_words, hard_words };
};
