const fs = require('fs-extra');
const { POINTS_DETAIL_CHUNK_SIZE } = require('../common/const');
const data = require('../sloupy.json');

let i,j,temparray,chunk = POINTS_DETAIL_CHUNK_SIZE;

for (i=0,j=data.features.length; i<j; i+=chunk) {
    temparray = data.features.slice(i,i+chunk);

    temparray.forEach((item, index) => item.properties.position = i + index);
    fs.outputFileSync('./data/points/by-index/details/' + i + '.json', JSON.stringify(temparray, null, ''), 'utf8');
}
