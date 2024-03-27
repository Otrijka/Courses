import { Button, Form, Modal } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ValidateHelper } from '../../../../helpers/ValidateHelper'
import { useToastMutate } from '../../../../hooks/useToastMutate'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useCreateNotificationMutation } from '../../../../store/api/coursesApi'
import { ICourseNotificationCreate } from '../../../../types/request.types'
import { InputCustom } from '../../../shared/InputCustom'

type ICreateNotificationModalProps = {
	isShow: boolean
	onHide: () => void
}

export function CreateNotificationModal(props: ICreateNotificationModalProps) {
	const courseId = useTypedSelector(state => state.openedCourse.course?.id!)
	const [createNotify, { isSuccess, isError }] = useCreateNotificationMutation()
	useToastMutate(isSuccess, isError, 'Уведомление создано')

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<ICourseNotificationCreate>({
		mode: 'onChange',
	})

	const onCreateNotification: SubmitHandler<ICourseNotificationCreate> = data => {
		createNotify({ courseId: courseId, body: data })
		props.onHide()
		reset()
	}
	return (
		<Modal show={props.isShow} onHide={props.onHide}>
			<Modal.Header closeButton>Создание уведомления</Modal.Header>
			<Modal.Body>
				<Form id='createNotifyForm' onSubmit={handleSubmit(onCreateNotification)}>
					<InputCustom
						name='text'
						label={'Текст'}
						register={register}
						validateFn={ValidateHelper.required}
						messageError={errors.text?.message}
						as='textarea'
						rows={3}
					/>
					<Form.Check
						{...register('isImportant')}
						className='mt-2'
						type='checkbox'
						label='Важное'
						id={'is_important'}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button className='btn-secondary' onClick={props.onHide}>
					Отмена
				</Button>
				<Button form='createNotifyForm' type='submit'>
					Сохранить
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
