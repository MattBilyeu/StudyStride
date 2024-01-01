export class Feedback {
    _id?: string;
    text: string;
    userId: string;
    createDate: Date;
    acknowledged: Boolean;

    constructor() {
        //Will never create a user in the Angular app, will only receive one from NodeJS
    }
}