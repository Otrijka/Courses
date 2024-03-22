import { useEffect } from 'react'
import { Card, CardBody, CardFooter, Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ButtonCustom } from '../../../components/shared/ButtonCustom'
import { InputCustom } from '../../../components/shared/InputCustom'
import { MessageError } from '../../../components/shared/MessageError'
import { ValidateHelper } from '../../../helpers/ValidateHelper'
import { useToastMutate } from '../../../hooks/useToastMutate'
import { IUserLogin, useLoginUserMutation } from '../api/loginApi'

export function LoginForm() {
	const navigate = useNavigate()
	const [loginUser, { data: response, isSuccess, isLoading, error }] = useLoginUserMutation()
	useToastMutate(isSuccess, error && 'status' in error && error.status !== 400, 'Успешный вход')
	const {
		register,
		handleSubmit,
		resetField,
		formState: { errors },
	} = useForm<IUserLogin>({
		mode: 'onChange',
		defaultValues: {
			email: 'gymboss@gachi.com',
			password: 'B0yNextD00r',
		},
	})

	const onLogin: SubmitHandler<IUserLogin> = data => {
		loginUser(data)
		resetField('password')
	}

	useEffect(() => {
		if (response) {
			localStorage.setItem('token', response.token)
			navigate('/')
		}
	}, [response])

	return (
		<Card className='w-50'>
			<Card.Header>Вход</Card.Header>
			<CardBody>
				<Form id='login_form' onSubmit={handleSubmit(onLogin)}>
					<InputCustom
						label={'Email'}
						name='email'
						register={register}
						validateFn={ValidateHelper.email}
						messageError={errors.email?.message}
					/>
					<InputCustom
						label={'Пароль'}
						name='password'
						type='password'
						labelClassName='mt-2'
						register={register}
						validateFn={ValidateHelper.required}
						messageError={errors.password?.message}
					/>
					{error && 'status' in error && error.status === 400 && <MessageError>Неверный email или пароль</MessageError>}
				</Form>
			</CardBody>
			<CardFooter>
				<ButtonCustom type='submit' form='login_form' text='Вход' isLoading={isLoading} />
			</CardFooter>
		</Card>
	)
}
