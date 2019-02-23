import React from 'react';
import './note.css';

const Note = () => {
  return (
    <div className="container note-container">
      <table className="table">
        <tbody>
          <tr>
            <th scope="row" className="checked"></th>
            <td>Task is checked by mentor. See the score.</td>
          </tr>
          <tr>
            <th scope="row" className="to-do"></th>
            <td>Task is in the ToDo state.</td>
          </tr>
          <tr>
            <th scope="row" className="in-progress"></th>
            <td>Student is working on the task now.</td>
          </tr>
           <tr>
            <th scope="row" className="checking"></th>
            <td>Task needs to be checked.</td>
          </tr>
           <tr>
            <th scope="row" className="no-result"></th>
            <td>Time for checking is over. No result.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


export default Note;