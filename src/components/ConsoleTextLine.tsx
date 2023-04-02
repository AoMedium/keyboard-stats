import styles from "./Console.module.css";

type args = {
  value: string
}

export default function ConsoleTextLine({value}: args) {
  return <div className={`${styles.common} ${styles.textLine}`}>{value}</div>
}