import { User } from '../../types/types';
import { Icon } from '../icon/Icon';
import { CardField } from './CardField';

export function UserCard({ user }: { user: User }) {

    return (
        <article style={{
            display: 'flex', flexDirection: 'column', gap: '12px', borderRadius: '8px', background: '#333333',
            padding: '16px 24px', maxWidth: '100%'
        }}>
            <div style={{ display: 'flex', alignItems: 'end', marginBottom: '8px' }}>
                {user.avatar && <img style={{ width: '75px', height: '75px', borderRadius: '50%' }} src={user.avatar} alt='avatar' />}
                <h2>{`${user.first_name} ${user.last_name}`}</h2></div>
            <CardField label='Full name'>{`${user.first_name} ${user.last_name}`}</CardField>
            <CardField label='Email'>{<>{`${user.email}`}
                {user.emailVerified && <Icon title='Email verified' style={{ color: '#59ab59' }} type='check' />} </>}
            </CardField>
            <CardField label='Birthdate'>{user.dob}</CardField>
            <CardField label='Company'>{`${user.company.name} (${user.company.department})`}</CardField>
            <CardField label='Skills'>{user.skills.join(", ")}</CardField>
        </article>
    )
}