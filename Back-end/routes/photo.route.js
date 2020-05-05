const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { indices } = require('../algolia');
var storage = require('../firebase/firebaseStorage.js');

router.get('/getPhotosOfUser', (req, res) => {
    let items = 3;
    if(req.query.numItems) 
        items = parseInt(req.query.numItems, 10);

    prisma.photo.findMany({
        where: {
            userId: req.query.userId
        },
        orderBy: {
            uploadedAt: 'desc',
        },
        first: items,
    })
    .then(photos => {
        res.send(photos);
    })
    .catch(err => {
        console.log(err);
    });
});

router.get('/getTotalPhotosOfUser', (req, res) => {
    prisma.photo.findMany({
        where: {
            userId: req.query.userId,
        }
    })
    .then(photos => {
        res.send(photos.length.toString());
    })
    .catch(e => {
        console.log(e);
    })
});

router.delete('/deletePhotosOfUser', (req, res) => {
    const deletePhotosPromise = req.query.photos.map(
        photoId => new Promise((resolve, reject) => {
            const prismaPromise = prisma.photo.delete({
                where: {
                    id: photoId
                }
            });
            const photoRef = storage.child(`images/${req.query.userId}/${photoId}`);
            const photoRefPromise = photoRef.delete();
            Promise.all([prismaPromise,photoRefPromise])
            .then(res => {
                resolve("Successful");
            })
            .catch(err => {
                reject(err);
            })
        })
    );
    Promise.all(deletePhotosPromise)
    .then(result => {
        res.sendStatus(200);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Action too fast!");
    })
});

router.post('/uploadPhoto', (req, res) => {
    var userID = req.body.userID;

    if(req.files.length===0)
        return [null, null];

    const uploadedPhotoPromise = req.files.map(
        file => new Promise((resolve, reject) => {
            prisma.photo.create({
                data: {
                  user: {
                    connect: { id: userID }
                  },
                },
            })
            .then(photo => {
                var metadata = {
                    contentType: file.mimetype,
                };
        
                // Upload the file and metadata
                return Promise.all([
                    photo, 
                    storage.child(`images/${userID}/${photo.id}`).put(file.buffer, metadata)
                ]);
            })
            .then(([photo, fileRef]) => {
                if(!photo) return [null, null];
        
                return Promise.all([
                    photo, 
                    storage.child(fileRef.metadata.fullPath).getDownloadURL()
                ]);
            })
            .then(([photo, url]) => {
                if(!photo) return null;
        
                const date = new Date();
        
                return prisma.photo.update({
                    where: {
                        id: photo.id
                    },
                    data: {
                        uploadedAt: date,
                        url,
                    }
                });
            })
            .then(photoUpdate => {
                resolve(photoUpdate);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            })
        })
    );
    Promise.all(uploadedPhotoPromise)
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    })
});

router.put('/updateAvatar', (req, res) => {
    const { userId } = req.body;
    const file = req.files[0];

    var metadata = {
        contentType: file.mimetype,
    };
    storage.child(`avatars/${userId}`).put(file.buffer, metadata)
    .then(fileRef => {
        return storage.child(fileRef.metadata.fullPath).getDownloadURL()
    })
    .then(photoURL => {
        return prisma.user.update({
            where: {
                id: userId
            },
            data: {
                avatarUrl: photoURL
            }
        })
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    })
});

module.exports = router;