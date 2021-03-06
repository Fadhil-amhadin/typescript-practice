if (process.env.Node_ENV !== 'production'){
    require('dotenv').config();
}

import express from 'express';
import routes from './routes/index';

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json());

app.use('/', routes)

app.listen(PORT, () => console.log(`server running on port: ${PORT}`))