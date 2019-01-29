import { getRandomInt } from '../../../utils';
import translationQuestions from './translationQuestions';
import createTranslationQuestion from './translation.template';

class Translation {
  createQuestion() {
    const number = getRandomInt(translationQuestions.length);
    this.currentQuestion = translationQuestions[number];
    return createTranslationQuestion(this.currentQuestion);
  }

  render() {
    $('#questionForm .modal-content').html(this.createQuestion());
    $('#questionForm').modal('show');
    $('#questionForm').on('shown.bs.modal', () => {
      $('#answer').trigger('focus');
    });
  }

  checkIfCorrect() {
    const answerInput = $('#answer');
    const userAnswer = answerInput.val();
    let isCorrect = false;
    if (Array.isArray(this.currentQuestion.answer)) {
      isCorrect = this.currentQuestion.answer.some(item => item === userAnswer);
    } else if (userAnswer === this.currentQuestion.answer) {
      isCorrect = true;
    }
    return isCorrect;
  }
}

export default Translation;
