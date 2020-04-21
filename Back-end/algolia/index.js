const {
    ALGOLIA_APPLICATION_ID,
    ALGOLIA_ADMIN_API_KEY
} = process.env;
const algoliasearch = require('algoliasearch');
const client = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_ADMIN_API_KEY);
const indices = {
    users_index: client.initIndex('Users'),
    posts_index: client.initIndex('Posts')
};

module.exports = { indices };