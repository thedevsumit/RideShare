import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css'
const Footer = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className={`container ${styles["footer-margin"]}`}>
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-body-secondary" onClick={()=>{
                navigate("/about")
              }}>
                About
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-body-secondary">
                Terms
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-body-secondary" onClick={()=>{
                navigate("/help")
              }}>
                Contact
              </a>
            </li>
          </ul>
          <p className="text-center text-body-secondary">
            © 2025 RideShare, NITJ
          </p>
        </footer>
      </div>
    </>
  );
};
export default Footer;
