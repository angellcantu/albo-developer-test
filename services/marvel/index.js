'use strict';

const { default: axios } = require('axios');
const crypto = require('crypto');

class Marvel {

    constructor() {
        let secret = `1${process.env.MARVEL_PRIVATE_KEY}${process.env.MARVEL_PUBLIC_KEY}`;
        this.client = axios.create({
            baseURL: 'https://gateway.marvel.com:443/v1',
            timeout: 10000,
            params: {
                ts: 1,
                apikey: process.env.MARVEL_PUBLIC_KEY,
                hash: crypto.createHash('md5').update(secret).digest('hex')
            }
        });
    }

    heroeInformation(name) {
        return this.client.get('/public/characters', {
            params: {
                name: name
            }
        })
        .then(response => response)
        .catch(err => { throw err });
    }

    heroeInformationId(id) {
        return this.client.get(`/public/characters/${id}`)
        .then(response => response)
        .catch(err => { throw err });
    }

    heoreComics(id) {
        return this.client.get(`/public/characters/${id}/comics`)
        .then(response => response)
        .catch(err => { throw err });
    }

    comicsCharacters(id) {
        return this.client.get(`/public/comics/${id}/characters`)
        .then(response => response)
        .catch(err => { throw err });
    }

}

module.exports = Marvel;