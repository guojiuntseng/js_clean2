import _ from 'lodash'

export const notEmpty = value => value !== ''
export const format = value => (/^\d{4}-\d{2}$/g).test(value)
export const positiveNumber = value => !isNaN(parseInt(value)) && value >= 0

export const emptyError = field => `${upperFirst(field)} cannot be empty`
export const formatError = field => `Invalid ${field} format`
export const positiveError = field => `Invalid ${field}`

export const NOT_EMPTY = {validate: notEmpty, error: emptyError};
export const FORMAT = {validate: format, error: formatError};
export const POSITIVE_NUMBER = {validate: positiveNumber, error: positiveError};

export default class Validator {
    constructor(rules) {
        this.rules = rules;
    }

    validate(data, success) {
        this.errors = {}
        for (let field in this.rules) {
            let failure = this.rules[field].find(validation => !validation.validate(this.data[field])) || { error: () => '' }
            this.errors[field] = failure.error(field)
        }
        this.valid && success()
    }

    get valid(){
        return _(this.errors).chain().values().compact().isEmpty().value()
    }
}