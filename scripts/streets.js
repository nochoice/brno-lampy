const fs = require('fs-extra');
const data = require('../sloupy.json');
const streets = data.features.map((item) => item.properties['název_ulice']);

const out = [...new Set(streets)]
                .sort( (a, b) => a.localeCompare(b));

fs.outputFileSync('./data/streets.json', JSON.stringify(out, null, ''), 'utf8');