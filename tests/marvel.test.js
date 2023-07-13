'use strict';

const request = require('supertest');
const server = require('../bin/www');

describe('GET Iron Man', () => {
    it('Should get the Iron Man colaborators', async () => {
        let response = await request(server).post('/marvel/colaborators/iron man');
        expect(response.statusCode).toBe(200);
        expect(typeof response.body == 'object').toBe(true);
        expect(response.body).toHaveProperty('last_sync', 'editors', 'writers', 'colorists');
    });

    it('Should get thr Iron Man characters', async () => {
        let response = await request(server).post('/marvel/characters/iron man');
        expect(response.statusCode).toBe(200);
        expect(typeof response.body == 'object').toBe(true);
        expect(response.body).toHaveProperty('last_sync');
        expect(response.body).toHaveProperty('characters');
        expect(Array.isArray(response.body.characters)).toBe(true);
    });
});

describe('GET Hulk', () => {
    it('Should get the Hulk colaborators', async () => {
        let response = await request(server).post('/marvel/colaborators/iron man');
        expect(response.statusCode).toBe(200);
        expect(typeof response.body == 'object').toBe(true);
        expect(response.body).toHaveProperty('last_sync', 'editors', 'writers', 'colorists');
    });

    it('Should get the Hulk characters', async () => {
        let response = await request(server).post('/marvel/characters/hulk');
        expect(response.statusCode).toBe(200);
        expect(typeof response.body == 'object').toBe(true);
        expect(response.body).toHaveProperty('last_sync');
        expect(response.body).toHaveProperty('characters');
        expect(Array.isArray(response.body.characters)).toBe(true);
    });
});

describe('GET Fail', () => {
    it('Should get an error', async () => {
        let response = await request(server).post('/marvel/characters/jose cantu');
        expect(response.statusCode).toBe(404);
        expect(typeof response.body == 'object').toBe(true);
    });
});