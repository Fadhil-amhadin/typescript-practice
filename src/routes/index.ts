import express from 'express';
const router = express.Router();

import midasRouter from './midasRouter';

export default router.use('/v1', midasRouter)

// module.exports = router