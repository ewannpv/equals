import { getSocial, getTravail } from '@/utils/service';

/* eslint-disable operator-linebreak */
const treeViewItems = [
  {
    id: 1,
    name: 'Économie :',
    children: [
      { id: 2, name: "Nombre d'hommes et de femmes de 15 à 64 ans actives (1975 à 2021)" },
      {
        id: 3,
        name: 'Écart de salaire (1995 à 2019)',
        children: [
          { id: 4, name: 'Cadres' },
          { id: 5, name: 'Ouvriers' },
          { id: 6, name: 'Professions intermédiaires' },
          { id: 7, name: 'Employés' },
        ],
      },
      { id: 8, name: 'Taux de chômage (1975 à 2021)' },
    ],
  },
  {
    id: 9,
    name: 'Sociale :',
    children: [
      {
        id: 10,
        name: 'Niveau de diplôme selon le sexe (2006 à 2018)',
        children: [
          { id: 11, name: 'Diplôme niveau collège' },
          { id: 12, name: 'CAP/BEP' },

          { id: 13, name: 'Baccalauréat' },
          { id: 14, name: 'Au moins Bac + 2' },
        ],
      },
      {
        id: 15,
        name: "Victimes d'agression ou de vol hors ménage (2009 à 2019)",
        children: [
          { id: 16, name: 'Violences physiques ou sexuelles' },
          { id: 17, name: 'Menaces ou insultes' },
          { id: 18, name: 'Vols avec ou sans violences' },
        ],
      },
      { id: 19, name: 'Les violences au sein du couple et les violences sexuelles (2006 à 2020)' },
    ],
  },
];

const getRange = (labels) => [labels[0], labels[labels.length - 1]];

export const generateTreeView = async () => {
  const dataEconomy = await getTravail();
  const dataSocial = await getSocial();
  const treeView = treeViewItems;
  treeView.dataEconomy = dataEconomy;
  treeView.dataSocial = dataSocial;

  treeView.dataEconomy = treeView.dataEconomy.map((element) => ({
    ...element,
    range: getRange(element.labels),
  }));
  treeView.dataSocial = treeView.dataSocial.map((element) => ({
    ...element,
    range: getRange(element.labels),
  }));

  return treeView;
};

const getLockedStatus = (treeView, id, range) => {
  let nodeRange = [];
  switch (id) {
    case 2:
      nodeRange = treeView.dataEconomy[0].range;
      break;
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
      nodeRange = treeView.dataEconomy[1].range;

      break;
    case 8:
      nodeRange = treeView.dataEconomy[2].range;
      break;
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
      nodeRange = treeView.dataSocial[0].range;
      break;
    case 15:
    case 16:
    case 17:
    case 18:
      nodeRange = treeView.dataSocial[2].range;
      break;
    case 19:
      nodeRange = treeView.dataSocial[3].range;
      break;
    default:
      return false;
  }
  return parseInt(nodeRange[0], 10) > range[0] || parseInt(nodeRange[1], 10) < range[1];
};

const updateNode = (parent, node, range) => {
  const newNode = node;
  if (!newNode) return null;
  if (newNode.id) newNode.locked = getLockedStatus(parent, newNode.id, range);

  if (newNode.children) {
    newNode.children = node.children.map(
      (element) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        updateNode(parent, element, range),
      // eslint-disable-next-line function-paren-newline
    );
  }
  return newNode;
};
export const updateTreeView = (treeView, range) => {
  const newTree = treeView;
  newTree['0'] = updateNode(treeView, newTree['0'], range);
  newTree['1'] = updateNode(treeView, newTree['1'], range);
  return newTree;
};

const getPercentage = (dataset, labels, range) => {
  const labelStart = labels[0];
  const labelEnd = labels[labels.length - 1];
  if (labelStart > range[0] || labelEnd < range[1]) return null;

  const indexStart = labels.indexOf(range[0].toString());
  const indexEnd = labels.indexOf(range[1].toString());
  if (indexStart < 0 || indexEnd < 0) return null;

  return ((dataset.data[indexEnd] - dataset.data[indexStart]) / dataset.data[indexStart]) * 100;
};

const getPercentageDifference = (dataset, labels, range) => {
  const labelStart = labels[0];
  const labelEnd = labels[labels.length - 1];
  if (labelStart > range[0] || labelEnd < range[1]) return null;

  const indexStart = labels.indexOf(range[0].toString());
  const indexEnd = labels.indexOf(range[1].toString());
  if (indexStart < 0 || indexEnd < 0) return null;

  return dataset.data[indexStart] - dataset.data[indexEnd];
};

export const getEvolution = (treeView, range, items) => {
  const elements = [];
  items.forEach((element) => {
    switch (element) {
      case 2:
        {
          const value = getPercentage(
            treeView.dataEconomy[0].datasets[0],
            treeView.dataEconomy[0].labels,
            range,
          );
          if (value != null) elements.push(value);
        }
        break;
      case 4:
      case 5:
      case 6:
      case 7:
        {
          const value = getPercentageDifference(
            treeView.dataEconomy[1].datasets[element - 4],
            treeView.dataEconomy[1].labels,
            range,
          );
          if (value != null) elements.push(value);
        }
        break;
      case 8:
        {
          const value = getPercentageDifference(
            treeView.dataEconomy[2].datasets[0],
            treeView.dataEconomy[2].labels,
            range,
          );
          if (value != null) elements.push(value);
        }
        break;
      case 11:
      case 12:
      case 13:
      case 14:
        {
          const datasetIndex = (element - 11) * 2;
          const value = getPercentage(
            treeView.dataSocial[0].datasets[datasetIndex],
            treeView.dataSocial[0].labels,
            range,
          );
          if (value != null) elements.push(value);
        }
        break;
      case 16:
      case 17:
      case 18:
        {
          const datasetIndex = (element - 16) * 2;
          const value = -getPercentage(
            treeView.dataSocial[2].datasets[datasetIndex],
            treeView.dataSocial[2].labels,
            range,
          );
          if (value != null) elements.push(value);
        }
        break;
      case 19:
        {
          const value = -getPercentage(
            treeView.dataSocial[3].datasets[0],
            treeView.dataSocial[3].labels,
            range,
          );
          if (value != null && Number.isFinite(value)) elements.push(value);
        }
        break;
      default:
        break;
    }
  });

  if (!elements.length) return null;
  const sumElements = elements.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0,
  );
  return sumElements / elements.length;
};

