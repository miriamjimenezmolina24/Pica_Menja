import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import { Navbar, Container } from "react-bootstrap";
import { Image } from "react-bootstrap";
import Link from '@mui/material/Link';
import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Comentaris from "./Comentaris";
import Foto from "./Foto";
import Fotos from "./Fotos";
import Idioma from "./Idioma";
import Idiomes from "./Idiomes";
import Inici from "./Inici";
import Restaurant from "./Restaurant";
import Restaurants from "./Restaurants";
import RestaurantServei from "./RestaurantServei";
import RestaurantsFront from "./RestaurantsFront";
import RestaurantServeis from "./RestaurantsServeis";
import Servei from "./Servei";
import Login from "./Login";
import Serveis from "./Serveis";
import Tipu from "./Tipu";
import Tipus from "./Tipus";
import Traduccio from "./Traduccio";
import Traduccions from "./Traduccions";
import Usuari from "./Usuari";
import Usuaris from "./Usuaris";
import Valoracions from "./Valoracions";
import QuiSom from "./QuiSom";
import Suggeriments from "./Suggeriments";
import PerfilUsuari from "./PerfilUsuari";
import Registre from "./Registre";

export default class Menu extends Component {

  loginFunction() {
    window.location.assign("/login");
  }

  registreFunction() {
    window.location.assign("/registre");
  }

  handleRefresh = () => {
    // by calling this method react re-renders the component
    this.setState({});
  };

  perfilFunction() {
    window.location.assign("/perfilUsuari");
  }

  refreshPage() {
    window.location.reload(false);
  }

  Logout() {
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("id_usuari", "");
    sessionStorage.setItem("admin", "");
    window.location.assign("/");
  }

