const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: ["initialize", "in_progress", "completed", "cancelled"],
      default: "initialize"
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    dueDate: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);