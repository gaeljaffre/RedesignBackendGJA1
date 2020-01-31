const clauses = [
  {
    id: 1,
    idContrat: 1,
    ori: 'PAR',
    des: 'TLS',
    cdr: 'C',
    farebasis: 'FULL-FLEX',
    cie: 'AF',
    ddv: '01/01/2020',
    dfv: '31/12/2020',
    remise: 23,
  },
  {
    id: 2,
    idContrat: 2,
    ori: 'PAR',
    des: 'TLS',
    cdr: 'D',
    farebasis: 'SEMI-FLEX',
    cie: 'AF',
    ddv: '01/01/2020',
    dfv: '31/12/2020',
    remise: 15,
  },
  {
    id: 3,
    idContrat: 2,
    ori: 'PAR',
    des: 'TLS',
    cdr: 'Y',
    //farebasis: '',
    upgradable: 1,
    cie: 'AF',
    ddv: '01/01/2020',
    dfv: '31/12/2020',
    remise: 4,
},
  {
    id: 4,
    idContrat: 1,
    ori: 'TLS',
    des: 'SIN',
    cdr: 'C',
    farebasis: 'FULL-FLEX',
    cie: 'KL',
    ddv: '01/01/2020',
    dfv: '31/12/2020',
    remise: 35,
  },
  {
    id: 5,
    idContrat: 1,
    ori: 'TLS',
    des: 'SIN',
    cdr: 'D',
    farebasis: 'SEMI-FLEX',
    cie: 'KL',
    ddv: '01/01/2020',
    dfv: '31/12/2020',
    remise: 22,
  },
  {
    id: 6,
    idContrat: 3,
    ori: 'TLS',
    des: 'SIN',
    cdr: 'Y',
    farebasis: '',
    upgradable: 1,
    cie: 'KL',
    ddv: '01/01/2020',
    dfv: '31/12/2020',
    remise: 5,
},
  {
    id: 7,
    idContrat: 3,
    ori: 'TLS',
    des: 'SIN',
    cdr: 'Y',
    farebasis: '',
    upgradable: 1,
    cie: 'DL',
    ddv: '01/01/2020',
    dfv: '31/12/2020',
    remise: 3,
  }, 
];

//module.exports = clauses;

const getListeClauses = (contratId) => {
  var liste = [];
  clauses.forEach(clause => {
    //console.log("clause " + clause.id); 
    if(clause.idContrat == contratId) {
      liste.push(clause);
    }
  });
  return liste;
};

module.exports = { clauses, getListeClauses };
