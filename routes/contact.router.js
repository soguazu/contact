const express = require('express');

const contactController = require('../controllers/contact.controller');


const router = express.Router();

router.get('/', contactController.getAllContact);
router.get('/:id', contactController.getOneContact);
router.post('/', contactController.createContact);
router.delete('/:id', contactController.deleteContact);
router.put('/:id', contactController.updateContact);

module.exports = router;
