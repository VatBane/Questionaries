import React from "react";
import ResponseData from "../../types/ResponseData.ts";


interface TextQuestionInputProps {
    onUpdate: (responseData: ResponseData) => void;
}


const TextQuestionInput: React.FC<TextQuestionInputProps> = ({onUpdate}) => {
    const [answer, setAnswer] = React.useState<string>("")

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // save state
        setAnswer(event.target.value)

        // send data to parent component
        const responseData = {
            response: [],
            answer: [event.target.value],
        }
        onUpdate(responseData);
    }

    return (
        <>
            <input type="text" placeholder="Correct answer" className="text-input"
                   onChange={handleAnswerChange}
                   required={true} value={answer}
            />
        </>
    )
}

export default TextQuestionInput;