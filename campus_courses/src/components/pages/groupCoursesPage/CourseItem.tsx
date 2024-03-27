import { Col, ListGroupItem, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { IGroupCoursesResponse } from '../../../types/response.types'

export function CourseItem(props: IGroupCoursesResponse) {
	return (
		<ListGroupItem>
			<Row>
				<Col>
					<Link to={`/courses/${props.id}`} className={'nav-link fw-bolder fs-5'}>
						{props.name}
					</Link>
				</Col>
				<Col className={'text-success fw-bold text-end'}>
					{props.status === 'Started' ? (
						<span className={'text-primary'}>В процессе обучения</span>
					) : props.status === 'OpenForAssigning' ? (
						<span className={'text-success'}>Открыт для записи</span>
					) : props.status === 'Created' ? (
						<span className={'text-secondary'}>Создан</span>
					) : props.status === 'Finished' ? (
						<span className={'text-danger'}>Закрыт</span>
					) : (
						<></>
					)}
				</Col>
			</Row>
			<div className={'mt-1'}>
				Учебный год - <span>{props.startYear}</span>
			</div>
			<div>Семестр - {props.semester === 'Autumn' ? <span> Осенний </span> : <span> Весенний </span>}</div>
			<div className={'text-muted mt-1'}>Мест всего - {props.maximumStudentsCount}</div>
			<div className={'text-muted'}>Мест свободно - {props.remainingSlotsCount}</div>
		</ListGroupItem>
	)
}
