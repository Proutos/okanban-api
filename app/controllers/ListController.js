const { List } = require('../models/relations');

const ListController = {
    getAllLists: async (request, response) => {
        try {
            let lists = await List.findAll();
            response.json(lists);
        } catch (error) {
            console.error(error);
            response.status(500).json(error);
        }
    },
    // route : GET /lists/:id
    getList: async (request, response) => {
        try {
            const listId = request.params.id;
            let list = await List.findByPk(listId);
            if (list) {
                response.json(list);
            } else {
                // pas de liste pour cet id
                response.status(404).json(`Cant find a list with this id : ${listId}`);
            }
        } catch (error) {
            console.error(error);
            response.status(500).json(error);
        }
    },
    // route : POST /lists
    createList: async (request, response) => {
        try {
            const {name, position} = request.body;
            // NTUI
            const bodyErrors = [];
            if (!name) {
                bodyErrors.push('name parameter is missing');
            }
            if (!position) {
                bodyErrors.push('position parameter is missing');
            }
            // en testant la taille du tableau, je distingue facilement les 2 cas qui m'intéressent
            // taille 0, assimilé à false dans un if : on ne rentre pas dans le if
            // taille 1+, assimilé à true dans un if : on rentre dans le if
            if (bodyErrors.length) {
                // s'il y a des erreurs
                response.status(400).json(bodyErrors);
            } else {
                const newList = new List();
                newList.name = name;
                newList.position = position;
                await newList.save();
                response.json(newList);
            }
        } catch (error) {
            response.status(500).json(error);
        }
    },
    // route : PATCH /lists/:id
    editList: async (request, response) => {
        try {
            const listId = request.params.id;
            let list = await List.findByPk(listId);
            console.log(listId);
            if (!list) {
                // pas de liste pour cet id
                response.status(404).json(`Cant find a list with this id : ${listId}`);
            } else {
                // on a trouvé la liste, voyons maintenant ce qu'il faut mettre à jour
                const { name, position } = request.body;

                if (name) {
                    // mettre à jour le nom
                    list.name = name;
                }

                if (position) {
                    // mettre à jour la position
                    list.position = position;
                }

                await list.save();

                response.json(list);
            }
        } catch (error) {
            console.error(error);
            response.status(500).json(error);
        }
    },
    // route : PUT /lists/:id
    upsertList: async (request, response) => {
        try {
            const listId = request.params.id;
            let list = await List.findByPk(listId);
            // pour savoir si on update ou si on insert, on teste l'existance de list
            if (list) {
                ListController.editList(request, response);
            } else {
                ListController.createList(request, response);
            }
        } catch (error) {
            response.status(500).json(error);
        }
    },
    // route : DELETE /lists/:id
    deleteList: async (request, response) => {
        try {
            const listId = request.params.id;
            let list = await List.findByPk(listId);
            await list.destroy();
            // ici, ça ne sert à rien de renvoyer l'objet, ça serait même contrintuitif vu qu'il n'existe pas dans la BDD
            response.json('OK');
        } catch (error) {
            response.status(500).send(error);
        }
    }
};

module.exports = ListController;