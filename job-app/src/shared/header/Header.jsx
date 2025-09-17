import './Header.css'
import logo from '../../assets/icons/logo.png'
function Header(){
    return(
        <header className="header-container">
            <div className='header-wrapper'>
                <div className='logo-section'>
                    <img src={logo}/> <h1>JobLetter</h1>
                </div>
                <nav className='nav-section'>
                    
                </nav>
            </div>
            
        </header>

    )
}
export default Header;