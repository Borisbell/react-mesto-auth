import logo from '../images/header/logo.svg';

function Header() {
  return (
    <header className="header">
      <a href="#" className="header__link">
        <img src={logo} alt="Логотип" className="header__logo"/>
      </a>
    </header>
  );
}
    
export default Header;