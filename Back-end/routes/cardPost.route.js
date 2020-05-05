const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { indices } = require('../algolia');

router.get('/getById', (req, res) => {
    const { id } = req.query;
    prisma.post.findOne({
        where: {
            id,
        },
        include: {
            author: true,
            descriptions: true,
        },
    })
    .then(post => {
        res.send(post);
    })
    .catch(err => {
        console.log(err);
    })
});

router.delete('/delete', (req, res) => {
    const { postId, postDescriptions } = req.query;

    let descriptionsPromise = postDescriptions.map(
        item => new Promise((resolve, reject) => {
            let itemJSON = JSON.parse(item);
            prisma.description.delete({
                where: {
                    id: itemJSON.id
                }
            })
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
        })
    );

    Promise.all(descriptionsPromise)
    .then(() => {
        return prisma.post.delete({
            where: {
                id: postId
            },
        })
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    })
});

router.put('/create', (req, res) => {
    const { name, introduction, descriptionsArray, typeRef, subType, image, authorId } = req.body;
    let descriptions = [];
    let descriptionsPromise = descriptionsArray.map(
        element => new Promise((resolve, reject) => {
            descriptions.push({
                title: element.title,
                description: element.description,
                imageUrl: element.imageUrl,
                phototext: element.phototext,
                layoutName: element.layoutName
            });
            resolve("Successful");
        })
    );

    Promise.all(descriptionsPromise)
    .then(() => {
        return prisma.post.create({
            data: {
                name,
                introduction,
                descriptions: {
                    create: descriptions
                },
                type: typeRef,
                subType: {
                    set: subType
                },
                image,
                author: {
                    connect: { id: authorId }
                }
            },
            include: {
                author: true,
                descriptions: true
            }
        })
    })
    .then(result => {
        let data = result;
        data.objectID = result.id;
        indices.posts_index.saveObject(data);
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    })
});

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

//User section
router.get('/getPostsOfUser', (req, res) => {
    prisma.post.findMany({
        where: {
            authorId: req.query.authorId 
        },
        orderBy: {
            updatedAt: 'desc'
        },
        skip: (req.query.page-1)*req.query.count,
        first: parseInt(req.query.count, 10),
    })
    .then(posts => {
        res.send(posts);
    })
    .catch(err => {
        console.log(err);
    })
});

router.get('/getNumberOfUserPosts', (req, res) => {
    const { authorId } = req.query;
    prisma.post.findMany({
        where: {
            authorId
        },
    })
    .then(result => {
        res.send(String(result.length));
    })
    .catch(err => {
        console.log(err);
    })
});

module.exports = router;