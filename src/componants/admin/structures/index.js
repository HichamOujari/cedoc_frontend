import React, { Component } from 'react';
import BarsAdmin from "../barsAdmin"
import "./style.css"
import PathingPage from "../../shared/pathingPage"
import Table from "../../shared/table"
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteSweepRoundedIcon from '@material-ui/icons/DeleteSweepRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
import Input from "../../shared/input"
import Axios from "axios"

class Structure extends Component {
    contentAction =[
        {
            Components:EditRoundedIcon,
            className:"text-black",
            idBtn:"UpdateForm",
            isUpdateBtn:true
        },{
            Components:VisibilityIcon,
            className:"text-primary",
            isVisibleBtn:true
        },{
            Components:DeleteSweepRoundedIcon,
            className:"text-danger",
            isDeleteBtn:true,
            path:"http://localhost:3001/auth/DeleteStruct"
        },
    ]
    state={
        data : [],
        attribute:[
          {
              nomDATA:"nom",
              nickname:"Nom",
          },{
              nomDATA:"acronyme",
              nickname:"Acronyme",
          },{
              nomDATA:"date",
              nickname:"Date de création",
          },{
              nomDATA:"chef",
              nickname:"Chef"
          },{
              nomDATA:"theme",
              nickname:"Theme"
          },
        ],
        AddStructure:"none",
        Enseignants:[],
        isErrorAdd:false,
        MsgErro:"",
        TypeStructid:this.props.id,
        UpdateStructure:"none",
        isErrorUpdate:false,
        DataSelectedItem:{}
    }
    addStructure = (e)=>{
        e.preventDefault()

        const nom = document.getElementById("IdAddStructNom")
        const acronyme = document.getElementById("IdAddStructAcronyme")
        const date = document.getElementById("IdAddStructDateC")
        const chef = document.getElementById("IdAddStructChef")
        const theme = document.getElementById("IdAddStructTheme")

        Axios.post("http://localhost:3001/auth/AddStructure",{
            nom:nom.value,
            acronyme:acronyme.value,
            date:date.value,
            chef:chef.value,
            theme:theme.value,
            type:this.state.TypeStructid
        }).then(resp=>{
            if(resp.data.error===true) this.setState({
                isErrorAdd:true,
                MsgErro:resp.data.message
            })
            else{
                this.setState({
                    AddStructure:"none",
                    isErrorAdd:false
                })
                Axios.post("http://localhost:3001/auth/GetStructureByType",{
                    type:this.state.TypeStructid
                })
                .then(resp=>{
                    if(resp.data.error===true){
                        //err
                    }else{
                        this.setState({
                            data:resp.data.data
                        })
                    }
                })
            }
        })
    }
    updateStructure = (e)=>{
        e.preventDefault()

    }
    componentDidMount(){
        Axios.post("http://localhost:3001/auth/GetStructureByType",{
            type:this.state.TypeStructid
        })
        .then(resp=>{
            if(resp.data.error===true){
                //err
            }else{
                this.setState({
                    data:resp.data.data
                })
            }
        })
    }
    componentDidUpdate(){
        if(this.props.id!==this.state.TypeStructid){
            this.setState({
                TypeStructid:this.props.id
            })
            Axios.post("http://localhost:3001/auth/GetStructureByType",{
                type:this.props.id
            })
            .then(resp=>{
                if(resp.data.error===true){
                    //err
                }else{
                    this.setState({
                        data:resp.data.data
                    })
                }
            })
        }
    }
    render() {
        return (
            <div>
                <BarsAdmin/>
                <div className="MainStructure">
                    <PathingPage title="Struture de recherche" paths={["Cedoc Emi","Admin","Struture de recherche",this.props.structure]}/>
                    <div className="Content">
                        <div onClick={()=>{
                                Axios.get("http://localhost:3001/auth/GetNewChef")
                                .then(resp=> {
                                    if(resp.data.error===true){
                                        //err
                                    }else{
                                        this.setState({
                                            Enseignants:resp.data.data
                                        })
                                    }
                                })
                                this.setState({
                                    AddStructure:"flex"
                                })
                            }} className="AddMore">
                            <AddRoundedIcon className="icon"/>
                            <p className="title">Ajouter un nouveau {this.props.structure}</p>
                        </div>
                        <Table content={this.contentAction} action={true} title={"Affichage des "+this.props.structure+"s"} isStruct={true} data={this.state.data} attribute={this.state.attribute}/>
                    </div>
                </div>
                <div className={"FormInfosComp "+this.state.AddStructure}>
                    <form onSubmit={this.addStructure} className="FormContent">
                        <p onClick={()=>{
                            this.setState({
                                AddStructure:"none"
                            })
                        }} className="closeIcon"><CloseIcon /></p>
                        <div className="formInputs">
                            <Input title={"Nom"} type="text" ID="IdAddStructNom" IsRequired={true} name={"nom"} placeholder={"Tapez le nom de la structure"} />
                            <Input title={"Acronyme"} type="text" ID="IdAddStructAcronyme" IsRequired={true} name={"acronyme"} placeholder={"Tapez l'Acronyme de la structure"} />
                            <Input title={"Date de création"} type="date" ID="IdAddStructDateC" IsRequired={true} name={"dateC"} />
                            <Input title={"Theme"} type="text" IsRequired={true} ID="IdAddStructTheme" name={"theme"} placeholder={"Entrez le Theme de la structure"} />
                            <div className="TextInput">
                                <p className="title">Chef du structure</p>
                                <select className="input" id="IdAddStructChef" required name={"structureNom"}>
                                    <option value="null">Choisir un chef</option>
                                    {this.state.Enseignants.map((ele,index)=>{
                                        return <option key={index} value={ele.id}>{ele.nom}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        {this.state.isErrorAdd===true?<p className="NotUploaded">{this.state.MsgErro}</p>:null}
                        <input type="submit" className="btnSubmit" value="Ajouter" />
                    </form>
                </div>
                <div className={"FormInfosComp "+this.state.UpdateStructure}>
                    <form onSubmit={this.updateStructure} className="FormContent">
                        <p onClick={()=>{
                            this.setState({
                                UpdateStructure:"none"
                            })
                        }} className="closeIcon"><CloseIcon /></p>
                        <div className="formInputs">
                            
                        </div>
                        {this.state.isErrorUpdate===true?<p className="NotUploaded">{this.state.MsgErro}</p>:null}
                        <input type="submit" className="btnSubmit" value="Modifier" />
                    </form>
                </div>
                
                
                <input id="AfterDelete" hidden type="submit" onClick={()=>{
                        Axios.post("http://localhost:3001/auth/GetStructureByType",{
                            type:this.state.TypeStructid
                        })
                        .then(resp=>{
                            if(resp.data.error===true){
                                //err
                            }else{
                                this.setState({
                                    data:resp.data.data
                                })
                            }
                        })
                    }} />
                <input id="UpdateForm" hidden type="submit" value="-" onClick={(e)=>{
                    //alert(e.target.value);
                    this.setState({
                        UpdateStructure:"flex",
                        isErrorUpdate:false,
                    })
                    }} onChange={(e)=>{}}/>
            </div>
        );
    }
}

export default Structure;