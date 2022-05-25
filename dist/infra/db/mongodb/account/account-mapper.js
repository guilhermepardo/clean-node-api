"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = void 0;
const map = (account) => ({
    id: account._id.toHexString(),
    name: account.name,
    email: account.email,
    password: account.password
});
exports.map = map;
