import highlight from "highlight.js"
import { createRef, useEffect } from "react"
import { findDOMNode } from "react-dom"

const HighlightCode = ({ children, language }) => {
  const code = createRef()

  useEffect(() => {
    highlight.highlightBlock(findDOMNode(code.current))
  }, [])
  return (
    <pre>
      <code className={language} ref={code}>
        {children}
      </code>
    </pre>
  )
}

export default HighlightCode
