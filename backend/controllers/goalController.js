const asyncHandler = require("express-async-handler");
const Goal = require("../model/goalModel");
//@desc Get goals
//@route GET/api/goals
//acess private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

//@desc post goal
//@route POST/api/goals
//acess private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
  });
  res.status(200).json(goal);
});
//@desc updte goal
//@route PUT/api/goals/:ID
//acess private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

//@desc delete goals
//@route DELETE/api/goals
//acess private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  await goal.deleteOne();
  res.status(200).json({ id: req.params.id });
});
module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
