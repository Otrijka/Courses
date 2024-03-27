import { useEffect } from 'react'
import toast from 'react-hot-toast'

export function useToastMutate(
	isSuccess: boolean = false,
	isError: boolean = false,
	successMessage: string = 'Успешно',
	errorMessage: string = 'Что-то пошло не так'
) {
	useEffect(() => {
		if (isSuccess === true) {
			toast.success(successMessage)
		}

		if (isError === true) {
			toast.error(errorMessage)
		}
	}, [isSuccess, isError])
}
