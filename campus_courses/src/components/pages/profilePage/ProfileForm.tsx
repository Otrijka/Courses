import { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { DateHelper } from '../../../helpers/DateHelper'
import { ValidateHelper } from '../../../helpers/ValidateHelper'
import { useToastMutate } from '../../../hooks/useToastMutate'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useEditUserProfileMutation } from '../../../store/api/accountApi'
import { ButtonCustom } from '../../shared/ButtonCustom'
import { InputCustom } from '../../shared/InputCustom'

interface IEditProfile {
	fullName: string
	birthDate: string
}

export function ProfileForm() {
	const [editUserProfile, { isLoading, isSuccess, isError }] = useEditUserProfileMutation()
	const profile = useTypedSelector(state => state.auth.user)
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IEditProfile>({
		mode: 'onChange',
	})

	useToastMutate(isSuccess, isError, 'Профиль обновлен')

	useEffect(() => {
		if (profile) {
			setValue('fullName', profile?.fullName)
			setValue('birthDate', DateHelper.to_DD_MM_YYYY(profile?.birthDate).yyyy_mm_dd)
		}
	}, [profile])

	const onSubmit: SubmitHandler<IEditProfile> = data => {
		editUserProfile({
			fullName: data.fullName,
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
				messageError={errors?.fullName?.message}
			/>
			<InputCustom
				label={'Email'}
				labelClassName='mt-3'
				value={profile?.email}
				disabled={true}
				name={'email'}
			/>

			<InputCustom
				label={'Дата рождения'}
				labelClassName='mt-3'
				name={'birthDate'}
				register={register}
				validateFn={ValidateHelper.birthDate}
				messageError={errors?.birthDate?.message}
				type='date'
			/>

			<div className={'w-100 d-flex justify-content-end'}>
				<ButtonCustom className='mt-3' text='Изменить' isLoading={isLoading} type='submit' />
			</div>
		</Form>
	)
}
