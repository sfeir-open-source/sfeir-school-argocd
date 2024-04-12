<!-- .slide: class="transition bg-pink" -->

# Pull VS Push

##==##

<h1 style="margin-bottom: 10px"> Schémas </h1>
<div style="width: 200px; height: 10px; background-color: #5155f9"></div>
<br>

<!-- .slide: class="two-column" -->

<br>
<h2 style="font-size:1.2em"> Mode Pull </h2>
<br>

<div style="text-align: center">
  <img class="h-250" src="./assets/images/pull.png">
</div>

<br>
<br>

<div style="justify-content: center; display: flex;">
  <div style="text-align: center; width: fit-content">
    <img class="h-250" src="./assets/images/argocd.png"> 
    <p>ArgoCD</p>
  </div>
  <div style="text-align: center; width: fit-content;margin-right: 120px;">
    <img class="h-250" src="./assets/images/flux.png"> 
    <p>FluxV2</p>
  </div>
</div>

##--##
<br>
<br>
<br>
<br>
<h2 style="font-size:1.2em; margin-bottom:45px;"> Mode Push </h2>
<br>

<div style="text-align: center">
  <img class="h-200" src="./assets/images/push.png">
</div>

<br>
<br>

<div style="justify-content: center; display: flex; margin-top: 40px; gap: 70px;">
  <div style="text-align: center; width: fit-content">
    <img class="h-250" src="./assets/images/jenkins.png"> 
    <p>Jenkins</p>
  </div>
  <div style="text-align: center; width: fit-content;">
    <img class="h-250" src="./assets/images/pulumi.png"> 
    <p>Pulumi</p>
  </div>
  <div style="text-align: center; width: fit-content;">
    <img class="h-250" src="./assets/images/ansible.png"> 
    <p>Ansible</p>
  </div>
</div>

##==##

<h1 style="margin-bottom: 10px"> Pull method</h1>
<div style="width: 200px; height: 10px; background-color: #5155f9"></div>
<br>

<!-- .slide: class="two-column" -->

<br>


<h2 style="font-size:1.2em">✅ Avantages </h2>
<br>

- Secrets non partagés depuis l'extérieur.
<br>
<br>
- Un seul point d'entrée pour les modifications.
<br>
<br>
- Réduction de la complexité des pipelines
<br>
<br>
- Réduction des erreurs humaines et conflits
<br>
<br>
- Simplification de la gouvernance des ressources

##--##
<br>
<br>
<br>
<br>

<h2 style="font-size:1.2em;margin-bottom: 20px;">❌ Inconvénients </h2>
<br>

- Gestion des secrets
<br>
<br>
- Fort couplage aux outils GitOps
<br>
<br>
- Processus de déploiement plus rigide
<br>
<br>
- Utilisation de Helm / Kustomize plus complexe

##==##

<h1 style="margin-bottom: 10px"> Push method</h1>
<div style="width: 200px; height: 10px; background-color: #5155f9"></div>
<br>

<!-- .slide: class="two-column" -->

<br>

<h2 style="font-size:1.2em">✅ Avantages </h2>

<br>

- Choix d'outils
<br>
<br>
- Personnalisation du processus de déploiement
<br>
<br>
- Gestion des secrets simplifiées

##--##
<br>
<br>
<br>
<br>

<h2 style="font-size:1.2em;margin-bottom: 20px;">❌ Inconvénients </h2>

<br>

- Compléxité des pipelines
<br>
<br>
- Sécurisation et versioning des secrets
<br>
<br>
- Robustesse de la pipeline
<br>
<br>
- Couplage fort avec le langage de la pipeline
