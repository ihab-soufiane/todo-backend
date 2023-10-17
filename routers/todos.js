const router = require('express').Router();
const mongoose = require('mongoose');
const {
    Todos,
    validateTodo
} = require('../models/todo');
const _ = require('lodash');
const asyncHandler = require("express-async-handler");
var ObjectId = require('mongoose').Types.ObjectId;
/**
 * @desc Ajoute todo
 * @route api/todos/ajouter
 * @method post
 */
router.post('/ajouter', asyncHandler(
        async(req, res) => {

            let todo = new Todos(req.body);
            result = await todo.save();
            res.status(201).send(result);

        }))
    /**
     * @desc Get ZAll todo
     * @route api/todos/lister
     * @method get
     */

router.get('/lister', asyncHandler(
        async(req, res) => {
            let listtodos = await Todos.find();
            res.status(200).json(listtodos)

        }
    ))
    /**
     * @desc Get  todo by ID
     * @route api/todos/id/:id
     * @method get
     */
router.get('/id/:id', asyncHandler(
        async(req, res) => {

            let todo = await Todos.findById(req.params.id);
            if (todo) {
                res.status(200).send(todo);
            } else {
                return res.status(404).send('todo is not found');
            }

        }
    ))
    /**
     * @desc update todo
     * @route api/todos/modifier/:id
     * @method put
     */
router.put('/modifier/:id', asyncHandler(
        async(req, res) => {

            let todo = await Todos.findById(req.params.id);
            if (!todo)
                return res.status(404).send('todo is not found')
            todo = _.merge(todo, req.body);
            await todo.save();
            res.status(200).send(todo);
        }))
    /**
     * @desc delette  todo by id
     * @route api/todos//supprimer/:id
     * @method get
     */
router.delete('/supprimer/:id', asyncHandler(
    async(req, res) => {

        const todo = await Todos.findById(req.params.id);
        if (todo) {
            await Todos.findByIdAndDelete(req.params.id)
            res.status(200).json({ "message": "todo supprime avec succes" })
        } else {
            res.status(404).json({ "message": "todo not found" })
        }
    }
))


module.exports = router;