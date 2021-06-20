const express = require('express');
const morgan = require("morgan");

const app = express();

app.use(morgan('(:remote-addr) [:method] :url (:status) - :res[content-length] B - :response-time ms'));
app.use(express.json({limit: '50mb'}));

function echo(payload, res) {
    res.send(payload);
    res.on('finish', () => {
        console.dir(payload, {depth: null});
    });
}

function fibo(n) {
    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    } else {
        let grandparent = 0;
        let parent = 1;
        let me = -1;
        for (let i = 2; i <= n; i++) {
            me = grandparent + parent;
            grandparent = parent;
            parent = me;
        }
        return me;
    }
}

app.route('/')
    .get((req, res) => echo({headers: req.headers, query: req.query}, res))
    .post((req, res) => echo({headers: req.headers, body: req.body}, res))

app.get('/ping', (req, res) => res.send('PONG'));

app.get('/fibo', (req, res) => {
    if (req.query.n) {
        const n = parseInt(req.query.n, 10);
        res.send(fibo(n).toString());
    } else {
        res.sendStatus(400);
    }
});


const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = parseInt(process.env.PORT ||  '3000', 10);
app.listen(port, hostname, () => console.log(`Listening on http://${hostname}:${port}`))
