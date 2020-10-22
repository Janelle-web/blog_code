import { library, config } from "@fortawesome/fontawesome-svg-core"
import { faBorderAll, faBars, faSortNumericDown, faSortNumericUp, faSun, faMoon } from "@fortawesome/free-solid-svg-icons"

config.autoAddCss = false
library.add(faBars, faBorderAll, faSortNumericUp, faSortNumericDown, faSun, faMoon)

import "@fortawesome/fontawesome-svg-core/styles.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/index.scss"
import "highlight.js/styles/tomorrow-night-blue.css"
import "react-toggle/style.css"

import ThemeProvider from "../providers/ThemeProvider"

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
