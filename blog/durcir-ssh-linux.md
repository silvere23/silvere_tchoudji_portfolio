Un serveur exposé sur Internet reçoit des tentatives de connexion SSH en permanence. Des robots testent des identifiants courants, jour et nuit, sur toutes les adresses qu'ils trouvent. La bonne nouvelle : six réglages simples suffisent à fermer la porte à la quasi-totalité de ces attaques.

Les commandes ci-dessous sont prévues pour Debian et Ubuntu.

> Garde ta session SSH ouverte pendant toute la manipulation. Si un réglage te bloque, tu pourras encore le corriger depuis cette session.

## 1. Se connecter avec une clé plutôt qu'un mot de passe

Un mot de passe se devine ou se vole. Une clé SSH, non : elle repose sur une paire de fichiers, dont la partie privée ne quitte jamais ton ordinateur.

Sur **ton poste**, crée la clé puis envoie sa partie publique au serveur :

```bash
ssh-keygen -t ed25519 -C "silv@portable"
ssh-copy-id silv@mon-serveur
```

Vérifie ensuite que la connexion fonctionne sans te demander le mot de passe du compte :

```bash
ssh silv@mon-serveur
```

## 2. Durcir la configuration du service

Plutôt que de modifier le fichier principal, crée un fichier dédié. Il sera plus facile à relire et à retirer.

```bash
sudo nano /etc/ssh/sshd_config.d/10-durcissement.conf
```

```text
PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
LoginGraceTime 30
X11Forwarding no
AllowUsers silv
```

Ce que fait chaque ligne :

| Réglage | Effet |
|---|---|
| `PermitRootLogin no` | Interdit la connexion directe en root |
| `PasswordAuthentication no` | Refuse les mots de passe, seules les clés passent |
| `KbdInteractiveAuthentication no` | Ferme l'autre voie de saisie d'un mot de passe |
| `MaxAuthTries 3` | Coupe la connexion après trois essais ratés |
| `LoginGraceTime 30` | Laisse 30 secondes pour s'authentifier |
| `X11Forwarding no` | Désactive une fonction rarement utile sur un serveur |
| `AllowUsers silv` | N'autorise que les comptes listés |

**Pourquoi le nom commence par 10 ?** SSH lit les fichiers de ce dossier dans l'ordre alphabétique et garde la *première* valeur qu'il rencontre pour chaque réglage. Sur beaucoup de serveurs cloud, un fichier `50-cloud-init.conf` réactive les mots de passe. Un fichier nommé `99-...` serait lu après lui, donc ignoré.

## 3. Vérifier avant de redémarrer

Ne redémarre jamais le service sans avoir testé la configuration. Une faute de frappe peut t'empêcher de te reconnecter.

```bash
sudo sshd -t
sudo sshd -T | grep -i -E "passwordauthentication|permitrootlogin"
```

La première commande ne doit rien afficher. La seconde montre les valeurs réellement appliquées : tu dois lire `no` sur les deux lignes.

Applique ensuite les changements :

```bash
sudo systemctl restart ssh
```

Puis ouvre un **second terminal** et vérifie que tu arrives encore à te connecter. Ferme la première session seulement après.

## 4. Bloquer les robots avec Fail2ban

Fail2ban surveille les journaux et bannit temporairement les adresses qui enchaînent les échecs.

```bash
sudo apt install fail2ban
sudo fail2ban-client status sshd
```

Sur Debian et Ubuntu, la protection SSH est active dès l'installation. La seconde commande affiche le nombre d'adresses actuellement bannies.

## 5. N'ouvrir que les ports nécessaires

Un pare-feu limite ce qui est joignable depuis l'extérieur. Autorise SSH **avant** de l'activer, sinon tu te coupes l'accès.

```bash
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status
```

## 6. Garder le système à jour

Un service bien configuré mais jamais mis à jour finit par devenir vulnérable. Active les mises à jour de sécurité automatiques :

```bash
sudo apt install unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

## À retenir

1. Clé SSH à la place du mot de passe.
2. Pas de connexion root, pas de mot de passe, comptes autorisés listés.
3. Test de la configuration avant chaque redémarrage.
4. Fail2ban contre les essais répétés.
5. Pare-feu avec uniquement les ports utiles.
6. Mises à jour de sécurité automatiques.

Ces six points ne rendent pas un serveur invulnérable, mais ils éliminent les attaques les plus courantes, celles qui visent les configurations laissées par défaut.

Tu appliques déjà d'autres réglages ? Dis-le en commentaire.
