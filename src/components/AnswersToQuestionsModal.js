import React,{useState , useEffect} from 'react'
import '../assets/css/answeToQuestioModal.css'
function AnswersToQuestionsModal(props) {
    const clickHandler = () => {
        props.handleClose()
    }
    return (
        <div className="AnswerToQuestionModalPage">
            <button type="button" onClick={() => clickHandler()} className="removeModalBtn">×</button>
            <div className="questionPart">{props.question} ?</div>
            <div className="answerPart">{props.answer}</div>
        </div>
    )
}

export default AnswersToQuestionsModal
