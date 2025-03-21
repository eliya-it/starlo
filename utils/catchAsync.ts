import { Request, Response, NextFunction, RequestHandler } from "express";

const catchAsync = <T>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
): RequestHandler => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
