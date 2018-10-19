import Api from "../api";
import Validator, { FORMAT, NOT_EMPTY, POSITIVE_NUMBER } from "./Validator";

export default class AddBudgetPresenter {

    budget = { month: '', amount: 0 }
    errors = { month: '', amount: '' }

    validator = new Validator({
        month: [NOT_EMPTY, FORMAT],
        amount: [NOT_EMPTY, POSITIVE_NUMBER]
    })

    save(success) {
        let amountValid
        
        if (!validator.validate(this.budget, (field, error) => this.errors[field] = error)) {
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
