import { Box, Button, Container, Heading, Input, Select, Text, Flex, IconButton, useControllableState, Tooltip, useToast } from "@chakra-ui/react";
import { ArrowRightIcon, ArrowLeftIcon, RepeatClockIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { useState, useEffect } from "react";
import arrayShuffle from "array-shuffle";

export default function SpellBeee({ easy_words, hard_words }) {
    const [level, setLevel] = useState("easy");
    const [correct, setCorrect] = useState(false)
    const [word, setWord] = useControllableState({ defaultValue: "" })
    const [index, setIndex] = useState(0)
    const [words, setWords] = useState(easy_words)
    const [started, setStarted] = useState(false)

    const repeat = () => {
        speak(words[index], 1)
    }

    const slower = () => {
        speak(words[index], 0.7)
    }

    const speak = (word, rate) => {
        const speech = new SpeechSynthesisUtterance();
        speech.text = word;
        speech.rate = rate;

        window.speechSynthesis.speak(speech);
    }

    const checkWord = async () => {
        if (word == words[index]) {
            setCorrect(true)
            await new Promise(r => setTimeout(r, 500));
            next()
            setWord("")
        } else {
            setCorrect(false)
        }
    }

    const next = () => {
        setCorrect(false)
        setIndex(index + 1)
        speak(words[index + 1], 1)
        setWord("")
    }

    const previous = () => {
        setCorrect(false)
        setIndex(index - 1)
        speak(words[index - 1], 1)
        setWord("")
    }

    useEffect(() => {
        checkWord()
    }, [word])

    useEffect(async () => {
        if (level == "hard") {
            setWords(arrayShuffle(hard_words))
            setIndex(0)
        } else {
            setWords(arrayShuffle(easy_words))
            setIndex(0)
        }
    }, [level])

    function Toast() {
        if (correct) {
            const toast = useToast()
            return (
                toast({
                    position: "bottom-left",
                    title: "Correct!",
                    status: "success",
                    isClosable: true,
                    duration: 500
                })
            )
        } else {
            return (
                null
            )
        }
    }


    const startBee = () => {
        setStarted(true)
        speak(words[index], 1)
    }


    const start = () => {
        if (started) {
            return (
                <>
                    <Box>
                        <Heading> Spell Bee</Heading>
                        <Flex>
                            <Tooltip label="Repeat Slowly">
                                <IconButton icon={<TriangleDownIcon />} onClick={() => slower()}></IconButton>
                            </Tooltip>
                            <Tooltip label="Previous Word">
                                <IconButton icon={<ArrowLeftIcon />} onClick={() => previous()}></IconButton>
                            </Tooltip>
                            <Input placeholder="Enter Word" value={word} _focus="none" _hover="none" borderBottom={correct ? "3px solid green" : "3px solid red"} onChange={(e) => setWord(e.target.value)}></Input>
                            <Tooltip label="Next Word">
                                <IconButton icon={<ArrowRightIcon />} onClick={() => next()}></IconButton>
                            </Tooltip>
                            <Tooltip label="Repeat Word">
                                <IconButton icon={<RepeatClockIcon />} onClick={() => repeat()}></IconButton>
                            </Tooltip>
                        </Flex>
                    </Box >
                    <Toast />
                </>
            )
        } else {
            return (
                <>
                    <Select onChange={(e) => setLevel(e.target.value)}>
                        <option value="easy">Easy</option>
                        <option value="hard">Hard</option>
                    </Select>
                    <Button onClick={() => startBee()}>Start</Button>
                </>
            )
        }
    }

    return (
        <Container width="100%">
            {start()}
        </Container>
    );
}
