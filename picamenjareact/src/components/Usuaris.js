import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
export default class Usuaris extends Component {
    constructor(props) {
        super(props);

        const pintaBoto = (params) => {
            return <div>
                <Button color="primary" size="sm"
                    onClick={() => { window.location.assign("/usuari/" + params.data.id_usuari) }}>
                    Edita
                </Button>
            </div>
        }

        const pintaBotoBorrar = (params) => {
            return <div>
                <Button variant="danger" size="sm"
                    onClick={() => {
                        if (window.confirm("Segur vols borrar l'usuari?")) {
                            this.borrar(params.data.id_usuari);
                        }
                    }}>
                    Borrar
                </Button>
            </div>
        }

        const pintaFoto = (params) => {
            return (
                <div>
                    <img src={params.data.foto_perfil} alt="" width="70" />
                </div>
            );
        };

        this.state = {
            usuaris: [],
            columnes: [
                { field: "id_usuari", headerName: "ID USUARI", sortable: true, filter: true },
                { field: "nom_usuari", headerName: "NOM USUARI", sortable: true, filter: true, floatingFilter: true, resizable: true },
                { field: "llinatges", headerName: "LLINATGES", sortable: true, filter: true, floatingFilter: true },
                { field: "telefon", headerName: "TELÈFON", sortable: true, filter: true, floatingFilter: true },
                { field: "direccio", headerName: "DIRECCIÓ", sortable: true, filter: true, floatingFilter: true },
                { field: "data_naixement", headerName: "DATA NAIXEMENT", sortable: true, filter: true, floatingFilter: true },
                { field: "email", headerName: "EMAIL", sortable: true, filter: true, floatingFilter: true, minWidth: 300, resizable: true },
                { field: "administrador", headerName: "ADMINISTRADOR", sortable: true, filter: true, floatingFilter: true },
                { field: "foto_perfil", headerName: "FOTO PERFIL", cellRendererFramework: pintaFoto, maxWidth: 150, },
                { field: "id_usuari", headerName: "", cellRendererFramework: pintaBoto, maxWidth: 100 },
                { field: "id_usuari", headerName: "", cellRendererFramework: pintaBotoBorrar, maxWidth: 100 }
            ],
            id_usuari: -1
        }
    }

    borrar = (id) => {
        // const config = {
        //     headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
        // };
        axios.delete('http://localhost/PROJECTE_PICA_MENJA/Pica_Menja/PicaMenja/public/api/usuaris/' + id)
            .then(response => {
                console.log(response);
                this.descarrega();
            })
            .catch(function (error) {
                //Mostrar error
                console.log(error);
                /*if (error.response.status === 401) {
                    window.location.assign("/");
                }*/
            })
    }

    componentDidMount() {
        this.descarrega();
    }

    descarrega() {
        // const config = {
        //     headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") }
        //     //headers: { Authorization: 'Bearer ' + "token"}
        // };

        axios.get('http://localhost/PROJECTE_PICA_MENJA/Pica_Menja/PicaMenja/public/api/usuaris')
            .then(response => {
                console.log(response);
                this.setState({ usuaris: response.data });
            })
            .catch(function (error) {
                console.log("ERROR -> " + error.response.data.error);
                if (error.response.status === 401) {
                    //sessionStorage.setItem("token", "");
                    //window.location.assign("/");
                }
            })
    }

    render() {
        return (
            <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
                <div className="row">
                    <div className="row">
                        <div className="col-md-4">&nbsp;</div>
                    </div>
                    <div className="col-md-4 mt-3 mb-3">
                        <Button
                            variant="success"
                            className="ms-3"
                            onClick={() => {
                                window.location.assign(
                                    "/usuari/" + this.state.id_usuari
                                );
                            }}>
                            Afegir nou usuari
                        </Button>
                    </div>
                    <div className="col-md-4 mt-2 mb-3">
                        <h1>Llistat d'usuaris</h1>
                    </div>
                </div>
                <AgGridReact
                    rowData={this.state.usuaris}
                    columnDefs={this.state.columnes}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
            </div>
        );
    }
}