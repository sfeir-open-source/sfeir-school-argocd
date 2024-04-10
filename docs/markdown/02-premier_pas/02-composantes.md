<!-- .slide: class="transition bg-pink" -->

<h1 style="margin-bottom: 10px"> Composantes </h1>
<div style="width: 200px; height: 10px; background-color: #5155f9"></div>
<br>
<!-- .slide: class="two-column" -->

<br>
<br>
<br>

- Application Controller
  Gère le déploiement, la gestion des applications et leur synchronisation avec l'état d'application souhaité (On appelle ça la réconciliation, on le verra par la suite)

- ApplicationSet Controller
  Gère les ensembles d'applications, qui sont des groupes d'applications déployées ensemble.

- Dex Server
  Fournit l'authentification et l'autorisation pour Argo CD par défaut (Peut être remplacé par d'autres outils)

- Redis
  Stocke les données de configuration et d'état pour Argo CD.

- Repo Server
  Le Repo Server d'Argo CD interagit avec le référentiel Git pour générer l'état souhaité de toutes les ressources Kubernetes d'une application.

- Server
  Fournit l'interface utilisateur et l'API pour Argo CD.


##--##

```yaml
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
