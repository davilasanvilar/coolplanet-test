import { ErrorType } from "../types/types";
import { Icon, IconType } from "./icon/Icon";


const getErrorProps = (type: ErrorType): { icon: IconType, message: string } => {
    switch (type) {
        case 'NOT_FOUND':
            return {
                icon: 'not-found',
                message: 'Element not found'
            }
        default:
            return {
                icon: 'error',
                message: 'Internal error'
            }
    }
}

export function ErrorIndicator({ type }: { type: ErrorType }) {
    const { icon, message } = getErrorProps(type);
    return (
        <div style={{ width: '100%', display: 'flex', minHeight: '200px', justifyContent: 'center', alignItems: 'center', gap: '12px', color: '#cb4444' }}>
            <Icon type={icon} />
            <span>{message}</span>
        </div>
    )
}