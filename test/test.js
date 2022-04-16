const pytalk = require('pytalk');

let worker = pytalk.worker(__dirname+'/test.py', {
    stdout: data => { console.log(data); }
});

let test = worker.methodSync('test');

test()