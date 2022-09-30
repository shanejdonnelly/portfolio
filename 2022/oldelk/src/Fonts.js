//https://chakra-ui.com/guides/recipes/using-fonts
import { Global } from '@emotion/react'

const Fonts = () => (
    <Global
        styles={`
            @font-face {
            font-family:"futura-pt";
            src:url("https://use.typekit.net/af/309dfe/000000000000000000010091/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"),url("https://use.typekit.net/af/309dfe/000000000000000000010091/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"),url("https://use.typekit.net/af/309dfe/000000000000000000010091/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
            font-display:auto;font-style:normal;font-weight:700;font-stretch:normal;
            }

            @font-face {
            font-family:"futura-pt";
            src:url("https://use.typekit.net/af/9b05f3/000000000000000000013365/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff2"),url("https://use.typekit.net/af/9b05f3/000000000000000000013365/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff"),url("https://use.typekit.net/af/9b05f3/000000000000000000013365/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("opentype");
            font-display:auto;font-style:normal;font-weight:400;font-stretch:normal;
            }

            @font-face {
            font-family:"futura-pt";
            src:url("https://use.typekit.net/af/cf3e4e/000000000000000000010095/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3") format("woff2"),url("https://use.typekit.net/af/cf3e4e/000000000000000000010095/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3") format("woff"),url("https://use.typekit.net/af/cf3e4e/000000000000000000010095/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3") format("opentype");
            font-display:auto;font-style:italic;font-weight:400;font-stretch:normal;
            }

            @font-face {
            font-family:"abolition";
            src:url("https://use.typekit.net/af/b8ec61/00000000000000007735a622/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff2"),url("https://use.typekit.net/af/b8ec61/00000000000000007735a622/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff"),url("https://use.typekit.net/af/b8ec61/00000000000000007735a622/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("opentype");
            font-display:auto;font-style:normal;font-weight:400;font-stretch:normal;
            }
      `}
    />
)

export default Fonts