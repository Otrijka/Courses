import { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ValidateHelper } from '../../../helpers/ValidateHelper'
import { useToastMutate } from '../../../hooks/useToastMutate'
import { useLoginUserMutation } from '../../../store/api/accountApi'
import { ButtonCustom } from '../../shared/ButtonCustom'
import { ErrorMessage } from '../../shared/ErrorMessage'
import { InputCustom } from '../../shared/InputCustom'

export interface IUserLogin {
	email: string
	password: string
}

export function LoginForm() {
	const nav = useNavigate()
	const [loginUser, { isLoading, error, data: response, isSuccess }] = useLoginUserMutation()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUserLogin>({
		mode: 'onChange',
		defaultValues: {
			email: 'gymboss@gachi.com',
			password: 'B0yNextD00r',
		},
	})
	useEffect(() => {
		if (response) {
			nav('/')
			localStorage.setItem('token', response.token)
		}
	}, [response])

	useToastMutate(isSuccess, error && 'status' in error && error.status !== 400, 'Успешный вход')

	const onSubmit: SubmitHandler<IUserLogin> = data => {
		loginUser(data)
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<InputCustom
				label={'Email'}
				name={'email'}
				register={register}
				validateFn={ValidateHelper.email}
				messageError={errors.email?.message}
			/>
			<InputCustom
				label={'Пароль'}
				name={'password'}
				register={register}
				validateFn={ValidateHelper.required}
				messageError={errors.password?.message}
				type='password'
			/>
			{error && <ErrorMessage text='Неверный email или пароль' />}
			<ButtonCustom className='mt-3' isLoading={isLoading || !!response} text='Войти' type='submit' />
		</Form>
	)
}
