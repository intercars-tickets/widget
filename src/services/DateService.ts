export function DateService() {

    //Convert Date to string for datePicker
    //!  month has indexes 00..11 (00 - Jan)
    const dateToDatePickerFormat = (date: Date): string => {
        let result: string = date.getFullYear().toString() + "-";
        if (date.getMonth() + 1 < 10) {
            result += "0" + (date.getMonth() + 1) + "-";
        } else {
            result += date.getMonth() + 1 + "-";
        }
        if (date.getDate() < 10) {
            result += "0" + date.getDate();
        } else {
            result += date.getDate();
        }
        return result;
    };

    //Convert string from datePicker to Date
    //!  month has indexes 00..11 (00 - Jan)
    const stringToDateFromDatePicker = (dateAsString: string): Date => {
        let array = dateAsString.split("-").map(Number);
        return new Date(array[0], array[1] - 1, array[2]);
    };

    const parseTimeFromDate = (date: string, separator = " "): string => {
        let timeArr = date.split(separator);

        return timeArr[timeArr.length - 1];
    }

    const convertStringDateForForm = (newValue: string, oldValue: string): string => {

        var resultDate = "";

        if (oldValue.length < newValue.length) {
            if (newValue.length === 2 || newValue.length === 5) {
                newValue += "-"
                //return newValue;
            } else if (newValue.length > 10) {
                newValue = oldValue;
            } else {
                //return newValue
            }
        }


        //input

        console.log(`Before main log new value: ${newValue}`);
        return newValue
    }

    const convertDateForForm = (date: Date): string => {

        if(date===undefined) return"";
        let result: string = "" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "-";
        result += date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) + "-" : result += date.getMonth() + 1 + "-";
        result += date.getFullYear().toString();

        return result;
    }


    return {
        dateToDatePickerFormat,
        parseTimeFromDate,
        stringToDateFromDatePicker,
        convertDateForForm,
        convertStringDateForForm
    };

}