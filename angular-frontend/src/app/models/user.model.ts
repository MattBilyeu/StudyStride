interface timestamp {
    stamp: Date;
    duration: Number
}

interface topicObj {
    topic: String;
    timestamps: timestamp[];
}

interface sessionObj {
    topic: String;
    start: Date
}

interface milestone {
    name: String;
    completed: Boolean
}

export class User {
    _id?: String;
    name: String;
    email: String;
    password: String;
    receivesEmails: Boolean;
    totalTime: Number;
    topics: topicObj[];
    activeSession?: sessionObj;
    milestones?: milestone[];
    userActiveUntil: Date;
    badges: String[];
    banned: Boolean;
    resetToken?: String;
    resetExpiration?: Date

    constructor() {
        //Will never create a user in the Angular app, will only receive one from NodeJS
    }
}