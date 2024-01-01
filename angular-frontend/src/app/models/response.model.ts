import { User } from "./user.model"

export class Response {
    message: string;
    user?: User;

    constructor() {}
}