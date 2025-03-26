import {Task} from "../../types/QuizWithQuestion.ts";
import React from "react";
import TextQuizTask from "../TextQuizTask/TextQuizTask.tsx";
import SingleQuizTask from "../SingleQuizTask/SingleQuizTask.tsx";
import MultipleQuizTask from "../MultipleQuizTask/MultipleQuizTask.tsx";
import "./QuizTask.css"
import QuizSubmitData from "../../types/QuizSubmitData.ts";


interface TaskProps {
    task: Task
    onSubmitDataChange: (task: QuizSubmitData) => void;
}

const QuizTask: React.FC<TaskProps> = ({task, onSubmitDataChange}) => {
    const [submitData, setSubmitData] = React.useState<QuizSubmitData>({taskId: task.id, answer: []});

    const handleSubmitDataChange = (answer: string[]): void => {
        const newSubmitData = {...submitData};
        newSubmitData.answer = answer;
        setSubmitData(newSubmitData);
        onSubmitDataChange(newSubmitData);
    }

    return (
        <div className="task-container">
            <span className="question">{task.question}</span>

            {task.type === "text" && <TextQuizTask onAnswerChange={handleSubmitDataChange}/>}
            {task.type === "single" && <SingleQuizTask responses={task.response}
                                                       onAnswerChange={handleSubmitDataChange}/>}
            {task.type === "multiple" && <MultipleQuizTask responses={task.response}
                                                           onAnswerChange={handleSubmitDataChange}/>}
        </div>
    )
}

export default QuizTask;