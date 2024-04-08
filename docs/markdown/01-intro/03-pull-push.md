<!-- .slide: class="transition bg-pink" -->

# Pull VS Push

##==##

<h1 style="margin-bottom: 10px"> Push method</h1>
<div style="width: 200px; height: 10px; background-color: #5155f9"></div>
<br>

<!-- .slide: class="two-column" -->

## Avantages 

Sécurité :
- les identifiants sont uniquement stockées au sein du cluster et non partagées depuis l'extérieur
- un seul point d'entrée pour la modification 
- Elle aide à garantir que votre référentiel local est synchronisé avec le référentiel partagé, ce qui réduit le risque de conflits.

Facile : 
- Facilite les MAJ ()
- Pas de rajout de compléxité avec la CD
- Les registres Docker peuvent être analysés à la recherche de nouvelles versions et si une nouvelle image est envoyée, le dépôt git et le déploiement sont mis à jour avec la nouvelle version.
- Les outils basés sur l’extraction peuvent être distribués dans différents espaces de noms, avec différents référentiels git et droits d’accès et, grâce à cela, un modèle multi-tenant peut être appliqué. L’équipe A peut utiliser l’espace de noms A, l’équipe B peut utiliser l’espace de noms B et l’équipe Infrastructure peut en avoir un global. (On a une vision de l'ensemble de notre infra, et une mise en place facile et rapide )

--> le repo représente vraiment ce qu'il y à distance 

## Inconvénients

- Gestion des secrets MAIS des possibilités avec Bitnami Sealed Secret / Vault, Tanguy en parlera par la suite
- Liés aux outils éxécutant le pull --> parfois plus compliqué d'utiliser des outils comme Helm / Kustomize --> Plus difficile de personnaliser le processus de déploiement 


##--##
<br>
<br>
<br>
<br>
<br>

<img class="h-500" style="box-shadow: 0px 0px 20px 0;" src="./assets/images/CI.png">

##==##

<h1 style="margin-bottom: 10px"> Pull method</h1>
<div style="width: 200px; height: 10px; background-color: #5155f9"></div>
<br>

<!-- .slide: class="two-column" -->

## Avantages

- Liberté d'utiliser les outils de notre choix / personnaliser au max le process de déploiement 
- Gestion des secrets simplifiées 
- Pas lié à l'outil, on peut utiliser du jenkins comme des scripts

## Inconvénients

- pipelines / processus peuvent-êtres complexes 
- Peut générer des conflits si la pipeline ne prévoit pas tous les cas / est mal implémentée // Peut écraser des modifications = pas de sécurité 
- nécessite des modifications pour l'implémentation de nouvelles API / environnement
- fortement lié au langage de la pipeline 


##--##
<br>
<br>
<br>
<br>
<br>

<img class="h-500" style="box-shadow: 0px 0px 20px 0;" src="./assets/images/CI.png">
