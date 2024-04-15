<!-- .slide: class="with-code max-height"-->
# Générateur Matrix
### Matrix est un générateur combinatoire permettant de combiner des générateurs "enfants"
- Matrix va générer toutes les combinaisons possible de 2 générateurs enfants
- Possibilité d'utiliser n'importe quels générateurs comme générateurs enfants
  ```
  generators:
    - matrix:
        generators:
          - list:
              elements:
              - app-1
              - app-2
          - list:
              elements:
              - dev
              - prd
  ```
  ```
  app-1-dev
  app-1-prd
  app-2-dev
  app-2-prd
  ```

[Générateur matrix documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Matrix/)
<!-- .element: class="credits" -->
##==##
# Générateurs Merge
### Merge est également un générateur combinatoire permettant de combiner des générateurs "enfants"
- Merge va fusionner les paramètres de différents générateurs des générateur supplémentaires avec le générateur de base.
- Possibilité d'utiliser n'importe quels générateurs comme générateurs enfants

[Générateur merge documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Merge/)
<!-- .element: class="credits" -->
##==##
<!-- .slide: class="with-code max-height"-->
# Générateur merge
### Example
```yaml
- merge:
    mergeKeys:
      - server
    generators:
      # On récupère tous les clusters, et on leur mets la valeur kafka a "true", redis à "false"
      - clusters:
          values:
            kafka: 'true'
            redis: 'false'
      # Pour les clusters avec un label use-kafka à false, on mets la valeur à false
      - clusters:
          selector:
            matchLabels:
              use-kafka: 'false'
          values:
            kafka: 'false'
      # Pour un cluster spécifique on active redis
      - list:
          elements: 
            - server: https://2.4.6.8
              values.redis: 'true'
```

[Générateur merge documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Merge/)
<!-- .element: class="credits" -->
##==##
# Générateur merge
### Résultat
- En ayant ses deux clusters configurés:
  ```yaml
  - name: staging
    server: https://1.2.3.4
  - name: production
    server: https://2.4.6.8
  ```
- On obtient:
  ```yaml
  - name: staging
    server: https://1.2.3.4
    values.kafka: 'false'
    values.redis: 'false'

  - name: production
    server: https://2.4.6.8
    values.kafka: 'true'
    values.redis: 'true'
  ```
[Générateur merge documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Merge/)
<!-- .element: class="credits" -->
##==##
# Générateur merge et matrix
- On peut avoir un, ou plusieurs, générateurs combinatoire comme enfant d'un générateur combinatoire 
<!-- .element: class="fragment fade-in" -->

![center](./assets/images/mind-blowing.gif)
<!-- .element: class="fragment fade-in" -->

- Mais on ne peux avoir qu'un sous-niveau (merge=>merge, mais pas merge=>merge=>merge)
<!-- .element: class="fragment fade-in" -->
- Ce n'est pas parce qu'on peut le faire qu'il faut le faire, l'utilisation des générateurs combinatoire complexifie la lecture et rends difficile la maintenance
<!-- .element: class="fragment fade-in" -->

[Générateur merge documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Merge/)
<!-- .element: class="credits" -->

