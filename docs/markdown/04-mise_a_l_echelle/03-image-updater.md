<!-- .slide: class="transition bg-pink" -->

<h1 style="margin-bottom: 10px"> ArgoCD Image Updater </h1>
<div style="width: 200px; height: 10px; background-color: #5155f9"></div>
<br>
<!-- .slide: class="two-column" -->

## C'est quoi ?

Les GAR possibles 
  |
Le Schéma
  |
Les écritures possibles


##==##

<!-- .slide: class="transition bg-pink" -->

<h1 style="margin-bottom: 10px"> ArgoCD Image Updater </h1>
<div style="width: 200px; height: 10px; background-color: #5155f9"></div>
<br>
<!-- .slide: class="two-column" -->

## Mise en place ?

git write-back method 

```yaml
argocd-image-updater.argoproj.io/write-back-method: git
argocd-image-updater.argoproj.io/git-branch: main
argocd-image-updater.argoproj.io/write-back-target: kustomization
```

Par défault, il checkout et commit sur la même branche
On peut également checkout la branche de base et proposer les modifs sur une autre branche 
```yaml
argocd-image-updater.argoproj.io/git-branch: main:image-updater{{range .Images}}-{{.Name}}-{{.NewTag}}{{end}}
```

Possibilité de modifier le template message dans la ConfigMap _argocd-image-updater-config_

```yaml
data:
git.commit-message-template: |
build: automatic update of {{ .AppName }}

    {{ range .AppChanges -}}
    updates image {{ .Image }} tag '{{ .OldTag }}' to '{{ .NewTag }}'
    {{ end -}}
``

##--##

Update strategies

semver is the default
- semver - Update to the latest version of an image considering semantic versioning constraints
- latest - Update to the most recently built image found in a registry
- digest - Update to the latest version of a given version (tag), using the tag's SHA digest
- name - Sorts tags alphabetically and update to the one with the highest cardinality

```yaml
argocd-image-updater.argoproj.io/image-list: myimage=some/image
argocd-image-updater.argoproj.io/myimage.update-strategy: latest
argocd-image-updater.argoproj.io/myimage.allow-tags: regexp:^[0-9a-f]{7}$
argocd-image-updater.argoproj.io/myimage.ignore-tags: latest, master
```
