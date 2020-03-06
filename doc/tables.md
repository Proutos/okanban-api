# Table "List"

| Champ | Type | Peut être null | Valeur par défaut |
|---|---|---|---|
| id | SERIAL | non | aucun |
| name | TEXT | non | aucune |
| position | INT | non | aucune |
| created_at | TIMESTAMP | non | `now()` |
| updated_at | TIMESTAMP | oui | null |

# Table "Card"

| Champ | Type | Peut être null | Valeur par défaut |
|---|---|---|---|
| id | SERIAL | non | aucun |
| title | TEXT | non | aucune |
| color | INTEGER | oui | null |
| list_id | INT | non | aucune |
| position | INT | non | aucune |
| created_at | TIMESTAMP | non | `now()` |
| updated_at | TIMESTAMP | oui | null |

# Table "Tag"

| Champ | Type | Peut être null | Valeur par défaut |
|---|---|---|---|
| id | SERIAL | non | aucun |
| label | TEXT | non | aucune |
| color | INTEGER | oui | null |
| created_at | TIMESTAMP | non | `now()` |
| updated_at | TIMESTAMP | oui | null |

# Table "Cards_have_tags"

| Champ | Type | Peut être null | Valeur par défaut |
|---|---|---|---|
| id | SERIAL | non | aucun |
| tag_id | INT | non | aucune |
| card_id | INT | non | aucune |
| created_at | TIMESTAMP | non | `now()` |
| updated_at | TIMESTAMP | oui | null |