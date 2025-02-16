// middleware/error.middleware.ts
import { sendError } from '@/utils/apiResponse.utils';
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res,next) => {
 // Log error
 console.error('Error:', {
   message: err.message,
   stack: err.stack,
   path: req.path,
   method: req.method,
   timestamp: new Date().toISOString()
 });

 // Handle specific error types
 if (err.name === 'ValidationError') {
   return sendError(res, 'Validation failed', 400);
 }

 if (err.name === 'UnauthorizedError') {
   return sendError(res, 'Unauthorized access', 401);
 }

 if (err.name === 'NotFoundError') {
   return sendError(res, 'Resource not found', 404);
 }

 // Rate limit errors
 if (err.name === 'TooManyRequestsError') {
   return sendError(res, 'Too many requests', 429);
 }

 // Default error
 return sendError(
   res,
   process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
   500
 );
};

// Custom error classes
export class ValidationError extends Error {
 constructor(message: string) {
   super(message);
   this.name = 'ValidationError';
 }
}

export class UnauthorizedError extends Error {
 constructor(message: string) {
   super(message);
   this.name = 'UnauthorizedError';
 }
}

export class NotFoundError extends Error {
 constructor(message: string) {
   super(message);
   this.name = 'NotFoundError';
 }
}

export class TooManyRequestsError extends Error {
 constructor(message: string) {
   super(message);
   this.name = 'TooManyRequestsError';
 }
}