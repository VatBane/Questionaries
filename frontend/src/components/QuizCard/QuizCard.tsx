import React from 'react'
import "./QuizCard.css"
import KebabMenu from "../KebabMenu/KebabMenu.tsx";

interface QuizCardProps {
    name: string;
    description: string;
    questionsNumber: number;
    onClick: () => void;
    onDelete: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({name, description = "", questionsNumber, onClick, onDelete}) => {

    return (
        <div className='quiz-card' >
            <div className="content-wrapper" onClick={onClick}>
                <h2 className="quiz-header">{name}</h2>
                <span className="quiz-desc">{description}</span>
                <small className='quiz-stats'>Questions {questionsNumber}</small>
            </div>
            <div className="service-wrapper">
                <KebabMenu onDelete={onDelete} />
            </div>
        </div>
    )

}

export default QuizCard;