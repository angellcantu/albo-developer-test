'use strict';

module.exports = (_req, res, next) => {
    let _json = res.json;
    res.json = data => {
        let replaces = [
            [/"\_id"/g, '"id"'],
            [/,"\_\_v"\:("[\w]+"|[0-9])/g, '']
        ];
        data = JSON.stringify(data);
        replaces.forEach(attr => {
            data = data.replace(attr[0], attr[1]);
        });
        return _json.call(res, JSON.parse(data));
    };
    return next();
};