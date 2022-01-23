module.exports = {
    validateSignupPayload : body => {
        if(!body.username || !body.password || !body.email){
            return { error : true, message : "username, password and email are mandatory" }
        }
        if(body.username === "" || body.password === "" || body.email === ""){
            return { error : true, message : "username, password and email are mandatory" }
        }
        if(typeof body.username !== "string" || typeof body.password !== "string" || typeof body.email !== "string"){
            return { error : true, message : "invalid request body" }
        }
        return { error : false }
    },
    validateLoginPayload : body => {
        if(!body.password || !body.email){
            return { error : true, message : "password and email are mandatory" }
        }
        if(body.password === "" || body.email === ""){
            return { error : true, message : "password and email are mandatory" }
        }
        if(typeof body.password !== "string" || typeof body.email !== "string"){
            return { error : true, message : "invalid request body" }
        }
        return { error : false }
    },
    validateTokenPayload : body => {
        if(!body.token){
            return { error : true, message : "token is mandatory" }
        }
        if(body.token === ""){
            return { error : true, message : "token is mandatory" }
        }
        if(typeof body.token !== "string"){
            return { error : true, message : "invalid request body" }
        }
        return { error : false }
    }
}