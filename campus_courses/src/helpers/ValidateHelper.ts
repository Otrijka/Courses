import { RegularsHelper } from './RegularsHelper'

type ValidateFunction = (data: string) => boolean | string

const ValidateMessages = {
	required: 'Обязательное поле',
	maxLength: (maxLength: number): string =>
		`Длина не должна превышать ${maxLength} символов`,
	minLength: (minLength: number): string =>
		`Длина должна быть не менее ${minLength} символов`,
	incorrectEmail: 'Некорректный email',
}

export const ValidateHelper: { [key: string]: ValidateFunction } = {
	birthDate: date => {
		if (!date?.length) {
			return ValidateMessages.required
		}

		const checkedDate = new Date(date)
		const currentDate = new Date()
		const minDate = new Date('1900-01-01')

		if (checkedDate < minDate || checkedDate > currentDate) {
			return `Корректная дата от 01.01.1900 до ${currentDate.getDate()}.${
				currentDate.getMonth() + 1
			}.${currentDate.getFullYear()}`
		}
		return true
	},

	fullName: fullName => {
		if (!fullName?.length) {
			return ValidateMessages.required
		}
		if (fullName.length > 50) {
			return ValidateMessages.maxLength(50)
		}
		return true
	},

	email: email => {
		if (!email?.length) {
			return ValidateMessages.required
		}
		if (!RegularsHelper.EmailPattern.test(email)) {
			return ValidateMessages.incorrectEmail
		}
		return true
	},

	password: password => {
		if (!password?.length) {
			return ValidateMessages.required
		}
		if (password.length < 6) {
			return ValidateMessages.minLength(6)
		}
		return true
	},
}
