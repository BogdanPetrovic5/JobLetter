import './Header.css'
import logo from '../../assets/icons/logo.png'
import search from '../../assets/icons/search.png'
function Header(){
    return(
        <header className="header-container">
            <div className='header-wrapper'>
                <div className='logo-section'>
                    <img src={logo}/> <h1>JobLetter</h1>
                </div>
                <nav className='nav-section'>
                    <h1>Find Your Dream Job And Apply! </h1>
                    <div className='search'>
                        <img src={search} alt="" />
                        <input type="text" placeholder='Search applications or jobs!'/>
                    </div>
                    
                </nav>
            </div>
            
        </header>

    )
}
export default Header;