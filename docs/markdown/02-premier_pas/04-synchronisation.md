<!-- .slide: class="transition bg-pink" -->

<h1 style="margin-bottom: 10px"> Synchronisation </h1>
<div style="width: 200px; height: 10px; background-color: #5155f9"></div>
<br>
<!-- .slide: class="two-column" -->

<br>

- **Prune** : Suppression des ressources
<br>
<br>
- **Validate** : Validation kubectl
<br>
<br>
- **SkipDryRunOnMissingResource** : Ignorer le dry run pour les types de ressources personnalisées manquants
<br>
<br>
- **Delete** : Ne pas supprimer les ressources
<br>
<br>
- **ApplyOutOfSyncOnly** : Synchroniser uniquement les ressources désynchronisées
<br>
<br>
- **PrunePropagationPolicy** : Contrôler la politique de propagation de suppression

##--##

- **PruneLast** : Effectuer la suppression en dernier
  <br>
  <br>
- **Replace** : Remplacer les ressources au lieu de les appliquer
  <br>
  <br>
- **ServerSideApply** : Activer l'application côté serveur
  <br>
  <br>
- **FailedOnSharedResource** : Faire échouer la synchronisation si une ressource partagée est trouvée
  <br>
  <br>
- **RespectIgnoreDifferences** : Respecter les configurations d'ignorance des différences
  <br>
  <br>
- **CreateNamespace** : Créer l'espace de noms
