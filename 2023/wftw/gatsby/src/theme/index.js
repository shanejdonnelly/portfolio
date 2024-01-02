// theme/index.js
import { extendTheme } from '@chakra-ui/react'

// Component style overrides
import Text from './components/text'
import Heading from './components/heading'
import Link from './components/link'
import Button from './components/button'

const overrides = {
    fonts: {
        body: 'neuehaas',
        heading: 'neuehaas'
    },
    colors: {
        darkblue: '#0A3F63',
        black: '#000000'
    },
    styles: {
        global: {
            body: {
                color: 'black',
                fontSize: '16px'
            }
        }
    },
    components: {
        Button,
        Heading,
        Link,
        Text
    },
}

export default extendTheme(overrides)
