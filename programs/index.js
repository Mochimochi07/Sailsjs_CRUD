const sails = require('sails');

const megaManData = [
  {
    id: 1,
    name: 'Mega Man',
    weapon: 'Mega Buster'
  },
  {
    id: 2,
    name: 'Proto Man',
    weapon: 'Proto Buster'
  },
  {
    id: 3,
    name: 'Bass',
    weapon: 'Treble Boost'
  }
];

const MegaMan = {
  attributes: {
    id: {
      type: 'number',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    weapon: {
      type: 'string',
      required: true
    }
  },
  
  find: () => megaManData,
  findOne: (criteria) => megaManData.find(megaMan => megaMan.id === criteria.id),
  create: (newMegaMan) => {
    const nextId = Math.max(...megaManData.map(megaMan => megaMan.id)) + 1;
    const createdMegaMan = { ...newMegaMan, id: nextId };
    megaManData.push(createdMegaMan);
    return createdMegaMan;
  },
  update: (criteria, newValues) => {
    const updatedMegaMan = { ...MegaMan.findOne(criteria), ...newValues };
    megaManData.splice(megaManData.findIndex(megaMan => megaMan.id === criteria.id), 1, updatedMegaMan);
    return updatedMegaMan;
  },
  destroy: (criteria) => {
    const deletedMegaMan = MegaMan.findOne(criteria);
    megaManData.splice(megaManData.findIndex(megaMan => megaMan.id === criteria.id), 1);
    return deletedMegaMan;
  }
};

const MegaManController = {
  list: (req, res) => res.json(MegaMan.find()),
  find: (req, res) => res.json(MegaMan.findOne({ id: req.params.id })),
  create: (req, res) => res.json(MegaMan.create(req.body)),
  update: (req, res) => res.json(MegaMan.update({ id: req.params.id }, req.body)),
  delete: (req, res) => res.json(MegaMan.destroy({ id: req.params.id }))
};

const routes = {
  'GET /mega-man': 'MegaManController.list',
  'GET /mega-man/:id': 'MegaManController.find',
  'POST /mega-man': 'MegaManController.create',
  'PUT /mega-man/:id': 'MegaManController.update',
  'DELETE /mega-man/:id': 'MegaManController.delete'
};

sails.lift({ routes }, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log('Sails.js app lifted successfully!');
});
