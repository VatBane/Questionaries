import React from "react";
import "./TextQuizTask.css"


interface TextQuizTaskProps {
    onAnswerChange: (answer: string[]) => void;
}

const TextQuizTask: React.FC<TextQuizTaskProps> = ({onAnswerChange}) => {
    const [answer, setAnswer] = React.useState<string>('');

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
        onAnswerChange([event.target.value]);
    }

    return (
        <>
            <input type={"text"} placeholder={"Write your answer"} onChange={handleAnswerChange}
                   className="text-input" value={answer}
            />
        </>
    )
}

export default TextQuizTask;