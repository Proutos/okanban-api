-- schéma initial de la DB okanban

-- table list

DROP TABLE IF EXISTS "list" CASCADE;

CREATE TABLE "list" (
    "id" SERIAL PRIMARY KEY, -- PRIMARY KEY implique UNIQUE et NOT NULL, pas besoin de les réécrire
    "name" TEXT UNIQUE NOT NULL,
    "position" INT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP
);

-- table card

DROP TABLE IF EXISTS "card" CASCADE;

CREATE TABLE "card" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "color" INT,
    "list_id" INT NOT NULL REFERENCES "list"("id"), -- syntaxe d'une clé étrangère
    "position" INT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP
);

-- table tag

DROP TABLE IF EXISTS "tag" CASCADE;

CREATE TABLE "tag" (
    "id" SERIAL PRIMARY KEY,
    "label" TEXT UNIQUE NOT NULL,
    "color" INT,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP
);

-- table de liaison card <> tag

DROP TABLE IF EXISTS "cards_have_tags" CASCADE;

CREATE TABLE "cards_have_tags" (
    "id" SERIAL PRIMARY KEY,
    "tag_id" INT NOT NULL REFERENCES "tag"("id"),
    "card_id" INT NOT NULL REFERENCES "card"("id"),
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP
);

-- Pour ceux qui ont décidé de ne pas rajouter de champ id à la table de liaison

/*
CREATE TABLE cards_have_tags (
    "tag_id" INT NOT NULL REFERENCES "tag"("id"),
    "card_id" INT NOT NULL REFERENCES "card"("id"),
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP,
    PRIMARY KEY ("tag_id", "card_id")
);
*/

-- ----- SEEDING -----

-- 3 listes en mode kanban

INSERT INTO "list"("name", "position") VALUES ('todo', 0), ('doing', 1), ('done', 2);

-- quelques tâches du présent projet

INSERT INTO "card"("title", "list_id", "position") VALUES
    ('dessiner le mcd', 3, 0),
    ('écrire les US', 3, 1),
    ('DDL', 3, 2),
    ('DML', 2, 0),
    ('modèles Sequelize', 1, 0);

-- 3 labels

INSERT INTO "tag"("label") VALUES ('conception'), ('développement'), ('test');

-- et on associe à chaque carte au moins un label

INSERT INTO "cards_have_tags"("card_id", "tag_id") VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (3, 2),
    (4, 2),
    (5, 2);