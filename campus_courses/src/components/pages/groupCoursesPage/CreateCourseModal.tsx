import { useEffect, useState } from 'react'
import {
	Button,
	Form,
	FormCheck,
	FormControl,
	FormLabel,
	FormSelect,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { ValidateHelper } from '../../../helpers/ValidateHelper'
import { useToastMutate } from '../../../hooks/useToastMutate'
import { useCreateCourseMutation } from '../../../store/api/coursesApi'
import { useGetUsersQuery } from '../../../store/api/usersApi'
import { CourseCreateType } from '../../../types/request.types'
import { ButtonCustom } from '../../shared/ButtonCustom'
import { ErrorMessage } from '../../shared/ErrorMessage'
import { TextEditToolbar } from '../../shared/TextEditToolbar'

interface ICreateCourseModalProps {
	isShow: boolean
	onHide: () => void
}

export function CreateCourseModal(props: ICreateCourseModalProps) {
	const groupId = useParams()
	const [createCourse, { isLoading, isSuccess, isError }] =
		useCreateCourseMutation()
	const { data: users } = useGetUsersQuery('')
	const [reqsIsValid, setReqsIsValid] = useState(true)
	const [ansIsValid, setAnsIsValid] = useState(true)
	const {
		register,
		reset,
		getValues,
		setValue,
		formState: { errors },
		handleSubmit,
	} = useForm<CourseCreateType>({
		mode: 'onChange',
	})

	useEffect(() => {
		if (!isLoading) {
			onModalHide()
		}
	}, [isLoading])

	useToastMutate(isSuccess, isError, 'Курс создан')

	const onModalHide = () => {
		props.onHide()
		reset()
	}

	const onCreateCourse: SubmitHandler<CourseCreateType> = data => {
		if (getValues('annotations').length) {
			setAnsIsValid(false)
		}
		if (getValues('requirements').length) {
			setReqsIsValid(false)
		}

		if (!ansIsValid || !reqsIsValid) {
			return
		}

		setAnsIsValid(true)
		setReqsIsValid(true)
		createCourse({ groupId: groupId.id, body: data })
	}

	return (
		<Modal show={props.isShow} onHide={onModalHide} size={'lg'}>
			<ModalHeader closeButton>
				<ModalTitle>Создание курса</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit(onCreateCourse)} id={'createCourseForm'}>
					<FormLabel>Название курса</FormLabel>
					<FormControl
						{...register('name', { validate: ValidateHelper.courseName })}
					/>
					{errors.name && <ErrorMessage text={errors.name.message} />}
					<FormLabel className={'mt-3'}>Год начала курса</FormLabel>
					<FormControl
						{...register('startYear', {
							required: 'Обязательное поле',
							min: {
								value: new Date().getFullYear(),
								message: `Год не меньше ${new Date().getFullYear()}`,
							},
							max: {
								value: new Date().getFullYear() + 5,
								message: `Год не больше ${new Date().getFullYear() + 5}`,
							},
						})}
						type='number'
					/>
					{errors.startYear && <ErrorMessage text={errors.startYear.message} />}
					<FormLabel className={'mt-3'}>Общее количество мест</FormLabel>
					<FormControl
						{...register('maximumStudentsCount', {
							required: 'Обязательное поле',
							min: {
								value: 1,
								message: 'Не меньше 1',
							},
							max: {
								value: 200,
								message: 'Не больше 200',
							},
						})}
						type={'number'}
					/>
					{errors.maximumStudentsCount && (
						<ErrorMessage text={errors.maximumStudentsCount.message} />
					)}
					<FormLabel className={'mt-3'}>Семестр</FormLabel>
					<div className={'d-flex gap-3'}>
						<FormCheck
							{...register('semester')}
							defaultChecked
							name={'semester'}
							type={'radio'}
							value={'Autumn'}
							label={'Осенний'}
						/>
						<FormCheck
							{...register('semester')}
							name={'semester'}
							type={'radio'}
							value={'Spring'}
							label={'Весенний'}
						/>
					</div>
					<FormLabel className={'mt-3'}>Требования</FormLabel>
					<TextEditToolbar
						value={getValues('requirements')}
						handleChange={(value: string) => setValue('requirements', value)}
					/>
					{!reqsIsValid && <ErrorMessage text='Обязательное поле' />}
					<FormLabel className={'mt-3'}>Аннотации</FormLabel>
					<TextEditToolbar
						value={getValues('annotations')}
						handleChange={(value: string) => setValue('annotations', value)}
					/>
					{!ansIsValid && <ErrorMessage text='Обязательное поле' />}
					<FormLabel className={'mt-3'}>Основной преподаватель курса</FormLabel>
					<FormSelect
						{...register('mainTeacherId', { required: 'Обязательное поле' })}
					>
						<option value=''>Не выбрано</option>
						{users?.map(user => (
							<option key={user.id} value={user.id}>
								{user.fullName}
							</option>
						))}
					</FormSelect>
					{errors.mainTeacherId && (
						<ErrorMessage text={errors.mainTeacherId.message} />
					)}
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button className={'btn-secondary'} onClick={onModalHide}>
					Отмена
				</Button>
				<ButtonCustom
					form={'createCourseForm'}
					type={'submit'}
					text='Создать'
					isLoading={isLoading}
				/>
			</ModalFooter>
		</Modal>
	)
}
