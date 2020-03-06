/* On supprime (si elle existe) la table nommée liste */
DROP TABLE IF EXISTS "liste" ;

/* On crée la table liste si elle n'existe pas */
CREATE TABLE IF NOT EXISTS "liste" (
    "id" SERIAL,
    "nom" VARCHAR(32) NOT NULL,
    PRIMARY KEY ("id")
);

/* On supprime (si elle existe) la table nommée carte */
DROP TABLE IF EXISTS "carte" ;

/* On crée la table carte si elle n'existe pas */
CREATE TABLE IF NOT EXISTS "carte" (
    "id" SERIAL,
    "listId" INT NOT NULL,
    "titre" VARCHAR(50) NOT NULL,
    "couleur" VARCHAR(24),
    "description" VARCHAR(500),
    PRIMARY KEY ("id")
);

/* On supprime (si elle existe) la table nommée label */
DROP TABLE IF EXISTS "label" ;

/* On crée la table label si elle n'existe pas */
CREATE TABLE IF NOT EXISTS "label" (
    "id" SERIAL,
    "libelle" VARCHAR(30),
    "couleur" VARCHAR(24),
    PRIMARY KEY ("id")
);

/* On supprime (si elle existe) la table nommée cart_has_labels */
DROP TABLE IF EXISTS "cart_has_labels" ;

/* On crée la table cart_has_labels si elle n'existe pas (elle servira à relier carte à label et label à carte) */
CREATE TABLE IF NOT EXISTS "cart_has_labels" (
    "label_id" INT,
    "carte_id" INT,
    PRIMARY KEY ("label_id", "carte_id")
);

BEGIN;

INSERT INTO "liste" ("nom") VALUES
('A faire'),
('En cours'),
('Terminé'),
('Non trié');

INSERT INTO "carte" ("listId", "titre", "couleur", "description") VALUES
(3, 'MCD', NULL, 'Faire le MCD'),
(3, 'MLD', NULL, 'Faire le MLD'),
(4, 'DataBase', NULL, 'Créer une database ainsi quun nouvel User'),
(4, 'Sequalize', NULL, 'Créer les modèles sequelize');

INSERT INTO "label" ("libelle", "couleur") VALUES
('Front', 'green'),
('Back', 'yellow'),
('Easy', 'blue'),
('Hard', 'red');

INSERT INTO "cart_has_labels" ("label_id", "carte_id") VALUES
(3, 1),
(3, 2),
(2, 3),
(2, 4),
(4, 4);

COMMIT;