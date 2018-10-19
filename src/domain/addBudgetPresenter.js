import Api from "../api";
import { FORMAT, NOT_EMPTY, POSITIVE_NUMBER } from "./Validator";

export default class AddBudgetPresenter {
    budget = { month: '', amount: 0 }
    errors = { month: '', amount: '' }
    save(success) {
        let amountValid

        const validations = {
            month: [NOT_EMPTY, FORMAT],
            amount: [NOT_EMPTY, POSITIVE_NUMBER]
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
