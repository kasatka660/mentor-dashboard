export const startGameBtn = `<button type="button" class="btn btn-primary start-game-btn shadow-none" data-toggle="modal" data-target="#loginForm">
    Start Game
  </button>`;

export const loginForm = `<div class="modal fade" id="loginForm" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">  
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Log in</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
          <div class="modal-body">
            <input type="text" id="usernameInput" class="form-control" placeholder="Username" aria-label="Username" required autofocus>
          </div>
          <div class="modal-footer">
            <button type="button" id="submit" class="btn btn-submit shadow-none">Submit</button>
          </div>
        </div>
    </div>
  </div>`;
