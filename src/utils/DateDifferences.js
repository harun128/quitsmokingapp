class DateDifferences {

    constructor(diff) {

        this.diff = diff;

        let secondsInMilli = 1000;
        let minutesInMilli = secondsInMilli*60;
        let hoursInMilli = minutesInMilli *60;
        let daysInMilli = hoursInMilli*24;

        let elapsedDays =    this.diff/ daysInMilli;
        this.diff =    this.diff % daysInMilli;

        let  elapsedHours =    this.diff/hoursInMilli;
        this.diff=    this.diff % hoursInMilli;

        let elapsedMinutes =    this.diff/minutesInMilli;
        this.diff =    this.diff % minutesInMilli

        let elapsedSeconds =    this.diff/secondsInMilli;

        this.elapsedDays = Math.floor(elapsedDays);
        this.elapsedHours = Math.floor(elapsedHours);
        this.elapsedMinutes = Math.floor(elapsedMinutes);
        this.elapsedSeconds = Math.floor(elapsedSeconds);
    }
}

export default DateDifferences;
