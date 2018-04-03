const http = require("http");
var requestStats = require('request-stats')
const app = require('./app'); //to arxeio app.js
const port = process.env.PORT || 3000; 

const server = http.createServer(app);
var stats = requestStats(server);
// stats.on('request', function (req) {
//     // evey second, print stats 
//     var interval = setInterval(function () {
//       var progress = req.progress()
//       console.log(progress)

//       if (progress.completed) clearInterval(interval)
      
//     }, 1000)
//   })
server.listen(port);
console.log("server running on Port "+port);
