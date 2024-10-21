import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Species from '../src/models/speciesModel';

dotenv.config();

const speciesList = [
  { speciesNamePT: 'Cachorro', speciesNameEN: 'Dog' },
  { speciesNamePT: 'Gato', speciesNameEN: 'Cat' },
  { speciesNamePT: 'Pássaro', speciesNameEN: 'Bird' },
  { speciesNamePT: 'Peixe', speciesNameEN: 'Fish' },
  { speciesNamePT: 'Cobra', speciesNameEN: 'Snake' },
  { speciesNamePT: 'Lagarto', speciesNameEN: 'Lizard' },
  { speciesNamePT: 'Rato', speciesNameEN: 'Rat' },
  { speciesNamePT: 'Coelho', speciesNameEN: 'Rabbit' },
  { speciesNamePT: 'Hamster', speciesNameEN: 'Hamster' },
  { speciesNamePT: 'Porquinho da Índia', speciesNameEN: 'Guinea Pig' },
  { speciesNamePT: 'Furão', speciesNameEN: 'Ferret' },
  { speciesNamePT: 'Tartaruga', speciesNameEN: 'Turtle' },
];

const populateSpecies = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Conectado ao MongoDB');

    await Species.deleteMany({});

    await Species.insertMany(speciesList);

    console.log('Espécies inseridas com sucesso');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao inserir espécies', error);
    process.exit(1);
  }
};

populateSpecies();
