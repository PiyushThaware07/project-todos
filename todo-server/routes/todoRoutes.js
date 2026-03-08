const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

/* BULK INSERT TODOS */
router.post("/bulk", async (req, res) => {
  try {
    const todos = await Todo.insertMany(req.body);
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* CREATE TODO */
router.post("/", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    const saved = await todo.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET ALL TODOS */
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

/* GET SINGLE TODO */
router.get("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.json(todo);
});

/* UPDATE TODO */
router.put("/:id", async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

/* DELETE TODO */
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

module.exports = router;