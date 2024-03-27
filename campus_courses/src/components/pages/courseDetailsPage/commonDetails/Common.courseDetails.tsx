import { useEffect } from 'react'
import { Button, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../../../hooks/useModal'
import { useToastMutate } from '../../../../hooks/useToastMutate'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useDeleteCourseMutation, useSignUpToCourseMutation } from '../../../../store/api/coursesApi'
import { UserCourseRole } from '../../../../store/slices/course.slice'
import { ButtonCustom } from '../../../shared/ButtonCustom'
import { ChangeStatusModal } from '../modals/ChangeStatusModal'
import { EditCourseModalAdmin } from '../modals/EditCourseModalAdmin'
import { EditCourseModalTeacher } from '../modals/EditCourseModalTeacher'
import { StatisticModal } from '../modals/StatisticModal'

export function CommonCourseDetails() {
	const navigation = useNavigate()
	const { course, userCourseRole } = useTypedSelector(state => state?.openedCourse)
	const [signUp, { isSuccess: isSuccessSignUp, isError: isErrorSignUp }] = useSignUpToCourseMutation()
	const [deleteCourse, { isLoading: isLoadingDelete, isSuccess: isSuccessDeleteCourse, isError: isErrorDeleteCourse }] =
		useDeleteCourseMutation()

	useToastMutate(isSuccessSignUp, isErrorSignUp, 'Заявка подана')
	useToastMutate(isSuccessDeleteCourse, isErrorDeleteCourse, 'Курс удалён')

	const { isShow: isShowEditStatus, onHide: onHideEditStatus, onShow: onShowEditStatus } = useModal()
	const { isShow: isShowEditCourse, onHide: onHideEditCourse, onShow: onShowEditCourse } = useModal()
	const { isShow: isShowStatistics, onHide: onHideStatistics, onShow: onShowStatistics } = useModal()
	useEffect(() => {
		if (isSuccessDeleteCourse) {
			navigation(-1)
		}
	}, [isSuccessDeleteCourse])

	if (!course || !userCourseRole) {
		return <>Ошибка данных курса</>
	}

	const onDeleteCourse = () => {
		deleteCourse({ courseId: course.id })
	}

	return (
		<>
			{userCourseRole === UserCourseRole.Admin ? (
				<EditCourseModalAdmin isShow={isShowEditCourse} onHide={onHideEditCourse} />
			) : (
				<EditCourseModalTeacher isShow={isShowEditCourse} onHide={onHideEditCourse} />
			)}

			<StatisticModal isShow={isShowStatistics} onHide={onHideStatistics} />
			<ChangeStatusModal isShow={isShowEditStatus} onHide={onHideEditStatus} />
			<div className={'fs-2 fw-bold'}>{course.name}</div>
			<div className={'d-flex align-items-end justify-content-between'}>
				<div className={'fw-bold mt-1'}>Основные данные курса</div>
				{[UserCourseRole.Admin, UserCourseRole.MainTeacher, UserCourseRole.Teacher].includes(userCourseRole) && (
					<Button className={'btn-warning ms-auto me-3'} onClick={onShowEditCourse}>
						РЕДАКТИРОВАТЬ
					</Button>
				)}
				{userCourseRole === UserCourseRole.Admin && (
					<ButtonCustom
						text='УДАЛИТЬ'
						className={'btn-danger me-3'}
						onClick={onDeleteCourse}
						isLoading={isLoadingDelete}
					/>
				)}
			</div>
			<ListGroup className={'mt-2'}>
				<ListGroupItem>
					<Row className={'d-flex align-content-stretch'}>
						<Col>
							<div className={'fw-bold'}>Статус курса</div>
							<div className={'text-success'}>
								{course.status === 'Started' ? (
									<span className={'text-primary'}>в процессе обучения</span>
								) : course.status === 'OpenForAssigning' ? (
									<span className={'text-success'}>Открыт для записи</span>
								) : course.status === 'Created' ? (
									<span className={'text-secondary'}>Создан</span>
								) : course.status === 'Finished' ? (
									<span className={'text-danger'}>Закрыт</span>
								) : (
									<></>
								)}
							</div>
						</Col>
						<Col className={'text-end'}>
							{[UserCourseRole.Admin, UserCourseRole.MainTeacher, UserCourseRole.Teacher].includes(userCourseRole) && (
								<div>
									<Button className={'btn-warning h-100'} onClick={onShowEditStatus}>
										ИЗМЕНИТЬ
									</Button>
									{course.students.some(s => s.status === 'Accepted') && (
										<Button className={'btn-secondary h-100 ms-3'} onClick={onShowStatistics}>
											СТАТИСТИКА
										</Button>
									)}
								</div>
							)}
							{course.status === 'OpenForAssigning' && userCourseRole === UserCourseRole.Student && (
								<Button
									className='btn-success h-100'
									onClick={() => {
										signUp({ courseId: course.id })
									}}>
									ЗАПИСАТЬСЯ НА КУРС
								</Button>
							)}
							{course.status === 'OpenForAssigning' && userCourseRole === UserCourseRole.InQueue && (
								<Button className='btn-primary h-100'>В ОЧЕРЕДИ</Button>
							)}
							{course.status === 'OpenForAssigning' && userCourseRole === UserCourseRole.Declined && (
								<Button className='btn-danger h-100'>ОТКАЗАНО</Button>
							)}
						</Col>
					</Row>
				</ListGroupItem>
				<ListGroupItem>
					<Row className={'d-flex align-content-stretch'}>
						<Col>
							<div className={'fw-bold'}>Учебный год</div>
							<div>{course?.startYear}</div>
						</Col>
						<Col>
							<div className={'fw-bold'}>Семестр</div>
							<div>{course?.semester === 'Autumn' ? 'Осенний' : 'Весенний'}</div>
						</Col>
					</Row>
				</ListGroupItem>
				<ListGroupItem>
					<Row className={'d-flex align-content-stretch'}>
						<Col>
							<div className={'fw-bold'}>Всего мест</div>
							<div>{course.maximumStudentsCount}</div>
						</Col>
						<Col>
							<div className={'fw-bold'}>Студентов зачислено</div>
							<div>{course.studentsEnrolledCount}</div>
						</Col>
					</Row>
				</ListGroupItem>
				<ListGroupItem>
					<Row className={'d-flex align-content-stretch'}>
						<Col>
							<div className={'fw-bold'}>Заявок на рассмотрении</div>
							<div>{course.studentsInQueueCount}</div>
						</Col>
					</Row>
				</ListGroupItem>
			</ListGroup>
		</>
	)
}
