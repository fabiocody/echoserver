const express = require('express');
const morgan = require("morgan");

const app = express();

app.use(morgan('[:method] :url (:status) - :res[content-length] B - :response-time ms'));
app.use(express.json());

function echo(payload, res) {
    res.send(payload);
    res.on('finish', () => console.log(payload));
}

app.route('/')
    .get((req, res) => echo({headers: req.headers, query: req.query}, res))
    .post((req, res) => echo({headers: req.headers, body: req.body}, res))

const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = parseInt(process.env.PORT ||  '3000', 10);
app.listen(port, hostname, () => console.log(`Listening on http://${hostname}:${port}`))
