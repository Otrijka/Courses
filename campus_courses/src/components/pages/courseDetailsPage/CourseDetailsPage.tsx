import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useGetCourseDetailsQuery } from '../../../store/api/coursesApi'
import { UserCourseRole, setCourse } from '../../../store/slices/course.slice'
import { AppDispatch } from '../../../store/store'
import { Loader } from '../../layouts/loader/Loader'
import { CommonCourseDetails } from './commonDetails/Common.courseDetails'
import { InfoTabsCourseDetails } from './infoTabsDetails/InfoTabs.courseDetails'
import { MemberTabsDetails } from './memberTabsDetails/MemberTabsDetails'

export default function CourseDetailsPage() {
	const dispatch = useDispatch<AppDispatch>()
	const user = useTypedSelector(state => state.auth.user)
	const { id: courseId } = useParams<{ id: string }>()
	const { data: courseDetails, isLoading, error } = useGetCourseDetailsQuery({ id: courseId })

	useEffect(() => {
		if (courseDetails) {
			const isTeacher = courseDetails.teachers.find(t => t.email === user?.email)
			const isStudent = courseDetails.students.find(s => s.email === user?.email)

			let role: UserCourseRole = UserCourseRole.Student
			if (!user?.roles.isTeacher && !user?.roles.isStudent) {
				role = UserCourseRole.Student
			}
			if (isTeacher && isTeacher.isMain) {
				role = UserCourseRole.MainTeacher
			}
			if (isTeacher && !isTeacher.isMain) {
				role = UserCourseRole.Teacher
			}
			if (isStudent && isStudent.status === 'Accepted') {
				role = UserCourseRole.Accepted
			}
			if (isStudent && isStudent.status === 'InQueue') {
				role = UserCourseRole.InQueue
			}
			if (isStudent && isStudent.status === 'Declined') {
				role = UserCourseRole.Declined
			}
			if (user?.roles.isAdmin) {
				role = UserCourseRole.Admin
			}

			dispatch(
				setCourse({
					course: courseDetails!,
					userCourseRole: role,
				})
			)
		} else {
			dispatch(setCourse({ course: null, userCourseRole: null }))
		}
	}, [courseDetails])

	if (isLoading) {
		return <Loader />
	}
	if (error) {
		return <Container className={'text-center text-danger'}>Такого курса не существует</Container>
	}

	if (courseDetails) {
		return (
			<Container>
				<CommonCourseDetails />
				<InfoTabsCourseDetails className={'mt-3'} />
				<MemberTabsDetails className={'mt-3'} />
			</Container>
		)
	} else {
		return <>Что-то пошло не так...</>
	}
}
