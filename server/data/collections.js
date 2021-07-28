const mongoCollections = require('../config/mongoCollections');
const collections = mongoCollections.collections;
let { ObjectId } = require('mongodb');

const exportedMethods = {
    async addCollection(data) {

        const collectionCollection = await collections();

        const newCollection = {
            collectionName: data.collectionName,
        };

        const newInsertInformation = await collectionCollection.insertOne(newCollection);
        if (newInsertInformation.insertedCount === 0) {
            console.log('Could not add collection');
            return false;
        }

        return {...newCollection, id: String(newInsertInformation.insertedId)};
    },

    async getCollections() {

        const collectionCollection = await collections();
        let result = await collectionCollection.find().toArray();
        return result;        
    },

};

module.exports = exportedMethods;