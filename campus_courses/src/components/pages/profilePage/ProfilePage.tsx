import { Card, Container } from 'react-bootstrap'
import { ProfileForm } from './ProfileForm'

export default function ProfilePage() {
	return (
		<Container className='d-flex justify-content-center'>
			<Card className='w-75'>
				<Card.Header>
					<Card.Title>Профиль</Card.Title>
				</Card.Header>
				<Card.Body>
					<ProfileForm />
				</Card.Body>
			</Card>
		</Container>
	)
}
