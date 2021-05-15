import React, { Component } from 'react';
import BarsAdmin from "../barsAdmin"
import "./doctorant.css"
import PathingPage from "../../shared/pathingPage"
import axios from 'axios';
import DescriptionIcon from '@material-ui/icons/Description';
import {Link} from "react-router-dom"
import CancelIcon from '@material-ui/icons/Cancel';
import GetAppIcon from '@material-ui/icons/GetApp';

class Hisfiles extends Component {
    state={
        doctNom:"",
        DoctError:false,
        stateShowDoct:"none",
        selectedDocPath:"",
        files:[
            {
                nom:"Reçu de paiement.jpg",
                type:"Reçu",
                path:"https://www.policycenter.ma/sites/default/files/PP-20-07_LastrategieduMarocFaceAuCovid19.pdf"
            },{
                nom:"RapportV1.pdf",
                type:"Rapport",
                path:"http://infolab.stanford.edu/pub/papers/google.pdf"
            },{
                nom:"Cedoc.zip",
                type:"Reçu",
                path:"http://projet.eu.org/pedago/sin/term/3-UML.pdf"
            },{
                nom:"Source code",
                type:"Source code",
                path:"https://github.com/mariuszgromada/mXparser/zipball/master"
            },{
                nom:"attestation de travail.pdf",
                type:"attestation",
                path:"https://ueuromed.org/sites/default/files/upload/files/procedure-dinscription-au-cedoc-de-luemf_0.pdf"
            },{
                nom:"convention.pdf",
                type:"attestation",
                path:"http://cftcmetallurgie.com/cftc-airbus-helicopters/wp-content/uploads/sites/4/2020/03/etq1a9wx0amgfpy.png"
            },
        ]
    }
    File  = ({index,name,type,path}) =>{
        return (<div key={index} onClick={()=>{
            this.setState({
                selectedDocPath:path,
                stateShowDoct:"flex"
            })
        }} className="file">
                <DescriptionIcon className="icon" />
                <p className="title">{name}</p>
                <p className="type">Type:<span>{type}</span></p>
            </div>)
    }
    componentDidMount(){
        axios.post('http://localhost:3001/auth/getDoctFiles',{
            userID:document.location.href.split("doctorants/")[1],
        })
        .then(resp=>{
            if(resp.data.error===true){
                this.setState({
                    DoctError:true,
                    doctNom:"inconnu"
                })
            }else{
                this.setState({
                    doctNom:resp.data.nom
                })
            }
        })
    }
    render() {
        return (
            <div>
                <BarsAdmin/>
                <div className="MainAncienDoctorant">
                    <PathingPage title={"les fichiers de "+this.state.doctNom} paths={["Cedoc Emi","Admin","Les ancien doctorants","Les fichiers personnels"]}/>
                    <div className="Content">
                        {this.state.DoctError===true?<div className="Error404">
                            <p className="title">404</p>
                            <p className="text">NOT FOUND</p>
                        </div>:null}
                        <div className="files">
                            {this.state.files.map((ele,index)=>{
                                return (<this.File key={index} name={ele.nom} type={ele.type} path={ele.path} />)
                            })}
                        </div>
                        <div className={"showDoctFileSection "+this.state.stateShowDoct}>
                            <div className="CloseBar">
                                <Link to={this.state.selectedDocPath}><GetAppIcon className="DownloadIcon" /></Link>
                                <CancelIcon onClick={()=>{
                                    this.setState({
                                        stateShowDoct:"none"
                                    })
                                }} className="CloseIcon" />
                            </div>
                            <iframe title="iframe" className="content" src={"https://docs.google.com/viewerng/viewer?url="+this.state.selectedDocPath+"&embedded=true"}></iframe>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Hisfiles;