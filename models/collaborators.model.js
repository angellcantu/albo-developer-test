'use strict';

const { collaborators: schema } = require('./schemas');

schema.statics.saveInformation = function({ name, information, creators }) {
    let to_save = {
        last_sync: new Date(),
        editors: [],
        writers: [],
        colorists: []
    };
    let [result] = information.data.data.results;

    to_save.marvel_id = result.id;
    to_save.name = result.name;
    to_save.description = result.description;

    creators.data.data.results.forEach(item => {
        item.creators.items.forEach(creator => {
            let { role, name } = creator;
            let _role = `${role}s`;

            if (['editor', 'writer', 'colorist'].includes(role) && !to_save[_role].includes(name)) {
                to_save[_role].push(name);
            }
        });
    });

    return this.findOneAndUpdate(
        { name: result.name },
        { $set: to_save },
        {
            new: true,
            upsert: true
        }
    )
    .then(doc => {
        return {
            last_sync: `Fecha de la ultima actualizacion en: ${doc.last_sync}`,
            editors: doc.editors,
            writers: doc.writers,
            colorists: doc.colorists
        }
    })
    .catch(err => { throw err });
}

module.exports = _mongoose.albo_test_developer.model('collaborators', schema);