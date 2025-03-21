import { ObjectId } from "mongoose";
import { UserDocument } from "../models/userModule";

declare global {
  namespace Express {
    interface Request {
      params: {
        id?: string | ObjectId;
        token?: string | undefined;
        roomId?: string;
        slug?: string;
      };
      user: UserDocument;
    }
  }
}
