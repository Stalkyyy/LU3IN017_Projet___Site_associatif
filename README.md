# Projet Organiz'asso - LU3IN017 2023/24

Nous avons travaillé sur ce projet tout au long de l'UE de L3 Info "Technologies du Web" (LU3IN017) de Sorbonne Université Sciences. Ce dernier consistait à créer un site associatif Organiz-Asso, tout en apprenant les bases du Web : HTML, CSS, Javascript, Node, React, côté client, côté serveur etc... 

## Groupe
- PINHO FERNANDES Enzo - 21107465
- PIRON-PALLISER Maximilien - 21107603

## Explication du lancement

Pour commencer, dans le dossier client et server, exécutez dans le terminal `npm install`

Ensuite, tapez dans les répertoires correspondant, pour lancer :
- le côté serveur : `npm start`
- le côté client : `npm run dev`

Pour tester correctement le site, on conseille de rajouter un compte utilisateur administrateur grâce aux requêtes postmans.
- Création d'utilisateur (create)
- Validation avec le status admin (validation)

## Cahier des charges

Notre site Organiz'asso permet à des membres d'une association d'échanger des messages avec des forums. 

L'association est pilotée par un conseil d'administration, qui sont des membres élus appelés administrateurs. Il a deux forums :
- Le forum ouvert, que chaque membre inscrit peut consulter et sur lequel il peut poster des messages;
- Le forum fermé, réservé aux membres du conseil d'administration.

Hors connexion, un utilisateur n'a que la possibilité de créer un compte. Son inscription doit être validée par un administrateur pour lui attribuer le statut de membre. Lorsqu'un membre se connecte, cela permet d'ouvrir une page principale qui contient le forum ouvert.

Une fois connecté, un membre peut :
- créer des messages :
  -  soit en réponse à un message précédemment posté
  -  soit pour démarrer une nouvelle discussion
-  visualiser son profil contenant au moins la liste des messages qu'il a publiés. A partir de son profil, il peut supprimer ses propres messages.
-  visualiser le profil d'autres membres.
-  rechercher des messages en précisant des mots-clés, un intervalle de temps de publication ou leur auteur.

Les administrateurs :
- ont accès au forum fermé
- peuvent donner ou retirer le statut administrateur à un autre utilisateur, sauf à lui-même
- revoient les inscriptions sur le site, et valident ou non le statut de membre à un utilisateur inscrit.

A la fin de son activité, l'utilisateur a la possibilité de se déconnecter.
