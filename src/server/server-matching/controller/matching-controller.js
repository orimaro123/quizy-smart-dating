const matchingManager = require("../services/matching-manager");
const { ErrorIfNaN, ErrorIfNotFound } = require("../../common-errors");

async function getAllPersonalAnswers(req, res) {
  let personalAnswers = await matchingManager.getAllPersonalAnswers();
  if (!personalAnswers) personalAnswers = [];
  res.status(200).json(personalAnswers);
}

async function getUserPersonalAnswers(req, res) {
  let userId = Number.parseInt(req.params.id);
  ErrorIfNaN(userId);
  const userPersonalAnswers = await matchingManager.getUserPersonalAnswers(userId);
  ErrorIfNotFound(userPersonalAnswers);
  res.status(200).json(userPersonalAnswers);
}

async function getAllTriviaAnswers(req, res) {
  let triviaAnswers = await matchingManager.getAllTriviaAnswers();
  if (!triviaAnswers) triviaAnswers = [];
  res.status(200).json(triviaAnswers);
}

async function getUserTriviaAnswers(req, res) {
  let userId = Number.parseInt(req.params.id);
  ErrorIfNaN(userId);
  const userTriviaAnswers = await matchingManager.getUserTriviaAnswers(userId);
  ErrorIfNotFound(userTriviaAnswers)
  res.status(200).json(userTriviaAnswers);
}

async function getUserAchievements(req, res) {
  let userId = Number.parseInt(req.params.id);
  ErrorIfNaN(userId);
  const userAchievements = await matchingManager.getUserAchievements(userId);
  ErrorIfNotFound(userAchievements)
  res.status(200).json(userAchievements);
}

async function getAllDistances(req, res) {
  let distances = await matchingManager.getAllDistances();
  if (!distances) distances = [];
  res.status(200).json(distances);
}

async function getUserDistances(req, res) {
  let userId = Number.parseInt(req.params.id);
  ErrorIfNaN(userId);
  const userDistances = await matchingManager.getUserDistances(userId);
  ErrorIfNotFound(userDistances);
  res.status(200).json(userDistances);
}

async function getSuggestionsForUser(req, res) {
  let userId = Number.parseInt(req.params.id);
  ErrorIfNaN(userId);
  const suggestions = await matchingManager.getSuggestionsForUser(userId);
  ErrorIfNotFound(suggestions);
  res.status(200).json(suggestions);
}

async function postUserDistances(req, res) {
  let userId = Number.parseInt(req.params.id);
  ErrorIfNaN(userId);
  const userDistances = await matchingManager.postUserDistances(userId);
  ErrorIfNotFound(userDistances);
  res.status(200).json(userDistances);
}

async function postAllUsersDistances(req, res) {
  const userDistances = await matchingManager.postAllUsersDistances();
  ErrorIfNotFound(userDistances);
  res.status(200).json(userDistances);
}

module.exports = {
  getAllPersonalAnswers,
  getUserPersonalAnswers,
  getAllTriviaAnswers,
  getUserTriviaAnswers,
  getUserAchievements,
  getAllDistances,
  getUserDistances,
  postUserDistances,
  postAllUsersDistances,
  getSuggestionsForUser,
};
