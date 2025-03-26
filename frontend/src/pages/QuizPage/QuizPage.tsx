import React from "react";
import {Quiz} from "../../types/QuizWithQuestion.ts";
import QuizTask from "../../components/QuizTask/QuizTask.tsx";

interface QuizPageProps {
    id: number;
    onNavigate: (page: string, props?: any) => void;
}

const QuizPage: React.FC<QuizPageProps> = ({id, onNavigate}) => {
    const [quizData, setQuizData] = React.useState<Quiz>({id: id, name: "", description: "", tasks: []});

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

    }

    return (
        <main>
            <h2>{quizData.name}</h2>
            <h3>{quizData.description}</h3>
            {quizData.tasks.map((task, index )=> (
                <div key={task.id}>
                    <span>{index + 1}</span>
                    <QuizTask task={task}/>
                </div>
            ))}

            <button onClick={submit}>Submit</button>
            <button onClick={cancel}>Cancel</button>
        </main>
    )
}

export default QuizPage;