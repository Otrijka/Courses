export interface ITokenResponse {
	token: string
}

export interface IProfileResponse {
	fullName: string
	email: string
	birthDate: string
}

export interface IRolesResponse {
	isTeacher: boolean
	isStudent: boolean
	isAdmin: boolean
}

export interface IGroupResponse {
	id: string
	name: string
}

export interface IGroupCoursesResponse {
	id: string
	name: string
	startYear: number
	maximumStudentsCount: number
	remainingSlotsCount: number
	status: 'Started' | 'OpenForAssigning' | 'Created' | 'Finished'
	semester: 'Spring' | 'Autumn'
}

export interface IStudent {
	id: string
	name: string
	email: string
	status: 'Accepted' | 'Declined' | 'InQueue'
	midtermResult: 'Failed' | 'NotDefined' | 'Passed'
	finalResult: 'Failed' | 'NotDefined' | 'Passed'
}

export interface ITeacher {
	email: string
	isMain: boolean
	name: string
}

export interface INotification {
	isImportant: boolean
	text: string
}

export enum CourseStatus {
	Created = 'Created',
	OpenForAssigning = 'OpenForAssigning',
	Started = 'Started',
	Finished = 'Finished',
}

export interface ICourseDetailsResponse extends Omit<IGroupCoursesResponse, 'remainingSlotsCount'> {
	studentsEnrolledCount: number
	studentsInQueueCount: number
	requirements: string
	annotations: string
	notifications: INotification[]
	students: IStudent[]
	teachers: ITeacher[]
}

export interface IUsersResponse {
	id: string
	fullName: string
}
