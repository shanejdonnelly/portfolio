// theme/index.js
import { extendTheme } from '@chakra-ui/react'

// Component style overrides
import Accordion from './components/accordion'
import Breadcrumb from './components/breadcrumb'
import Button from './components/button'
import Heading from './components/heading'
import Link from './components/link'
import Menu from './components/menu'
import Popover from './components/popover'
import Progress from './components/progress'
import Select from './components/select'
import Text from './components/text'

const overrides = {
    fonts: {
        body: 'notosans',
        heading: 'sourceserifpro'
    },
    colors: {
        darkblue: '#0A3F63',
        black: '#404041'
    },
    styles: {
        global: {
            body: {
                color: 'black',
                fontSize: '14px'
            }
        }
    },
    components: {
        Accordion,
        Breadcrumb,
        Button,
        Heading,
        Link,
        Menu,
        Popover,
        Progress,
        Select,
        Text
    },
}

export default extendTheme(overrides)