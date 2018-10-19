import Api from "../api";
import Validator, { FORMAT, NOT_EMPTY, POSITIVE_NUMBER } from "./Validator";

class Budget {
    constructor({ month, amount }) {
        this.month = month
        this.amount = amount
    }
    save() {
        let budgets = Api.getBudgets()
        let existing = budgets && budgets.find(budget => budget.month === this.month)
        if (existing) {
            Api.updateBudget({month: this.month, amount: this.amount})
        } else {
            Api.addBudget({month: this.month, amount: this.amount})
        }
    }
}


export default class AddBudgetPresenter {

    budget = { month: '', amount: 0 }
    errors = { month: '', amount: '' }

    validator = new Validator({
        month: [NOT_EMPTY, FORMAT],
        amount: [NOT_EMPTY, POSITIVE_NUMBER]
    })

    save(success) {
        this.validator.validate(this.budget, () => {
            new Budget(this.budget).save()
            success()
        })

        Object.assign(this.errors, this.validator.errors)
    }
}
