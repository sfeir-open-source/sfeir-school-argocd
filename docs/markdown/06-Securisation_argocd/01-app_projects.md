<!-- .slide: class="two-column" -->
# Définition d'un projet
- CRD AppProject
  - Nom/description du projet 
  - Dépôts git autorisés pour le déploiement
  - Cluster de destinations autorisés 
  - White/Blacklist de ressources autorisés 
  - Périodes de sync autorisées

##--##

```yaml [1-7|9-10|11-14|16-19|20]
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: my-project
  namespace: argocd
spec:
  description: Example Project

  sourceRepos:
  - '*'
  destinations:
  - namespace: guestbook
    server: https://kubernetes.default.svc
    name: in-cluster

  clusterResourceWhitelist: [...]
  namespaceResourceBlacklist: [...]
  namespaceResourceWhitelist: [...]

  syncWindows: [...]
```
<!-- .element: class="r-stretch fragment fade-in" -->