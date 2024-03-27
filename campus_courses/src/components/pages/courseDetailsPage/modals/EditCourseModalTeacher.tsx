import { useEffect } from 'react'
import { Button, Form, FormLabel, Modal } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useToastMutate } from '../../../../hooks/useToastMutate'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useEditCourseTeacherMutation } from '../../../../store/api/coursesApi'
import { EditCourseTeacher } from '../../../../types/request.types'
import { ButtonCustom } from '../../../shared/ButtonCustom'
import { ErrorMessage } from '../../../shared/ErrorMessage'
import { TextEditToolbar } from '../../../shared/TextEditToolbar'

interface IEditCourseModalProps {
	isShow: boolean
	onHide: () => void
}

export function EditCourseModalTeacher(props: IEditCourseModalProps) {
	const course = useTypedSelector(state => state.openedCourse.course)
	const [editCourse, { isLoading, isSuccess, isError }] = useEditCourseTeacherMutation()

	const {
		reset,
		register,
		control,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<EditCourseTeacher>({
		mode: 'onChange',
	})

	useEffect(() => {
		if (!isLoading) {
			props.onHide()
		}
	}, [isLoading])

	useToastMutate(isSuccess, isError, 'Курс изменён')

	useEffect(() => {
		register('annotations', { required: 'Обязательное поле' })
		register('requirements', { required: 'Обязательное поле' })
		if (props.isShow) {
			setValue('annotations', course?.annotations!)
			setValue('requirements', course?.requirements!)
		}
	}, [props.isShow])

	const onEditCourseByTeacher: SubmitHandler<EditCourseTeacher> = data => {
		editCourse({
			courseId: course?.id!,
			body: { annotations: data.annotations, requirements: data.requirements },
		})
	}

	return (
		<Modal size='lg' show={props.isShow} onHide={props.onHide}>
			<Modal.Header closeButton>Редактировать курс</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit(onEditCourseByTeacher)} id='editCourseTeacherForm'>
					<FormLabel className={'mt-3'}>Требования</FormLabel>
					<TextEditToolbar name='requirements' control={control} />
					{errors.requirements && <ErrorMessage text={errors.requirements.message} />}
					<FormLabel className={'mt-3'}>Аннотации</FormLabel>
					<TextEditToolbar name='annotations' control={control} />

					{errors.annotations && <ErrorMessage text={errors.annotations.message} />}
					<FormLabel className={'mt-3'}>Основной преподаватель курса</FormLabel>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button className='btn-secondary' onClick={props.onHide}>
					Отмена
				</Button>
				<ButtonCustom type='submit' form='editCourseTeacherForm' isLoading={isLoading} text='Сохранить' />
			</Modal.Footer>
		</Modal>
	)
}
