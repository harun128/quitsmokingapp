import store from './../store/index';
import {AsyncStorage} from 'react-native';
import {setDate} from "./UserInformation";


import {global} from "../../config/global";

export function setCountry(country) {

    AsyncStorage.setItem("country",JSON.stringify(country).toString());
    store.dispatch({
        type: 'UPDATE_COUNTRY',
        payload: {
            country
        }
    })
}

export function setToken(token) {
    AsyncStorage.setItem("token",token);
    store.dispatch({
        type: 'UPDATE_TOKEN',
        payload: {
            token
        }
    })
}
export function setUserName(username) {
    AsyncStorage.setItem("username",username);
    store.dispatch({
        type: 'UPDATE_USERNAME',
        payload: {
            username
        }
    })
}
export function setLocation(location) {
    AsyncStorage.setItem("location",location);
    store.dispatch({
        type: 'UPDATE_LOCATION',
        payload: {
            location
        }
    })
}


export function setEmail(email) {
    AsyncStorage.setItem("email",email);
    store.dispatch({
        type: 'UPDATE_EMAIL',
        payload: {
            email
        }
    });
}

export function setUserId(userId) {
    AsyncStorage.setItem("userId",userId);
    store.dispatch({
        type: 'UPDATE_USER_ID',
        payload: {
            userId
        }
    })
}

export function setImage(image) {
    AsyncStorage.setItem("image",image);
    store.dispatch({
        type: 'UPDATE_IMAGE',
        payload: {
            image
        }
    })
}

export function setProfileDescription(profileDescription) {
    AsyncStorage.setItem("profileDescription",profileDescription);
    store.dispatch({
        type: 'UPDATE_PROFILE_DESCRIPTION',
        payload: {
            profileDescription
        }
    })
}

export function RegisterPost(email,password,username,callback) {
    fetch(global.registerUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email:email,
            password: password,
            username:username
        })
    }).then(response => response.json()).then(responseJson => {
        if(responseJson.success == true) {
            // setToken(responseJson.token);
            // setEmail(responseJson.email);
            // setUserId(responseJson.user);
            // setImage(responseJson.image);
            // setLocation(responseJson.location);
            // setUserName(responseJson.username);
            // setProfileDescription(responseJson.description);

            callback({success:true});
        } else {
            callback({success:false,message:responseJson.message});
        }
    }).catch((error) => {
        callback({success:false});
    });
}

export  function Login(email,password,callback) {
    fetch(global.loginUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email:email,
            password: password
        })
    }).then(response => response.json()).then(responseJson => {
        if(responseJson.success == true) {
            setToken(responseJson.token);
            setEmail(responseJson.email);
            setUserId(responseJson.user);
            setImage(responseJson.image);
            setLocation(responseJson.location);
            setUserName(responseJson.username);
            setProfileDescription(responseJson.description);

            callback({success:true});
        } else {
            callback({success:false,message:responseJson.message});
        }
    }).catch((error) => {
            callback({success:false});
    });
}

export function verifyAccount(token,callback) {
    fetch(global.verifyToken, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token':token
        },

    }).then(response => response.json()).then(responseJson => {

        if(responseJson.success == true) {
            callback({success:true});
        } else {
            setToken(null);
            callback({success:false,message:responseJson.message});
        }
    }).catch((error) => {

        callback({success:false});
    });

}


export function updateProfile(location,description,token,callback){
    location = location ? location:"";
    description = description ? description : "";

    fetch(global.updateProfileUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token':token
        },
        body: JSON.stringify({
            location: location,
            profileDescription: description,
        })
    }).then(response => response.json()).then(responseJson => {
        if(responseJson.success == true) {
            setLocation(location);
            setProfileDescription(description);
            callback({success:true});
        } else {
            callback({success:false,message:responseJson.message});
        }
    }).catch((error) => {
        callback({success:false,message:error+"asdasd"});
    });

}

export function changeProfileImage(photo,token,callback) {
    const data = new FormData();
    data.append("photo", {
        name: photo.fileName,
        type: photo.type,
        uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")

    });
    data.append('submit',"ok");


    fetch(global.changeProfileImage, {
        method: "POST",
        headers : {
            'auth-token' : token,
            'Content-Type': 'multipart/form-data',
        },
        body:data

    })
        .then(response => response.json())
        .then(response => {
            //console.log("upload succes", response);
            alert("Upload success!");

        })
        .catch(error => {
            //console.log("upload error", error);
            alert("Upload failed!");
        });
}

AsyncStorage.multiGet(["token","email","username","userId","profileDescription","location","image","country"]).then((result)=>{
    let token = (result[0][1] === null || result[0][1] === "") ? null : result[0][1];
    let email = (result[1][1] === null) ? null : result[1][1];
    let username = (result[2][1] === null) ? null : result[2][1];
    let userId = (result[3][1] === null) ? null : result[3][1];
    let description = (result[4][1] === null) ? null : result[4][1];
    let location = (result[5][1] === null) ? null : result[5][1];
    let image = (result[6][1] === null) ? null : result[6][1];
    let country = (result[7][1] === null) ? null : JSON.parse(result[7][1]);
    setToken(token);
    setEmail(email);
    setUserName(username);
    setUserId(userId);
    setProfileDescription(description);
    setLocation(location);
    setImage(image);
    if(country === null) {
        setCountry({
            "id": 2,
            "key":"england",
            "name" : "United Kingdom",
            "img" : "england.png"
        });

    }else {
        setCountry(country);
    }
})
