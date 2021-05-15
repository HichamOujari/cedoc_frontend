import React, { Component } from 'react';
import "./style.css"
import logo from "../../assets/logo.png"
import {Link} from "react-router-dom"
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import Cookies from "js-cookie"

class Navbar extends Component {
    token = Cookies.get('token')
    render() {
        return (
            <div className="NavBar">
                <Link to="/" className="logo">
                    <img className="icon" src={logo} alt="logo" />
                    <p className="title">Cedoc EMI</p>
                </Link>
                <div className="right">
                    <ul className="navEle">
                        <Link to="/actualites"><li>Actualités</li></Link>
                        <li className="doctorant">
                            Doctorant
                            <ul className="dropdownEle_doctorantNavbar">
                                <Link to="/inscription"><li>Inscription</li></Link>
                                <Link to="/re-inscription"><li>Réinscription</li></Link>
                            </ul>
                        </li>
                    </ul>
                    <div className="Tooright">
                        <div className="Input">
                            <input type="text" placeholder="Rechercher ..." className="input" />
                            <SearchIcon className="Icon"/>
                        </div>
                        {this.token?
                            <div className="AVATAR">
                                {Cookies.get("username").split('')[0]}
                                <ul className="profil_deconnect_Doct">
                                    <li><Link to="/profil">Profil</Link></li>
                                    <li onClick={()=>{
                                        Cookies.remove("path")
                                        Cookies.remove("token")
                                        Cookies.remove("USERid")
                                        document.location.reload();
                                    }}>Deconnecte</li>
                                </ul>
                            </div>:
                            <Link to="/login" className="Login">
                            <p className="title">Login</p>
                            <PersonIcon className="icon"/>
                        </Link >}
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;