const INITIAL_STATE = {
    date : '',
    smokingCountPerDay : '',
    countCigaretteInPocket : '',
    wasteTime : '',
    price : '',
    currency : '',
    healthNotification: '',
    achievementsNotification: '',
}

const  UserInformation = (state=INITIAL_STATE,action) => {

    switch (action.type) {
        case 'UPDATE_DATE':
            return Object.assign({},state,{date: action.payload.date});
        break;
        case 'UPDATE_SMOKING_COUNT_PER_DAY':
            return Object.assign({},state,{smokingCountPerDay: action.payload.smokingCountPerDay});
        break;
        case 'UPDATE_COUNT_CIGARETTE_IN_POCKET':
            return Object.assign({},state,{countCigaretteInPocket: action.payload.countCigaretteInPocket});
        break;
        case 'UPDATE_WASTE_TIME':
            return Object.assign({},state,{wasteTime: action.payload.wasteTime});
        break;
        case 'UPDATE_PRICE':
            return Object.assign({},state,{price: action.payload.price});
        break;
        case 'UPDATE_CURRENCY':
            return Object.assign({},state,{currency: action.payload.currency});
        break;
        case 'UPDATE_HEALTH_NOTIFICATION':
            return Object.assign({},state,{healthNotification: action.payload.healthNotification});
        break;
        case 'UPDATE_ACHIEVEMENT_NOTIFICATION':
            return Object.assign({},state,{achievementsNotification: action.payload.achievementsNotification});
        break;
        default:
            return state;
    }
}

export default UserInformation;
