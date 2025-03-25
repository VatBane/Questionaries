import React from "react";

const MultipleQuestionInput = () => {
    const [textInputs, setTextInputs] = React.useState<string[]>(["", "", "", ""])
    const [selectedAnswers, setSelectedAnswers] = React.useState<boolean[]>([false, false, false, false])

    const handleResponseChande = (index: number, value: string) => {
        const newInputs = [...textInputs];
        newInputs[index] = value;
        setTextInputs(newInputs);
    }

    const handleAnswerChange = (index: number, value: boolean) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[index] = value;
        setSelectedAnswers(newAnswers);
    };

    return (
        <>
            {textInputs.map((value, index) => (
                <div className={"singleQuestionInput"} key={index}>
                    <input type="text" placeholder="Response 1" value={value}
                    onChange={(e) => handleResponseChande(index, e.target.value)}/>
                    <input type="checkbox" name="answer" checked={selectedAnswers[index]}
                    onChange={(e) => handleAnswerChange(index, e.target.checked)}/>
                </div>
            ))}
        </>
    )
}

export default MultipleQuestionInput;