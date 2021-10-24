import TimeToMillis from "../utils/TimeToMillis";
import PushNotification from "react-native-push-notification"
import {AsyncStorage} from "react-native";
import I18n from "./../lang/_18n"
export default class AchievementsList {
    constructor(date,smokingCountPerDay,countCigaretteInPocket,price,currency = "$") {
        this.price = price;
        this.date=(new Date(date)).getTime();
        this.smokingCountPerday = smokingCountPerDay;
        this.countCigaretteInPocket= countCigaretteInPocket;
        this.currency = currency;
        let t = this;

    }

    getCurrency = async (num) => {
        try {
        const value = await AsyncStorage.getItem("currency");
        return num.toString()+" "+value.toString();
        } catch(e) {

        }

    }



    getNotification =  () => {
        let t = this;

        return [
            {
                id:20,
                notifyId:"achievement_1",
                title:I18n.t("achievements.starter.title"),
                achievement : I18n.t("achievements.starter.description"),
                proUser:false,
                image:"baslangic.png",
                time: this.date +TimeToMillis.minuteToMillis(1)
            },
            {
                id:21,
                notifyId:"achievement_2",
                title:I18n.t("achievements.determined.title",{num:1}),
                achievement : I18n.t("achievements.determined.description",{time:"1 "+I18n.t("hour").toLowerCase()}),
                proUser:false,
                image: "kararli.png",
                time: this.date + TimeToMillis.hoursToMillis(1)
            },
            {
                id:22,
                notifyId:"achievement_3",
                title:I18n.t("achievements.determined.title",{num:2}),
                achievement : I18n.t("achievements.determined.description",{time:I18n.t("hours",{hour:6}).toLowerCase()}),
                proUser:false,
                image: "kararli.png",
                time: this.date + TimeToMillis.hoursToMillis(6)
            },
            {
                id:23,
                notifyId:"achievement_4",
                title:I18n.t("achievements.determined.title",{num:3}),
                achievement : I18n.t("achievements.determined.description",{time:I18n.t("hours",{hour:12}).toLowerCase()}),
                proUser:false,
                image: "kararli.png",
                time: this.date+  TimeToMillis.hoursToMillis(12)
            },
            {
                id:24,
                notifyId:"achievement_5",
                title:I18n.t("achievements.determined.title",{num:4}),
                achievement :  I18n.t("achievements.determined.description",{time:"1 "+I18n.t("day").toLowerCase()}),
                proUser:false,
                image: "kararli.png",
                time: this.date+TimeToMillis.daysToMillis(1)
            },
            {
                id:25,
                notifyId:"achievement_6",
                title:I18n.t("achievements.determined.title",{num:5}),
                achievement :  I18n.t("achievements.determined.description",{time:I18n.t("days",{day:3}).toLowerCase()}),
                proUser:false,
                image: "kararli.png",
                time: this.date+TimeToMillis.hoursToMillis(3)
            },
            {
                id:26,
                notifyId:"achievement_8",
                title:I18n.t("achievements.stable.title",{num:1}),
                achievement : I18n.t("achievements.stable.description",{time:"1 "+I18n.t("week").toLowerCase()}),
                proUser:false,
                image: "istikrarli.png",
                time:this.date+ TimeToMillis.weakToMillis(1)
            },
            {
                id:27,
                notifyId:"achievement_9",
                title:I18n.t("achievements.stable.title",{num:2}),
                achievement : I18n.t("achievements.stable.description",{time:I18n.t("weeks",{week:2}).toLowerCase()}),
                proUser:false,
                image: "istikrarli.png",
                time: this.date+TimeToMillis.weakToMillis(2)
            },
            {
                id:28,
                notifyId:"achievement_10",
                title:I18n.t("achievements.stable.title",{num:3}),
                achievement : I18n.t("achievements.stable.description",{time:"1 "+I18n.t("month").toLowerCase()}),
                proUser:false,
                image: "istikrarli.png",
                time: this.date+ TimeToMillis.monthToMillis(1)
            },
            {
                id:29,
                notifyId:"achievement_11",
                title:I18n.t("achievements.stable.title",{num:4}),
                achievement : I18n.t("achievements.stable.description",{time:I18n.t("months",{month:3}).toLowerCase()}),
                proUser:false,
                image: "istikrarli.png",
                time:this.date+ TimeToMillis.monthToMillis(3)
            },
            {
                id:30,
                notifyId:"achievement_12",
                title:I18n.t("achievements.forgot.title",{num:1}),
                achievement : I18n.t("achievements.forgot.description",{num:10}),
                proUser:false,
                image: "unutan.png",
                time:this.date+ TimeToMillis.daysToMillis((10/this.smokingCountPerday))
            },
            {
                id:31,
                notifyId:"achievement_13",
                title:I18n.t("achievements.forgot.title",{num:2}),
                achievement : I18n.t("achievements.forgot.description",{num:100}),
                proUser:false,
                image: "unutan.png",
                time: this.date+TimeToMillis.daysToMillis((100/this.smokingCountPerday))
            },
            {
                id:32,
                notifyId:"achievement_14",
                title:I18n.t("achievements.forgot.title",{num:3}),
                achievement : I18n.t("achievements.forgot.description",{num:500}),
                proUser:false,
                image: "unutan.png",
                time: this.date+TimeToMillis.daysToMillis((500/this.smokingCountPerday))
            },
            {
                id:33,
                notifyId:"achievement_15",
                title:I18n.t("achievements.forgot.title",{num:4}),
                achievement : I18n.t("achievements.forgot.description",{num:1000}),
                proUser:false,
                image: "unutan.png",
                time: this.date+TimeToMillis.daysToMillis((1000/this.smokingCountPerday))
            },

            {
                id:34,
                notifyId:"achievement_16",
                title:I18n.t("achievements.rich.title",{num:1}),
                achievement : I18n.t("achievements.rich.description",{amount:(100).toString()+" "+this.currency}),
                proUser:false,
                image: "zengin.png",
                time:this.date+ TimeToMillis.daysToMillis(100/((this.smokingCountPerday/this.smokingCountPerday)*this.price))
            },
            {
                id:35,
                notifyId:"achievement_17",
                title:I18n.t("achievements.rich.title",{num:2}),
                achievement : I18n.t("achievements.rich.description",{amount:("1.000").toString()+" "+this.currency}),
                proUser:false,
                image: "zengin.png",
                time:this.date+ TimeToMillis.daysToMillis(1000/((this.smokingCountPerday/this.smokingCountPerday)*this.price))
            },
            {
                id:36,
                notifyId:"achievement_18",
                title:I18n.t("achievements.rich.title",{num:3}),
                achievement :  I18n.t("achievements.rich.description",{amount:("5.000").toString()+" "+this.currency}),
                proUser:false,
                image: "zengin.png",
                time:this.date+ TimeToMillis.daysToMillis(5000/((this.smokingCountPerday/this.smokingCountPerday)*this.price))
            },
            {
                id:37,
                notifyId:"achievement_19",
                title:I18n.t("achievements.rich.title",{num:4}),
                achievement : I18n.t("achievements.rich.description",{amount:("10.000").toString()+" "+this.currency}),
                proUser:false,
                image: "zengin.png",
                time:this.date+ TimeToMillis.daysToMillis(10000/((this.smokingCountPerday/this.smokingCountPerday)*this.price))
            }
        ]
    }

