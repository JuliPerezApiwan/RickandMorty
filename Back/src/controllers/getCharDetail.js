const axios = require('axios');

const getCharDetail = (res, id) => {
    axios(`https://rickandmortyapi.com/api/character/${id}`)
    .then(response => response.data) // me da la respuesta de la api
    .then(data => {
        let character = {
            id : data.id,
            name : data.name,
            image : data.image,
            gender : data.gender,
            species : data.species,
            status : data.status,
            origin : data.name.origin,
        }
        res.writeHead(200, { 'Content-type' : 'application/json'}).end(JSON.stringify(character))
    })
    .catch(err => res.writeHead(500, { 'Content-type' : 'text/plain'}).end('Error'))
}


module.exports = { getCharDetail };