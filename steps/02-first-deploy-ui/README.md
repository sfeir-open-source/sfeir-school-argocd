📘 **Objectif du TP**
================

Déployer des applications dans ArgoCD, en mettant l'accent sur les différents statuts, comportements et l'utilisation de Chart Helm.

🔨 **TP**
==

### 1. **Le déploiement en synchronisation automatique**
_(PS: Chaque étape est suivie d'un commit qui est poussé sur votre référentiel Git)_

1. **Déploiement avec 2 replicas**  
   Créer un fichier de déploiement Kubernetes spécifiant un déploiement avec 2 réplicas nginx.


2. **Passer à 4 replicas**  
   Mettre à jour le déploiement pour augmenter le nombre de réplicas à 4.


3. **Utiliser une mauvaise image pour provoquer une erreur**  
   Modifier l'image du conteneur dans le déploiement avec `wrong_image` afin de provoquer une erreur de déploiement.  
   (Puis corriger afin de revenir à une situation stable)


4. **Utiliser un init container pour voir le status in progress**  
   Ajouter un conteneur d'initialisation au déploiement, qui attend 60s, pour observer le statut `In Progress` pendant le déploiement.


5. **Ajouter un pod**  
   Ajouter le manifest d'un pod au sein de votre dossier `workshop-02`


6. **Suppression du pod**
   Supprimer le pod ajouté précédemment et observer le comportement dans l'interface d'ArgoCD.


7. **Rollback**
  Depuis l'interface d'ArgoCD, désactiver la synchronisation automatique, puis procéder à un rollback sur la première version à 2 replicas 


### 2. **La chart Helm en synchronisation manuelle**

1. **Déployer la chart nginx**  
   Utiliser ArgoCD pour déployer une chart Helm nginx.


2. **Examiner les ressources à déployer**  
   Avant de procéder au déploiement, inspecter les ressources qui seront déployées en utilisant la fonctionnalité de comparaison d'ArgoCD.


3. **Procéder au déploiement**  
   Déployer la chart Helm
   

⚪ **Tips**
====

*   Assurez-vous d'avoir un cluster Kubernetes fonctionnel accessible depuis votre environnement de développement.

*   Documentation ArgoCD : https://argo-cd.readthedocs.io/en/stable/getting_started/

*   ```
    kubectl create deployment my-deployment --image=nginx --replicas=2 --dry-run=client -oyaml > deployment.yaml
    ```
    
* ```yaml
  initContainers:
  - name: init-wait
    image: busybox
    command: ['sh', '-c', 'echo "Init Container is starting..."; sleep 60']
    ```

* ```yaml
  apiVersion: builtin
  kind: HelmChartInflationGenerator
  metadata:
    name: ingress-default
  chartName: ingress-nginx
  chartRepoUrl: https://kubernetes.github.io/ingress-nginx
  chartVersion: 2.12.1
  releaseName: default
  ```

🚀 **Happy Deploying!**
===
