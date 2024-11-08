import { CSSProperties, HTMLAttributes } from "react"
import { LoadingIcon } from "./icons-svg/LoadingIcon"
import { ChevronLeft } from "./icons-svg/ChevronLeft"
import { ChevronRight } from "./icons-svg/ChevronRight"
import { Check } from "./icons-svg/Check"
import { NotFound } from "./icons-svg/NotFound"
import { Error } from "./icons-svg/Error"

export type IconType = 'loading' | 'chevron-left' | 'chevron-right' | 'check' | 'not-found' | 'error'
type IconProps = {
    type: IconType
} & HTMLAttributes<HTMLSpanElement>

const getIcon = (type: IconType) => {
    switch (type) {
        case 'loading':
            return <LoadingIcon />
        case 'chevron-left':
            return <ChevronLeft />
        case 'chevron-right':
            return <ChevronRight />
        case 'check':
            return <Check />
        case 'not-found':
            return <NotFound />
        case 'error':
            return <Error />
        default:
            return null
    }
}

export function Icon(props: IconProps) {
    const { type, style, ...restOfSpanProps } = props

    return (
        <span style={
            {
                width: '24px', height: '24px', display: 'inline-block'
                , ...style
            }
        }
            {...restOfSpanProps}
        >
            {getIcon(type)}
        </span>
    )
}