const getPercentageGap = (dataWoman, dataMan, labels, range) => {
  const labelStart = labels[0];
  const labelEnd = labels[labels.length - 1];
  if (labelStart > range[0] || labelEnd < range[1]) return null;

  const indexStart = labels.indexOf(range[0].toString());
  const indexEnd = labels.indexOf(range[1].toString());
  if (indexStart < 0 || indexEnd < 0) return null;

  const dataStart = ((dataMan[indexStart] - dataWoman[indexStart]) / dataMan[indexStart]) * 100;
  const dataEnd = ((dataMan[indexEnd] - dataWoman[indexEnd]) / dataMan[indexEnd]) * 100;

  return [dataStart, dataEnd];
};

const getPercentageUnionDifferenceGap = (dataset, labels, range) => {
  const labelStart = labels[0];
  const labelEnd = labels[labels.length - 1];
  if (labelStart > range[0] || labelEnd < range[1]) return null;

  const indexStart = labels.indexOf(range[0].toString());
  const indexEnd = labels.indexOf(range[1].toString());
  if (indexStart < 0 || indexEnd < 0) return null;

  return [dataset[indexStart], dataset[indexEnd]];
};

const getPercentageDifferenceGap = (dataWoman, dataMan, labels, range) => {
  const labelStart = labels[0];
  const labelEnd = labels[labels.length - 1];
  if (labelStart > range[0] || labelEnd < range[1]) return null;

  const indexStart = labels.indexOf(range[0].toString());
  const indexEnd = labels.indexOf(range[1].toString());
  if (indexStart < 0 || indexEnd < 0) return null;

  return [dataMan[indexStart] - dataWoman[indexStart], dataMan[indexEnd] - dataWoman[indexEnd]];
};

export const getEvolutionGap = (treeView, range, items) => {
  const elements = [];
  items.forEach((element) => {
    switch (element) {
      case 2:
        {
          const value = getPercentageGap(
            treeView.dataEconomy[0].datasets[0].data,
            treeView.dataEconomy[0].datasets[1].data,
            treeView.dataEconomy[0].labels,
            range,
          );
          if (value != null) elements.push(value);
        }
        break;
      case 4:
      case 5:
      case 6:
      case 7:
        {
          const value = getPercentageUnionDifferenceGap(
            treeView.dataEconomy[1].datasets[element - 4].data,
            treeView.dataEconomy[1].labels,
            range,
          );
          if (value != null) elements.push(value);
        }
        break;
      case 8:
        {
          const value = getPercentageDifferenceGap(
            treeView.dataEconomy[2].datasets[1].data,
            treeView.dataEconomy[2].datasets[0].data,
            treeView.dataEconomy[2].labels,
            range,
          );
          if (value != null) elements.push(value);
        }
        break;
      case 11:
      case 12:
      case 13:
      case 14:
        {
          const datasetIndex = (element - 11) * 2;

          const value = getPercentageGap(
            treeView.dataSocial[0].datasets[datasetIndex].data,
            treeView.dataSocial[0].datasets[datasetIndex + 1].data,
            treeView.dataSocial[0].labels,
            range,
          );
          if (value != null) elements.push(value);
        }
        break;
      case 16:
      case 17:
      case 18:
        {
          const datasetIndex = (element - 16) * 2;

          const value = getPercentageGap(
            treeView.dataSocial[2].datasets[datasetIndex + 1].data,
            treeView.dataSocial[2].datasets[datasetIndex].data,
            treeView.dataSocial[2].labels,
            range,
          );
          if (value != null) elements.push(value);
        }
        break;
      case 19: {
        const value = getPercentageGap(
          treeView.dataSocial[3].datasets[1].data,
          treeView.dataSocial[3].datasets[0].data,
          treeView.dataSocial[3].labels,
          range,
        );
        if (value != null && Number.isFinite(value[0]) && Number.isFinite(value[1])) {
          elements.push(value);
        }
        break;
      }

      default:
        break;
    }
  });
  if (!elements.length) return null;

  let startSum = 0;
  let endSum = 0;
  elements.forEach((element) => {
    startSum += element[0];
    endSum += element[1];
  });

  return [startSum / elements.length, endSum / elements.length];
};

export const getEquity = (evolutionGap, range) => {
  if (evolutionGap == null) return null;
  if (evolutionGap[1] < 0) return 0;

  const time = range[1] - range[0];
  const diff = evolutionGap[0] - evolutionGap[1];

  if (time <= 0) return 0;

  const ratio = diff / time;

  if (ratio < 0) return 1 / 0;
  return Math.ceil(evolutionGap[1] / ratio);
};
