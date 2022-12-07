import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import StartingPageContent from "./components/StartingPage/StartingPageContent";
import { STORAGE_KEY } from "./consts/consts";
import { logIn } from "./features/user-auth-slice";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.userAuth);
  const savedUserToken = localStorage.getItem(STORAGE_KEY);

  useEffect(() => {
    if (savedUserToken) {
      const { token, login: userLogin } = JSON.parse(savedUserToken);

      dispatch(logIn({ token, login: userLogin }));
    }
  }, [savedUserToken, dispatch]);

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
