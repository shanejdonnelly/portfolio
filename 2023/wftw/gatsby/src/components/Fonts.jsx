import * as React from "react"
import { Global } from "@emotion/react"

const Fonts = () => (
  <Global
    styles={`
      /**/
      /* sans-serif */
      /**/
      @font-face {
        font-family: 'neuehaas';
        font-style: normal;
        font-weight: 400;
        font-display: fallback;
        src: url('/fonts/NeueHaasDisplay-Light.woff2') format('woff2');
      }
      @font-face {
        font-family: 'neuehaas';
        font-style: normal;
        font-weight: 500;
        font-display: fallback;
        src: url('/fonts/NeueHaasDisplay-Medium.woff2') format('woff2');
      }
      @font-face {
        font-family: 'neuehaas';
        font-style: bold;
        font-weight: 700;
        font-display: fallback;
        src: url('/fonts/NeueHaasDisplay-Bold.woff2') format('woff2');
      }
      /**/
      /* serif */
      /**/
      @font-face {
        font-family: 'bigcaslon';
        font-style: bold;
        font-weight: 700;
        font-display: fallback;
        src: url('/fonts/BigCaslon-Bold.woff2') format('woff2');
      }
      @font-face {
        font-family: 'bigcaslon';
        font-style: normal;
        font-weight: 400;
        font-display: fallback;
        src: url('/fonts/BigCaslon-Regular.woff2') format('woff2');
      }
      `}
  />
)

export default Fonts
