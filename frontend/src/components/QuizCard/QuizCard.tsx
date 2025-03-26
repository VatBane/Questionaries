import React from 'react'
import "./QuizCard.css"

interface QuizCardProps {
    name: string;
    description: string;
    questionsNumber: number;
    onClick: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({name, description = "", questionsNumber, onClick}) => {
    return (
        <div className='quiz-card' onClick={onClick}>
            <div className="content-wrapper">
                <h2 className="quiz-header">{name}</h2>
                <span className="quiz-desc">{description}</span>
                <small className='quiz-stats'>Questions {questionsNumber}</small>
            </div>
            <div className="service-wrapper">
            </div>
        </div>
    )

}

export default QuizCard;