let config = {
	mongodb_uri: "mongodb://localhost/journal",
    jwt_secret: process.env.SECRET || '1234567890',
    session: {session: false}
}

module.exports = config;