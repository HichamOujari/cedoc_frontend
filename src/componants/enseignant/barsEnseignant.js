import React, { Component } from 'react';
import BarAdmin from "../shared/barAdmin"
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';

class BarsEnseignant extends Component {
    SideEle=[
        {
            title:"Dashboard",
            path:this.props.ChefEq===true?"/chef-equipe":"/enseignant",
            icon:<DashboardIcon className="icon" />,
            ele:[]
        },{
            title:"Doctorants",
            path:"#",
            icon:<GroupRoundedIcon className="icon" />,
            ele:[
                {
                    title:"Doctorants préinscrits",
                    path:this.props.ChefEq===true?"/chef-equipe/doctorant/preinscrit":"/enseignant/doctorant/preinscrit"
                },{
                    title:"Anciens doctorants",
                    path:this.props.ChefEq===true?"/chef-equipe/doctorant":"/enseignant/doctorant/"
                },
            ]
        },{
            title:"Enseignants",
            path:this.props.ChefEq===true?"/chef-equipe/enseignants":"/enseignant/enseignants",
            icon:<WorkRoundedIcon className="icon" />,
            ele:[]
        },
    ]
    render() {
        return (
            <BarAdmin profilPath={this.props.ChefEq===true?"/chef-equipe/profil":"/enseignant/profil"} Eles={this.SideEle}/>
        );
    }
}

export default BarsEnseignant;