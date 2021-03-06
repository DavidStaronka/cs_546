const express = require('express');
const router = express.Router();
const data = require('../data');
const people = data.people;

router.get('/:id', async (req, res) => {
    try {
        const person = await people.getPersonById(req.params.id);
        res.json(person);
    } catch (e) {
        res.status(404).json({ message: e });
    }
});
  
router.get('/', async (req, res) => {
    try {
        const peopleList = await people.getPeople();
        res.json(peopleList);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;