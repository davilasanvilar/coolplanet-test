import { User } from '../types/types';

export function UserCard({ user }: { user: User }) {

    return (
        <article>
            <h2>{`${user.first_name} ${user.last_name}`}</h2>
            <p>{`Email: ${user.email}`}</p>
            <p>{`Birthdate: ${user.dob}`}</p>
            <p>{`Company: ${user.company.name} (${user.company.department})`}</p>
            <p>{`Skills: ${user.skills.join(", ")}`}</p>
        </article>
    )
}
