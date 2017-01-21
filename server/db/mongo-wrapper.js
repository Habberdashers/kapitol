'use strict';

const MongoClient = require('mongodb').MongoClient;
const logger = require('./../utils/logger');
const ObjectID = require('mongodb').ObjectID;
const config = require('./config');


function DbWrapper(database) {
    this.dbPath = config.mongoPath + database;

    this._connect = function(callback) {
        MongoClient.connect(this.dbPath, function (err, db) {
            if (err) {
                logger('Failed to connect to db:', this.dbPath,);
                return callback(err, null);
            }

            logger('Connected to database:', this.dbPath);

            if (callback) {
                callback(err, db);
            }
        }.bind(this));
    };

    this.insert = function(collectionName, insertObjects, callback) {
        logger('Inserting objects:', insertObjects);
        this._connect(function (err, db) {
            if (err) {
                logger('Failed to connect to db:', this.dbPath);
                return callback(err, null);
            }

            logger('Connected to database: ', this.dbPath);
            logger('Inserting into collection:', collectionName, 'object:', insertObjects);

            const collection = db.collection(collectionName);
            collection.insertMany(insertObjects, function (error, result) {
                db.close();
                if (error) {
                    logger('Inserting into collection:', collectionName, 'error:', error);
                    return callback(error, null);
                }

                if (callback) {
                    logger(
                        'Inserted:',
                        insertObjects,
                        '\nInto:',
                        collectionName,
                        '\n with response: ',
                        result
                    );
                    callback(null, result);
                }
            });
        }.bind(this));
    };

    this.retrieveAll = function (collectionName, callback) {
        logger('Retrieving objects for:', collectionName);
        this._connect(function (err, db) {
            if (err) {
                logger('Error: failed to connect to db:', this.dbPath);
                return callback(err, null);
            }

            logger('Connected to database:', this.dbPath);
            const collection = db.collection(collectionName);
            collection.find().toArray(function(error, result) {
                db.close();
                if (error) {
                    logger('Error: retrieving all objects from:', collectionName);
                    callback(error, null);
                    return;
                }

                if (callback) {
                    callback(null, result);
                }
            });
        }.bind(this));
    };

    this.retrieveWithId = function (collectionName, id, callback) {
        logger('Retrieving objects for:', collectionName);
        this._connect(function (err, db) {
            if (err) {
                logger('Error: failed to connect to db:', this.dbPath);
                return callback(err, null);
            }

            logger('Connected to database:', this.dbPath);

            const objectId = new ObjectID(id);
            const collection = db.collection(collectionName);
            collection.find({_id:objectId}).toArray(function(error, result) {
                db.close();
                if (error) {
                    logger('Error: retrieving all objects from:', collectionName);
                    callback(error, null);
                    return;
                }

                if (callback) {
                    callback(null, result);
                }
            });
        }.bind(this));
    };
}

module.exports = DbWrapper;
