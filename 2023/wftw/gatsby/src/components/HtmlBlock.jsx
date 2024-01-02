import * as React from "react"
import Row from "./Row"
import * as styles from "./htmlBlock.module.css"

export default function HtmlBlock({ data }) {
  const html = data.html ? data.html : null
  return html ? (
    <Row data={data}>
      <div
        className={styles.htmlBlock}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Row>
  ) : null
}
