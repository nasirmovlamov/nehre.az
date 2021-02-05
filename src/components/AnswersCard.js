import "../assets/css/answerCard.css"
import question from "../assets/images/question.svg"
import AnswersToQuestionsModal from './AnswersToQuestionsModal'
import React,{useState , useEffect} from 'react'
import "../assets/css/itemCard.css"
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function AnswersCard(props) {
    const [checker, setchecker] = useState(false)

    const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 100,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));
      const classes = useStyles();
      // getModalStyle is not a pure function, we roll the style only on the first render


    const [openAnswer, setOpenAnswer] = React.useState(false);

    const handleOpenAnswer = () => {
        setOpenAnswer(true);
      }
      
    const handleCloseAnswer = () => {
        setOpenAnswer(false);
    };
   

      
    return (
        <div  type="button" className="answersCardOutside">
            <button className="answersCardOutsideBtn" onClick={() => handleOpenAnswer()}>
                <div  className="answersCardInside">
                    <img src={question} alt="" width="36" height="auto"/>

                    <p>{props.question} ?</p>
                </div>
            </button>
            <Modal  
                    style={{display:"flex", justifyContent:"center",overflow:"auto",zIndex:'1000000000000000000000000000000000000000000000000000000000000000000000000000000'}}
                    open={openAnswer}
                    onClose={() => handleCloseAnswer()}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    {<AnswersToQuestionsModal  handleClose={() => handleCloseAnswer()}/>}
            </Modal>
        </div>
    )
}

export default AnswersCard
