const fs = require('fs-extra');
const { POINTS_DETAIL_CHUNK_SIZE } = require('../common/const');
const data = require('../sloupy.json');

let i,j,temparray,chunk = POINTS_DETAIL_CHUNK_SIZE;
for (i=0,j=data.features.length; i<j; i+=chunk) {
    temparray = data.features.slice(i,i+chunk);
    fs.outputFileSync('./data/points-details/' + i + '.json', JSON.stringify(temparray, null, ''), 'utf8');
}

// data.features.forEach((item) => {
//     fs.outputFileSync('./data/points-details/' + item.properties.objectid + '.json', JSON.stringify(item, null, ''), 'utf8');
// });
