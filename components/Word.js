import { Button, Flex, Input, Text, useControllableState } from "@chakra-ui/react";
export default function Word({ word }) {
  const [answer, setAnswer] = useControllableState({ defaultValue: "" });
  const check = (e) => {
    if (word === answer) {
      console.log("Hooray!");
      setAnswer("");
    }
  };

  return (
    <>
      <Flex>
        <Input
          borderBottom="1px solid black"
          m="1rem"
          padding="2px"
          onChange={(e) => setAnswer(e.target.value)}
          value={answer}
        ></Input>
        <Button onClick={() => check()}>Submit</Button>
      </Flex>
    </>
  );
}
