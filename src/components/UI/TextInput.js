import { TextInput as T } from 'react-native'
import styled from 'styled-components'
import {compose, color, size, typography, space, flexbox,border} from 'styled-system'

const TextInput = styled(T)(
    compose(
        typography,
        space,
        color,
        size,
        flexbox,
        space,
        border

    )
)

export default TextInput
