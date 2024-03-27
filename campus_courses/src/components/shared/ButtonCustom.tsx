import { ButtonHTMLAttributes } from 'react'
import { Button } from 'react-bootstrap'
import Loading from 'react-loading'

interface IButtonCustomProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean
	text: string | undefined
}

export function ButtonCustom({ isLoading, text, ...other }: IButtonCustomProps) {
	return (
		<Button {...other} style={{ position: 'relative' }} disabled={isLoading}>
			{isLoading ? (
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
					}}>
					<Loading width={'25px'} height={'25px'} type='spin' />
				</div>
			) : null}
			<span className={isLoading ? 'invisible ' : 'visible '}>{text}</span>
		</Button>
	)
}
