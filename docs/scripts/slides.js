import { SfeirThemeInitializer } from '../web_modules/sfeir-school-theme/sfeir-school-theme.mjs';

// One method per module
function schoolSlides() {
  return ['00-school/00-TITLE.md', '00-school/speaker-tba.md', '00-school/speaker-mclt.md'];
}

function introSlides() {
  return ['01-intro/00-TITLE.md', '01-intro/01-problematique.md', '01-intro/02-definition.md', '01-intro/03-pull-push.md', '01-intro/04-avantages-inconvenients.md'];
}

function premierPas() {
  return ['02-premier_pas/00-TITLE.md', '02-premier_pas/01-installation.md', '02-premier_pas/02-deploiement.md', '02-premier_pas/03-synchronisation.md'];
}

function argocdQuotidien() {
  return [
    '03-argocd_quotidien/00-TITLE.md',
    '03-argocd_quotidien/03-secrets.md',
    '03-argocd_quotidien/04-setup_declaratif.md'
  ];
}

function miseAEchelle() {
  return [
    '04-mise_a_l_echelle/00-TITLE.md',
    '04-mise_a_l_echelle/01-apps_of_apps.md',
    '04-mise_a_l_echelle/02-ApplicationSets.md',
    '04-mise_a_l_echelle/02-ApplicationSets_list_gen.md',
    '04-mise_a_l_echelle/02-ApplicationSets_cluster_gen.md',
    '04-mise_a_l_echelle/02-ApplicationSets_git_gen.md',
    '04-mise_a_l_echelle/02-ApplicationSets_matrix_gen.md'
  ];
}

function usageAvances() {
  return ['05-usages_avances/00-TITLE.md'];
}

function formation() {
  return [
    //
    ...schoolSlides(), //
    ...introSlides(), //
    ...premierPas(), //
    ...argocdQuotidien(), //
    ...miseAEchelle(), //
    ...usageAvances(), //
  ].map((slidePath) => {
    return { path: slidePath };
  });
}

SfeirThemeInitializer.init(formation);
