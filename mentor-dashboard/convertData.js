import * as utils from './utils'
import xlsx from 'node-xlsx';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const scoreFile = xlsx.parse(`${__dirname}/data/Mentor_score.xlsx`);
const pairsFile = xlsx.parse(`${__dirname}/data/Mentor-students-pairs.xlsx`);
const tasksFile = xlsx.parse(`${__dirname}/data/Tasks.xlsx`);

const tasksList = utils.mapTaskList(tasksFile);
const score = utils.mapScore(scoreFile);
const scoreByStudent = utils.getScoreByStudent(score);
const uniqTasksFromScore = utils.getUniqTasksFromScore(scoreByStudent);
const allUniqTasks = utils.getAllUniqTasks(uniqTasksFromScore, tasksList);
const pairsByTask = utils.getPairsByTask(score);
const mentors = utils.getMentors(pairsFile);
const groupsByMentor = utils.getGroupsByMentor(pairsFile, pairsByTask, mentors);

const resultObj = {
  pairs: groupsByMentor,
  score: scoreByStudent,
  tasks: allUniqTasks
}
const result = JSON.stringify(resultObj);

fs.writeFile("public/input.json", JSON.stringify(resultObj), function(err) {
  if (err) throw err;
    console.log('complete');
});




























