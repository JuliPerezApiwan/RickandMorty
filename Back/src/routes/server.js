/*const https = require('http');
const getCharById = require('../controllers/getCharById')
const getCharDetail = require('../controllers/getCharDetail')



https.createServer((req,res) => {
    res.setHeader('Access-Control-Allow-Origin', '*') // permite hacerles peticiones al servidor
    let id = req.url.split('/').at(-1);
    if(req.url.includes('onsearch')) {
        getCharById(res, id)
    }

    if(req.url.includes('detail')) {
        getCharDetail(res, id)
    }
   
}).listen(3001, 'localhost')*/

const express = require('express')
const app = express();
const axios = require('axios');
const cors = require('cors');

app.use(cors());
app.use(express.json()); // middelwear 

app.get('/rickandmorty/character/:id', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*') 
    const { id } = req.params;
    try {
        const response = await axios (`https://rickandmortyapi.com/api/character/${id}`)
        const data = response.data

        const dataChar = {
            id: data.id,
            name: data.name,
            species: data.species,
            gender: data.gender,
            image: data.image,
        }
        res.status(200).json(dataChar)
    } catch (error) {
        res.status(404).send({error: error.message})
    }
})

app.get('/rickandmorty/detail/:detaildId', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*') 
    const { detailId } = req.params;
    try {
        const response = (await axios(`https://rickandmortyapi.com/api/character/${detailId}`)).data;
        const dataCharDetail = {
            name: response.name,
            species: response.species,
            gender: response.gender,
            origin: response.origin.name,
            image: response.image,
        }
        res.status(200).json(dataCharDetail)
    } catch (error) {
        res.status(404).send({error: error.message})
    }
})

let fav = [];

app.get('/rickandmorty/fav' , (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*') 
    res.status(200).json(fav);
});

app.post('/rickandmorty/fav' , (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*') 
    fav.push(req.body);
    res.status(200).send('Los personajes se guardaron correctamente')
});

app.delete('/rickandmorty/fav/:id' , (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*') 
    const { id } = req.params;
    const favFilter = fav.filter((c) => c.id !== Number(id));
    fav = favFilter;

    res.status(200).json(fav)
})


module.exports = app;