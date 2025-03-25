import React from 'react'
import "./QuizCard.css"

interface QuizCardProps {
    name: string;
    description: string;
    questionsNumber: number;
}

const QuizCard: React.FC<QuizCardProps> = ({name, description = "", questionsNumber}) => {
    return (
        <div className='quiz-card'>
            <div className="content-wrapper">
                <h2>{name}</h2>
                <span>{description}</span>
                <small>Questions {questionsNumber}</small>
            </div>
            <div className="service-wrapper">
            </div>
        </div>
    )

}

export default QuizCard;