import fs from 'fs';
import readline from 'readline';

export const processFile = async (filePath, keyword) => {
  return new Promise((resolve) => {
    let count = 0;
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity
    });

    rl.on('line', line => {
      if (line.includes(keyword)) count++;
    });

    rl.on('close', () => resolve(count));
  });
};
