const jwt = require('express-jwt');
const userService = require('../users/user.service');
const { secret } = require('config.json');
const db = require('_helpers/db');


module.exports = authorize;

function authorize() {
//    const secret = config.secret;
    return jwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/login',
            '/users/register',
        ]
    });
}


async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};