module.exports = {
    // EMPLOYEES DATA
    EMPLOYEES: [
        {name: "emp1", salary: 100, bonus: 10},
        {name: "emp2", salary: 200, bonus: 20},
        {name: "emp3", salary: 300, bonus: 30},
        {name: "emp4", salary: 400, bonus: 40},
        {name: "emp5", salary: 500, bonus: 50},
        {name: "emp6", salary: 600, bonus: 60},
        {name: "emp7", salary: 700, bonus: 70},
        {name: "emp8", salary: 800, bonus: 80},
        {name: "emp9", salary: 900, bonus: 90},
    ],
    // THE MONTHS AND DAYS ORDERD AS IN THE PUBLIC JAVASCRIPT ENGINE
    WEEK_DAYS: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    MONTHS: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

    // THE INDEX OF THE WEEKENDS FROM THE "WEEK_DAYS" ARRAY
    WEEKENDS: [5, 6],

    // THE NORMAL DAY OF BOUNS PAYROLL
    BONUS_GENERAL_DAY: 15,

    // THE INDEX OF THE DAY TO DELEIVER THE BOUNUS IF THE NORMAL DAY WAS WEEKEND
    BONUS_CORRECTION: 3,

    // THE INDEX OF THE DAY TO DELEIVER THE SALARY IF THE NORMAL DAY WAS WEEKEND
    SALARY_CORRECTION: 4
}