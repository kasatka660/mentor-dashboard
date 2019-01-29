import SimpleMathQuestion from './simpleMath/simpleMath';
import TranslationQuestion from './translation/translation';
import DragAndDropQuestion from './dragAndDrop/dragAndDrop';

export default class QuestionsControl {
  getQuestionByType(questionType) {
    switch (questionType) {
      case 'simpleMath':
        this.question = new SimpleMathQuestion();
        break;
      case 'translation':
        this.question = new TranslationQuestion();
        break;
      case 'dragAndDrop':
        this.question = new DragAndDropQuestion();
        break;
      default:
        break;
    }
  }

  isCorrect() {
    return this.question.checkIfCorrect();
  }

  renderQuestion() {
    return new Promise((resolve, reject) => {
      this.question.render();
      const submitBtn = $('#submit');
      submitBtn.on('click', () => {
        if (this.question.checkIfCorrect()) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }
}
