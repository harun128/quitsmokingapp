import TimeToMillis from "../utils/TimeToMillis";
import I18n from "./../lang/_18n"
export const HealthConditions = [
    {
        id:1,
        notify_Id: "health_1",
        condition : I18n.t("health.h1"),
        time : TimeToMillis.minuteToMillis(3),
        needTime: I18n.t("minutes",{minute:3})
    },
    {
        id:2,
        notify_Id: "health_2",
        condition: I18n.t("health.h2"),
        time : TimeToMillis.minuteToMillis(20),
        needTime: I18n.t("minutes",{minute:20})
    },
    {
        id:3,
        notify_Id: "health_3",
        condition: I18n.t("health.h3"),
        time: TimeToMillis.hoursToMillis(12),
        needTime : I18n.t("hours",{hour:12})
    },
    {
        id:4,
        notify_Id: "health_4",
        condition : I18n.t("health.h4"),
        time: TimeToMillis.daysToMillis(1),
        needTime : I18n.t("days",{day:1})
    },
    {
        id:5,
        notify_Id: "health_5",
        condition : I18n.t("health.h5"),
        time: TimeToMillis.daysToMillis(2),
        needTime : I18n.t("days",{day:2})
    },
    {
        id:6,
        notify_Id: "health_6",
        condition : I18n.t("health.h6"),
        time: TimeToMillis.daysToMillis(3),
        needTime : I18n.t("days",{day:3})
    },
    {
        id:7,
        notify_Id: "health_7",
        condition : I18n.t("health.h7"),
        time: TimeToMillis.weakToMillis(2),
        needTime : I18n.t("weeks",{week:2})
    },
    {
        id:8,
        notify_Id: "health_8",
        condition : I18n.t("health.h8"),
        time: TimeToMillis.monthToMillis(1),
        needTime : I18n.t("months",{month:1})
    },
    {
        id:9,
        notify_Id: "health_9",
        condition : I18n.t("health.h9"),
        time: TimeToMillis.monthToMillis(2),
        needTime : I18n.t("months",{month:2})
    },
    {
        id:10,
        notify_Id: "health_10",
        condition : I18n.t("health.h10"),
        time: TimeToMillis.monthToMillis(5),
        needTime : I18n.t("months",{month:5})
    },
    {
        id:11,
        notify_Id: "health_11",
        condition :  I18n.t("health.h11"),
        time: TimeToMillis.monthToMillis(8),
        needTime : I18n.t("months",{month:8})
    },
    {
        id:12,
        notify_Id: "health_12",
        condition :  I18n.t("health.h12"),
        time: TimeToMillis.yearToMillis(1),
        needTime : I18n.t("years",{year:1})
    },
    {
        id:13,
        notify_Id: "health_13",
        condition :  I18n.t("health.h13"),
        time: TimeToMillis.yearToMillis(2),
        needTime : I18n.t("years",{year:2})
    },
    {
        id:14,
        notify_Id: "health_14",
        condition :  I18n.t("health.h14"),
        time: TimeToMillis.yearToMillis(5),
        needTime : I18n.t("years",{year:5})
    },
    {
        id:15,
        notify_Id: "health_15",
        condition :  I18n.t("health.h15"),
        time: TimeToMillis.yearToMillis(10),
        needTime : I18n.t("years",{year:10})
    },
    {
        id:16,notify_Id: "health_16",

        condition :  I18n.t("health.h16"),
        time: TimeToMillis.yearToMillis(15),
        needTime : I18n.t("years",{year:15})
    }

]
