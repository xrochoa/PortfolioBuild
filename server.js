var express = require('express');

function serve(build, dir, port) {

    var server = new express();
    
    server.listen(port, function() {
        server.use(express.static(__dirname + dir));
        console.log('Serving ' + build + ' at http://localhost:' + port);
    });

}

serve('source', '/src', 4000);
serve('distribution', '/dist', 8000);
