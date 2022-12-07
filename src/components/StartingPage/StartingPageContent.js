import { useSelector } from "react-redux";
import classes from "./StartingPageContent.module.css";

const StartingPageContent = () => {
  const { userLogin } = useSelector((state) => state.userAuth);

  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
      {userLogin && <p>{userLogin}</p>}
    </section>
  );
};

export default StartingPageContent;
