const treeViewItems = [
  {
    id: 1,
    name: 'Economie :',
    children: [
      { id: 2, name: 'Activité selon le sexe de 15 à 64 ans' },
      {
        id: 3,
        name: 'Ecart de salaire',
        children: [
          { id: 4, name: 'Cadres' },
          { id: 5, name: 'Ouvriers' },
          { id: 6, name: 'Professions intermédiaires' },
          { id: 7, name: 'Employés' },
        ],
      },
      { id: 8, name: 'Taux de chomage' },
    ],
  },
  {
    id: 9,
    name: 'Sociale :',
    children: [
      {
        id: 10,
        name: 'Niveau de diplome selon le sexe',
        children: [
          { id: 11, name: 'Diplome niveau college' },
          { id: 12, name: 'Baccalauréat' },
          { id: 13, name: 'Au moins Bac + 2' },
        ],
      },
      { id: 14, name: "Victimes d'agression ou de vol hors ménage" },
      { id: 15, name: 'Les violences au sein du couple et les violences sexuelles' },
    ],
  },
];

export default treeViewItems;
