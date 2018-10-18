import Api from "../api";

export default class AddBudgetPresenter {
    budget = { month: '', amount: 0 }
    errors = { month: '', amount: '' }
    save(success) {
        let monthValid, amountValid
        let validateMonthEmpty = () => this.budget.month === ''
        const MONTH_EMPTY_ERROR = 'Month cannot be empty';
        let validateMonthFormat = () => !(/^\d{4}-\d{2}$/g).test(this.budget.month)
        const MONTH_FORMAT_ERROR = 'Invalid month format';
        if (validateMonthEmpty()) {
            this.errors.month = MONTH_EMPTY_ERROR
            monthValid = false
        } else if (validateMonthFormat()) {
            this.errors.month = MONTH_FORMAT_ERROR
            monthValid = false
        } else {
            this.errors.month = ''
            monthValid = true
        }
        if (this.budget.amount === '') {
            this.errors.amount = 'Amount cannot be empty'
            amountValid = false
        } else if (isNaN(parseInt(this.budget.amount, 10)) || this.budget.amount < 0) {
            this.errors.amount = 'Invalid amount'
            amountValid = false
        } else {
            this.errors.amount = ''
            amountValid = true
        }
        if (!monthValid || !amountValid) {
            return
        }
        let budgets = Api.getBudgets()
        let existing = budgets && budgets.find(budget => budget.month === this.budget.month)
        if (existing) {
            Api.updateBudget(this.budget)
        } else {
            Api.addBudget(this.budget)
        }
        success()
    }
}
