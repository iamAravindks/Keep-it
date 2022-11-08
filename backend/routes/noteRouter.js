import express from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { isAuth } from "../middlewares/authMiddleware.js";
import Notes from "../models/noteModel.js";

const noteRouter = express.Router();

// @desc get all notes of a user
// @route GET /api/notes/
// @access PRIVATE

noteRouter.get(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const allNotes = await Notes.findOne({ user: req.user._id });
      if (!allNotes) {
        res.json({
          message: "No notes found",
          data: [],
        });
      } else
        res.json({
          data: allNotes.notes,
        });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

// @desc create a new note
// @route POST /api/notes/new-note
// @access PRIVATE

noteRouter.post(
  "/new-note",
  isAuth,

  expressAsyncHandler(async (req, res) => {
    try {
      const newNote = {
        title: req.body.title || "",
        content: req.body.content,
      };

      if (!req.body.content) throw new Error("Content must be specified");

      const allNotes = await Notes.findOne({ user: req.user._id });

      if (!allNotes) {
        const createNotes = await Notes.create({
          user: mongoose.Types.ObjectId(req.user.id),
          notes: [newNote],
        });
        res.status(201).json({
          data: createNotes.notes,
        });
      } else {
        allNotes.notes.push(newNote);
        const updatedNotes = await allNotes.save();
        res.status(201).json({
          data: updatedNotes.notes,
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  })
);

// @desc update a single note
// @route PUT /api/notes/notes/:id

// @access Private

noteRouter.put(
  "/note/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try
    {
      console.log(req.body)
      const existedNote = await Notes.find(
        {
          user: req.user._id,
          "notes._id": req.params.id,
        },
        {
          "notes.$": 1,
        }
      );

      if (!existedNote) {
        res.json({
          message: "No note found",
          data: [],
        });
      }

      const updatedNotes = await Notes.updateOne(
        {
          user: req.user._id,
          "notes._id": req.params.id,
        },
        {
          $set: {
            "notes.$.title": req.body.title || existedNote[0].notes.title,
            "notes.$.content": req.body.content || existedNote[0].notes.content,
            "notes.$.archive": req.body.archive || existedNote[0].notes.archive,
          },
        },
        { new: true }
      );

      const notes = await Notes.findOne({ user: req.user._id });

      if (updatedNotes) {
        res.json({
          data: notes.notes,
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  })
);

// @desc delete a note by id
// @route DELETE /api/notes/del-note/:id
// @access Private

noteRouter.delete(
  "/del-note/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const checkNotesExists = await Notes.findOne({
        user: mongoose.Types.ObjectId(req.user._id),
      });

      if (checkNotesExists && checkNotesExists.notes) {
        const deletedNotes = await Notes.findOneAndUpdate(
          {
            user: mongoose.Types.ObjectId(req.user._id),
          },
          {
            $pull: {
              notes: { _id: mongoose.Types.ObjectId(req.params.id) },
            },
          },
          { new: true }
        );

        res.json({
          data: deletedNotes.notes,
        });
      } else {
        res.status(404).json({
          message: "No Note found",
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  })
);

export default noteRouter;
