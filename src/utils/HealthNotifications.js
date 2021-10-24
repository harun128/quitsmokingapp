
import React from 'react';
import PushNotification from "react-native-push-notification"
import {HealthConditions} from "./../config/HealthConditions";
import I18n from "./../lang/_18n"

class HealthNotifications{
    constructor(date) {
        this.date = date;
    }

    sendTestNotification = () => {
        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            message: "this.props.date", // (required)
            date: new Date(Date.now() + 3 * 1000), // in 60 secs
        });

    }

    setScheduled = () => {
        this.cancelHealthNotification()
        let date = new Date(this.date).getTime();
        let now = (new Date(Date.now())).getTime();
        HealthConditions.forEach((condition) => {
            let time = condition.time;
            let diff = now - (time+date);
            if(diff < 0 ) {
                let pushDate = new Date(Date.now()+ condition.time);
                PushNotification.localNotificationSchedule({
                    smallIcon : "ic_launcher",
                    largeIcon : "ic_launcher",
                    id:condition.id.toString(),
                    title: I18n.t("health.notification_title"),
                    message: condition.condition,
                    group : "health",
                    date: new Date(date + condition.time)
                });
                console.log("kuruldu"+condition.id.toString());
            }
        })
    }
    cancelHealthNotification = () => {
        HealthConditions.forEach((condition) => {
            PushNotification.cancelLocalNotifications({id: condition.id.toString()});
            //console.log("silinen"+condition.id);
        })
    }
}


export default (HealthNotifications);