    removeNotification = () => {
        this.getNotification().forEach((value) => {
           PushNotification.cancelLocalNotifications({id:value.id.toString()});
           //console.log("silinen"+value.id);
        })
    }

    setScheduled= () => {
        this.removeNotification();
        let now = (new Date(Date.now())).getTime();

        this.getNotification().forEach((value) => {
            let diff = now - value.time;
            if(diff < 0) {
                PushNotification.localNotificationSchedule({
                    smallIcon: "ic_launcher",
                    largeIcon: "ic_launcher",
                    id:value.id.toString(),
                    title:value.title,
                    message:value.achievement,
                    group :"achievement",
                    date: (new Date(value.time))
                });
                console.log("Kurulan : "+ value.achievement);
            } else {
                console.log("kurulamadı");
            }
        })
    }

    static getImage = (image) => {
        switch (image) {
            case 'baslangic.png':
                return  require("./../assets/images/achievements/baslangic.png");
            case 'istikrarli.png':
                return  require("./../assets/images/achievements/istikrarli.png");
            case 'kararli.png':
                return  require("./../assets/images/achievements/kararli.png");
            case 'unutan.png':
                return  require("./../assets/images/achievements/unutan.png");
            case 'zengin.png':
                return  require("./../assets/images/achievements/zengin.png");
        }
    }
}

