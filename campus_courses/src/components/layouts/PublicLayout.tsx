import { ILayoutProps } from './PrivateLayout'
import { Header } from './header/Header'

export function PublicLayout({ children }: ILayoutProps) {
	return (
		<>
			<Header />
			{children}
		</>
	)
}
