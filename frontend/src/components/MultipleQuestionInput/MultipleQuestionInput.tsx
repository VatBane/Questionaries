import React from "react";
import ResponseData from "../../types/ResponseData.ts";


interface MultipleQuestionInputProps {
    onUpdate: (responseData: ResponseData, isValid: boolean) => void;
}

const MultipleQuestionInput: React.FC<MultipleQuestionInputProps> = ({onUpdate}) => {
    const [textInputs, setTextInputs] = React.useState<string[]>(["", ""])
    const [selectedAnswers, setSelectedAnswers] = React.useState<boolean[]>([false, false])
    const [isValid, setIsValid] = React.useState(false);

    const handleResponseChange = (index: number, value: string) => {
        const newInputs = [...textInputs];
        newInputs[index] = value;
        setTextInputs(newInputs);

        const newIsValid = newInputs.every((el) => el !== "")
            && selectedAnswers.some((v) => v === true);
        setIsValid(newIsValid);
        const responseData: ResponseData = {
            response: newInputs,
            answer: newInputs.filter((_, index) => selectedAnswers[index])
        }
        onUpdate(responseData, newIsValid)
    }

    const handleAnswerChange = (index: number, value: boolean) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[index] = value;
        setSelectedAnswers(newAnswers);

        const newIsValid = textInputs.every((el) => el !== "")
            && newAnswers.some((v) => v === true);
        setIsValid(newIsValid);

        const responseData: ResponseData = {
            response: textInputs,
            answer: textInputs.filter((_, index) => newAnswers[index])
        }
        onUpdate(responseData, newIsValid)
    };

    const addResponse = () => {
        const newInputs = [...textInputs, ""];
        setTextInputs(newInputs);

        const newAnswers = [...selectedAnswers, false];
        setSelectedAnswers(newAnswers);

        setIsValid(false);
        // send data to parent component
        const responseData: ResponseData = {
            response: newInputs,
            answer: newInputs.filter((_, index) => newAnswers[index])
        }
        onUpdate(responseData, false)
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
        const newAnswers = [...selectedAnswers];
        newAnswers.splice(index, 1)
        setSelectedAnswers(newAnswers);

        const newIsValid = newInputs.every((el) => el !== "")
            && selectedAnswers.some((v) => v === true);
        setIsValid(newIsValid);

        // send data to parent component
        const responseData: ResponseData = {
            response: newInputs,
            answer: newInputs.filter((_, index) => newAnswers[index])
        }
        onUpdate(responseData, newIsValid)
    }

    return (
        <>
            {textInputs.map((value, index) => (
                <div className={"singleQuestionInput"} key={index}>
                    <input type="text" placeholder={`Response ${index}`} value={value}
                           onChange={(e) => handleResponseChange(index, e.target.value)}
                           className={`${isValid ? "valid" : "error"}`}
                    />
                    <input type="checkbox" name="answer" checked={selectedAnswers[index]}
                           onChange={(e) => handleAnswerChange(index, e.target.checked)}/>
                    <button onClick={() => {
                        removeResponse(index)
                    }}>Remove
                    </button>
                </div>
            ))}

            <button onClick={addResponse}>Add</button>

        </>
    )
}

export default MultipleQuestionInput;