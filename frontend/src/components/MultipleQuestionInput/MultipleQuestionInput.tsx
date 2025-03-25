import React from "react";
import ResponseData from "../../types/ResponseData.ts";


interface MultipleQuestionInputProps {
    onUpdate: (responseData: ResponseData) => void;
}

const MultipleQuestionInput: React.FC<MultipleQuestionInputProps> = ({onUpdate}) => {
    const [textInputs, setTextInputs] = React.useState<string[]>(["", ""])
    const [selectedAnswers, setSelectedAnswers] = React.useState<boolean[]>([false, false])

    const handleResponseChange = (index: number, value: string) => {
        const newInputs = [...textInputs];
        newInputs[index] = value;
        setTextInputs(newInputs);

        const responseData: ResponseData = {
            response: newInputs,
            answer: newInputs
        }
        onUpdate(responseData)
    }

    const handleAnswerChange = (index: number, value: boolean) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[index] = value;
        setSelectedAnswers(newAnswers);

        const responseData: ResponseData = {
            response: textInputs,
            answer: textInputs
        }
        onUpdate(responseData)
    };

    const addResponse = () => {
        const newInputs = [...textInputs, ""];
        setTextInputs(newInputs);

        const newAnswers = [...selectedAnswers, false];
        setSelectedAnswers(newAnswers);

        // send data to parent component
        const responseData = {
            response: textInputs,
            answer: textInputs
        }

        onUpdate(responseData);
    }

    const removeResponse = (index: number) => {
        const newInputs = [...textInputs];
        if (newInputs.length <= 2) {
            alert("At least 2 responses must be provided for this type of question!")
            return
        }

        // remove text input element
        newInputs.splice(index, 1);
        setTextInputs(newInputs);

        // remove answer
        selectedAnswers.splice(index, 1)
        setSelectedAnswers(selectedAnswers);

        // send data to parent component
        const responseData = {
            response: textInputs,
            answer: textInputs
        }

        onUpdate(responseData);
    }

    return (
        <>
            {textInputs.map((value, index) => (
                <div className={"singleQuestionInput"} key={index}>
                    <input type="text" placeholder="Response 1" value={value}
                    onChange={(e) => handleResponseChange(index, e.target.value)}/>
                    <input type="checkbox" name="answer" checked={selectedAnswers[index]}
                    onChange={(e) => handleAnswerChange(index, e.target.checked)}/>
                    <button onClick={() => {
                        removeResponse(index)
                    }}>Remove</button>                </div>
            ))}

            <button onClick={addResponse}>Add</button>

        </>
    )
}

export default MultipleQuestionInput;