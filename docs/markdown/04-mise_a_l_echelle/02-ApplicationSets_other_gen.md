<!-- .slide: class="with-code max-height"-->
# Autres générateurs
- SCM provider: se connecte aux API Github/Gitlab pour découvrir des repository
  - Il peut également faire la découverte des branche pour générer une application par branche
- Pull request: utilise également les API Github/Gitlab pour découvrir les pulls requests/merge request
  - Utile pour avoir des environnements éphémères pour toutes les PRs/MRs
- Cluster Decision Resource: permet d'utiliser des CRDs dans le cluster qui seront utilisées pour récupérer une liste d'éléments
- Plugin: permet de faire une requête HTTP pour récupérer la liste des éléments à générer

[Documentation des générateurs](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators/)
<!-- .element: class="credits" -->
