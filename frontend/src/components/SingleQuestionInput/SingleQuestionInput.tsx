import React from "react";
import "./SingleQuestionInput.css"
import ResponseData from "../../types/ResponseData.ts";


interface QuestionInputProps {
    onUpdate: (responseData: ResponseData) => void;
}

const SingleQuestionInput: React.FC<QuestionInputProps> = ({onUpdate}) => {
    const [textInputs, setTextInputs] = React.useState<string[]>(["", ""])
    const [selectedAnswer, setSelectedAnswer] = React.useState<number>(0)

    const handleResponseChange = (index: number, value: string) => {
        const newInputs = [...textInputs];
        newInputs[index] = value;
        setTextInputs(newInputs);

        // send data to parent component
        const responseData = {
            response: newInputs,
            answer: [newInputs[index]]
        }

        onUpdate(responseData);
    }

    const handleAnswerChange = (index: number) => {
        setSelectedAnswer(index);

        // send data to parent component
        const responseData = {
            response: textInputs,
            answer: [textInputs[index]]
        }

        onUpdate(responseData);
    };

    const addResponse = () => {
        const newInputs = [...textInputs, ""]
        setTextInputs(newInputs);

        // send data to parent component
        const responseData = {
            response: newInputs,
            answer: [newInputs[selectedAnswer]]
        }

        onUpdate(responseData);
    }

    const removeResponse = (index: number) => {
        const newInputs = [...textInputs];

        if (newInputs.length <= 2) {
            alert("At least 2 responses must be provided for this type of question!")
            return
        }
        if (selectedAnswer + 1 >= newInputs.length) {
            setSelectedAnswer(0)
        }
        newInputs.splice(index, 1);
        setTextInputs(newInputs);

        // send data to parent component
        const responseData = {
            response: textInputs,
            answer: [textInputs[selectedAnswer]]
        }

        onUpdate(responseData);
    }

    return (
        <>
            {textInputs.map((value, index) => (
                <div className="single-response-container" key={index}>
                    <input type="text" placeholder={`Response ${index + 1}`} value={value}
                           onChange={(e) => handleResponseChange(index, e.target.value)}
                    />
                    <input type="radio" name="correct" className='radio'
                           checked={selectedAnswer === index}
                           onChange={() => handleAnswerChange(index)}/>
                    <button onClick={() => {
                        removeResponse(index)
                    }}>Remove</button>
                </div>
            ))}

            <button onClick={addResponse}>Add</button>
        </>
    )
}

export default SingleQuestionInput;