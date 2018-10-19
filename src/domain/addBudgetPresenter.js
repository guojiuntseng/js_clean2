import Api from "../api";

export default class AddBudgetPresenter {
    budget = { month: '', amount: 0 }
    errors = { month: '', amount: '' }
    save(success) {
        let amountValid

        let notEmpty = value => value !== ''
        let emptyError = field => `${field} cannot be empty`
        let format = value => (/^\d{4}-\d{2}$/g).test(value)
        let formatError = field => `Invalid ${field} format`
        let positiveNumber = value => !isNaN(parseInt(value)) && value >= 0
        let positiveError = field => `Invalid ${field}`

        let validations = {
            month: [
                { validate: notEmpty, error: emptyError },
                { validate: format, error: formatError },
            ],
            amount: [
                { validate: notEmpty, error: emptyError },
                { validate: positiveNumber, error: positiveError },
            ]
        }

        for (let field in validations) {
            let failure = validations[field].find(validation => !validation.validate(this.budget[field])) || { error: () => '' }
            this.errors[field] = failure.error(field)
        }

        if (this.errors.month !== '' || !this.errors.amount !== '') {
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
