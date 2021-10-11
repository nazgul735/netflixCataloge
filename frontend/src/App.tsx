import './App.css';
import {useQuery} from "@apollo/client";
import {HELLO} from "./api/graphqlQueries"
function App() {
  const { loading, data } = useQuery(HELLO);
  if (loading) return <p>Loading...</p>;
  console.log(data)
  return (
    <div className="App">
      <h1>{data.hello} from backend!</h1>
    </div>
  );
}

export default App;
