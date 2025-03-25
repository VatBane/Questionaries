import React from "react";


const TextQuestionInput = () => {
    const [answer, setAnswer] = React.useState<string>("")

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value)
        console.log(answer)
    }

    return (
        <input type="text" placeholder="Correct answer" className="text-input" onChange={handleAnswerChange} />
    )
}

export default TextQuestionInput;