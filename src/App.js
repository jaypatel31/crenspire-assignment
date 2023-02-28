import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import Filter from "./components/Filter/Filter";
import Table from "./components/Table/Table";

import { getUsers,reset } from "./stateSlices/userSlice";

function App() {
  const [filters, setFilters] = useState([])
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  const { status, items, error} = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(getUsers("get"));
  }, []);

  useEffect(() => {
    if (status === "loading" || status === "idle") {
      setLoading(true)
    }else{
      setLoading(false)
    }
  }, [status]);

  const handleFilter = (filter) => {
    if(filter==="all"){
      setFilters(['0','1','2','3','4'])
      return
    }
    if(filters.includes(filter)){
      setFilters(filters.filter(item => item !== filter))
    }else{
      setFilters([...filters,filter])
    }
  }

  useEffect(() => {
    if(filters.length > 0){
      dispatch(getUsers(filters))
    }
  }, [filters]);

  console.log(items)

  return (
    <div className="main_page_container">
      <Filter handleFilter={handleFilter} filters={filters}/>
      <Table items={items}/>
    </div>
  );
}


export default App;
