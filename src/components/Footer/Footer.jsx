import "./Footer.scss";
import { FaGithub } from "react-icons/fa";

const Footer = () => (
    <div className="footer">
        <div className="footer-content">
            <FaGithub size={'2em'}/>
            <a href="https://www.github.com/AndreyMazepas">Andrey Mazépas</a>
        </div>
    </div>
)

export default Footer;