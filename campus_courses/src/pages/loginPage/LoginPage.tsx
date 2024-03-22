import { Container } from 'react-bootstrap'
import { LoginForm } from './widgets/LoginForm'

export default function LoginPage() {
	return (
		<Container className={'d-flex justify-content-center'}>
			<LoginForm />
		</Container>
	)
}
