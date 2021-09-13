import "./index.css";
//import imgs:
import correo from "./correo.png";
import github from "./github.png";
import linkedin from "./linkedin.png";
import ubicacion from "./ubicacion.jpg";
import wapp from "./wapp.png";
// //import tipo de fuente:
// import "@fontsource/comfortaa"
//import snt design icons:
import { GithubOutlined, LinkedinOutlined, MailOutlined, WhatsAppOutlined, EnvironmentOutlined  } from '@ant-design/icons';




function Footer(): JSX.Element {

    return (
        <div id="footer_principal_container" >

            <div className="footer_principal_div" >
                <p>Demaio, Marco Pablo</p>
                <p>Full Stack Developer</p>
            </div>


            <div className="footer_principal_div" id="footer_fiv_img" >
                <a href="https://github.com/marco1367">
                    {/* <img src={github} className="footer_img" /> */}
                    <GithubOutlined style={ { fontSize:"50px", color:"#d9d9d9" } }  className="footer_img" />
                </a>
                <a href="https://www.linkedin.com/in/marco-pablo-demaio-full-stack-developer-est-ingenier%C3%ADa-industrial/">
                    {/* <img src={linkedin} className="footer_img" /> */}
                    <LinkedinOutlined style={ { fontSize:"50px", color:"#d9d9d9" } }  className="footer_img" />
                </a>
            </div>


            <div className="footer_principal_div" >

                <div className="footer_contact_div" >
                    {/* <img src={correo} className="footer_img_contact" /> */}
                    <MailOutlined />
                    <p>marcopablodemaio@gmail.com</p>
                </div>

                <div className="footer_contact_div" >
                    {/* <img src={wapp} className="footer_img_contact" /> */}
                    <WhatsAppOutlined />
                    <p>+54 2254 588680</p>
                </div>

                <div className="footer_contact_div" >
                    {/* <img src={ubicacion} className="footer_img_contact" /> */}
                    <EnvironmentOutlined />
                    <p>Pinamar, prov. Bs.As</p>
                </div>

            </div>

        </div>
    );
}

export default Footer;