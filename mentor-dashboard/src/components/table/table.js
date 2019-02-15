import React from 'react';
import './table.css';

const Table = (props) => {
  if (props.selectedMentor) {
    const mentor = props.selectedMentor;
    const json = props.json;
    const students = json.pairs[mentor];
    const tasks = json.tasks;
    const score = json.score;
    console.log(score)
    const studentNames = students.map(student => {
      return (
        <th scope="col">{student}</th>
      )
    });
    const scoreForTasks = tasks.map(task => {
      const allStudentScore = students.map((student, key) => {
        if (score[student]) {
          const studentScore = score[student].find(item => {
            return item.id == task.id;
          });
          if (studentScore) {
            return <td className="checked" key={key}>{studentScore.score}</td>
          }
        }
        return <td className={getClassNameByStatus(task.status)}></td>
      })
      return (
        <tr><th scope="row">{task.task}</th>{allStudentScore}</tr>
      )
    })
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col" className="empty"></th>
            {studentNames}
          </tr>
        </thead>
        <tbody>
        {scoreForTasks}
        </tbody>
      </table>
    );
  } else {
    return '';
  }
}

export default Table;

const getClassNameByStatus = (status) => {
  switch (status) {
    case 'Checked': {
      return 'no-result';
      break;
    }
    case 'Checking': {
      return 'checking';
      break;
    }
    case 'ToDo': {
      return 'to-do';
      break;
    } 
    case 'In Progress': {
      return 'in-progress';
      break;
    }
    default:
       return 'no-result';
  }
}
