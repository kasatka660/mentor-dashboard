const xlsx = require('node-xlsx').default;
var _ = require('lodash')

const scoreFile = xlsx.parse(`${__dirname}/data/Mentor_score.xlsx`);
const pairsFile = xlsx.parse(`${__dirname}/data/Mentor-students-pairs.xlsx`);
const tasksFile = xlsx.parse(`${__dirname}/data/Tasks.xlsx`);

const checkGithub = (item => {
  if (item !== undefined) {
    if (item.indexOf('b.com') == -1) {
      return item;
    }
    if (item[item.length-1] == '/') {
      item = item.slice(0, item.length-1);
    }
    item = item.slice(item.indexOf('.com/')+5);
    if (item.indexOf('rolling-scopes-school') !== -1) {
      item = item.slice(item.indexOf('/')+1);
    }
    if (item.indexOf('-2018Q3') !== -1) {
      item = item.slice(0, item.indexOf('-2018Q3'));
    }
    return item.trim().toLowerCase();
  } else {
    return '';
  }
});

const tasksList = tasksFile[0].data.slice(1).map(item => {
  return {
    id: item[0].trim().toLowerCase().replace(/[^a-z0-9]/gi,''),
    task: item[0], 
    status: item[2] 
  }
})

const score = scoreFile[0].data.slice(1).map(item => {
  return {
    student: checkGithub(item[2]),
    mentor: checkGithub(item[1]),
    task: item[3],
    score: item[5]
  }
});

let scoreByStudent = {};
score.map(item => {
  if (item !== undefined) {
    if (!scoreByStudent[item.student]) {
     scoreByStudent[item.student] = [];
    }
    scoreByStudent[item.student].push({
      id:item.task.trim().toLowerCase().replace(/[^a-z0-9]/gi,''), 
      task: item.task, 
      score: item.score
    });
  }
})

let tasksFromScore = [];
Object.keys(scoreByStudent).map(key => {
  scoreByStudent[key].map(item => {
    tasksFromScore.push({
      id: item.id,
      task: item.task
    });
  });
});
const uniqTasksFromScore = _.uniqBy(tasksFromScore, 'id');


uniqTasksFromScore.map(item => {
  if (!tasksList.find(task => task.id == item.id )) {
    tasksList.push(item);
  }
})

let pairsByTask = [];
score.map(item => {
  if (item !== undefined) {
    pairsByTask[item.student] = item.mentor;
  }
})
    
const mentors = [];
pairsFile[1].data.slice(1).map(item => {
  if (item[0] && item[1] !== undefined) {
    const name = item[0] + ' ' + item[1];
    mentors[name] = checkGithub(item[4]);
  } else {
    return '' 
  }
}).filter(Boolean) ;

let pairs = {};
pairsFile[0].data.slice(1).map(item => {
  if (item[0] && item[1] !== undefined) {
    pairs[item[1]] = pairsByTask[item[1]] ?  pairsByTask[item[1]] : mentors[item[0]];
  }
});
let groupsByMentor = _.invertBy(pairs)

const resultObj = {
  pairs: groupsByMentor,
  score: scoreByStudent,
  tasks: tasksList
}

const result = JSON.stringify(resultObj);


var fs = require('fs')
fs.writeFile ("public/input.json", JSON.stringify(resultObj), function(err) {
  if (err) throw err;
    console.log('complete');
});



























