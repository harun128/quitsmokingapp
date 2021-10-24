
class TimeToMillis {
    static secondToMillis(second) {
        return (1000*second);
    }
    static minuteToMillis(minute) {
        return (this.secondToMillis(60) * minute);
    }

    static hoursToMillis(hours) {
        return (this.minuteToMillis(60)*hours);
    }
    static daysToMillis(day) {
        return (this.hoursToMillis(24)*day);
    }
    static weakToMillis(weak) {
        return (this.daysToMillis(7)*weak);
    }
    static monthToMillis(month) {
        return (this.weakToMillis(4)*month);
    }
    static yearToMillis(year){
        return (this.monthToMillis(12)*year);
    }
}

export default TimeToMillis;
