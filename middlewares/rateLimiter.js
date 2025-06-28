const requestLog = {};

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  if (!requestLog[ip]) requestLog[ip] = [];

  requestLog[ip] = requestLog[ip].filter(t => now - t < 60000);

  if (requestLog[ip].length >= 10) {
    console.log(`🚫 Blocked ${ip} at ${new Date().toISOString()}`);
    return res.status(429).send('Too many requests');
  }

  requestLog[ip].push(now);
  next();
};

export default rateLimiter;
    