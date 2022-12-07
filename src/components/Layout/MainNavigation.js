import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "./MainNavigation.module.css";
import { logOut } from "../../features/user-auth-slice";
import { STORAGE_KEY } from "../../consts/consts";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.userAuth);

  const onLogoutClick = () => {
    const userInfo = localStorage.getItem(STORAGE_KEY);

    if (userInfo) {
      localStorage.removeItem(STORAGE_KEY);
    }

    dispatch(logOut());
    navigate("/");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={onLogoutClick}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
