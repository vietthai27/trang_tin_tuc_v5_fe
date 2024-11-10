import Logo from "../Logo/Logo"
import PsychologyIcon from '@mui/icons-material/Psychology';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HomeIcon from '@mui/icons-material/Home';
import { address } from "../../ultil";

const Footer = () => {


    return (
        <div className="footer-container">

           

            <div className="footer-page-tab-right">

                <div className="footer-page-logo">
                    <img

                        className='footer-page-logo-img'
                        alt='page-logo'
                        src='/page-logo.png' />
                </div>

                <div className="footer-info-container">
                    <div className="footer-info">
                        <p> <AlternateEmailIcon /> Email: <b>thai27webdeveloper@gmail.com</b></p>
                        <p> <LocalPhoneIcon /> Phone number: <b>0941279162</b></p>
                        <p> <HomeIcon /> Address: <b>PhuDo, Nam Tu Liem, Hanoi</b></p>
                    </div>

                    <div className="footer-info">
                        <p> <img className="footer-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/540px-Postgresql_elephant.svg.png" alt="footer-logo" />
                            Database: <b>Postgre</b>
                        </p>
                        <p> <img className="footer-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Spring_Boot.svg/1024px-Spring_Boot.svg.png" alt="footer-logo" />
                            Backend: <b>Springboot</b></p>
                        <p> <img className="footer-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="footer-logo" />
                            Frontend: <b>ReactJS</b></p>
                    </div>

                    <div className="footer-info">
                        <p> <img className="footer-image" src="https://lh3.googleusercontent.com/4xJekEO8e-OliyMi3fHoBeilBNum7eq4ihbA47Z5zKh9gMkP22zD2XSJ26s8yxiDp2wlYIuIgOus7YuDB8Cz" alt="footer-logo" />
                            DB deploy: <b>Avien console</b></p>
                        <p> <img className="footer-image" src="https://lh3.googleusercontent.com/pUL14HVpHhorar_CFJBHNR55ui6Gcme8XD6LwA64CFQxSeNqzdAoaReXZiZT61nLkQ" alt="footer-logo" />
                            Web deploy: <b>Render</b></p>
                    </div>
                </div>
                <div className="footer-page-copyright">@Copyright thai27 TrangTinTuc</div>
            </div>
            <iframe
                src={address}
                width="400"
                height="240"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    )
}

export default Footer