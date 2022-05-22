const req = require('express/lib/request');
const data = require('./db.json');

const houseId = 4;


const getHouses = (req, res) => {
    res.status(200).send(data);
}

const deleteHouse = (req, res) => {
    let index = data.findIndex(el => {
        if (el.id === +req.params.id) {
            return true;
        }
    })
    data.splice(index, 1);
    res.status(200).send(data);
}

const createHouse = (req, res) => {
    let { address, price, imageURL } = req.body;
    let newHouse = {
        id: houseId,
        address,
        price,
        imageURL,
    }
    data.push(newHouse);
    res.status(200).send(data);
    houseId++;
}

const updateHouse = (req, res) => {
    let { id } = req.params;
    let { type } = req.body;
    let index = data.findIndex(el => +el.id === +id);

    if (data[index].price <= 10000 && type === 'minus') {
        data[index].price = 0;
        res.status(200).send(data)
    } else if (type === 'plus') {
        data[index].price += 10000;
        res.status(200).send(data)
    } else if (type === 'minus') {
        data[index].price -= 10000;
        res.status(200).send(data);
    } else {
        res.sendStatus(400);
    }
}

module.exports = {
    getHouses,
    deleteHouse,
    createHouse,
    updateHouse,
}
