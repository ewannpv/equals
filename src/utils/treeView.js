import { getTravail, getSocial } from '@/utils/service';

const treeViewItems = [
  {
    id: 1,
    name: 'Economie :',
    children: [
      { id: 2, name: "Nombre d'hommes et de femmes de 15 à 64 ans actives (1975 à 2021)" },
      {
        id: 3,
        name: 'Ecart de salaire (1995 à 2019)',
        children: [
          { id: 4, name: 'Cadres' },
          { id: 5, name: 'Ouvriers' },
          { id: 6, name: 'Professions intermédiaires' },
          { id: 7, name: 'Employés' },
        ],
      },
      { id: 8, name: 'Taux de chomage (1975 à 2021)' },
    ],
  },
  {
    id: 9,
    name: 'Sociale :',
    children: [
      {
        id: 10,
        name: 'Niveau de diplome selon le sexe (2006 à 2018)',
        children: [
          { id: 11, name: 'Diplome niveau college' },
          { id: 12, name: 'CAP/BEP' },

          { id: 13, name: 'Baccalauréat' },
          { id: 14, name: 'Au moins Bac + 2' },
        ],
      },
      { id: 15, name: "Victimes d'agression ou de vol hors ménage (2009 à 2019)" },
      { id: 16, name: 'Les violences au sein du couple et les violences sexuelles (2006 à 2020)' },
    ],
  },
];

const generateTreeView = async () => {
  const treeView = treeViewItems;
  getTravail().then((data) => {
    console.log(data);
  });
  getSocial().then((data) => {
    console.log(data);
  });
  return treeView;
};

export default generateTreeView;
