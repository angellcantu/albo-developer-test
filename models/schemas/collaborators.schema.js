'use strict';

const { Schema } = require('mongoose');

const schema = new Schema({
    marvel_id: { type: String },
    name: { type: String },
    description: { type: String },
    last_sync: { type: Date },
    editors: [String],
    writers: [String],
    colorists: [String]
}, { timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
} });

module.exports = schema;