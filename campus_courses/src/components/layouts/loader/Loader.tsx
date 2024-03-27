import { Container } from 'react-bootstrap'
import ReactLoading from 'react-loading'
export function Loader({ width = '10%' }) {
	return (
		<Container className='d-flex mt-5 justify-content-center'>
			<ReactLoading type={'spin'} color={'#5a92ed'} width={width} delay={0} />
		</Container>
	)
}
