# Contrôler l'ordre de déploiement des resources
### Phases de synchronisation
- 3 phases disponibles
    - PreSync
    - Sync
    - PostSync
- Ajout d'une annotation sur les ressources pour préciser la phase (par défaut, sync)
```yaml
  metadata:
    annotations:
      argocd.argoproj.io/hook: PreSync
```

[Sync waves documentation](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-waves/)
<!-- .element: class="credits" -->

##==##
# Contrôler l'ordre de déploiement des resources
### Vagues de synchronisation

- Autant de vagues que l'on souhaite dans une phase
- Utilisation d'une valeur numérique pour désigner la vague de synchronisation
- Délai de 2 secondes entre les vagues (configurable via variable d'env `ARGOCD_SYNC_WAVE_DELAY`)
- Passe également par une annotation
```yaml
  metadata:
    annotations:
      argocd.argoproj.io/sync-wave: "5"
```

[Sync waves documentation](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-waves/)
<!-- .element: class="credits" -->