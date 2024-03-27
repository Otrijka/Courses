import { Button, Container, ListGroup } from 'react-bootstrap'
import { useModal } from '../../../hooks/useModal'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useGetGroupsQuery } from '../../../store/api/groupsApi'
import { Loader } from '../../layouts/loader/Loader'
import { CreateGroupItemModal } from './CreateGroupItemModal'
import { GroupsItem } from './GroupsItem'

export default function GroupsPage() {
	const { data: groups, isLoading } = useGetGroupsQuery('')
	const userRoles = useTypedSelector(state => state.auth.user?.roles)

	const { isShow, onHide, onShow } = useModal()

	if (isLoading) {
		return <Loader />
	}
	return (
		<Container>
			<CreateGroupItemModal isShow={isShow} onHide={onHide} />
			<div className={'fw-bold fs-2'}>Группы кампусных курсов</div>
			{userRoles?.isAdmin && (
				<Button className={'mt-1'} onClick={onShow}>
					Создать
				</Button>
			)}
			<ListGroup className={'mt-3'}>
				{groups && groups.map(group => <GroupsItem key={group.id} id={group.id} name={group.name} />)}
			</ListGroup>
		</Container>
	)
}
