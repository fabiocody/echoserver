const express = require('express');
const morgan = require("morgan");

const app = express();

app.use(morgan('[:method] :url (:status) - :res[content-length] B - :response-time ms'));
app.use(express.json());

app.get('/', (req, res) => {
    const echo = {headers: req.headers, query: req.query};
    res.send(echo);
    res.on('finish', () => console.log(echo));
});

app.post('/', (req, res) => {
    const echo = {headers: req.headers, body: req.body};
    res.send(echo);
    res.on('finish', () => console.log(echo));
});

const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT ||  '3000', 10);
app.listen(port, hostname, () => console.log(`Listening on http://${hostname}:${port}`))
