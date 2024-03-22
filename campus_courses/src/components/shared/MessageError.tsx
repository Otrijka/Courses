import { ReactNode } from 'react'

interface IMessageErrorProps {
	children?: ReactNode
}

export function MessageError({ children }: IMessageErrorProps) {
	return <div className='text-danger small'>{children}</div>
}
