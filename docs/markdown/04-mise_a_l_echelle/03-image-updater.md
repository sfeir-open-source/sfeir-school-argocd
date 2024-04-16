<!-- .slide: class="transition bg-pink" -->

<h1 style="margin-bottom: 10px"> ArgoCD Image Updater </h1>
<div style="width: 200px; height: 10px; background-color: #5155f9"></div>
<br>
<!-- .slide: class="two-column" -->

## C'est quoi ?

<blockquote style="text-align: center">
<cite>
  Automatise la mise à jour des images de conteneurs Kubernetes depuis le référentiel d'images.
</cite>
</blockquote>

<br>
<img class="center h-500" src="./assets/images/imageupdater.png">

##==##

<h1 style="margin-bottom: 10px"> ArgoCD Image Updater </h1>
<div style="width: 200px; height: 10px; background-color: #5155f9"></div>
<br>
<!-- .slide: class="two-column" -->

## Mise en place

1. Installation

```yaml
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-image-updater/stable/manifests/install.yaml
```

```yaml
argocd-image-updater-6d8757f4f4-xj96h               1/1     Running   0          59s
```
<br>

2. Sources de données
   - Accès Git
   - Accès Registry
   ```yaml[1-6|7-13|14-19]
   apiVersion: v1
   kind: ConfigMap
   metadata:
    name: argocd-image-updater-config
   data:
    registries.conf: |
      registries:
      - name: Docker Hub
        prefix: docker.io
        api_url: https://registry-1.docker.io
        credentials: secret:foo/bar#creds
        defaultns: library
        default: true
      - name: RedHat Quay
        api_url: https://quay.io
        prefix: quay.io
        insecure: yes
        limit: 10
        credentials: env:REGISTRY_SECRET
    ```

##--##

<br>
<br>
<br>
<br>
<br>
<br>
<img class="center" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3MxdHQza3RqdDQzMDAyMDRnZnk3aWE0bzMyNWo4MWZ4dmxpaHIyeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mGK1g88HZRa2FlKGbz/giphy.gif">

##==##

<h1 style="margin-bottom: 10px"> ArgoCD Image Updater </h1>
<div style="width: 200px; height: 10px; background-color: #5155f9"></div>
<br>
<!-- .slide: class="two-column" -->

## Configuration

🔄 Stratégie de mise à jour

- semver : Dernière version d'une image selon la version sémantique (défaut) <!-- .element: class="fragment fade-in-then-semi-out" -->
- latest : Dernière image <!-- .element: class="fragment fade-in-then-semi-out" -->
- digest : Dernière version d'un tag donné en se basant sur le SHA <!-- .element: class="fragment fade-in-then-semi-out" -->
- name   : Dernière image dans l'ordre alphabétique <!-- .element: class="fragment fade-in-then-semi-out" -->

<br>
<br>
<br>

```yaml[1-2|3|4|5|6]
metadata:
  annotations:
    argocd-image-updater.argoproj.io/image-list: myimage=some/image
    argocd-image-updater.argoproj.io/myimage.update-strategy: latest
    argocd-image-updater.argoproj.io/myimage.allow-tags: regexp:^[0-9a-f]{7}$
    argocd-image-updater.argoproj.io/myimage.ignore-tags: latest, master
```
<!-- .element: class="fragment fade-in-then-semi-out" -->

##--##


📝 Stratégie d'écriture

<br>

```yaml[1-2|3|4|5]
metadata:
  annotations:
    argocd-image-updater.argoproj.io/write-back-method: git
    argocd-image-updater.argoproj.io/git-branch: main
    argocd-image-updater.argoproj.io/write-back-target: kustomization
```
<!-- .element: class="fragment fade-in-then-semi-out" -->

<br>

- Proposition de modifications
<!-- .element: class="fragment fade-in-then-semi-out" -->

```yaml
argocd-image-updater.argoproj.io/git-branch: main:image-updater{{range .Images}}-{{.Name}}-{{.NewTag}}{{end}}
```
<!-- .element: class="fragment fade-in-then-semi-out" -->

<br>

- Personalisation du commit message 
<!-- .element: class="fragment fade-in-then-semi-out" -->

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-image-updater-config
data:
  git.commit-message-template: |
    build: automatic update of {{ .AppName }}

    {{ range .AppChanges -}}
    updates image {{ .Image }} tag '{{ .OldTag }}' to '{{ .NewTag }}'
    {{ end -}}
```
<!-- .element: class="fragment fade-in-then-semi-out" -->



