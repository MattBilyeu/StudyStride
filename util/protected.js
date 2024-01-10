//I used this during development so that I could add the file to gitignore.  This allowed me to use these variables on my local
//computer and push to the public repository on gitHub without compromising security.  Now that the app is on Heroku, I have replaced 
//values with the environment variables.

exports.mongoURI = process.env.mongoURI

exports.emailUser = process.env.emailUser

exports.emailPassword = process.env.emailPassword

exports.secret = process.env.secret