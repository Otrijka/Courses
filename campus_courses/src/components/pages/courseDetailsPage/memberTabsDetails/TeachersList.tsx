import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { ITeacher } from '../../../../types/response.types'

interface ITeachersListProps {
	teachers: ITeacher[]
}
export function TeachersList(props: ITeachersListProps) {
	return (
		<ListGroup>
			{props.teachers.map(teacher => (
				<ListGroupItem key={teacher.email} className={'border-0 border-bottom'}>
					<div className={'fw-bold'}>
						{teacher.name}
						{teacher.isMain && <span className={'ms-1 badge bg-success'}>основной</span>}
					</div>
					<div className={'text-muted'}>{teacher.email}</div>
				</ListGroupItem>
			))}
		</ListGroup>
	)
}
