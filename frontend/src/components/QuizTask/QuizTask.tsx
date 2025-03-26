import {Task} from "../../types/QuizWithQuestion.ts";
import React from "react";
import TextQuizTask from "../TextQuizTask/TextQuizTask.tsx";
import SingleQuizTask from "../SingleQuizTask/SingleQuizTask.tsx";
import MultipleQuizTask from "../MultipleQuizTask/MultipleQuizTask.tsx";

interface TaskProps {
    task: Task
}

const QuizTask: React.FC<TaskProps> = ({task}) => {
    return (
        <div>
            <span>{task.question}</span>
            {task.type === "text" && <TextQuizTask />}
            {task.type === "single" && <SingleQuizTask responses={task.response} />}
            {task.type === "multiple" && <MultipleQuizTask responses={task.response} />}
        </div>
    )
}

export default QuizTask;