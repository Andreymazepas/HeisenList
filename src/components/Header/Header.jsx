import './Header.scss'
import logo from '../../images/logo192.png';

const Header = () => (
    <div className="header">
        <div className="header-title">
            <img src={logo} alt="logo" className="header-title--logo" />
            <p className="header-title--text">HeisenList</p>    
        </div>
    </div>
)

export default Header;