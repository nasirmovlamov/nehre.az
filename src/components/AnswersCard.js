import React from 'react'
import "../assets/css/answerCard.css"
import question from "../assets/images/question.svg"
function AnswersCard() {
    return (
        <div className="answersCardOutside">
            <div  className="answersCardInside">
                <img src={question} alt="" width="36" height="auto"/>

                <p>Why are farm products more expensive</p>
            </div>
        </div>
    )
}

export default AnswersCard
