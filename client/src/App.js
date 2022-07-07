import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";

const AuthContext = React.createContext(null);

const useAuth = () => {
  return React.useContext(AuthContext);
};

const Navigation = () => {
  const { onLogout, token } = useAuth();
  const location = useLocation();
  console.log(location);
  if (location.pathname === "/") return <></>;
  return (
    <nav>
      <NavLink to="/main">Home</NavLink>
      <NavLink to="/dashboard2">Dashboard2</NavLink>

      {token && (
        <button type="button" onClick={onLogout}>
          Sign Out
        </button>
      )}
    </nav>
  );
};

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const Home = () => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
  });
  const { setToken, setError, error } = React.useContext(AuthContext);
  const { username, password } = data;
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          alert(json.error);
        } else {
          setToken(json.accessToken);
          setError(null);
          navigate("/main");
        }
      });
  };

  return (
    <>
      <h2>Home (No Auth)</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <br />
        <input
          type="text"
          name="username"
          value={username}
          onChange={changeHandler}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={changeHandler}
        />
        <br />
        <button type="button" onClick={handleLogin}>
          Sign In
        </button>
      </form>
    </>
  );
};

const Dashboard = () => {
  const { token } = useAuth();

  return (
    <>
      <h2>Dashboard (Auth)</h2>

      <div>Authenticated as {token}</div>
    </>
  );
};

const Dashboard2 = () => {
  const { token } = useAuth();

  return (
    <>
      <h2>Dashboard 2 (Auth)</h2>

      <div>Authenticated as {token}</div>
    </>
  );
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState(null);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  const value = {
    token,
    setToken,
    error,
    setError,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <h1>SuperCoolRobotics</h1>

        <Navigation />

        <Routes>
          <Route index element={<Home />} />
          <Route
            path="main"
            element={
              <ProtectedRoute>
                <Dashboard2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div>No Match</div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
