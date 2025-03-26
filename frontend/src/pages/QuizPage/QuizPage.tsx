import React from "react";
import {Quiz} from "../../types/QuizWithQuestion.ts";
import QuizTask from "../../components/QuizTask/QuizTask.tsx";
import "./QuizPage.css"
import QuizSubmitData from "../../types/QuizSubmitData.ts";


interface QuizPageProps {
    id: number;
    onNavigate: (page: string, props?: any) => void;
}

const QuizPage: React.FC<QuizPageProps> = ({id, onNavigate}) => {
    const [quizData, setQuizData] = React.useState<Quiz>({id: id, name: "", description: "", tasks: []});
    const [isRunning, setIsRunning] = React.useState<boolean>(false)
    const [submitData, setSubmitData] = React.useState<QuizSubmitData[]>([])

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/questionaries/${id}`)
            const data: Quiz = await response.json();
            setQuizData(data)
            console.log(data)
        } catch (error) {
            console.error(error)
            onNavigate("catalog")
        }
    }

    React.useEffect(() => {
        fetchData();
    }, [])

    const cancel = () => {
        onNavigate("catalog");
    }

    const submit = () => {
        console.log(submitData)
    }

    const runQuiz = () => {
        setIsRunning(true);
    }

    const handleSubmitDataChange = (data: QuizSubmitData) => {
        const newSubmitData = submitData.filter((task) => task.taskId !== data.taskId)
        newSubmitData.push(data)
        setSubmitData(newSubmitData)
        console.log(newSubmitData)
    }

    return (
        <main className="quiz-page">
            {!isRunning && (
                <div className="info-container">
                    <h2 className="quiz-page-header">Quiz: {quizData.name}</h2>
                    <h3 className="quiz-page-desc">Description: {quizData.description}</h3>
                    <button onClick={runQuiz}>Run</button>
                </div>
            )}
            {isRunning && (
                <div className="quest-container">
                    {quizData.tasks.map((task, index) => (
                        <div key={task.id} className='question-container'>
                            <span className="question-number">{index + 1}.</span>
                            <QuizTask task={task} onSubmitDataChange={handleSubmitDataChange} />
                        </div>
                    ))}

                    <button onClick={submit}>Submit</button>
                </div>
            )}

            <button onClick={cancel} className="cancel-button">Cancel</button>
        </main>
    )
}

export default QuizPage;