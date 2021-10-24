import store from './../store/index';
import {AsyncStorage} from 'react-native';
export function setDate(date) {
    AsyncStorage.setItem("date",date);
    store.dispatch({
        type: 'UPDATE_DATE',
        payload: {
            date
        }
    })
}


export function setSmokingCountPerDay(smokingCountPerDay) {
    AsyncStorage.setItem("smokingCountPerDay",smokingCountPerDay);
    store.dispatch({
        type: 'UPDATE_SMOKING_COUNT_PER_DAY',
        payload: {
            smokingCountPerDay
        }
    });
}

export function setCountCigaretteInPocket(countCigaretteInPocket) {
    AsyncStorage.setItem("countCigaretteInPocket",countCigaretteInPocket);
    store.dispatch({
        type: 'UPDATE_COUNT_CIGARETTE_IN_POCKET',
        payload: {
            countCigaretteInPocket
        }
    })
}

export function setWasteTime(wasteTime) {
    AsyncStorage.setItem("wasteTime",wasteTime);
    store.dispatch({
        type: 'UPDATE_WASTE_TIME',
        payload: {
            wasteTime
        }
    })
}

export function setPrice(price) {
    AsyncStorage.setItem("price",price);
    store.dispatch({
        type: 'UPDATE_PRICE',
        payload: {
            price
        }
    })
}

export function setCurrency(currency) {
    AsyncStorage.setItem("currency",currency);
    store.dispatch({
        type: 'UPDATE_CURRENCY',
        payload: {
            currency
        }
    })
}

export function setHealthNotification(healthNotification) {
    AsyncStorage.setItem("healthNotification",healthNotification);
    store.dispatch({
        type: 'UPDATE_HEALTH_NOTIFICATION',
        payload: {
            healthNotification
        }
    })
}
export function setAchievementsNotification(achievementsNotification) {
    AsyncStorage.setItem("achievementsNotification",achievementsNotification);
    store.dispatch({
        type: 'UPDATE_ACHIEVEMENT_NOTIFICATION',
        payload: {
            achievementsNotification
        }
    })
}


AsyncStorage.multiGet(["date","smokingCountPerDay","countCigaretteInPocket","wasteTime","price","country","currency","healthNotification","achievementsNotification"]).then((result)=>{
    setDate((result[0][1] === null || result[0][1] ==="" ? (new Date(Date.now())): result[0][1]));
    setSmokingCountPerDay((result[1][1] === null || result[1][1] ==="" ? 20 : result[1][1]));
    setCountCigaretteInPocket((result[2][1] === null || result[2][1] ==="" ? 20 : result[2][1]));
    setWasteTime((result[3][1] === null || result[3][1] ==="" ? 4 : result[3][1]));
    setPrice((result[4][1] === null || result[4][1] ==="" ? 18 : result[4][1]));

    if(result[6][1] === null) {
        setCurrency("$");
    } else
    {
        setCurrency(result[6][1]);
    }


    if(result[7][1] == null) {
        setHealthNotification(JSON.stringify(true));
    } else {
        setHealthNotification(result[7][1]);
    }

    if(result[8][1] == null) {
        setAchievementsNotification(JSON.stringify(true));
    }else
    {
        setAchievementsNotification(result[8][1]);
    }
});
