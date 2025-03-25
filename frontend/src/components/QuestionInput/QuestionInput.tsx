import React from "react"
import TextQuestionInput from "../TextQuestionInput/TextQuestionInput.tsx";
import SingleQuestionInput from "../SingleQuestionInput/SingleQuestionInput.tsx";
import MultipleQuestionInput from "../MultipleQuestionInput/MultipleQuestionInput.tsx";
import "./QuestionInput.css"
import ResponseData from "../../types/ResponseData.ts";
import Question from "../../types/Question.ts";


interface QuestionInputProps {
    id: number | null;
    onUpdate: (id: number | null, questionData: Question) => void;
}

const QuestionInput: React.FC<QuestionInputProps> = ({id, onUpdate}) => {
    const [type, setType] = React.useState("text");
    const [question, setQuestion] = React.useState<string>("")
    const [responseData, setResponseData] = React.useState<ResponseData>({response: [], answer: []})

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value);

        const newResponseData = {response: [], answer: []}
        setResponseData(newResponseData);

        const questionData: Question = {
            id: null,
            type: event.target.value,
            question: question,
            responseData: newResponseData
        }

        onUpdate(id, questionData);
    }

    const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.target.value);

        const questionData: Question = {
            id: null,
            type: type,
            question: event.target.value,
            responseData: responseData
        }

        onUpdate(id, questionData);
    }

    const handleResponseChange = (responseData: ResponseData) => {
        setResponseData(responseData);

        const questionData: Question = {
            id: null,
            type: type,
            question: question,
            responseData: responseData
        }

        onUpdate(id, questionData);
    }

    return (
        <>
            <div className="question-input-container">
                <div className="input-container">
                    <div className="question-container">
                        <label htmlFor="question">Your Question</label>
                        <input type="text" id="question" placeholder={"Your question"} className='text-input'
                        value={question} onChange={handleQuestionChange}/>
                    </div>

                    <div className="selector-container">
                        <label>Select type</label>
                        <select defaultValue={"text"} onChange={handleTypeChange} className="type-selector">
                            <option value="text">Text</option>
                            <option value="single">Single</option>
                            <option value="multiple">Multiple</option>
                        </select>
                    </div>
                </div>

                <div className="response-container">
                    {type === "text" && <TextQuestionInput onUpdate={handleResponseChange} />}
                    {type === "single" && <SingleQuestionInput onUpdate={handleResponseChange}/>}
                    {type === "multiple" && <MultipleQuestionInput onUpdate={handleResponseChange}/>}
                </div>
            </div>
        </>
    )
}

export default QuestionInput;