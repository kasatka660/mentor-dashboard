import _ from 'lodash'

export const checkGithub = (item => {
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

export const mapTaskList = (tasksFile) => {
  return tasksFile[0].data.slice(1).map(item => {
    return {
      id: item[0].trim().toLowerCase().replace(/[^a-z0-9]/gi,''),
      task: item[0], 
      status: item[2] 
    }
  })
}

export const mapScore = (scoreFile) => {
  return scoreFile[0].data.slice(1).map(item => {
    return {
      student: checkGithub(item[2]),
      mentor: checkGithub(item[1]),
      task: item[3],
      score: item[5]
    }
  }).filter(Boolean);
}

export const getScoreByStudent = (score) => {
  let scoreByStudent = {};
  score.map(item => {
    if (item.task !== undefined) {
      if (!scoreByStudent[item.student]) {
       scoreByStudent[item.student] = [];
      }
      scoreByStudent[item.student].push({
        id:item.task.trim().toLowerCase().replace(/[^a-z0-9]/gi,''), 
        task: item.task, 
        score: item.score
      });
    }
  });
  return scoreByStudent;  
}

export const getUniqTasksFromScore = (scoreByStudent) => {
  let tasksFromScore = [];
  Object.keys(scoreByStudent).map(key => {
    scoreByStudent[key].map(item => {
      tasksFromScore.push({
        id: item.id,
        task: item.task
      });
    });
  });
  return _.uniqBy(tasksFromScore, 'id');
}

export const getAllUniqTasks = (uniqTasksFromScore, tasksList) => {
  uniqTasksFromScore.map(item => {
    if (!tasksList.find(task => task.id == item.id )) {
      tasksList.push(item);
    }
  });
  return tasksList;
}

export const getPairsByTask = (score) => {
  let pairsByTask = {};
  score.map(item => {
    if (item !== undefined && item.student.length>0) {
      pairsByTask[item.student] = item.mentor;
    }
  }).filter(Boolean);
  return pairsByTask;
}

export const getMentors = (pairsFile) =>  {
  const mentors = [];
  pairsFile[1].data.slice(1).map(item => {
    if (item[0] && item[1] !== undefined) {
      const name = item[0] + ' ' + item[1];
      mentors[name] = checkGithub(item[4]);
    } else {
      return '' 
    }
  }).filter(Boolean);
  return mentors;
}

export const getGroupsByMentor = (pairsFile, pairsByTask, mentors) => {
  let pairs = {};
  pairsFile[0].data.slice(1).map(item => {
    if (item[0] && item[1] !== undefined) {
      pairs[item[1]] = pairsByTask[item[1]] ?  pairsByTask[item[1]] : mentors[item[0]];
    }
  });
  return _.invertBy(pairs);
}









