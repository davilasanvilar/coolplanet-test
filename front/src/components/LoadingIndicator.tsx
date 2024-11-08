import { Icon } from "./icon/Icon";

export function LoadingIndicator() {

    return (
        <div style={{ width: '100%', display: 'flex', minHeight: '200px', justifyContent: 'center', alignItems: 'center' }}>
            <Icon type='loading' style={{
                animationName: 'rotating-element', animationDuration: '1s', animationTimingFunction: 'linear',
                animationIterationCount: 'infinite'
            }} />
        </div>
    )
}