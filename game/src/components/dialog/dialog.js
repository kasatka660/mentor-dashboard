import dialogView from './dialog.template';
import renderQuestionDialog from '../tasks/questionDialog.template';
import QuestionsControl from '../tasks/questionsControl';
import './dialog.scss';
import { KEYS, correctAnswer, wrongAnswer } from '../../variables';


// Keyboard control functions.
const spellPickingOnEnter = (e) => {
  if (e.keyCode === KEYS.ENTER_KEY && $('#pickTheSpell').css('display') === 'block') {
    $('#pickTheSpell').hide();
    $('#spellSelection').modal('show');
  }
};
const leftArrowMove = (e) => {
  if (e.keyCode === KEYS.LEFT_ARROW) {
    const chosenBtn = $('.selected');
    if (chosenBtn.prev().length) {
      chosenBtn.prev().addClass('selected');
      chosenBtn.removeClass('selected');
    }
  }
};
const rightArrowMove = (e) => {
  if (e.keyCode === KEYS.RIGHT_ARROW) {
    const chosenBtn = $('.selected');
    if (chosenBtn.next().length) {
      chosenBtn.next().addClass('selected');
      chosenBtn.removeClass('selected');
    }
  }
};

export default class Dialog {
  constructor() {
    this.targetQuestions = [];
  }

  static renderDialog() {
    $('.middle').append(dialogView);
    $('.middle').append(renderQuestionDialog());
  }

  init(battle) {
    this.battle = battle;
    this.questionsControl = new QuestionsControl(battle);
    Dialog.renderDialog();
    $('#pickTheSpell').on('click', () => {
      $('#pickTheSpell').hide();
      $('#spellSelection').modal('show');
    });
    setTimeout(() => {
      document.body.addEventListener('keydown', spellPickingOnEnter);
    }, 1000);
    $('#spellSelection').on('shown.bs.modal', () => {
      $('#simpleMath').addClass('selected');
    });

    document.body.addEventListener('keydown', rightArrowMove);
    document.body.addEventListener('keydown', leftArrowMove);
    this.toQuestionModeOnEnterBind = this.toQuestionModeOnEnter.bind(this);
    document.body.addEventListener('keydown', this.toQuestionModeOnEnterBind);

    $('.choose-btn').on('click', (e) => {
      const btnId = e.target.attributes.id.value;
      this.toQuestionMode(btnId);
    });

    this.processQuestionAnswerBind = this.processQuestionAnswer.bind(this);
    document.body.addEventListener('keydown', this.processQuestionAnswerBind);
  }

  toQuestionMode(id) {
    $('#spellSelection').modal('hide');
    $('.selected').removeClass('selected');
    this.questionsControl.getQuestionByType(id);
    this.questionsControl.renderQuestion()
      .then(() => {
        this.processAnswer(true);
      },
      () => {
        this.processAnswer(false);
      });
  }

  processAnswer(isCorrect) {
    if (isCorrect) {
      $('#questionForm .modal-content').html(correctAnswer);
    } else {
      $('#questionForm .modal-content').html(wrongAnswer);
    }
    setTimeout(() => {
      $('#questionForm').modal('hide');
      if (!isCorrect) {
        this.battle.hitThePlayer();
      } else {
        this.battle.hitTheMonster();
      }
    }, 1500);
    setTimeout(() => {
      Dialog.nextRound();
    }, 6000);
  }

  static isModalOpen(id) {
    return $(id).hasClass('show');
  }

  static nextRound() {
    $('#pickTheSpell').show();
  }

  endGame() {
    document.body.removeEventListener('keydown', rightArrowMove);
    document.body.removeEventListener('keydown', leftArrowMove);
    document.body.removeEventListener('keydown', this.toQuestionModeOnEnterBind);
    document.body.removeEventListener('keydown', spellPickingOnEnter);
    document.body.removeEventListener('keydown', this.processQuestionAnswerBind);
  }

  processQuestionAnswer(e) {
    if (e.keyCode === KEYS.ENTER_KEY && Dialog.isModalOpen('#questionForm')) {
      this.processAnswer(this.questionsControl.isCorrect());
    }
  }

  toQuestionModeOnEnter(e) {
    if (e.keyCode === KEYS.ENTER_KEY && Dialog.isModalOpen('#spellSelection')) {
      const btnId = $('.selected').attr('id');
      this.toQuestionMode(btnId);
    }
  }
}
