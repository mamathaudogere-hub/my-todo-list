const express = require("express");
const router = express.Router();

const Task = require("../models/Task");

router.post("/add", async (req, res) => {

    try {

        const newTask = new Task(req.body);

        await newTask.save();

        res.status(201).json({
            message: "Task Added Successfully",
            task: newTask
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


router.get("/", async (req, res) => {

    try {

        const tasks = await Task.find();

        res.status(200).json(tasks);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


router.put("/complete/:id", async (req, res) => {

    try {

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { completed: true },
            { new: true }
        );

        res.status(200).json(updatedTask);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


router.delete("/delete/:id", async (req, res) => {

    try {

        await Task.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Task Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


module.exports = router;