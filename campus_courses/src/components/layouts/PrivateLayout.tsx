import { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useGetUserProfileQuery, useGetUserRolesQuery } from '../../store/api/accountApi'
import { setAuth, setUser } from '../../store/slices/auth.slice'
import { AppDispatch } from '../../store/store'
import { Header } from './header/Header'
import { Loader } from './loader/Loader'

export interface ILayoutProps {
	children: ReactNode
}

export function PrivateLayout({ children }: ILayoutProps) {
	const dispatch = useDispatch<AppDispatch>()
	const {
		data: profile,
		isLoading: isLoadingProfile,
		error: profileError,
		refetch: refetchProfile,
	} = useGetUserProfileQuery('')
	const { data: roles, isLoading: isLoadingRoles, error: rolesError, refetch: refetchRoles } = useGetUserRolesQuery('')

	useEffect(() => {
		refetchProfile()
		refetchRoles()
	}, [children])

	useEffect(() => {
		if (!isLoadingProfile && !isLoadingRoles && profile && roles) {
			dispatch(setAuth(true))
			dispatch(
				setUser({
					...profile,
					roles,
				})
			)
		}
	}, [profile, roles])

	useEffect(() => {
		if (profileError || rolesError) {
			localStorage.removeItem('token')
			dispatch(setAuth(false))
			dispatch(setUser(null))
		}
	}, [profileError, rolesError])

	if (profileError || rolesError) {
		return <Navigate to={'/login'} replace />
	}

	return (
		<>
			<Header />
			{isLoadingProfile || isLoadingRoles ? <Loader /> : <>{children}</>}
		</>
	)
}
