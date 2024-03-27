import { Card, Container } from 'react-bootstrap'
import { RegistrationForm } from './RegistrationForm'

export default function RegistrationPage() {
	return (
		<Container className={'d-flex justify-content-center'}>
			<Card className={'w-75'}>
				<Card.Header>
					<Card.Title>Регистрация нового пользователя</Card.Title>
				</Card.Header>
				<Card.Body>
					<RegistrationForm />
				</Card.Body>
			</Card>
		</Container>
	)
}
