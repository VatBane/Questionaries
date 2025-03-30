import React from "react";
import './SingleQuizTask.css'

interface SingleQuizTaskProps {
    responses: string[];
    onAnswerChange: (answer: string[]) => void;
}

const SingleQuizTask: React.FC<SingleQuizTaskProps> = ({responses, onAnswerChange}) => {
    const [answer, setAnswer] = React.useState<number | null >(null);

    const handleAnswerChange = (index: number) => {
        setAnswer(index);
        const newAnswer = responses[index];
        onAnswerChange([newAnswer])
    }

    return (
        <>
            {responses.map((value, index) => (
                <div key={index} className="single-task-response-container">
                    <label>{value}</label>
                    <input type="radio" name={"1"} onChange={() => handleAnswerChange(index)}
                    checked={answer === index}
                    />
                </div>
            ))}
        </>
    )
}

export default SingleQuizTask;