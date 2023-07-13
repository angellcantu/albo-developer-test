'use strict';

const { collaborators, characters } = require('../models');
const { marvel } = require('../services');
const Promise = require('bluebird');

class MarvelController {

    async collaborators(req, res, next) {
        let { name } = req.params;
        let information = await marvel.heroeInformation(name);
        if (!information.data.data.results.length) {
            throw new NotFoundError('No results found');
        }
        let creators = await marvel.heoreComics(information.data.data.results[0].id);
        return collaborators.saveInformation({ name, information, creators })
        .then(doc => res.json(doc))
        .catch(err => next(err));
    }

    async characters(req, res, next) {
        let { name } = req.params, to_save = {};
        let _character = await collaborators.findOne({ name: new RegExp(name, 'i') });
        
        let information = await marvel.heoreComics(_character.marvel_id);
        let _characters = await Promise.map(information.data.data.results, async item => {
            let comic = await marvel.comicsCharacters(item.id), character = {};
            comic.data.data.results.forEach(result => {
                let _comics = result.comics.items.map(comic => comic.name);
                character.character = result.name;
                character.comics = _comics;
            });
            return character;
        });
        
        to_save.colaborator_id = _character._id;
        to_save.last_sync = new Date();
        to_save.characters = _characters;

        return characters.saveInformation(to_save)
        .then(doc => res.json(doc))
        .catch(err => next(err));
    }

}

module.exports = new MarvelController();