const fs = require('fs-extra');
const data = require('../sloupy.json');

const out = data.features.map((item) => item.geometry.coordinates);

fs.outputFileSync('./data/points.json', JSON.stringify(out, null, ''), 'utf8');