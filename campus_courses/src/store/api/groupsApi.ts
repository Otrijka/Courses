import { IGroupCreate, IGroupEdit } from '../../types/request.types'
import { IGroupResponse } from '../../types/response.types'
import { api } from './api'

export const groupsApi = api.injectEndpoints({
	endpoints: builder => ({
		getGroups: builder.query<IGroupResponse[], any>({
			query: () => ({
				url: '/groups',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}),
			providesTags: ['groups'],
		}),
		createGroup: builder.mutation<any, IGroupCreate>({
			query: (data: IGroupCreate) => ({
				url: `/groups`,
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
				body: data,
				method: 'POST',
			}),
			invalidatesTags: ['groups'],
		}),
		editGroup: builder.mutation<any, IGroupEdit>({
			query: (data: IGroupEdit) => ({
				url: `/groups/${data.id}`,
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
				body: { name: data.name },
				method: 'PUT',
			}),
			invalidatesTags: ['groups'],
		}),
		deleteGroup: builder.mutation<any, { id: string }>({
			query: ({ id }) => ({
				url: `/groups/${id}`,
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
				method: 'DELETE',
			}),
			invalidatesTags: ['groups'],
		}),
	}),
})

export const { useGetGroupsQuery, useEditGroupMutation, useDeleteGroupMutation, useCreateGroupMutation } = groupsApi
