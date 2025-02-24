import { NextFunction, Request, Response } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
    const now = new Date().toISOString()
    console.log(`[${now}] ${req.method} ${req.url}`)

    if (req.body && Object.keys(req.body).length) {
        console.log('Body:', JSON.stringify(req.body, null, 2))
    }
    
    next();
}