import axios from "axios";
import React, { Component } from "react";
import { Image } from "react-bootstrap";
import Select from "./Select";
import traduccions from "./traduccions.json";

export default class RestaurantsFront extends Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurants: [],
            restaurants_tipus: [],
            current_page: "",
            id_restaurant: -1,
            id_tipus: "",
        };
    }

    componentDidMount = () => {
        if (document.getElementById("contenedorTaula").style.display !== "none") {
            this.restaurants();
        }
    };

    restaurants = () => {
        console.log("POR DIOS MIRA AQUÍ ---> " + sessionStorage.getItem("id_idioma"));
        axios.get("http://localhost/PROJECTE_PICA_MENJA/Pica_Menja/PicaMenja/public/api/restaurants/front")
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    this.setState({
                        restaurants: response.data,
                        current_page: response.data.current_page,
                        id_tipus: response.data.id_tipus,
                    });

                    this.state.restaurants.forEach(restaurant => {
                        let carta = document.createElement("div");
                        carta.setAttribute("id", "cartes");
                        let header = document.createElement("h4");
                        let imatge = document.createElement("img");
                        let buttonID = document.createElement("button");
                        buttonID.onclick = function () {
                            window.location.assign(
                                "/restaurantFront/" + restaurant.id_restaurant
                            );
                        }
                        header.setAttribute("id", "cartaHeader");
                        imatge.setAttribute("id", "imatgeCarta");
                        buttonID.setAttribute("id", "buttonID");
                        imatge.setAttribute("src", restaurant.imatge);
                        imatge.setAttribute("width", 300);
                        imatge.setAttribute("alt", "Foto restaurant");
                        let nom = document.createTextNode(restaurant.nom);
                        let info = traduccions[sessionStorage.getItem("id_idioma")][0].info;
                        let id_rest = document.createTextNode(info);
                        header.appendChild(nom);
                        buttonID.appendChild(id_rest);
                        carta.appendChild(header);
                        carta.appendChild(imatge);
                        carta.appendChild(buttonID);
                        document.getElementById("contenedorTaula").appendChild(carta);
                    }
                    );
                }
            })
            .catch(function (error) {
                console.log("ERROR -> " + error.response.data);
            });
    }

    filtrar = () => {
        axios.get("http://localhost/PROJECTE_PICA_MENJA/Pica_Menja/PicaMenja/public/api/restaurants/tipusCa/" + this.state.id_tipus)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    this.setState({
                        restaurants_tipus: response.data,
                        id_tipus: response.data.id_tipus,
                    });
                    const mostrador = document.getElementById("contenedorTaula");
                    mostrador.innerHTML = "";
                    const tipus = document.getElementById("contenedorTipus");
                    tipus.innerHTML = "";
                    this.state.restaurants_tipus.forEach(restaurant => {
                        let carta = document.createElement("div");
                        carta.setAttribute("id", "cartes");
                        let header = document.createElement("h2");
                        let imatge = document.createElement("img");
                        let buttonID = document.createElement("button");
                        buttonID.onclick = function () {
                            window.location.assign(
                                "/restaurantFront/" + restaurant.id_restaurant
                            );
                        }
                        header.setAttribute("id", "cartaHeader");
                        imatge.setAttribute("id", "imatgeCarta");
                        buttonID.setAttribute("id", "buttonID");
                        imatge.setAttribute("src", restaurant.image);
                        imatge.setAttribute("width", 300);
                        let nom = document.createTextNode(restaurant.restaurant);
                        let info = traduccions[sessionStorage.getItem("id_idioma")][0].info;
                        let id_rest = document.createTextNode(info);
                        header.appendChild(nom);
                        buttonID.appendChild(id_rest);
                        carta.appendChild(header);
                        carta.appendChild(imatge);
                        carta.appendChild(buttonID);
                        document.getElementById("contenedorTipus").appendChild(carta);
                    }
                    );
                }
            })
            .catch(function (error) {
                console.log("ERROR -> " + error.response.data);
            });
    }

    onChangeTipus = (v) => {
        this.setState({ id_tipus: v });
    };

    render() {
        return (
            <div>
                <h1 className="row justify-content-center mt-4">{traduccions[sessionStorage.getItem("id_idioma")][0].restaurants}</h1>
                {sessionStorage.getItem("id_idioma") === "1" ?
                    <>
                    <h3>Filtra per tipus</h3>
                        <Select
                            canviar={this.onChangeTipus}
                            valorInicial={this.state.id_tipus}
                            clau="id_tipus"
                            display="tipus_ca"
                            url="http://localhost/PROJECTE_PICA_MENJA/Pica_Menja/PicaMenja/public/api/tipus" />
                        <button type="button" className="btn btn-link" onClick={this.filtrar} aria-label="Botó filtrar">
                            <Image src={process.env.PUBLIC_URL + '/lupa.png'} width="30px" alt="Filtrar"></Image>
                        </button></>
                    : console.log()}
                {sessionStorage.getItem("id_idioma") === "2" ?
                    <>
                        <Select
                            canviar={this.onChangeTipus}
                            valorInicial={this.state.id_tipus}
                            clau="id_tipus"
                            display="tipus_es"
                            url="http://localhost/PROJECTE_PICA_MENJA/Pica_Menja/PicaMenja/public/api/tipus" />
                        <button type="button" className="btn btn-link" onClick={this.filtrar} aria-label="Botó filtrar">
                            <Image src={process.env.PUBLIC_URL + '/lupa.png'} width="30px" alt="Filtrar"></Image>
                        </button></>
                    : console.log()}
                {sessionStorage.getItem("id_idioma") === "3" ?
                    <>
                        <Select
                            canviar={this.onChangeTipus}
                            valorInicial={this.state.id_tipus}
                            clau="id_tipus"
                            display="tipus_en"
                            url="http://localhost/PROJECTE_PICA_MENJA/Pica_Menja/PicaMenja/public/api/tipus" />
                        <button type="button" className="btn btn-link" onClick={this.filtrar} aria-label="Botó filtrar">
                            <Image src={process.env.PUBLIC_URL + '/lupa.png'} width="30px" alt="Filtrar"></Image>
                        </button></>
                    : console.log()}
                {sessionStorage.getItem("id_idioma") === "4" ?
                    <>
                        <Select
                            canviar={this.onChangeTipus}
                            valorInicial={this.state.id_tipus}
                            clau="id_tipus"
                            display="tipus_de"
                            url="http://localhost/PROJECTE_PICA_MENJA/Pica_Menja/PicaMenja/public/api/tipus" />
                        <button type="button" className="btn btn-link" onClick={this.filtrar} aria-label="Botó filtrar">
                            <Image src={process.env.PUBLIC_URL + '/lupa.png'} width="30px" alt="Filtrar"></Image>
                        </button></>
                    : console.log()}
                <div id="contenedorTaula"></div>
                <div id="contenedorTipus"></div>
            </div>
        )
    }
}