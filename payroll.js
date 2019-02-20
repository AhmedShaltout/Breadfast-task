const readline = require('readline')
const { WEEK_DAYS, MONTHS, WEEKENDS, EMPLOYEES, BONUS_GENERAL_DAY, SALARY_CORRECTION, BONUS_CORRECTION } = require('./constants')
const { appendFileSync, writeFileSync } = require('fs')
const rL = readline.createInterface({ input: process.stdin, output: process.stdout })

// generate note if the date for the payroll is a weekend
const getNote = (shouldDate, willDate, salary = true) =>
    (salary ? "Salary" : "Bounus").concat(
        " ((",
        WEEK_DAYS[shouldDate.getDay()],
        " ",
        shouldDate.toLocaleDateString(),
        " )) => (( ",
        WEEK_DAYS[willDate.getDay()],
        " ",
        willDate.toLocaleDateString()
        ,
        "))."
    )

//type any new data to the file
const appendToFile = (file, data, append = true) => append ? appendFileSync(file, data) : writeFileSync(file, data)

rL.question("What year are we generating payroll for? ", answer => {
    try {
        // for counting time consumed to generate the CSV file
        let startedAT = new Date()
        //////////////////////////////////////////////////////
        if (answer < 1) throw new Error("Not a valid year")
        let salaryDate = new Date(answer)
        let fileName = salaryDate.getFullYear().toString().concat('_payroll.csv')
        appendToFile(fileName, "Date,Name,Salary,Bonus,Notes", false)
        for (let month = 0, monthsCount = MONTHS.length; month < monthsCount; month++) {
            let note
            salaryDate.setMonth(month + 1, 0)
            let bonusDate = new Date(salaryDate)
            bonusDate.setDate(BONUS_GENERAL_DAY)
            let salaryDayIndex = salaryDate.getDay()
            let bonusDayIndex = bonusDate.getDay()
            //check if the salary payroll is a weekend
            if (WEEKENDS.includes(salaryDayIndex)) {
                let shouldDate = new Date(salaryDate)
                salaryDate.setDate(salaryDate.getDate() - salaryDayIndex + SALARY_CORRECTION)
                note = getNote(shouldDate, salaryDate)
            }
            //check if the bounus day is a weekend
            if (WEEKENDS.includes(bonusDayIndex)) {
                let shouldDate = new Date(bonusDate)
                bonusDate.setDate(bonusDate.getDate() - bonusDayIndex + WEEK_DAYS.length + BONUS_CORRECTION)
                let bonusNote = getNote(shouldDate, bonusDate, false)
                note = note ? note.concat(" // ", bonusNote) : bonusNote
            }
            appendToFile(fileName, "\n".concat(MONTHS[salaryDate.getMonth()], salaryDate.getFullYear(), note ? ",,,,".concat(note) : ""))
            for (let employeeIndex = 0, employeesLength = EMPLOYEES.length; employeeIndex < employeesLength; employeeIndex++) {
                let employee = EMPLOYEES[employeeIndex]
                appendToFile(fileName, "\n,".concat(employee.name, ',', employee.salary, ',', employee.bonus))
            }
        }
        console.log("Done generating in (", new Date().getTime() - startedAT.getTime(), 'MS) for (', EMPLOYEES.length, ') employee')
    } catch (error) {
        console.log(error.message)
    } finally { rL.close() }
})