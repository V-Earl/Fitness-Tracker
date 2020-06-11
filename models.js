const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const workoutSchema = new Schema({
  exercises: {
    type: {
      type: String,
    },
    name: {
      type: String,
    },
    duration: {
      type: Number,
    },
    distance: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    sets: {
      type: Number,
    },
    reps: {
      type: Number,
    },
  },
  day: {
    type: Date,
  },
});
const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;
