const fs = require('fs-extra');
const data = require('../sloupy.json');

const out = data.features.reduce((acc, item, index) =>  ({...acc, [index]: item.geometry.coordinates }), {});

fs.outputFileSync('./data/points.json', JSON.stringify(out, null, ''), 'utf8');