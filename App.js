
import React,{useState,useEffect} from "react";

function App(){
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
  const [secondsOnPage,setSecondsOnPage]=useState(0);

const fetchUser = async () => {
try {
  const response = await  fetch('https://jsonplaceholder.typicode.com/users/4');
  if(!response.ok){
    throw new Error ('HTTP error! {response.status}');
  }
  const userData= await response.json();
  setUser(userData);
  setLoading(false);

}
catch(err){
  setError(err.message);
  setLoading(false);
}
};
useEffect(() => {
fetchUser();
},[]);
useEffect(() => {
if(user){
  document.title = `Porfile: ${user.name}|user profile dashboard`;
}else{
  document.title = 'loading...|user profile dashboard';
}
},[user]);
useEffect(() => {
  const timer= setInterval(() => {
    setSecondsOnPage((prevSeconds) => prevSeconds + 1);
  },1000);
  return () => clearInterval (timer);

},[]);

  return(
   <div className="App">
    <h1> user profile dashboard</h1>
<p style={{
  textAlign:'center',
  fontSize:'18px',
  fontWeight:'bold',
  marginBottom:'20px'
}}>
  time on page: {secondsOnPage} seconds
  
  </p>

    {error && (
      <div style={{color: 'red',padding :'20px',border:'1px solid red'}} > 
       <h1> Error!</h1>
        <p>{error}</p>
      </div> )}
    {loading && !error && (
      <div style ={{padding:'20px',textAlign:'center'}}>
        <p> loading user data... </p>
        </div>
    )}
    
    {user && !loading  && !error   && (
      <div style={{paddinng:'20px',border:'1px solid #ccc',margin :'20px 0'}}>
        <h2> user information</h2>
         <p><strong>name:</strong>{user.name}</p>
         <p><strong>email:</strong>{user.email}</p>
         <p><strong>phone:</strong>{user.phone}</p>
         <p><strong>website:</strong>{user.website}</p>
      </div>
    )}
  </div>
  );
}
export default App;