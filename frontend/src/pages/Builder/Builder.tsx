import React from "react";
import QuestionInput from "../../components/QuestionInput/QuestionInput.tsx";
import "./Builder.css"


interface Question {
    id: number;
    text: string;
    type: string;
}


const BuilderPage = () => {
    const [questions, setQuestions] = React.useState<Question[]>([]);

    // Function to add a new question
    const addComponent = () => {
        setQuestions([...questions, { id: questions.length, text: "", type: "text" }]);
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
            {questions.map((question: Question) => (
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