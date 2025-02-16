import { Response } from "express";
import { APIResponse } from "../models/apiResponse.model.js";

export const sendSuccess = <T>(
    res: Response,
    data?: T,
    message?: string,
    statusCode: number = 200
) => {
    const response: APIResponse<T> = {
        success: true,
        message,
        data
    };
    res.status(statusCode).json(response);
};

export const sendError = (
    res: Response,
    error: string,
    statusCode: number = 400
) => {
    const response: APIResponse = {
        success: false,
        error
    };
    res.status(statusCode).json(response);
};