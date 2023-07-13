'use strict';

const { Schema, Types } = require('mongoose');

const characters = new Schema({
    character: { type: String },
    comics: [String]
}, {
    _id: false
});

const schema = new Schema({
    colaborator_id: { type: Types.ObjectId, ref: 'collaborators', required: false },
    marvel_id: { type: String },
    name: { type: String },
    description: { type: String },
    last_sync: { type: Date },
    characters: [characters]
}, { timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
} });

module.exports = schema;