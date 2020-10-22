import { Container } from "react-bootstrap"
import BlogNavbar from "./Navbar"

import { useTheme } from "../providers/ThemeProvider"

export default function PageLayout({ children, className }) {
  const { theme, toggleTheme } = useTheme()
  return (
    <div className={theme.type}>
      <Container>
        <BlogNavbar theme={theme} toggleTheme={toggleTheme} />
        <div className={`page-wrapper ${className}`}>{children}</div>
        <footer className="page-footer">
          <div>
            <a href="https://twitter.com/j_looped" target="_blank">
              twitter
            </a>
            {" | "}
            <a href="https://github.com/Janelle-web" target="_blank">
              github
            </a>
            {" | "}
            <a href="https://www.facebook.com/janelle.tam1024" target="_blank">
              facebook
            </a>
          </div>
        </footer>
      </Container>
      <style jsx global>
        {`
          html,
          body {
            background: ${theme.background};
            color: ${theme.fontColor};
            transition: color 0.2s ease-out 0s, background 0.2s ease-out 0s;
          }
        `}
      </style>
    </div>
  )
}
