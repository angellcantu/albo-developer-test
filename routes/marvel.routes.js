'use strict';

const { Router } = require('express');
const router = Router();
const { marvel } = require('../controllers');
const prefix = '/marvel';

router.post(`${prefix}/colaborators/:name`, marvel.colaborators);
router.post(`${prefix}/characters/:name`, marvel.characters);

module.exports = router;