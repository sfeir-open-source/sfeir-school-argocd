<!-- .slide: class="two-column" data-background="./assets/images/secrets.jpg" -->
##--##
# Comment garder des secrets dans un dépôt git ?
- Ne pas stocker dans git<!-- .element: class="fragment fade-in-then-semi-out"-->
    - Utiliser un gestionnaire de secret externe (Vault, etc...) 
- Stocker dans git<!-- .element: class="fragment fade-in-then-semi-out" -->
    -  Chiffrer les données dans le dépot avant commit, un opérateur Kube dans le cluster déchiffre les secrets au déploiement 
        - Bitnami SealedSecrets
        - SOPS
