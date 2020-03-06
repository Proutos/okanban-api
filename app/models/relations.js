const List = require('./list');
const Card = require('./card');
const Tag = require('./tag');

// pour éviter la boucle infernale des dépendances, je centralise mes associations ici

// card <> tag

Card.belongsToMany(Tag, {
    as: 'tags',
    through: 'cards_have_tags',
    foreignKey: 'card_id',
    otherKey: 'tag_id'
});

Tag.belongsToMany(Card, {
    as: 'cards',
    through: 'cards_have_tags',
    foreignKey: 'tag_id',
    otherKey: 'card_id'
});

// card > list

List.hasMany(Card, {
    as: 'cards',
    foreignKey: 'list_id'
});

Card.belongsTo(List, {
    as: 'list',
    foreignKey: 'list_id'
});

// ne pas oublier de réexporter les modèles mis à jour, sinon ils seront inaccessibles
module.exports = { List, Card, Tag };