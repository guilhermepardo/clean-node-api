"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountMongoRepository = void 0;
const mongo_helper_1 = require("../helpers/mongo-helper");
const account_mapper_1 = require("./account-mapper");
const mongodb_1 = require("mongodb");
class AccountMongoRepository {
    async add(accountData) {
        const accountCollection = await mongo_helper_1.MongoHelper.getCollection('accounts');
        const result = await accountCollection.insertOne(accountData);
        return (0, account_mapper_1.map)(await accountCollection.findOne({ _id: result.insertedId }));
    }
    async loadByEmail(email) {
        const accountCollection = await mongo_helper_1.MongoHelper.getCollection('accounts');
        const account = await accountCollection.findOne({ email });
        if (account)
            return (0, account_mapper_1.map)(await accountCollection.findOne({ _id: account._id }));
        return null;
    }
    async updateAccessToken(id, token) {
        const accountCollection = await mongo_helper_1.MongoHelper.getCollection('accounts');
        await accountCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { accessToken: token } });
    }
}
exports.AccountMongoRepository = AccountMongoRepository;
