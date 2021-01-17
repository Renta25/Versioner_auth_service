"use strict";
const fs = require('fs');
const path = require('path');

/**
 * @param emial
 * @param password
 */
module.exports.getAuthorizationUser = fs.readFileSync(
    path.join(__dirname,'./sql/select.authorizationUser.sql'), {flag: 'r'})
    .toString();