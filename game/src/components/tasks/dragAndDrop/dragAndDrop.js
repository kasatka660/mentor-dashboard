import './dragAndDrop.scss';
import { getRandomInt } from '../../../utils';
import dragAndDropQuestions from './dragAndDropQuestions';
import createDragAndDropQuestion from './dragAndDrop.template';

class DragAndDrop {
  createQuestion() {
    const number = getRandomInt(dragAndDropQuestions.length);
    this.currentQuestion = dragAndDropQuestions[number];
    return createDragAndDropQuestion(this.currentQuestion);
  }

  render() {
    $('#questionForm .modal-content').html(this.createQuestion());
    $('#questionForm').modal('show');
    $('#sortable').sortable();
  }

  checkIfCorrect() {
    const answerField = $('#sortable li');
    const userAnswer = answerField.map((i, item) => item.textContent);
    let isCorrect = true;
    for (let i = 0; i < userAnswer.length; i += 1) {
      if (userAnswer[i] !== this.currentQuestion.answer[i]) {
        isCorrect = false;
      }
    }
    return isCorrect;
  }
}

export default DragAndDrop;
