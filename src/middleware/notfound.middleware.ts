
import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
    request: Request,
    response: Response,
    next: NextFunction
) => {

    const message = "Resource not found";

    response.status(404).send({
        "message": message,
        "path": request.path,
        "status": 400,
        "Error message": "Not found"
    });
};
