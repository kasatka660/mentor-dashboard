import generateMathQuestion from './simpleMathQuestions';
import createSimpleMathQuestion from './simpleMath.template';

class SimpleMath {
  createQuestion() {
    this.currentQuestion = generateMathQuestion();
    return createSimpleMathQuestion(this.currentQuestion);
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
    if (parseInt(userAnswer, 10) === this.currentQuestion.answer) {
      isCorrect = true;
    }
    return isCorrect;
  }
}

export default SimpleMath;
