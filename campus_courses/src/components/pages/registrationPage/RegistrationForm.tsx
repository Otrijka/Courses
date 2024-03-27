import { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { DateHelper } from '../../../helpers/DateHelper'
import { ValidateHelper } from '../../../helpers/ValidateHelper'
import { useToastMutate } from '../../../hooks/useToastMutate'
import { useRegisterUserMutation } from '../../../store/api/accountApi'
import { IUserRegistration } from '../../../types/request.types'
import { ButtonCustom } from '../../shared/ButtonCustom'
import { ErrorMessage } from '../../shared/ErrorMessage'
import { InputCustom } from '../../shared/InputCustom'

export function RegistrationForm() {
	const navigate = useNavigate()
	const [registerUser, { data: response, isLoading, error, isSuccess }] = useRegisterUserMutation()

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<IUserRegistration>({
		mode: 'onChange',
	})

	useEffect(() => {
		if (response) {
			localStorage.setItem('token', response.token)
			navigate('/')
		}
	}, [response, error])

	useToastMutate(isSuccess, error && 'status' in error && error.status !== 409, 'Успешная регистрация')

	const onSubmit: SubmitHandler<IUserRegistration> = data => {
		registerUser({
			...data,
			birthDate: DateHelper.to_ISO_string(data.birthDate),
		})
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)} noValidate>
			<InputCustom
				label={'ФИО'}
				name={'fullName'}
				register={register}
				validateFn={ValidateHelper.fullName}
				messageError={errors.fullName?.message}
			/>
			<InputCustom
				label={'Дата рождения'}
				name={'birthDate'}
				register={register}
				validateFn={ValidateHelper.birthDate}
				messageError={errors.birthDate?.message}
				type='date'
			/>
			<InputCustom
				label={'Email'}
				name={'email'}
				register={register}
				validateFn={ValidateHelper.email}
				messageError={errors.email?.message}
			/>
			{error && 'status' in error && error.status === 409 && <ErrorMessage text='Такой email уже зарегистрирован' />}

			<InputCustom
				label={'Пароль'}
				name={'password'}
				register={register}
				validateFn={ValidateHelper.password}
				messageError={errors.password?.message}
				type='password'
			/>

			<InputCustom
				label={'Подтвердите пароль'}
				name={'confirmPassword'}
				register={register}
				validateFn={value => {
					if (value !== getValues('password')) {
						return 'Пароли не совпадают'
					}
					return true
				}}
				messageError={errors.confirmPassword?.message}
				type='password'
			/>
			<ButtonCustom className='mt-3' text='Зарегистрироваться' isLoading={isLoading || !!response} type='submit' />
		</Form>
	)
}
