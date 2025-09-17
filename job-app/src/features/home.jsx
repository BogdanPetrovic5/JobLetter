import { Outlet } from "react-router-dom";
import Header from "../shared/header/header";
import DynamicNav from "../shared/dynamic-nav/Dynamic-nav";

function Home(){
    return(
         <div className='container'>
          <div className='container-content'> 
            <Header />
            <Outlet></Outlet>
          </div>
          <DynamicNav />
        </div>
    )
}
export default Home;