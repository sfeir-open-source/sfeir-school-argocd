<h1 style="margin-bottom: 10px"> Boucle de réconciliation </h1>
<div style="width: 200px; height: 10px; background-color: #5155f9"></div>
<br>

<blockquote style="text-align: center">
<cite>
  La boucle de réconciliation applique automatiquement les modifications nécessaires pour aligner l'état réel dans le cluster sur l'état souhaité dans le référentiel Git.
</cite>
</blockquote>

<br>

<img class="w-1050 center" style="box-shadow: 0px 6px 15px 0; width: 1000px;" src="./assets/images/boucle_reconciliation.png">


##--##
Cette approche apporte plusieurs bénéfices majeurs pour faciliter l’opération d’une plateforme sous Kubernetes, tels que :

Le self-healing : si un node n’est plus disponible pour une raison X ou Y, Kubernetes va automatiquement recréer les pods présents sur ce node sur un ou plusieurs autres nodes disponibles. De même, si un conteneur crashe, il sera automatiquement relancé.
Une grande résilience : lorsqu’une action ne fonctionne pas, comme par exemple une demande de création de certificat SSL, Kubernetes va automatiquement réessayer plusieurs fois à intervalle croissant de temps.
Du scheduling intelligent : Kubernetes va automatiquement assigner les pods à des nodes disponibles tout en répartissant la charge de travail entre ces nodes.

