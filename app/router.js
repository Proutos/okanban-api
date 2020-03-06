const express = require('express');

const ListController = require('./controllers/ListController');
const CardController = require('./controllers/CardController');
const TagController = require('./controllers/TagController');

const router = express.Router();


/* actions de List */
router.get('/lists', ListController.getAllLists);
router.get('/lists/:id', ListController.getList);
router.post('/lists', ListController.createList);
router.patch('/lists/:id', ListController.editList);
router.put('/lists/:id', ListController.upsertList);
router.delete('/lists/:id', ListController.deleteList);

/* actions de Card */
router.get('/lists/:id/cards', CardController.getCardsByList);
router.get('/cards/:id', CardController.getCard);
router.post('/cards', CardController.createCard);
router.patch('/cards/:id', CardController.editCard);

/* actions de Tag */
router.post('/cards/:id/tags', TagController.associateTagToCard);
router.delete('/cards/:card_id/tags/:tag_id', TagController.deleteTagFromCard);

module.exports = router;