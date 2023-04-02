import styles from "./Console.module.css";

type args = {
  value: string
}

export default function ConsoleInputBlock({value}: args) {
  return <div className={`${styles.common} ${styles.inputBlock} ${styles.inputLine}`}>{value}</div>
}