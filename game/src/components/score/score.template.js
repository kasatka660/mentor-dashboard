export const scoreTable = `
  <table class="table table-dark">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Score</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>`;

export function createTableRow(player) {
  return ` 
    <tr>
      <td>${player.name}</td>
      <td>${player.score}</td>
    </tr>`;
}
