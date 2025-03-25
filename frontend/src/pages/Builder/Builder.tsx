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
        setQuestions([...questions, { id: Date.now(), questionData: question}]);
    };

    const removeComponent = (id: number) => {
        const newQuestions = questions.filter((q) => q.id !== id);
        setQuestions(newQuestions);
    }

    // Function to update a question
    // const updateQuestionData = (id: number, text: string, type: string) => {
    //     setQuestions((prevQuestions: Question[]) =>
    //         prevQuestions.map((q: Question) =>
    //             q.id === id ? { ...q, text, type } : q
    //         )
    //     );
    // };

    const saveQuiz = () => {
        // for (let component of questions) {
        //     console.log(component);
        // }
        console.log(questions);
    }

    return (
        <main className='builder'>
            <h3>Create Quiz</h3>
            {questions.map((question: QuestionInputElement, index: number) => (
                <div key={question.id} className="input-container">
                    <span>{index + 1}.</span>
                    <QuestionInput />
                    <button onClick={() => {removeComponent(question.id)}}>Remove</button>
                </div>
            ))}

            <button onClick={addComponent} className="add-button">Add Question</button>
            <button onClick={saveQuiz}>Apply</button>
        </main>
    )
}

export default BuilderPage;