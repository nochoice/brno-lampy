const fs = require('fs-extra');
const data = require('../sloupy.json');


const out = data.features.reduce((acc, item, index) =>  ({...acc, [index]: item.properties.objectid }), {});

fs.outputFileSync('./data/points/index-to-id.json', JSON.stringify(out, null, ''), 'utf8');


