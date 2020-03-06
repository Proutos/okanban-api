const Sequelize = require('sequelize');
const db = require('../db');

class Tag extends Sequelize.Model {

};

Tag.init({
  label: Sequelize.TEXT,
  color: Sequelize.INTEGER
}, {
  sequelize: db,
  tableName: "tag",
  createdAt: "created_at",
  updatedAt: "updated_at"
});

// ici, je voulais écrire les associations de Tag (donc Card)
// mais pour ça, y aurait fallu require Card
// or, pour être propre, je voulais aussi écrire l'association de Card (donc Tag) dans le modèle Card
// du coup, je devais forcément require Tag
// et bim, dépendance cyclique : Node accède à Card, lit qu'il dépend de Tag, accède à Tag, lit qu'il dépend de Card, accède à Card et c'est le début de la fin

// pour régler ça, j'écris toutes mes relations dans un unique fichier (cf. ./relations.js)

module.exports = Tag;