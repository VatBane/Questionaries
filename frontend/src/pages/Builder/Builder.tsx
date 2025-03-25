import React from "react";
import QuestionInput from "../../components/QuestionInput/QuestionInput.tsx";
import Question from "../../types/Question.ts";
import "./Builder.css"


interface QuestionInputElement {
    id: number;
    questionData: Question;
}


const BuilderPage = () => {
    const [questions, setQuestions] = React.useState<QuestionInputElement[]>([]);

    // Function to add a new question
    const addComponent = () => {
        const question: Question = {
            id: null,
            question: "",
            type: "text",
            responseData: {response: [], answer: []}
        }
        setQuestions([...questions, { id: questions.length, questionData: question}]);
    };

    // Function to update a question
    // const updateQuestionData = (id: number, text: string, type: string) => {
    //     setQuestions((prevQuestions: Question[]) =>
    //         prevQuestions.map((q: Question) =>
    //             q.id === id ? { ...q, text, type } : q
    //         )
    //     );
    // };

    const saveQuiz = () => {
        for (let component of questions) {
            console.log(component);
        }
    }

    return (
        <main className='builder'>
            <h3>Create Quiz</h3>
            {questions.map((question: QuestionInputElement) => (
                <div key={question.id} className="input-container">
                    <span>{question.id + 1}.</span>
                    <QuestionInput />
                </div>
            ))}

            <button onClick={addComponent} className="add-button">Add Question</button>
            <button onClick={saveQuiz}>Apply</button>
        </main>
    )
}

export default BuilderPage;