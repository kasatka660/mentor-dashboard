export default function createDragAndDropQuestion(dragDrop) {
  return `<div class="modal-header">
            <h5 class="modal-title">${dragDrop.title}</h5>
          </div>
            <div class="modal-body">
              <ul id="sortable">
                 ${dragDrop.question.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            <div class="modal-footer">
              <button type="button" id="submit" class="btn btn-submit shadow-none">Submit</button>
            </div>`;
}
