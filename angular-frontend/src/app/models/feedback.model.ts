export class Feedback {
    _id?: String;
    text: String;
    userId: String;
    createDate: Date;
    acknowledged: Boolean;

    constructor() {
        //Will never create a user in the Angular app, will only receive one from NodeJS
    }
}