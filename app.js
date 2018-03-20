const express = require('express');
const bodyParser = require('body-parser');
const {router} = require('./api/apiClient');

const app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use('/api', router);

app.listen(3000, () => {
    console.log('server start at port 3000');
})