import React from "react";


interface SingleQuizTaskProps {
    responses: string[];
}

const SingleQuizTask: React.FC<SingleQuizTaskProps> = ({responses}) => {
    const [answer, setAnswer] = React.useState<number | null >(null);

    const handleAnswerChange = (index: number) => {
        setAnswer(index);
        console.log(answer);
    }

    return (
        <>
            {responses.map((value, index) => (
                <div key={index}>
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