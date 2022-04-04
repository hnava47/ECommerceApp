const jwt = require('jsonwebtoken');


const expiration = '2h';

module.exports = {
    authMiddleware: function ({ req }) {
        // allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;
        // console.log("token", req.headers.authorization);
        // ["Bearer", "<tokenvalue>"]
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            console.log("no token!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            return req;
        }

        try {
            //
            console.log("token", token);
            const { data } = jwt.verify(token, process.env.SECRET_JWT, { maxAge: expiration });
            console.log("no data!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", data)
            req.user = data;
            return req;
        } catch (error) {
            console.log('Invalid token');
            console.log(error)
            return req;

        }

        // return req;
    },
    signToken: function ({ firstName, email, _id }) {
        const payload = { firstName, email, _id };

        return jwt.sign({ data: payload }, process.env.SECRET_JWT, { expiresIn: expiration });
    },
};