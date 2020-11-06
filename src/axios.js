import axios from "axios";

 const instance=axios.create({
baseURL:"https://chat-app5442.herokuapp.com",
 });

 export default instance;