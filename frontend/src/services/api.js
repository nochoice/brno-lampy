const loadPoints = async () => await fetch('/data/points/by-index/points.json').then(resp => resp.json());

const getPointDetail = async (id) => {
    const set = Math.floor(id/300) * 300;
    const position = id - set;
    return await fetch(`/data/points/by-index/details/${set}.json`)
                        .then(resp => resp.json())
                        .then(data => data[position])
}

module.exports = {
    loadPoints,
    getPointDetail
}