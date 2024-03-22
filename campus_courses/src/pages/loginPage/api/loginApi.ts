import { api } from '../../../store/api/api'

export interface IUserLogin {
	email: string
	password: string
}

const loginApi = api.injectEndpoints({
	endpoints: builder => ({
		loginUser: builder.mutation<any, IUserLogin>({
			query: loginData => ({
				url: '/login',
				body: loginData,
				method: 'POST',
			}),
			invalidatesTags: ['userProfile', 'userRoles', 'groupCourses'],
		}),
	}),
})

export const { useLoginUserMutation } = loginApi
