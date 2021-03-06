const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { indices } = require('../algolia');

router.put('/update', (req, res) => {
    const type = req.body.type;
    let dataPrisma = {};
    let dataAlgolia = {};

    if(type==="name") {
        dataPrisma = {
            name: req.body.name,
            updatedAt: new Date()
        };
        dataAlgolia = {
            objectID: req.body.id,
            name: req.body.name
        };
    }
    if(type==="password") {
        dataPrisma = {
            password: req.body.password,
            updatedAt: new Date()
        };
        dataAlgolia = {
            objectID: req.body.id,
            password: req.body.password
        };
    }

    const prismaPromise = prisma.user.update({
        where: {
            id: req.body.id
        },
        data: dataPrisma
    });

    const algoliaPromise = indices.users_index.partialUpdateObject(dataAlgolia);

    Promise.all([prismaPromise, algoliaPromise])
    .then(([prismaData, algoliaData]) => {
        res.send(prismaData);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })

});

router.get('/findUserByEmail', (req, res) => {
    const { email }= req.query;
    prisma.user.findOne({
        where: {
            email,
        }
    })
    .then(user => {
        if(user)
            res.sendStatus(200);
        else
            res.status(404).send("Your account does not exist in our system.");
    })
    .catch(err => {
        console.log(err);
    })
})

module.exports = router;