import styles from "./TextBlocks.module.css";

/**
 * Represents a set of key entries in the text history panel.
 */
export default function TextLine({entry}) {
  return (
    <div className={styles.textLineContainer}>
      <div className={styles.timestamp}>{entry.timestamp}</div>
      <div className={`${styles.common} ${styles.textLine}`}>{entry.value}</div>
    </div>
  )
}