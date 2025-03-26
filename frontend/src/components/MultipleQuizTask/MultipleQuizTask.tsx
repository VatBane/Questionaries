import React from "react";
import "./MultipleQuizTask.css"


interface MultipleQuizTaskProps {
    responses: string[];
}

const MultipleQuizTask: React.FC<MultipleQuizTaskProps> = ({responses}) => {
    const [answers, setAnswers] = React.useState<boolean[]>(responses.map(() => false));

    const handleAnswerChange = (index: number, newValue: boolean) => {
        const newAnswers = [...answers]
        newAnswers[index] = newValue;
        setAnswers(newAnswers);
    }

    return (
        <>
            {responses.map((value, index) => (
                <div key={index} className="multiple-task-response-container">
                    <label>{value}</label>
                    <input type="checkbox" name={"1"} onChange={() => handleAnswerChange(index, !answers[index])}
                           checked={answers[index]}
                    />
                </div>
            ))}
        </>
    )
}

export default MultipleQuizTask;