import { RegularsHelper } from './RegularsHelper'

type ValidateFunction = (data: string) => boolean | string

const ValidateMessages = {
	required: 'Обязательное поле',
	requiredDigit: 'Должна присутствовать 1 цифра',
	maxLength: (maxLength: number): string => `Длина не должна превышать ${maxLength} символов`,
	minLength: (minLength: number): string => `Длина должна быть не менее ${minLength} символов`,
	incorrectEmail: 'Некорректный email',
	minYear: (minYear: number): string => `Год не меньше ${minYear}`,
	maxYear: (maxYear: number): string => `Год не больше ${maxYear}`,
}

export const ValidateHelper: { [key: string]: ValidateFunction } = {
	required: value => {
		if (!value.length) {
			return ValidateMessages.required
		}
		return true
	},

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

		if (!/\d/.test(password)) {
			return ValidateMessages.requiredDigit
		}
		return true
	},

	courseName: name => {
		if (!name.length) {
			return ValidateMessages.required
		}
		return true
	},

	courseStartYear: year => {
		const intYear = parseInt(year)
		const currYear = new Date().getFullYear()
		const strCurrYear = currYear.toString()

		if (!year.length) {
			return ValidateMessages.required
		}

		if (intYear < currYear) {
			return ValidateMessages.minYear(currYear)
		}
		if (intYear > currYear + 5) {
			return ValidateMessages.maxYear(currYear + 5)
		}
		return true
	},
}
