import { Link } from "react-router-dom";
import NavMenu from "../NavMenu/NavMenu";
import css from "./Header.module.css";
import Logo from "../Logo/Logo";

function Header() {
  return (
    <header className={css.header}>
      <div className={`${css.headerContainer} container`}>
        <div className={css.nav}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <NavMenu />
      </div>
    </header>
  );
}

export default Header;
