import { Link } from "react-router-dom";
import styles from "./NavigationBar.module.css";

/**
 * 
 * @param {*} pages - The pages that can be navigated to with the navigation bar.
 * @param {*} active - The name of the currently active page.
 * @returns 
 */
export default function NavigationBar({pages, active}) {
  return (
    <nav>
      <ul>
        {pages.map(page => {
          return (
            <li key={page.path}>
              <Link to={page.path} className={active == page.name ? styles.active : ""}>
                {page.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}