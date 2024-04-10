<!-- .slide: class="transition bg-pink" -->

<h1 style="margin-bottom: 10px"> Boucle de réconciliation </h1>
<div style="width: 200px; height: 10px; background-color: #5155f9"></div>
<br>
<!-- .slide: class="two-column" -->

La boucle de réconciliation en GitOps est un processus continu qui compare l'état souhaité d'une application, tel que défini dans un référentiel Git, à son état réel dans un cluster Kubernetes. Si une différence est détectée, la boucle de réconciliation applique automatiquement les modifications nécessaires pour aligner l'état réel sur l'état souhaité.


<br>
<br>
<br>

La nature déclarative de Kubernetes met en jeu deux concepts interdépendants : celui de l'état courant et celui de l'état désiré. L’état courant est l’état réel du cluster Kubernetes à un moment donné, tandis que l’état désiré correspond à la configuration donnée par l’utilisateur via les ressources abordées plus haut. La tâche de Kubernetes et plus particulièrement de son controller manager est de réaliser la réconciliation de ces deux état en faisant converger l’état courant vers l’état désiré. Ceci est fait via ce qu’on appelle des boucles de réconciliation.

## **schéma**


##--##

Cette approche apporte plusieurs bénéfices majeurs pour faciliter l’opération d’une plateforme sous Kubernetes, tels que :

Le self-healing : si un node n’est plus disponible pour une raison X ou Y, Kubernetes va automatiquement recréer les pods présents sur ce node sur un ou plusieurs autres nodes disponibles. De même, si un conteneur crashe, il sera automatiquement relancé.
Une grande résilience : lorsqu’une action ne fonctionne pas, comme par exemple une demande de création de certificat SSL, Kubernetes va automatiquement réessayer plusieurs fois à intervalle croissant de temps.
Du scheduling intelligent : Kubernetes va automatiquement assigner les pods à des nodes disponibles tout en répartissant la charge de travail entre ces nodes.

<br>
<br>
<br>
<br>
