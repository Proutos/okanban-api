const { Card, Tag } = require('../models/relations');

const TagController = {
    // route : POST /cards/:id/tag
    associateTagToCard: async (request, response) => {
        try {
            // les 2 infos utiles ne se trouvent pas au même endroit
            const cardId = request.params.id;
            const tagId = request.body.tagId;

            // NTUI
            const bodyErrors = [];
            if (!tagId) {
                bodyErrors.push(`the tagId parameter is missing`);
            }

            if (bodyErrors.length) {
                // si la requête ne contient pas toutes les infos demandées
                response.status(400).json(bodyErrors);
            } else {

                // on va chercher la carte
                let card = await Card.findByPk(cardId, {
                    // on inclut les tags car si tout se passe bien, on retournera la carte en guise de réponse (et on verra donc le nouveau tag ajouté)
                    include: ['tags']
                });

                if (!card) {
                    response.status(404).json(`Cant find a card with the id ${cardId}`);
                } else {
                    // ici, tout va bien, j'ai ma carte, on peut continuer
                    const tag = await Tag.findByPk(tagId);

                    if (!tag) {
                        response.status(404).json(`Cant find a tag with the id ${tagId}`);
                    } else {

                        // la card existe, le tag existe, yapluka
                        await card.addTag(tag);

                        // en attendant que Sequelize corrige ce "manque", on peut lier manuellement l'objet tag à notre objet card
                        card.tags.push(tag);

                        // comme ça, on retourne une card à jour
                        response.json(card);
                    }
                }

            }
        } catch (error) {
            response.status(500).json(error);
        }
    },
    // route : DELETE /cards/:card_id/tag/:tag_id
    deleteTagFromCard: async (request, response) => {
        try {
            const cardId = request.params.card_id;
            const tagId = request.params.tag_id;

            const card = await Card.findByPk(cardId);

            if (!card) {
                response.status(404).json(`Cant find a card with the id ${cardId}`);
            } else {
                // ici, tout va bien, j'ai ma carte, on peut continuer
                const tag = await Tag.findByPk(tagId);

                if (!tag) {
                    response.status(404).json(`Cant find a tag with the id ${tagId}`);
                } else {
                    await card.removeTag(tag);

                    response.json('OK');
                }
            }
        } catch (error) {
            response.status(500).json(error);
        }
    }
};

module.exports = TagController;