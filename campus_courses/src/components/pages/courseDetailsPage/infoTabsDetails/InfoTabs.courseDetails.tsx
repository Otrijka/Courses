import { Button, ListGroup, ListGroupItem, Tab, Tabs } from 'react-bootstrap'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'

import { useModal } from '../../../../hooks/useModal'
import { UserCourseRole } from '../../../../store/slices/course.slice'
import { CreateNotificationModal } from '../modals/CreateNotificationModal'
interface IInfoTabsCourseDetailsProps {
	className?: string
}

export function InfoTabsCourseDetails(props: IInfoTabsCourseDetailsProps) {
	const { course, userCourseRole } = useTypedSelector(state => state.openedCourse)
	const { isShow, onHide, onShow } = useModal()
	return (
		<>
			<CreateNotificationModal isShow={isShow} onHide={onHide} />
			<Tabs fill className={props.className} defaultActiveKey={'requirements'}>
				<Tab className={'border'} title={'Требования к курсу'} eventKey={'requirements'}>
					{course?.requirements && (
						<div className={'mt-3 mb-3 ms-3'}>
							<div dangerouslySetInnerHTML={{ __html: course.requirements }} />
						</div>
					)}
				</Tab>
				<Tab className={'border'} title={'Аннотация'} eventKey={'annotation'}>
					{course?.annotations && (
						<div className={'mt-3 mb-3 ms-3'}>
							<div dangerouslySetInnerHTML={{ __html: course.annotations }} />
						</div>
					)}
				</Tab>
				<Tab
					className={'border'}
					title={
						!course?.notifications.length ? (
							'Уведомления'
						) : (
							<div>
								Уведомления
								<span className={'ms-1 badge rounded-pill bg-danger'}>
									{course.notifications.length > 3 ? '3+' : course.notifications.length}
								</span>
							</div>
						)
					}
					eventKey={'notifications'}>
					{[UserCourseRole.Admin, UserCourseRole.MainTeacher, UserCourseRole.Teacher].includes(userCourseRole!) && (
						<Button size={'sm'} className={'mt-3 ms-3 mb-3'} onClick={onShow}>
							СОЗДАТЬ УВЕДОМЛЕНИЕ
						</Button>
					)}
					<ListGroup>
						{course?.notifications
							.slice()
							.reverse()
							.map((notify, index) => (
								<ListGroupItem
									key={index}
									className={
										notify.isImportant
											? 'bg-danger-subtle text-danger rounded-0 border-0 border-bottom border-secondary'
											: 'border-bottom-2 rounded-0'
									}>
									{notify.text}
								</ListGroupItem>
							))}
					</ListGroup>
				</Tab>
			</Tabs>
		</>
	)
}
