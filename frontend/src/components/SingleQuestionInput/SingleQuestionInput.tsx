import React from "react";
import "./SingleQuestionInput.css"
// import ResponseData from "../../types/ResponseData.ts";


const SingleQuestionInput = () => {
    // const [responseData, setResponseData] = React.useState<ResponseData>({
    //     response: ["", "", "", ""],
    //     answer: []
    // });

    const [textInputs, setTextInputs] = React.useState<string[]>(["", "", "", ""])
    const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null)

    const handleResponseChange = (index: number, value: string) => {
        const newInputs = [...textInputs];
        newInputs[index] = value;
        setTextInputs(newInputs);
    }

    const handleAnswerChange = (index: number) => {
        setSelectedAnswer(index);
    };

    return (
        <>
            {textInputs.map((value, index) => (
                <div className="single-response-container" key={index}>
                    <input type="text" placeholder={`Response ${index}`} value={value}
                           onChange={(e) => handleResponseChange(index, e.target.value)} />
                    <input type="radio" name="correct" className='radio'
                           checked={selectedAnswer === index}
                           onChange={() => handleAnswerChange(index)}/>
                </div>
            ))}
        </>
    )
}

export default SingleQuestionInput;