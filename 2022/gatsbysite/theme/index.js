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
import Select from './components/select'
import Text from './components/text'

const overrides = {
    fonts: {
        body: 'ff-tisa-sans',
        heading: 'calluna'
    },
    colors: {
        darkblue: '#0A3F63'
    },
    styles: {
        global: {
            body: {
                color: 'gray.700',
                fontSize: '15px'
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
        Select,
        Text
    },
}

export default extendTheme(overrides)