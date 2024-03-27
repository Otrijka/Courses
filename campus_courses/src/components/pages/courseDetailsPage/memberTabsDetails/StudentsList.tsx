import { useState } from 'react'
import { Button, Col, ListGroup, ListGroupItem, NavLink, Row } from 'react-bootstrap'
import { useModal } from '../../../../hooks/useModal'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useSetNewStudentStatusMutation } from '../../../../store/api/coursesApi'
import { UserCourseRole } from '../../../../store/slices/course.slice'
import { MarkTime } from '../../../../types/request.types'
import { IStudent } from '../../../../types/response.types'
import { SetMarkModal } from '../modals/SetMarkModal'

interface IStudentsListProps {
	students: IStudent[]
}
export function StudentsList(props: IStudentsListProps) {
	const [setUserStatus] = useSetNewStudentStatusMutation()
	const { isShow, onHide, onShow } = useModal()
	const { course, userCourseRole } = useTypedSelector(state => state.openedCourse)

	const [checkedStudent, setCheckedUser] = useState<{
		student: IStudent
		markTime: MarkTime
	} | null>(null)

	const handleChangeStudentStatus = (status: 'Accepted' | 'Declined', userId: string) => {
		setUserStatus({ status, courseId: course?.id!, userId })
	}

	return (
		<>
			<SetMarkModal
				isShow={isShow}
				onHide={onHide}
				markTime={checkedStudent?.markTime!}
				student={checkedStudent?.student!}
			/>
			<ListGroup>
				{props.students.map(student => (
					<ListGroupItem key={student.id} className={'border-0 border-bottom'}>
						<Row>
							<Col sm={12} md={4}>
								<div>{student.name}</div>
								<div>
									<span className={'text-muted'}>Статус - </span>
									{student.status === 'Accepted' ? (
										<span className={'text-success'}>принят в группу</span>
									) : student.status === 'Declined' ? (
										<span className={'text-danger'}>отклонен</span>
									) : (
										<span className={'text-primary'}>в очереди</span>
									)}
								</div>
								<div className={'text-muted'}>{student.email}</div>
							</Col>
							{student.status === 'Accepted' && student.midtermResult && (
								<>
									<Col sm={12} md={4} className={' mt-2 mt-md-0'}>
										<NavLink
											onClick={() => {
												setCheckedUser({
													student: student,
													markTime: 'Midterm',
												})
												onShow()
											}}
											className={
												[UserCourseRole.Admin, UserCourseRole.Teacher, UserCourseRole.MainTeacher].includes(
													userCourseRole!
												)
													? 'link-primary d-inline'
													: 'disabled d-inline'
											}>
											Промежуточная аттестация -
										</NavLink>
										{student.midtermResult === 'Passed' ? (
											<span className={'ms-1 badge bg-success'}>Пройдена</span>
										) : student.midtermResult === 'Failed' ? (
											<span className={'ms-1 badge bg-danger'}>Провалена</span>
										) : student.midtermResult === 'NotDefined' ? (
											<span className={'ms-1 badge bg-secondary'}>Нет отметки</span>
										) : (
											<></>
										)}
									</Col>
									<Col sm={12} md={4}>
										<NavLink
											onClick={() => {
												setCheckedUser({
													student: student,
													markTime: 'Final',
												})
												onShow()
											}}
											className={
												[UserCourseRole.Admin, UserCourseRole.Teacher, UserCourseRole.MainTeacher].includes(
													userCourseRole!
												)
													? 'link-primary d-inline'
													: 'disabled d-inline'
											}>
											Финальная аттестация -
										</NavLink>
										{student.finalResult === 'Passed' ? (
											<span className={'ms-1 badge bg-success'}>Пройдена</span>
										) : student.finalResult === 'Failed' ? (
											<span className={'ms-1 badge bg-danger'}>Провалена</span>
										) : student.finalResult === 'NotDefined' ? (
											<span className={'ms-1 badge bg-secondary'}>Нет отметки</span>
										) : (
											<></>
										)}
									</Col>
								</>
							)}
							{student.status === 'InQueue' && (
								<Col
									sm={12}
									md={8}
									className={'d-flex align-content-stretch justify-content-start justify-content-md-end'}>
									<Button
										onClick={() => {
											handleChangeStudentStatus('Accepted', student.id)
										}}>
										Принять
									</Button>
									<Button
										className={'ms-3 btn-danger'}
										onClick={() => {
											handleChangeStudentStatus('Declined', student.id)
										}}>
										Отклонить заявку
									</Button>
								</Col>
							)}
						</Row>
					</ListGroupItem>
				))}
			</ListGroup>
		</>
	)
}
