<!-- .slide: class="transition bg-pink" -->

<h1 style="margin-bottom: 10px"> Composantes </h1>
<div style="width: 200px; height: 10px; background-color: #5155f9"></div>
<br>
<!-- .slide: class="two-column" -->

- **Application Controller** 
  - Déploiement
  - Gestion des applications
  - Synchronisation

<br>
<br>

- **ApplicationSet Controller**
  - Gère les ensembles d'applications

<br>
<br>

- **Dex Server** (par défaut, peut êre remplacé)
  - Authentification
  - Autorisation

<br>
<br>

- **Redis**
  - Données de configuration
  - Etats de configuration


##--##

- **Repo Server**
  - Intéraction avec le référentiel Git
  - Génération des manifests

<br>
<br>

- **Server**
  - Interface utilisateur
  - API

<br>
<br>
<br>
<br>
<br>

```yaml [2|3|4|5|6|7]
NAME                                                READY   STATUS   
argocd-application-controller-0                     1/1     Running  
argocd-applicationset-controller-5b99bdcbcc-vt6fd   1/1     Running  
argocd-dex-server-6c8754469c-9cnc9                  1/1     Running   
argocd-redis-5f75fcb4cc-v99sp                       1/1     Running  
argocd-repo-server-76b5cf8f9-blcds                  1/1     Running  
argocd-server-5b4fd5cd94-vfp6z                      1/1     Running  
```

<br>
<br>
<br>
<br>
