import { FormEvent, useState } from 'react'
import { Button, Form, FormLabel, FormSelect, Modal } from 'react-bootstrap'
import { useToastMutate } from '../../../../hooks/useToastMutate'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useAddTeacherMutation } from '../../../../store/api/coursesApi'
import { useGetUsersQuery } from '../../../../store/api/usersApi'

type AddTeacherModalProps = {
	isShow: boolean
	onHide: () => void
}

export function AddTeacherModal(props: AddTeacherModalProps) {
	const courseId = useTypedSelector(state => state.openedCourse?.course?.id)
	const { data: users } = useGetUsersQuery('')
	const [addTeacher, { isSuccess, isError }] = useAddTeacherMutation()
	const [teacher, setTeacher] = useState('')
	useToastMutate(isSuccess, isError, 'Учитель добавлен')

	const onAddTeacher = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		addTeacher({ courseId: courseId!, userId: teacher })
		props.onHide()
	}

	return (
		<Modal size='lg' show={props.isShow} onHide={props.onHide}>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body>
				<Form id='addTeacherModal' onSubmit={onAddTeacher}>
					<FormLabel>Выберите преподавателя</FormLabel>
					<FormSelect
						onChange={e => {
							setTeacher(e.target.value)
						}}>
						<option value=''>Не выбрано</option>
						{users?.map(user => (
							<option key={user.id} value={user.id}>
								{user.fullName}
							</option>
						))}
					</FormSelect>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button className='btn-secondary' onClick={props.onHide}>
					Отмена
				</Button>
				<Button type={'submit'} form='addTeacherModal'>
					Сохранить
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
