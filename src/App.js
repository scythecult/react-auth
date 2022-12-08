import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import StartingPageContent from "./components/StartingPage/StartingPageContent";
import { STORAGE_KEY } from "./consts/consts";
import { logOut } from "./features/user-auth-slice";
import { useCallbackAfter } from "./hooks/hooks";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, expiresIn } = useSelector((state) => state.userAuth);
  const [isDone] = useCallbackAfter({
    callback: () => {
      const userInfo = localStorage.getItem(STORAGE_KEY);

      if (userInfo) {
        localStorage.removeItem(STORAGE_KEY);
      }

      dispatch(logOut());
    },
    seconds: expiresIn,
    isStartCount: isLoggedIn,
  });

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}>
          {!isLoggedIn && <Route path="auth" element={<AuthPage />} />}
          {isLoggedIn && <Route path="profile" element={<UserProfile />} />}
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route index element={<StartingPageContent />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
