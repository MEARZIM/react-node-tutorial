import { Link } from "react-router-dom"; // Note: Ensure react-router-dom is correctly installed


function App() {
  const users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <section>
      <ul>
        {users.map((user) => (
          <li key={user}>
            <Link to={`user/${user}`}>User : {user}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default App;
