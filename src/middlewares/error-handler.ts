import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomError) {
        return res
            .status(err.statusCode)
            .send({ errors: err.serializeError() });
    }

    return res
        .status(500)
        .send({
            errors: [{ message: "Something Went Wrong!", statusCode: 500 }],
        });
};

export default errorHandler;
