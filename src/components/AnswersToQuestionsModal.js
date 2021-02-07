import React,{useState , useEffect} from 'react'
import '../assets/css/answeToQuestioModal.css'
function AnswersToQuestionsModal(props) {
    const clickHandler = () => {
        props.handleClose()
    }
    return (
        <div className="AnswerToQuestionModalPage">
            <button type="button" onClick={() => clickHandler()} className="removeModalBtn">×</button>
            <div className="questionPart">Is there a return procedure for defective goods?</div>
            <div className="answerPart">Is there a return procedure for defective goods?</div>
        </div>
    )
}

export default AnswersToQuestionsModal
