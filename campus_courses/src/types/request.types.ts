export interface IGroupEdit {
	id: string
	name: string
}

export interface IGroupCreate {
	name: string
}

export interface IUserRegistration {
	fullName: string
	birthDate: string
	email: string
	password: string
	confirmPassword: string
}

export interface IEditUserProfile {
	fullName: string
	birthDate: string
}

export type CourseCreateType = {
	name: string
	startYear: number
	maximumStudentsCount: number
	semester: 'Spring' | 'Autumn'
	requirements: string
	annotations: string
	mainTeacherId: string
}

export interface ICourseEditStatus {
	courseId: string
	status: 'Started' | 'OpenForAssigning' | 'Created' | 'Finished'
}

export interface IDeleteCourse {
	courseId: string
}

export interface ICourseNotificationCreate {
	text: string
	isImportant: boolean
}

export type EditCourseTeacher = {
	requirements: string
	annotations: string
}

export type MarkType = 'Passed' | 'Failed'
export type MarkTime = 'Midterm' | 'Final'

export type SetMarkType = {
	markType: MarkTime
	mark: MarkType
}
