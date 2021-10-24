const INITIAL_STATE = {
    token : '',
    email : '',
    userId : '',
    username : '',
    image : '',
    profileDescription: '',
    country: ''
}


const  UserSession = (state=INITIAL_STATE,action) => {
    switch(action.type) {
        case 'UPDATE_TOKEN':
            return Object.assign({},state,{token: action.payload.token});
        break;
        case 'UPDATE_EMAIL':
            return Object.assign({},state,{email: action.payload.email});
        break;
        case 'UPDATE_USER_ID':
            return Object.assign({},state,{userId: action.payload.userId});
        break;
        case 'UPDATE_USERNAME':
            return Object.assign({},state,{username: action.payload.username});
            break;
        case 'UPDATE_IMAGE':
            return Object.assign({},state,{image: action.payload.image});
        break;
        case 'UPDATE_LOCATION':
            return Object.assign({},state,{location: action.payload.location});
        break;
        case 'UPDATE_PROFILE_DESCRIPTION':
            return Object.assign({},state,{profileDescription: action.payload.profileDescription});
        break;
        case 'UPDATE_COUNTRY':
            return Object.assign({},state,{country: action.payload.country});
        break;
        default:
            return state;
    }
}

export default UserSession;
