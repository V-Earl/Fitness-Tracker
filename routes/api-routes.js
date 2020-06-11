const mongoose = require("mongoose");
const model = require("../models");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});
module.exports = (app) => {
  app.post("/api/workouts", ({ body }, res) => {
    body.day = new Date();
    model.Workout.create(body)
      .then((modelRes) => {
        res.json(modelRes);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
  app.get("/api/workouts/range", (req, res) => {
    model.Workout.find({})
      .then((modelRes) => {
        res.json(modelRes);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
  app.get("/api/workouts", (req, res) => {
    model.Workout.find({})
      .then((modelRes) => {
        console.log(modelRes);
        res.json(modelRes);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
  app.get("api/workouts/:id", ({ params }, res) => {
    const id = params.id;
    model.Workout.find(
      { _id: id },
      "name",
      ((modelRes) => {
        console.log(modelRes);
        if (!modelRes)
          return res.status(404).json({ Error: "Error- id not found" });
        res.json(modelRes);
      }).catch((err) => {
        res.status(500).json(err);
      })
    );
  });
  app.put("/api/workouts/:id", ({ params, body }, res) => {
    const id = params.id;
    model.Workout.findByIdAndUpdate(
      id,
      { $push: { exercises: body } },
      {},
      (err, modelRes) => {
        if (!modelRes)
          return res.status(404).json({ Error: "Error- id not found" });
        if (err)
          return res
            .status(500)
            .json({ Error: "Oops something went wrong..." });
        res.json(modelRes);
      }
    );
  });
};
