'use strict';

const { characters: schema } = require('./schemas');

schema.statics.saveInformation = function(body) {
    return this.findOneAndUpdate(
        { marvel_id: body.marvel_id },
        { $set: body },
        {
            new: true,
            upsert: true
        }
    )
    .then(doc => {
        return {
            last_sync: `Fecha de la ultima actualizacion en: ${doc.last_sync}`,
            characters: doc.characters
        };
    })
    .catch(err => { throw err });
}

schema.statics.updateColaborator = function(marvel_id, colaborator) {
    return this.findOneAndUpdate(
        { marvel_id: marvel_id },
        { $set: {
            colaborator_id: colaborator._id,
            last_sync: new Date()
        } },
        { new: true }
    )
    .then(doc => doc)
    .catch(err => { throw err });
}

module.exports = _mongoose.albo_test_developer.model('characters', schema);