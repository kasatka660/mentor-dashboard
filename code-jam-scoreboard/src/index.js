// Adding Lodash, JQuery & Chart libs.
import _ from 'lodash';
import Chart from 'chart.js';

// Importing dumps.
import users from '../data/users.json';
import sessions from '../data/sessions.json';

const $ = require('jquery');


// ACreating and appending table to body.
const table = `<table class="table table-striped">
<thead class="thead-dark">
  <tr>
    <th class="fixed">GitHub name</th>
    <th class="fixed">Total Time</th>
    <th class="fixed">Comparison</th>
  </tr>
</thead>
<tbody>    
</tbody>
</table> `;

$('main').append(table);

// Active session number.
let activeSession = 33;
let myChart;

// Getting puzzles names.
let puzzleNames = sessions[activeSession].puzzles.map((puzzle) => {
  $('thead tr th:first-child').after(`<th>${puzzle.name}</th>`);
  return puzzle.name;
});

// Rendering user results to the webpage.
function renderUser(user, userStats) {
  let result = ` <tr>
<td>${user.displayName}</td>`;
  let totalTime = 0;
  userStats.map((userRoundResult) => {
    if (userRoundResult === undefined) {
      result += '<td data-toggle="tooltip" data-placement="top" title="No answer">150</td>';
      totalTime += 150;
    } else {
      result += `<td data-toggle="tooltip" data-placement="top" title="${userRoundResult.code}"> ${userRoundResult.time.$numberLong}</td>`;
      totalTime += parseInt(userRoundResult.time.$numberLong, 10);
    }
    return userRoundResult;
  });
  result += `<td><strong>${totalTime}</strong></td>`;
  result += `<td><input type="checkbox" data-uid=${user.uid}></td>`;
  result += '</tr>';
  return result;
}

function insertUser(user) {
  const userStats = sessions[activeSession].rounds.map(round => round.solutions[user.uid]);
  if (userStats.length > 0) {
    $('tbody').append(renderUser(user, userStats));
  }
}
// Creating new color for new line.
function createNewColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Adding user's line to chart.
function addData(chart, label, data, uid) {
  const color = createNewColor();
  const dataset = {
    label,
    data,
    uid,
    fill: false,
    backgroundColor: color,
    borderColor: color,
    borderWidth: 2,
  };
  chart.data.datasets.push(dataset);
  chart.update();
  if (chart.data.datasets.length >= 10) {
    $('[type ="checkbox"]:not(:checked)').attr('disabled', 'disabled');
  }
}

// Getting statistics for every user.
function getUserStats(id) {
  const time = [];
  sessions[activeSession].rounds.map((round) => {
    if (round.solutions[id]) {
      time.push(round.solutions[id].time.$numberLong);
    } else {
      time.push(150);
    }
    return round;
  });
  return time;
}


// Removing user's line from chart.
function removeData(chart, uid) {
  const position = chart.data.datasets.findIndex(item => item.uid === uid);
  if (position >= 0) {
    chart.data.datasets.splice(position, 1);
    chart.update();
    if (chart.data.datasets.length < 10) {
      $('[type="checkbox"]').removeAttr('disabled');
    }
  }
}

function renderAllUsers() {
  users.map(item => insertUser(item));
  // Handling checkboxes.
  $('[type ="checkbox"]').change(function checkingCheckbox() {
    const uid = $(this).attr('data-uid');
    if (this.checked) {
      if (myChart.data.datasets.length < 10) {
        const currentUser = _.find(users, user => user.uid === uid);
        addData(myChart, currentUser.displayName, getUserStats(uid), uid);
      }
    } else {
      removeData(myChart, uid);
    }
  });
}

/* global document */
// Creating chart.
function createChart() {
  const ctx = document.getElementById('myChart').getContext('2d');
  const newChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: puzzleNames,
      datasets: [],
    },
    options: {
      title: {
        display: true,
        text: 'Results Comparison',
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    },
  });
  return newChart;
}

$('input[type=radio][name=session]').change(function sessionChange() {
  activeSession = this.value;
  $('thead tr th:not(.fixed)').remove();
  $('tbody tr').remove();
  renderAllUsers();
  puzzleNames = sessions[activeSession].puzzles.map((puzzle) => {
    $('thead tr th:first-child').after(`<th>${puzzle.name}</th>`);
    return puzzle.name;
  });
  myChart = createChart();
});

renderAllUsers();
myChart = createChart();
