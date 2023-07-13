'use strict';

const { Router } = require('express');
const router = Router();
const { marvel } = require('../controllers');
const prefix = '/marvel';

router.post(`${prefix}/colaborators/:name`, marvel.collaborators);
router.post(`${prefix}/characters/:name`, marvel.characters);

module.exports = router;