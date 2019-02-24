import * as utils from '../../utils.js';
import {
  githubsToCheck,
  githubsChecked,
  expectedTasksList,
  expectedScoreByStudent,
  expectedUniqTasksFromScore,
  expectedUniqueTasks,
  expectedPairsByTask,
  expectedMentors,
  expectedGroupsByMentor } from './dataForTest.js';
import xlsx from 'node-xlsx';
import path from 'path';

const scoreFile = xlsx.parse(`${__dirname}/test-xmls/Mentor_score.xlsx`);
const pairsFile = xlsx.parse(`${__dirname}/test-xmls/Mentor-students-pairs.xlsx`);
const tasksFile = xlsx.parse(`${__dirname}/test-xmls/Tasks.xlsx`)


test('test function checkGithub: get github name out of link and check it for misspell', () => {
  githubsToCheck.map(	(item, key)  => expect(utils.checkGithub(item)).toBe(githubsChecked[key]));
})

test('test function mapTasksList: get array of objects with tasks info', () => {
  const tasksList = utils.mapTaskList(tasksFile);
  expect(tasksList).toEqual(expectedTasksList);
});

test('test functions: mapScore, getScoreByStudents, getUniqTasksFromScore', () => {
  const score = utils.mapScore(scoreFile);
  const scoreByStudent = utils.getScoreByStudent(score);
  expect(scoreByStudent).toEqual(expectedScoreByStudent);
  const uniqTasksFromScore = utils.getUniqTasksFromScore(scoreByStudent);
  expect(uniqTasksFromScore).toEqual(expectedUniqTasksFromScore);
});

test('test function getAllUniqTasks: get unique tasks from both scoreFile and tasksFile ', () => {
  const score = utils.mapScore(scoreFile);
  const scoreByStudent = utils.getScoreByStudent(score);
  const uniqTasksFromScore = utils.getUniqTasksFromScore(scoreByStudent);
  const tasksList = utils.mapTaskList(tasksFile);
  const allUniqTasks = utils.getAllUniqTasks(uniqTasksFromScore, tasksList);
  expect(allUniqTasks).toEqual(expectedUniqueTasks);
});

test('test function getPairsByTask: get pairs from scoreFile', () => {
  const score = utils.mapScore(scoreFile)
  const pairsByTask = utils.getPairsByTask(score);
  expect(pairsByTask).toEqual(expectedPairsByTask);
});

test('test function getPairsByTask: get pairs from scoreFile', () => {
  const mentors = utils.getMentors(pairsFile);
  expect(mentors.keys()).toEqual(expectedMentors.keys());
});

test('test function getPairsByTask: get pairs from scoreFile', () => {
  const score = utils.mapScore(scoreFile)
  const pairsByTask = utils.getPairsByTask(score);
  const mentors = utils.getMentors(pairsFile);
  const groupsByMentor = utils.getGroupsByMentor(pairsFile, pairsByTask, mentors);
  expect(groupsByMentor).toEqual(expect.arrayContaining(expectedGroupsByMentor));
});





