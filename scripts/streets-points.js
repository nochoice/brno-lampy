const fs = require('fs');
const data = require('../sloupy.json');
const streets = data.features.reduce((acc, item) => {
    const street = item.properties['název_ulice'].toLowerCase().replace(/ /g, '_');
    if (!acc[street]) acc[street] = [];

    acc[street].push(item.geometry.coordinates)
    return acc
}, {});

Object.keys(streets).forEach(key => {
    fs.writeFileSync('./data/streets/'+ key + '.json', JSON.stringify(streets[key], null, ''), 'utf8');
})

// fs.writeFileSync('./data/streets.json', JSON.stringify(out, null, ''), 'utf8');