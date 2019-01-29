export default function createSimpleMathQuestion(simpleMath) {
  return `<div class="modal-header">
            <h5 class="modal-title">${simpleMath.question}</h5>
          </div>
          <div class="modal-body">
            <input type="text" id="answer" class="form-control" placeholder="Answer" aria-label="Answer" required>
          </div>
          <div class="modal-footer">
            <button type="button" id="submit" class="btn btn-submit shadow-none">Submit</button>
          </div>`;
}
