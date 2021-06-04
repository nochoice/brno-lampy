

const loadPoints = async () => await fetch('/data/points/by-index/points.json').then(resp => resp.json());

const getPointDetail = async (id) => {
    const set = Math.floor(id/300) * 300;
    const position = id - set;
    return await fetch(`/data/points/by-index/details/${set}.json`)
                        .then(resp => resp.json())
                        .then(data => data[position])
}

const getStreetPoints = async (street) => {
    const streetConvert = street.toLowerCase().replace(/ /g, '_');

    return await fetch(`/data/streets/${streetConvert}.json`)
                        .then(resp => resp.json())
}

module.exports = {
    loadPoints,
    getPointDetail,
    getStreetPoints
}