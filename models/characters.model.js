'use strict';

const { characters: schema } = require('./schemas');

schema.statics.saveInformation = function(body) {
    return this.findOneAndUpdate(
        { colaborator_id: body.colaborator_id },
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

module.exports = _mongoose.albo_test_developer.model('characters', schema);