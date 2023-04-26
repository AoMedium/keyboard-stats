import styles from "./TextBlocks.module.css";

/**
 * Represents the keys pressed in the input box.
 */
export default function InputBlock({value}) {
  return <div className={`${styles.common} ${styles.inputBlock}`}>{value}</div>
}