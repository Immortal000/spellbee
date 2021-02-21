import filter from "../functions/filter";

import SpellBeee from "../components/SpellBeee";

export default function Home({ easy_words, hard_words }) {
  return (
    <div>
      <SpellBeee easy_words={easy_words} hard_words={hard_words} />
      <footer></footer>
    </div>
  );
}

Home.getInitialProps = async ({ ctx }) => {
  const data = await fetch("http://localhost:3000/filteredWords.json");
  const response = await data.json();

  const { easy_words, hard_words } = filter(response);

  return { easy_words, hard_words };
};
