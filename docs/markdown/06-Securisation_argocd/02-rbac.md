<!-- .slide: class="with-code" -->
# RBAC

### Global
- Fichier policy.csv dans un configmap
- Deux rôles par défaut
```
role:readonly
role:admin
```
- Syntaxe:
    ```csv
    g, my-admin-group, role:admin
    g, my-product-A-team, role:product-A
    p, role:product-A, applications, sync, product-A/*, allow
    p, role:product-A, applications, get, product-A/*, allow
    ```
- Validation
```shell
argocd admin settings rbac validate --policy-file argocd-rbac-cm.yaml
```
- Test
```shell
argocd admin settings rbac can SOMEROLE ACTION RESOURCE SUBRESOURCE
```

##==##
<!-- .slide: class="with-code" -->

# RBAC

### Declaratif au projet
- Bloc roles
```yaml
roles:
  - name: developers
    description: Deverlopper access to my project
    policies:
    - p, proj:my-proj:developers, applications, sync, product-A/*, allow
    - p, proj:my-proj:developers, applications, get, product-A/*, allow
    groups:
    - my-group
```
##==##
# RBAC
### WebUI au projet

![image](./assets/images/role-webui.png)