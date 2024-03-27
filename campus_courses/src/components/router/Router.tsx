import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { PrivateLayout } from '../layouts/PrivateLayout'
import { PublicLayout } from '../layouts/PublicLayout'
import { Header } from '../layouts/header/Header'
//import { CourseDetailsPage } from '../pages/courseDetailsPage/CourseDetailsPage'
import { Loader } from '../layouts/loader/Loader'
import GreetingPage from '../pages/greetingPage/GreetingPage'
//import { GroupCoursesPage } from '../pages/groupCoursesPage/GroupCoursesPage'
//import { GroupsPage } from '../pages/groupsPage/GroupsPage'
//import LoginPage from '../pages/loginPage/LoginPage'
//import { MyCoursesPage } from '../pages/myCoursesPage/MyCoursesPage'
//import { ProfilePage } from '../pages/profilePage/ProfilePage'
//import { RegistrationPage } from '../pages/registrationPage/RegistrationPage'
//import { TeachingCoursesPage } from '../pages/teachingCoursesPage/TeachingCoursesPage'

const LoginPage = lazy(() => import('../pages/loginPage/LoginPage'))
const CourseDetailsPage = lazy(() => import('../pages/courseDetailsPage/CourseDetailsPage'))
// const GreetingPage = lazy(() => import('../pages/greetingPage/GreetingPage'))
const GroupCoursesPage = lazy(() => import('../pages/groupCoursesPage/GroupCoursesPage'))
const GroupsPage = lazy(() => import('../pages/groupsPage/GroupsPage'))
const MyCoursesPage = lazy(() => import('../pages/myCoursesPage/MyCoursesPage'))
const ProfilePage = lazy(() => import('../pages/profilePage/ProfilePage'))
const RegistrationPage = lazy(() => import('../pages/registrationPage/RegistrationPage'))
const TeachingCoursesPage = lazy(() => import('../pages/teachingCoursesPage/TeachingCoursesPage'))

export function Router() {
	return (
		<Suspense
			fallback={
				<>
					<Header />
					<Loader />
				</>
			}>
			<Routes>
				<Route path='/' element={<PrivateLayout children={<GreetingPage />} />} />
				<Route path='/groups' element={<PrivateLayout children={<GroupsPage />} />} />
				<Route path='/groups/:id' element={<PrivateLayout children={<GroupCoursesPage />} />} />
				<Route path='/courses/my' element={<PrivateLayout children={<MyCoursesPage />} />} />
				<Route path='/courses/teaching' element={<PrivateLayout children={<TeachingCoursesPage />} />} />
				<Route path='/courses/:id' element={<PrivateLayout children={<CourseDetailsPage />} />} />
				<Route path='/profile' element={<PrivateLayout children={<ProfilePage />} />} />
				<Route path='/login' element={<PublicLayout children={<LoginPage />} />} />
				<Route path='/registration' element={<PublicLayout children={<RegistrationPage />} />} />
				<Route path='*' element={<PublicLayout children={<>Not found</>} />} />
			</Routes>
		</Suspense>
	)
}
