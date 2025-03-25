import React from "react"
import TextQuestionInput from "../TextQuestionInput/TextQuestionInput.tsx";
import SingleQuestionInput from "../SingleQuestionInput/SingleQuestionInput.tsx";
import MultipleQuestionInput from "../MultipleQuestionInput/MultipleQuestionInput.tsx";
import "./QuestionInput.css"


const QuestionInput = () => {
    const [type, setType] = React.useState("text");

    const addQuestion = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value);
    }

    return (
        <>
            <div className="question-input-container">
                <div className="input-container">
                    <div className="question-container">
                        <label htmlFor="question">Your Question</label>
                        <input type="text" id="question" placeholder={"Your question"} className='text-input'/>
                    </div>

                    <div className="selector-container">
                        <label>Select type</label>
                        <select defaultValue={"text"} onChange={addQuestion} className="type-selector">
                            <option value="text">Text</option>
                            <option value="single">Single</option>
                            <option value="multiple">Multiple</option>
                        </select>
                    </div>
                </div>

                <div className="response-container">
                    {type === "text" && <TextQuestionInput/>}
                    {type === "single" && <SingleQuestionInput/>}
                    {type === "multiple" && <MultipleQuestionInput/>}
                </div>
            </div>
        </>
    )
}

export default QuestionInput;