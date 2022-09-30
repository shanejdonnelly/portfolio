import * as React from "react"
import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      /* ff-tisa-sans */
      @font-face {
        font-family: 'ff-tisa-sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/ff-tisa-sans.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'ff-tisa-sans';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/ff-tisa-sans__bold.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'ff-tisa-sans';
        font-style: italic;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/ff-tisa-sans__italic.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'ff-tisa-sans';
        font-style: italic;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/ff-tisa-sans__bold-italic.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      /* calluna */
      @font-face {
        font-family: 'calluna';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/calluna.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'calluna';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/calluna__bold.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      `}
  />
)

export default Fonts