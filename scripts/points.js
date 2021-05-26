const fs = require('fs');
const data = require('../sloupy.json');

const out = data.features.map((item) => item.geometry.coordinates);

fs.writeFileSync('./data/points.json', JSON.stringify(out, null, ''), 'utf8');