import React from "react";
import ResponseData from "../../types/ResponseData.ts";


const TextQuestionInput = () => {
    const [responseData, setResponseData] = React.useState<ResponseData>({response: [], answer: []});

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setResponseData({response: [], answer: [event.target.value]})
        console.log(responseData)
    }

    return (
        <input type="text" placeholder="Correct answer" className="text-input" onChange={handleAnswerChange}
               value={responseData.answer}/>
    )
}

export default TextQuestionInput;