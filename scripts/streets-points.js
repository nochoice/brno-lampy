const fs = require('fs-extra');
const data = require('../sloupy.json');
const { streetNameConvert } = require('../common/utils.js');

const streets = data.features.reduce((acc, item) => {
    const street = streetNameConvert(item.properties['název_ulice']);
    if (!acc[street]) acc[street] = [];

    acc[street].push(item.geometry.coordinates)
    return acc
}, {});

Object.keys(streets).forEach(key => {
    fs.outputFileSync('./data/streets/'+ key + '.json', JSON.stringify(streets[key], null, ''), 'utf8');
});
