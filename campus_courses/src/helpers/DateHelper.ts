interface IDate {
	day: string
	month: string
	year: string
	yyyy_mm_dd: string
}
export const DateHelper = {
	to_DD_MM_YYYY: (timestamp: string): IDate => {
		const date = new Date(timestamp)
		const day = date.getDate().toString().padStart(2, '0')
		const month = (date.getMonth() + 1).toString().padStart(2, '0')
		const year = date.getFullYear().toString()
		const yyyy_mm_dd = `${year}-${month}-${day}`
		return {
			day,
			month,
			year,
			yyyy_mm_dd,
		}
	},
	to_ISO_string: (timestamp: string): string => {
		const date = new Date(timestamp)
		return date.toISOString()
	},
	get_current_year: (): number => {
		const date = new Date()
		return date.getFullYear()
	},
}
