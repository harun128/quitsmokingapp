import PushNotification from "react-native-push-notification"

class AchievementsNotifications{
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
        PushNotification.cancelAllLocalNotifications();

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
                    title:"Sağlık Durumu",
                    message: condition.condition,
                    group : "health",
                    date: new Date(date + condition.time)
                });
                //console.log("kuruldu:"+condition.id+"pushDate+"+pushDate);
            }
        })

    }
}


export default (AchievementsNotifications);







