import styles from "./Label.module.css";

/**
 * Label used to overlay text on top of panels (useful for marking unimplemented panels).
 */
export default function Label(props) {
  return (
    <div className={styles.label}>{props.children}</div>
  )
}