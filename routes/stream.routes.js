import express from 'express';
import { processFile } from '../utils/fileProcessor.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const filePath = 'largefile.txt'; // make sure this file exists
  const keyword = req.query.keyword || 'ERROR';
  const count = await processFile(filePath, keyword);
  res.json({ keyword, count });
});

export default router;
