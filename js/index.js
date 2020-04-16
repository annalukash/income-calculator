let calcBtn = document.querySelector('#start');
let budgetValue = document.querySelector('.budget-value');
let dayBudgetValue = document.querySelector('.daybudget-value');
let levelValue = document.querySelector('.level-value');
let expensesValue = document.querySelector('.expenses-value');
let optExpensesValue = document.querySelector('.optionalexpenses-value');
let incomeValue = document.querySelector('.income-value');
let monthSavingsValue = document.querySelector('.monthsavings-value');
let yearSavingsValue = document.querySelector('.yearsavings-value');
let expensesList = document.querySelectorAll('.expenses-item');
let expensesConfirmBtn = document.querySelector('.data button:first-of-type');
let optExpensesConfirmBtn = document.querySelector('.data button:nth-of-type(2)');
let countBudgetBtn = document.querySelector('.data button:nth-of-type(3)');
let optExpensesList = document.querySelectorAll('.optionalexpenses-item');
let chooseIncome = document.querySelector('.choose-income');
let checkSavings = document.querySelector('#savings');
let savingsSum = document.querySelector('.choose-sum');
let savingsPercent = document.querySelector('.choose-percent');
let yearValue = document.querySelector('.year-value');
let monthValue = document.querySelector('.month-value');
let dayValue = document.querySelector('.day-value');


let money;
let time;

expensesConfirmBtn.setAttribute('disabled', 'true');
optExpensesConfirmBtn.setAttribute('disabled', 'true');
countBudgetBtn.setAttribute('disabled', 'true');


calcBtn.addEventListener('click', function() {
    time = prompt('Введите дату в формате YYYY-MM-DD', '');
    money = +prompt('Ваш бюджет на месяц?', '');
  
    while (isNaN(money) || money == '' || money == null) {
      money = +prompt('Ваш бюджет на месяц?', '');
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();

    expensesConfirmBtn.removeAttribute('disabled');
    optExpensesConfirmBtn.removeAttribute('disabled');
    countBudgetBtn.removeAttribute('disabled');
});

expensesConfirmBtn.addEventListener('click', function() {
    let sum = 0;

    for (let i = 0; i < expensesList.length; i++) {
        let nameExpenses = expensesList[i].value;
        let summExpenses = expensesList[++i].value;
      
        if (typeof(nameExpenses) === 'string' && typeof(nameExpenses) != null && typeof(summExpenses) != null && 
        nameExpenses != '' && summExpenses != '' && nameExpenses.length < 50) {
              console.log('ok');
              appData.expenses[nameExpenses] = summExpenses;
              sum += +summExpenses;
        } else {
          i--;
        }
    }
    expensesValue.textContent = sum;
});

optExpensesConfirmBtn.addEventListener('click', function() {
    for (let i = 0; i < optExpensesList.length; i++) {
        let nameOptExpenses = optExpensesList[i].value;
      
        appData.optionalExpenses[i] = nameOptExpenses;

        optExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
      }
});

countBudgetBtn.addEventListener('click', function() {
    if (appData.budget != undefined) {     
        appData.moneyPerDay = ((appData.budget - expensesValue.textContent) / 30).toFixed();

        dayBudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            levelValue.textContent = 'Минимальный уровень достатка';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = 'Средний уровень достатка';
        } else if (appData.moneyPerDay >= 2000) {
            levelValue.textContent = 'Высокий уровень достатка';
        } else {
            levelValue.textContent = 'Ошибка';
        }
    } else {
        dayBudgetValue.textContent = 'Произошла ошибка';
    }

});


chooseIncome.addEventListener('input', function() {
    let items = chooseIncome.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

savingsSum.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +savingsSum.value;
        let percent = +savingsPercent.value;

        appData.monthIncome = sum/100/12 * percent;
        appData.yearIncome = sum/100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

savingsPercent.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +savingsSum.value;
        let percent = +savingsPercent.value;

        appData.monthIncome = sum/100/12 * percent;
        appData.yearIncome = sum/100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1); 
    }
});


let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false
};