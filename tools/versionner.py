"""Ajoute un numéro de version (?v=...) aux fichiers CSS et JS appelés par index.html.

Le numéro change dès qu'un fichier change : les navigateurs rechargent alors la nouvelle version
au lieu de garder l'ancienne en cache. À lancer avant chaque mise en ligne :  python tools/versionner.py
"""
import hashlib, pathlib, re

racine = pathlib.Path(__file__).resolve().parent.parent
page = racine / "index.html"
html = page.read_text(encoding="utf-8")

def version(m):
    attr, chemin = m.group(1), m.group(2)
    empreinte = hashlib.sha1((racine / chemin).read_bytes()).hexdigest()[:8]
    return f'{attr}="{chemin}?v={empreinte}"'

html, n = re.subn(r'(src|href)="((?:assets/(?:css|js)/[^"?]+|projets/projets\.js))(?:\?v=[0-9a-f]+)?"', version, html)
page.write_text(html, encoding="utf-8")
print(f"{n} fichiers versionnés")
