import * as React from "react"
import * as styles from "./hamburger.module.css"

export default function Hamburger({ isOpen, strokeColor }) {
  return (
    <div
      className={isOpen ? `${styles.button} ${styles.menuOpen}` : styles.button}
    >
      <svg
        stroke={strokeColor}
        width="48px"
        height="40px"
        viewBox="0 0 48 48"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <line x1="0" y1="17" x2="48" y2="17" strokeWidth="1" />
          <line x1="0" y1="31" x2="48" y2="31" strokeWidth="1" />
        </g>

        <g>
          <line x1="0" y1="24" x2="48" y2="24" strokeWidth="1" />
          <line x1="0" y1="24" x2="48" y2="24" strokeWidth="1" />
        </g>
      </svg>
    </div>
  )
}
