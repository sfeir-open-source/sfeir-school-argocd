📘 Objectif du TP
================

Installer ArgoCD et déployer une application sans synchronisation automatique.  
Observer le comportement puis déployer


🔨 TP
==

1.  **Installer ArgoCD** :  
Suivre les instructions vues précédemment pour installer et accéder à ArgoCD sur votre cluster Kubernetes.


2. **Initialisation du répertoire Git** :  
Créer un dossier workshop-01, et ajouter la configuration de votre pod nginx


2.  **Déployer une application** :  
Utiliser l'interface utilisateur d'ArgoCD pour créer une nouvelle application dans le namespace de votre choix.  
Spécifier votre référentiel Git contenant le fichier de définition de votre ressource kubernetes (pod nginx) et le chemin vers ce fichier. correspondant.  
Assurez-vous de désactiver la synchronisation automatique et utilisez l'option appropriée pour permettre la création automatique du namespace.


3.  **Constater l'OutOfSync et synchroniser** :  
Une fois l'application déployée, observer dans l'interface web d'ArgoCD que l'application est marquée comme "OutOfSync".  
Utiliser l'interface pour appuyer sur le bouton de synchronisation et mettre à jour l'application.  
Observer que l'état de synchronisation passe à "Synced" avec un statut "Healthy".

⚪ Tips
====

*   Assurez-vous d'avoir un cluster Kubernetes fonctionnel accessible depuis votre environnement de développement.
*   Documentation ArgoCD : https://argo-cd.readthedocs.io/en/stable/getting_started/
*   ``kubectl run my-nginx --image=nginx --dry-run=client -oyaml > workshop-01.yaml``


# 🚀 Happy Deploying !
