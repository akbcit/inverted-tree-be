import rateLimit from 'express-rate-limit';

const WINDOW_MS = 15 * 60 * 1000; // Define window duration as a constant

export const limiter = rateLimit({
    windowMs: WINDOW_MS, // Use the constant
    max: 100,
    message: {
        status: 429,
        message: 'Too many requests, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    keyGenerator: (req) => {
        return `${req.ip}-${req.headers['user-agent']}`;
    },
    handler: (req, res) => {
        res.status(429).json({
            error: 'Rate limit exceeded',
            retryAfter: Math.ceil(WINDOW_MS / 1000 / 60), // Use the constant here
        });
    }
});

export const subscriptionLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: {
        status: 429,
        message: 'Too many subscription attempts. Please try again later.',
    }
});