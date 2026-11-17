## Le problème

Dans un réseau d'entreprise classique, une attaque détectée par un IDS déclenche une alerte, puis un humain doit analyser, décider et intervenir sur les équipements. Ce délai laisse le temps à l'attaquant de progresser. ASR-SDN (Automated Security Response for Software-Defined Networks) propose de réduire ce délai à quelques fractions de seconde.

## L'architecture

Le réseau est piloté de façon centralisée grâce au SDN. Trois briques travaillent ensemble :

- **Suricata** analyse le trafic, reçu en miroir par un tunnel GRE, et lève des alertes ;
- **un moteur d'orchestration en Python**, lancé comme service systemd, attribue un score de gravité à chaque alerte et choisit une action ;
- **le contrôleur ONOS** reçoit cette décision par son API REST et pousse les règles OpenFlow vers les commutateurs Open vSwitch.

Selon le score, l'hôte suspect est isolé, son trafic est bloqué ou une zone du réseau est segmentée. Chaque décision est journalisée, et chaque règle peut être retirée pour revenir à l'état normal.

## Le lab

Le lab tourne sur trois machines virtuelles Ubuntu Server : ONOS sous Docker sur la première, Mininet et Open vSwitch sur la deuxième, Suricata et le poste SOC sur la troisième. La topologie reprend des zones d'entreprise : utilisateurs, web, base de données, administration, et un hôte attaquant. Le réseau de Les Menus Services a servi de cas d'étude.

## Les résultats

Six scénarios ont été validés de bout en bout :

- fonctionnement normal, sans aucune perte ;
- scan TCP détecté puis hôte isolé ;
- flood ICMP détecté puis trafic bloqué ;
- segmentation entre zones ;
- réversibilité des règles, avec retour à la normale ;
- mesure de l'impact d'un déni de service sur la disponibilité.

Le temps de réponse moyen entre la détection et l'application de la règle est d'environ **0,09 seconde**.

## Ce que j'en retiens

Ce projet m'a fait travailler sur toute la chaîne : réseau, détection, développement, automatisation et cadre réglementaire (ANSSI, NIS2, NIST SP 800-207, ISO 27001). La suite logique est d'ajouter une couche d'analyse par IA, exécutée en local, en complément du moteur à règles.
