import { NavLink } from "react-router-dom";
import css from "./NavMenu.module.css";

function NavMenu() {
  return (
    <nav>
      <ul className={css.list}>
        <li className={css.item}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? css.activeLink : css.link)}
          >
            Home
          </NavLink>
        </li>
        <li className={css.item}>
          <NavLink
            to="/catalog"
            className={({ isActive }) => (isActive ? css.activeLink : css.link)}
          >
            Catalog
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavMenu;
