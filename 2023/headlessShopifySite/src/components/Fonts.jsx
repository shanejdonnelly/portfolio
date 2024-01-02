import * as React from "react"
import { Global } from "@emotion/react"

const Fonts = () => (
  <Global
    styles={`
      /**/
      /* sans-serif */
      /**/
      @font-face {
        font-family: 'notosans';
        font-style: normal;
        font-weight: 700;
        font-display: fallback;
        src: url('/fonts/notosans-bold.woff2') format('woff2');
      }
      @font-face {
        font-family: 'notosans';
        font-style: italic;
        font-weight: 700;
        font-display: fallback;
        src: url('/fonts/notosans-bolditalic.woff2') format('woff2');
      }
      @font-face {
        font-family: 'notosans';
        font-style: italic;
        font-weight: 400;
        font-display: fallback;
        src: url('/fonts/notosans-italic.woff2') format('woff2');
      }
      @font-face {
        font-family: 'notosans';
        font-style: normal;
        font-weight: 400;
        font-display: fallback;
        src: url('/fonts/notosans-regular.woff2') format('woff2');
      }
      /**/
      /* serif */
      /**/
      @font-face {
        font-family: 'sourceserifpro';
        font-style: bold;
        font-weight: 700;
        font-display: fallback;
        src: url('/fonts/sourceserifpro-bold.woff2') format('woff2');
      }
      @font-face {
        font-family: 'sourceserifpro';
        font-style: normal;
        font-weight: 400;
        font-display: fallback;
        src: url('/fonts/sourceserifpro-regular.woff2') format('woff2');
      }
      `}
  />
)

export default Fonts
