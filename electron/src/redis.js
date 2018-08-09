// var redis = require('redis');
// var client = redis.createClient({host: '192.168.99.100'});
//
// client.on('connect', function() {
//     console.log('Redis client connected');
// });
//
// client.on('error', function (err) {
//     console.log('Something went wrong ' + err);
// });


class RedisClient {
	constructor(host, port) {
		var redis = require('redis');
		this.client = redis.createClient({host: host});
	}
}

export default RedisClient;