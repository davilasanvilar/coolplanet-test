import { useNavigate } from 'react-router-dom';
import { Icon } from './icon/Icon';

export function Header({ title, backPath }: { title: string, backPath?: string }) {

    const navigate = useNavigate()

    return (
        <header style={{ display: 'flex', gap: '8px', marginBottom:'12px'}}>
            {backPath && <button style={{ background: 'transparent' }}
                onClick={() => navigate(backPath)}><Icon type='chevron-left' /></button>}
            <h1>{title}</h1>
        </header>
    )
}