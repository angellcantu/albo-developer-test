'use strict';

const { collaborators, characters } = require('../models');
const { marvel } = require('../services');
const Promise = require('bluebird');

class MarvelController {

    async collaborators(req, res, next) {
        try {
			let { name } = req.params;
			let information = await marvel.heroeInformation(name);
			if (!information.data.data.results.length) {
				throw new NotFoundError(`No results found with: ${name}`);
			}
			let creators = await marvel.heoreComics(information.data.data.results[0].id);
			return collaborators.saveInformation({ information, creators })
			.then(doc => res.json(doc))
			.catch(err => { throw err; });
		} catch(err) {
			next(err);
		}
    }

    async characters(req, res, next) {
       try {
			let { name } = req.params, to_save = {};
			let information = await marvel.heroeInformation(name);
			
			if (!information.data.data.results.length) {
				throw new NotFoundError(`No results found with: ${name}`);
			}

			let [_information] = information.data.data.results;
			let comics = await marvel.heoreComics(_information.id)
			let _characters = await Promise.map(comics.data.data.results, async item => {
				let comic = await marvel.comicsCharacters(item.id), character = {};
				comic.data.data.results.forEach(result => {
					let _comics = result.comics.items.map(comic => comic.name);
					character.character = result.name;
					character.comics = _comics;
				});
				return character;
			});
			
			to_save.marvel_id = _information.id;
			to_save.name = _information.name;
			to_save.description = _information.description;
			to_save.last_sync = new Date();
			to_save.characters = _characters;

			return characters.saveInformation(to_save)
			.then(doc => {
				collaborators.findOne({ name: new RegExp(name, 'i') })
				.then(_doc => {
					if (_doc) {
						characters.updateColaborator(_information.id, _doc);
					}
				});
				return res.json(doc);
			})
			.catch(err => { throw err; });
       } catch(err) {
		  	next(err);
       }
    }

}

module.exports = new MarvelController();