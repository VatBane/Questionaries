import React from "react";
import "./TextQuizTask.css"


const TextQuizTask = () => {
    const [answer, setAnswer] = React.useState<string>('');

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
        console.log(answer);
    }

    return (
        <>
            <input type={"text"} placeholder={"Write your answer"} onChange={handleAnswerChange}
                   className="text-input"
            />
        </>
    )
}

export default TextQuizTask;