import { useState } from 'react'

export function useInput<T>(initialState: T) {
	const [data, setData] = useState<T>(initialState)
	const handleOnChange = (key: keyof T, value: string, validParams = true) => {
		if (validParams === false) return
		setData(prevState => ({
			...prevState,
			[key]: value,
		}))
	}

	return { data, handleOnChange }
}
