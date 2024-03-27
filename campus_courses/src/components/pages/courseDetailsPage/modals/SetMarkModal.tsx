import { FormEvent, useState } from 'react'
import { Button, Form, FormCheck, FormLabel, Modal } from 'react-bootstrap'
import { useToastMutate } from '../../../../hooks/useToastMutate'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useSetMarkMutation } from '../../../../store/api/coursesApi'
import { MarkTime, MarkType } from '../../../../types/request.types'
import { IStudent } from '../../../../types/response.types'

type SetMarkModalProps = {
	isShow: boolean
	onHide: () => void
	markTime: MarkTime
	student: IStudent
}

export function SetMarkModal(props: SetMarkModalProps) {
	const courseId = useTypedSelector(state => state.openedCourse.course?.id)
	const [setStudentMark, { isSuccess, isError }] = useSetMarkMutation()
	const [mark, setMark] = useState<MarkType | null>()

	useToastMutate(isSuccess, isError, 'Оценка поставлена')

	const onSetMark = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!mark) return
		setStudentMark({
			courseId: courseId!,
			studentId: props.student.id,
			body: { mark, markType: props.markTime },
		})
		setMark(null)
		props.onHide()
	}

	return (
		<Modal show={props.isShow} onHide={props.onHide}>
			<Modal.Header closeButton>
				Изменение оценки для "{props.markTime === 'Final' ? 'Финальная аттестация' : 'Промежуточная аттестация'}"
			</Modal.Header>
			<Modal.Body>
				<Form id='setMarkForm' onSubmit={onSetMark}>
					<FormLabel>Студент - {props.student && props.student.name}</FormLabel>
					<FormCheck
						id='mark_1'
						name='mark'
						type='radio'
						label='Пройдено'
						checked={mark === 'Passed'}
						onChange={() => {
							setMark('Passed')
						}}
					/>
					<FormCheck
						id='mark_2'
						name='mark'
						type='radio'
						label='Зафейлено'
						onChange={() => {
							setMark('Failed')
						}}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button className='btn-secondary' onClick={props.onHide}>
					Отмена
				</Button>
				<Button type='submit' form='setMarkForm'>
					Сохранить
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
