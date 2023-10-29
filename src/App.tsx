import UserService, { User } from "./services/user-service";

import "bootstrap/dist/css/bootstrap.min.css";
import userService from "./services/user-service";
import useUser from "./hooks/useUser";

function App() {
  // const [users, setUsers] = useState<User[]>([]);
  // const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);

  //   const { request, cancel } = UserService.getAllUsers();
  //   request
  //     .then((res) => {
  //       setUsers(res.data);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       if (err instanceof CanceledError) return;
  //       setError(err.message);
  //       setIsLoading(false);
  //     });

  //   return () => cancel();
  // }, []);

  const {users, error, isLoading, setUsers, setError} = useUser()

  const deleteUser = (user: User) => {
    const origionalUsers = [...users];
    setUsers(users.filter((u) => u.id != user.id));

    UserService.deleteUser(user).catch((err) => {
      setError(err.message);
      setUsers(origionalUsers);
    });
  };

  const createUser = () => {
    const newUser = { id: 0, name: "kiya" };
    const origionalUsers = [...users];

    setUsers([newUser, ...users]);
    UserService.createUser(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(origionalUsers);
      });
  };

  const updateUser = (user: User) => {
    const origionalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id == user.id ? updatedUser : u)));

    
    UserService.updateUser(user, updatedUser).catch((err) => {
      setError(err.message);
      setUsers(origionalUsers);
    });
  };

  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-primary mb-3" onClick={createUser}>
        Add
      </button>
      <ul className="list-group w-50">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>

              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
