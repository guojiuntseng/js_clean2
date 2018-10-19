import Api from "../api";

export default class AddBudgetPresenter {
    budget = { month: '', amount: 0 }
    errors = { month: '', amount: '' }
    save(success) {
        let amountValid

        let validateMonthEmpty = () => this.budget.month === ''
        const MONTH_EMPTY_ERROR = 'Month cannot be empty';
        let validateMonthFormat = () => !(/^\d{4}-\d{2}$/g).test(this.budget.month)
        const MONTH_FORMAT_ERROR = 'Invalid month format';

        let failure = [
            { validate: validateMonthEmpty, error: MONTH_EMPTY_ERROR },
            { validate: validateMonthFormat, error: MONTH_FORMAT_ERROR },
            { validate: () => true, error: '' }
        ].find(validation => validation.validate())

        this.errors.month = failure.error;
        let monthValid = this.errors.month === '';

        let validateAmountEmpty = () => this.budget.amount === ''
        const AMOUNT_EMPTY_ERROR = 'Amount cannot be empty';
        let validateAmountPositiveNumber = () => isNaN(parseInt(this.budget.amount, 10)) || this.budget.amount < 0
        const AMOUNT_NUMBER_ERROR = 'Invalid amount';

        failure = [
            { validate: validateAmountEmpty, error: AMOUNT_EMPTY_ERROR },
            { validate: validateAmountPositiveNumber, error: AMOUNT_NUMBER_ERROR },
            { validate: () => true, error: '' }
        ].find(validation => validation.validate())
        
        this.errors.amount = failure.error
        let amountValid = this.errors.amount === ''

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
