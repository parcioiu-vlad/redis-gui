 let RedisClient = require('./redis.js').default
// import {RedisClient} from './redis.js'

let localhost = new RedisClient('192.168.99.100')
localhost.client.on('connect', function() {
     console.log('Redis client connected');
});