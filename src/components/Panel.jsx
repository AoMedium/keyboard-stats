import styles from "./Panel.module.css";
import "./Components.css";

/**
 * Container for holding and centering elements.
 */
export default function Panel(props) {
  return (
    <div id={props.id} className={`${styles.panel} ${props.class}`}>
      {props.children}
    </div>
  );
}