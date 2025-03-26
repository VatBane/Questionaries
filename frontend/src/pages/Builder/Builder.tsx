import React from "react";
import QuestionInput from "../../components/QuestionInput/QuestionInput.tsx";
import Question from "../../types/Question.ts";
import "./Builder.css"


interface QuestionInputElement {
    id: number;
    questionData: Question;
}


interface BuilderPageProps {
    onNavigate: (page: string, props?: any) => void;
}


const BuilderPage: React.FC<BuilderPageProps> = ({onNavigate}) => {
    const [questions, setQuestions] = React.useState<QuestionInputElement[]>([]);
    const [quizName, setQuizName] = React.useState<string>("")
    const [quizDescription, setQuizDescription] = React.useState<string>("")

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

    const saveQuiz = async () => {
        if (questions.length === 0) {
            alert('Nothing to save. Add question!')
            return;
        }

        const quizData = {
            name: quizName,
            description: quizDescription,
            tasks: questions.map((q) => {
                return {
                    question: q.questionData.question,
                    type: q.questionData.type,
                    response: q.questionData.responseData.response,
                    answer: q.questionData.responseData.answer
                }
            })
        }
        console.log(quizData);
        try {
            const response = await fetch('http://localhost:8080/api/v1/questionaries', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(quizData)
            })
            if (response.status === 200) {
                alert('Quiz created successfully.');
            }
            onNavigate("catalog");
        } catch (error) {
            console.log(error)
        }
        // if (questions.some((q) => !q.isValid)) {
        //     console.log('Question is not valid!')
        // }
        // console.log(questions);
    }

    const handleQuestionsChange = (id: number | null, questionData: Question) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
                q.id === id ? { ...q, questionData: questionData} : q
            )
        );
    }

    const handleQuizNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuizName(event.target.value);
    }

    const handleQuizDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuizDescription(event.target.value);
    }

    return (
        <main className='builder'>
            <h3>Create Quiz</h3>
            <input type={"text"} placeholder={"quiz name"} onChange={handleQuizNameChange} />
            <input type={"text"} placeholder={"quiz description"} onChange={handleQuizDescriptionChange} />

            {questions.map((question: QuestionInputElement, index: number) => (
                <div key={question.id} className="input-container">
                    <span>{index + 1}.</span>
                    <QuestionInput onUpdate={handleQuestionsChange} id={question.id} />
                    <button onClick={() => {removeComponent(question.id)}}>Remove</button>
                </div>
            ))}

            <button onClick={addComponent} className="add-button">Add Question</button>
            <button onClick={saveQuiz}>Apply</button>
            <button onClick={() => {onNavigate("catalog")}}>Cancel</button>
        </main>
    )
}

export default BuilderPage;