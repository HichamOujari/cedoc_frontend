import React, { Component } from 'react';
import "./actualite.css"
import Navbar from "../shared/navbar"
import Title from "../shared/title"
import Table from "../shared/table"

export default class Actualite extends Component {
  state={
      data : [
        {
            nom : "NomDOc1",
            prenom:"PrenomDoc1",
            cne:"FB11111",
            cni:"8374",
            equipe:"RIME"
        },{
            nom : "NomDOc2",
            prenom:"PrenomDoc2",
            cne:"FB3511",
            cni:"54548374",
            equipe:"RIME"
        },
      ],
      attribute:[
        {
            nomDATA:"nom",
            nickname:"Nom"
        },{
            nomDATA:"prenom",
            nickname:"Prénom"
        },{
            nomDATA:"cne",
            nickname:"CNE"
        },{
            nomDATA:"cni",
            nickname:"CNI"
        },{
            nomDATA:"equipe",
            nickname:"Equipe"
        },
      ]
  }
  render() {
    return (
        <div>
            <Navbar />
            <div className="MainActualite">
                <Title title="Actualités" />
                <Table title="Résultat de préselection" data={this.state.data} attribute={this.state.attribute}/>
            </div>
        </div>
    );
  }
}
