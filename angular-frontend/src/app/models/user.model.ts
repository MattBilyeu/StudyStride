interface Timestamp {
    stamp: Date;
    duration: Number
}

interface TopicObj {
    topic: string;
    timestamps: Timestamp[];
}

interface sessionObj {
    topic: string;
    start: Date
}

interface Milestone {
    name: string;
    completed: Boolean
}

export class User {
    _id?: string;
    name: string;
    email: string;
    password: string;
    createDate: string;
    receivesEmails: Boolean;
    totalTime: Number;
    topics: TopicObj[];
    activeSession?: sessionObj;
    milestones?: Milestone[];
    userActiveUntil: Date;
    badges: string[];
    banned: Boolean;
    resetToken?: string;
    resetExpiration?: Date

    constructor() {
        //Will never create a user in the Angular app, will only receive one from NodeJS
    }
}