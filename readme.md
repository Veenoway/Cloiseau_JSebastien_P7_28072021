GROUPOMANIA PROJET 7 D'OPENCLASSROOMS

1. Récupérer le projet git

2. Assurez vous d'avoir installé MYSQL, Node JS, sequelize-cli et Git

BACKEND

3. Rendez vous dans le dossier backend : 

    Dans le terminal taper npm install pour installer toutes les dépendances

    - Ouvrir le fichier config.json présent dans le dossier config

    - Indiquer votre identifiant et le mot de passe pour la BDD_development

4. Créer en local une base de donnée nommé : groupomania_development

5. Dans le terminal rendez vous dans le dossier backend puis : 

    - Taper : sequelize db:create
    - Puis : sequelize db:migrate

6. Aller dans models/index.js puis enlever les commentaires et changer les informations afin de crée un compte Admin

7. Dans le terminal du backend tapez : nodemon server.js

FRONTEND

1. Aller dans le terminal et taper : 

    - npm install 

    - npm start

SE CONNECTER 

- L'app se lance, vous pouvez désormais vous créer un compte ou vous connecter avec le compte Admin.






