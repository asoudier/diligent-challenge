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
import { Table } from "antd";
//eslint-disable-next-line
import "antd/dist/antd.css";

const AuthContext = React.createContext(null);

const useAuth = () => {
  return React.useContext(AuthContext);
};

const Navigation = () => {
  const { onLogout, token } = useAuth();
  const location = useLocation();
  if (location.pathname === "/") return <></>;
  return (
    <nav>
      <NavLink to="/dashboard" style={{ padding: 20 }}>
        Dashboard
      </NavLink>
      <NavLink to="/nope" style={{ padding: 20 }}>
        Non Existent Page
      </NavLink>

      {token && (
        <>
          <span style={{ padding: 20 }}>Authenticated as {token}</span>
          <button type="button" onClick={onLogout}>
            Sign Out
          </button>
        </>
      )}
    </nav>
  );
};

const ProtectedRoute = ({ children }) => {
  // Comment out line 49-53 to disable auth for testing on Dashboard
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const Login = () => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
  });
  const { setToken } = React.useContext(AuthContext);
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
          navigate("/dashboard");
        }
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Home (No Auth)</h2>
      <form style={{ padding: 20 }}>
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
    </div>
  );
};

const Dashboard = () => {
  const [data, setData] = React.useState();
  const [tasks, setTasks] = React.useState({
    0: null,
    1: null,
    2: null,
  });
  const [randomFailure, setRandomFailure] = React.useState();

  const handleUpdate = (e, key) => {
    e.preventDefault();
    fetch("/robots_update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data[key],
        task: tasks[key],
        /// if you want to update return time of the task below is the value
        timeComplete: new Date(
          new Date().getTime() + 1 * 60000
        ).toLocaleTimeString(),
      }),
    }).then((res) => res.json());
  };

  const columns = [
    {
      title: "Robot",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "Time Complete",
      dataIndex: "timeComplete",
      key: "timeComplete",
    },
    {
      title: "Current Time",
      key: "currentTime",
      render: () => new Date().toLocaleTimeString(),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        return record.task
          ? record.timeComplete <= new Date().toLocaleTimeString() &&
            randomFailure
            ? "Task Failed"
            : record.timeComplete <= new Date().toLocaleTimeString()
            ? "Complete & Available"
            : "In Progress"
          : "Available";
      },
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record, index) =>
        record.task &&
        record.timeComplete >= new Date().toLocaleTimeString() ? (
          <div>Task in progress.</div>
        ) : (
          <>
            <input
              type="text"
              name="task"
              value={tasks[index]}
              onChange={(e) => setTasks({ ...tasks, [index]: e.target.value })}
            />
            <br />
            <button
              key={index}
              type="button"
              onClick={(e) => handleUpdate(e, index)}
            >
              Add Task
            </button>
            <br />
            All tasks are added for 1 minute from now
          </>
        ),
    },
  ];

  const getData = () =>
    fetch("/robots")
      .then((res) => res.json())
      .then((data) => setData(data));

  React.useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
      // refetch data every 1 seconds to get status of robots
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // get new randomFailure true/false value every 30 seconds
  React.useEffect(() => {
    const failure = Math.random() > 0.5;
    setRandomFailure(failure);
    const interval = setInterval(() => {
      setRandomFailure(failure);
      // refetch data every 5 seconds to get status of robots
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard 2 (Auth)</h2>

      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  const value = {
    token,
    setToken,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <h1 style={{ padding: 20 }}>SuperCoolRobotics</h1>

        <Navigation />

        <Routes>
          <Route index element={<Login />} />
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
