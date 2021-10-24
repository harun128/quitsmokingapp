const baseUrl = "https://quitsmoking.herokuapp.com/";
//const baseUrl = "https://5829c2fc6a24.ngrok.io/";
export const socketUrl = baseUrl;
export const global = {
    url:baseUrl,
    loginUrl: baseUrl+"users/login",
    registerUrl:baseUrl+"users/register",
    updateProfileUrl:baseUrl+"users/update-my-account",
    verifyToken : baseUrl+"users/verify-account",
    changeProfileImage : baseUrl+"users/change-profile-image",
    countries : baseUrl+"community/countries",
    lastMessages : baseUrl+"community/last-messages"
}


