const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { indices } = require('../algolia');

router.get('/getLatestCreateWithSearch', (req, res) => {
    const items = parseInt(req.query.numItems, 10);
    const page = parseInt(req.query.Page, 10) - 1;
    indices.posts_index.search(req.query.search, {
        hitsPerPage: items,
        page
    })
    .then(hitsData => {
        res.send(hitsData);
    })
    .catch(e => {
        console.log(e);
    })
});

router.get('/getTotalCards', (req, res) => {
    prisma.post.count()
    .then(count => {
        res.send(count.toString());
    })
    .catch(e => {
        console.log(e);
    })
});

router.get('/getLatestCreate', (req, res) => {
    const page = parseInt(req.query.Page, 10);
    const items = parseInt(req.query.numItems, 10);
    prisma.post.findMany({
        include: {
            author: true
        },
        orderBy: {
            createdAt: 'desc'
        },
        skip: items * (page - 1),
        first: items
    })
    .then(posts => {
        res.send(posts);
    })
    .catch(e => {
        console.log(e);
    })
});

router.get('/getLatestEdit', (req, res) => {
    prisma.post.findMany({
        include: {
            author: true
        },
        orderBy: {
            updatedAt: 'desc'
        },
        first: 6
    })
    .then(posts => {
        res.send(posts);
    })
    .catch(e => {
        console.log(e);
    })
});

router.get('/getPostsOfUser', (req, res) => {
    prisma.post.findMany({
        where: {
            authorId: req.query.authorId 
        },
        orderBy: {
            createdAt: 'desc'
        },
        first: parseInt(req.query.count, 10),
    })
    .then(posts => {
        res.send(posts);
    })
    .catch(err => {
        console.log(err);
    })
});

module.exports = router;