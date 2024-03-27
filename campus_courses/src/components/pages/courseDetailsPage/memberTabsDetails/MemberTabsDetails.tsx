import { Button, Tab, Tabs } from 'react-bootstrap'
import { useModal } from '../../../../hooks/useModal'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { UserCourseRole } from '../../../../store/slices/course.slice'
import { AddTeacherModal } from '../modals/AddTeacherModal'
import { StudentsList } from './StudentsList'
import { TeachersList } from './TeachersList'

interface IMemberTabsDetailsProps {
	className?: string
}

export function MemberTabsDetails(props: IMemberTabsDetailsProps) {
	const { course, userCourseRole } = useTypedSelector(state => state.openedCourse)
	const { isShow, onHide, onShow } = useModal()

	if (!course?.students || !course?.teachers) {
		return <></>
	}

	return (
		<>
			<AddTeacherModal isShow={isShow} onHide={onHide} />
			<Tabs fill className={props.className} defaultActiveKey={'Students'}>
				<Tab className={'border mb-3'} title={'Студенты'} eventKey={'Students'}>
					<StudentsList students={course.students} />
				</Tab>
				<Tab className={'border'} title={'Преподаватели'} eventKey={'Teachers'}>
					{[UserCourseRole.Admin, UserCourseRole.MainTeacher].includes(userCourseRole!) && (
						<Button size={'sm'} className={'ms-3 mb-3 mt-3'} onClick={onShow}>
							ДОБАВИТЬ ПРЕПОДАВАТЕЛЯ
						</Button>
					)}
					<TeachersList teachers={course.teachers} />
				</Tab>
			</Tabs>
		</>
	)
}