  render() {
    return (
      <>
        <div id="header">
          <Container>
            <div className="idiomes">
              <button className="btn btn-link"><Image src={process.env.PUBLIC_URL + '/idiomas.png'}
                width="40" height="40" title="IDIOMA" onClick={prova}
              />
              </button>
              {sessionStorage.getItem("token") === "" || sessionStorage.getItem("token") === null ?
                <>
                  <button className="ms-2 btn btn-info btn-lg mb-2" onClick={this.loginFunction}>Inicia sessió</button>
                  <button className="ms-3 btn btn-warning btn-lg mb-2" onClick={this.registreFunction}>Regístra't</button>
                </>
                : console.log(sessionStorage.getItem("token"))}
              {sessionStorage.getItem("token") !== "" && sessionStorage.getItem("token") !== null ?
                <>
                  <button className="ms-2 btn btn-outline-danger btn-lg mb-2" onClick={this.Logout}>Tanca sessió</button>
                  <button className="ms-3  btn btn-dark btn-lg mb-2" onClick={this.perfilFunction}>Perfil</button>
                </>
                : console.log(sessionStorage.getItem("id_usuari"))}
            </div>

          </Container>
          <Container>
            <>
              <div className="parent">
                {window.location.pathname !== "/" ?
                  <>
                    <Image src={process.env.PUBLIC_URL + '/picamenja.png'}
                      alt="PICA & MENJA"
                      title="PICA & MENJA"
                      id="imatges"
                    />
                  </>
                  : console.log(window.location.pathname)}

                {window.location.pathname === "/" ?
                  <>
                    <Image src={process.env.PUBLIC_URL + '/logoweb.png'}
                      alt="PICA & MENJA"
                      title="PICA & MENJA"
                      id="imatges"
                    />
                  </>
                  : console.log(window.location.pathname)}

              </div>
            </>
          </Container>
        </div>

        <BrowserRouter>
          <Navbar
            bg="dark"
            className="color-nav"
            variant="dark"
            expand="lg"
          // sticky="top"
          >
            <Container>
              <Nav className="mr-auto">
                <NavLink className="nav-link" to="/" onClick={this.handleRefresh}>Inici</NavLink>
                <NavLink className="nav-link" to="/quisom" onClick={this.handleRefresh}>Informació</NavLink>
                <NavLink className="nav-link" to="/restaurants" onClick={this.handleRefresh}>Restaurants</NavLink>
                <NavLink className="nav-link" to="/suggeriments" onClick={this.handleRefresh}>Suggeriments</NavLink>

                {/* SI L'USUARI ÉS ADMINISTRADOR (admin == 1) MOSTRA EL FRONT I EL BACK, SI NO HO ÉS (admin === 0) NOMÉS MOSTRA EL FRONT */}
                {sessionStorage.getItem("admin") === "1" ?
                  <><NavLink className="nav-link" to="/comentaris" onClick={this.handleRefresh}>Comentaris</NavLink>
                    <NavLink className="nav-link" to="/fotos" onClick={this.handleRefresh}>Fotos</NavLink>
                    <NavLink className="nav-link" to="/idiomes" onClick={this.handleRefresh}>Idiomes</NavLink>
                    <NavLink className="nav-link" to="/restaurants_serveis" onClick={this.handleRefresh}>Restaurants_Serveis</NavLink>
                    <NavLink className="nav-link" to="/restaurants_back" onClick={this.handleRefresh}>Restaurants_Back</NavLink>
                    <NavLink className="nav-link" to="/serveis" onClick={this.handleRefresh}>Serveis</NavLink>
                    <NavLink className="nav-link" to="/tipus" onClick={this.handleRefresh}>Tipus</NavLink>
                    <NavLink className="nav-link" to="/traduccions" onClick={this.handleRefresh}>Traduccions</NavLink>
                    <NavLink className="nav-link" to="/usuaris" onClick={this.handleRefresh}>Usuaris</NavLink>
                    <NavLink className="nav-link" to="/valoracions" onClick={this.handleRefresh}>Valoracions</NavLink>
                  </>
                  : console.log(sessionStorage.getItem("admin"))}
              </Nav>
            </Container>
          </Navbar>

          <Routes>
            {/* RUTES DE FRONTEND */}
            <Route path="/" element={<Inici />} />
            <Route path="/quisom" element={<QuiSom />} />
            <Route path="/restaurants" element={<RestaurantsFront />} />
            <Route path="/suggeriments" element={<Suggeriments />} />
            <Route path="/perfilUsuari" element={<PerfilUsuari />} />
            {/* RUTES DE BACKEND */}
            <Route path="/comentaris" element={<Comentaris />} />
            <Route path="/fotos" element={<Fotos />} />
            <Route path="/foto/:id_foto" element={<CridaFotos />} />
            <Route path="/idiomes" element={<Idiomes />} />
            <Route path="/idioma/:id_idioma" element={<CridaIdioma />} />
            <Route path="/restaurants_serveis" element={<RestaurantServeis />} />
            <Route path="/restaurants_serveis/:id_obra" element={<CridaRestaurantServei />} />
            <Route path="/restaurants_back" element={<Restaurants />} />
            <Route path="/restaurant/:id_restaurant" element={<CridaRestaurant />} />
            <Route path="/serveis" element={<Serveis />} />
            <Route path="/servei/:id_servei" element={<CridaServei />} />
            <Route path="/tipus" element={<Tipus />} />
            <Route path="/tipus/:id_tipus" element={<CridaTipus />} />
            <Route path="/traduccions" element={<Traduccions />} />
            <Route path="/traduccio/:id_traduccio" element={<Traduccio />} />
            <Route path="/valoracions" element={<Valoracions />} />
            <Route path="/usuaris" element={<Usuaris />} />
            <Route path="/usuari/:id_usuari" element={<CridaUsuari />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registre" element={<Registre />} />
            {/* <Route path="/" element={<CarouselFotos />} />
            <Route path="/explora" element={<Explora />} /> */}
          </Routes>
        </BrowserRouter>
        <div id="footer">
          {'Copyright © '}
          <Link color="inherit" href="http://localhost:3000/">
            Pica & Menja
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
          <div>
            <ul>
              <li><a href="https://www.facebook.com/" tabIndex={"0"}><Image src={process.env.PUBLIC_URL + '/logof.jpg'} alt="Logo de Facebook"
                title="Facebook" width="30" height="30" /></a></li>
              <li><a href="https://www.instagram.com/" tabIndex={"0"}><Image src={process.env.PUBLIC_URL + '/logoi.jpg'}
                alt="Logo d'Instagram" title="Instagram" width="30" height="30" /></a></li>
              <li><a href="https://twitter.com/?lang=es" tabIndex={"0"}><Image src={process.env.PUBLIC_URL + '/logot.jpg'}
                alt="Logo de Twitter" title="Twitter" width="30" height="30" /></a></li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}


function CridaRestaurant() {
  let params = useParams();
  return <Restaurant id_restaurant={params.id_restaurant} />
}

function CridaIdioma() {
  let params = useParams();
  return <Idioma id_idioma={params.id_idioma} />
}

function CridaServei() {
  let params = useParams();
  return <Servei id_servei={params.id_servei} />
}

function CridaTipus() {
  let params = useParams();
  return <Tipu id_tipus={params.id_tipus} />
}

function CridaUsuari() {
  let params = useParams();
  return <Usuari id_usuari={params.id_usuari} />
}

function CridaRestaurantServei() {
  let params = useParams();
  return <RestaurantServei id_restaurant={params.id_restaurant} />
}

function CridaFotos() {
  let params = useParams();
  return <Foto id_foto={params.id_foto} />
}

function prova() {
  window.location.assign("/restaurants");
}

console.log("AQUÍ SALE EL TOKEN ---> " + sessionStorage.getItem("token"));
console.log("AQUÍ SALE EL ADMIN ---> " + sessionStorage.getItem("admin"));
console.log("AQUÍ SALE EL ID_USUARI --> " + sessionStorage.getItem("id_usuari"));