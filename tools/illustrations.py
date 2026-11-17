# Génère les illustrations SVG des projets (symboles du sprite) et les branche dans index.html
import re, sys

A = 'var(--c1)'; B = 'var(--c2)'
S = 'stroke="currentColor" stroke-opacity=".85" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"'
SOFT = 'stroke="currentColor" stroke-opacity=".35" stroke-width="1.2" fill="none" stroke-linecap="round"'
PANEL = 'fill="currentColor" fill-opacity=".06" stroke="currentColor" stroke-opacity=".7" stroke-width="1.4"'

def win(x, y, w, h, r=8):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" {PANEL}/>'
            f'<path d="M{x} {y+16}h{w}" {SOFT}/>'
            + ''.join(f'<circle cx="{x+10+i*8}" cy="{y+8}" r="2" fill="currentColor" fill-opacity=".5"/>' for i in range(3)))

def bar(x, y, w, h=4, o=.35, c='currentColor'):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{h/2}" fill="{c}" fill-opacity="{o}"/>'

def pulse(cx, cy, r, c=A, dur='2.4s'):
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{c}" stroke-width="1.5">'
            f'<animate attributeName="r" values="{r};{r+12}" dur="{dur}" repeatCount="indefinite"/>'
            f'<animate attributeName="stroke-opacity" values=".8;0" dur="{dur}" repeatCount="indefinite"/></circle>')

def node(cx, cy, r=7, c='currentColor', o=.9):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{c}" fill-opacity="{o}"/>'

def check(x, y, s=1, c=A):
    return f'<path d="M{x} {y}l{4*s} {4*s} {8*s} -{9*s}" stroke="{c}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'

def lock(x, y, c=A):
    return (f'<rect x="{x}" y="{y+9}" width="20" height="16" rx="3" fill="{c}"/>'
            f'<path d="M{x+4} {y+9}v-4a6 6 0 0 1 12 0v4" stroke="{c}" stroke-width="2.2" fill="none"/>'
            f'<circle cx="{x+10}" cy="{y+16}" r="2" fill="#0b0d12"/>')

def shield(x, y, s=1, c=A, fill=True):
    d = f'M{x} {y}l{18*s} {7*s}v{14*s}c0 {11*s}-{8*s} {19*s}-{18*s} {22*s}c-{10*s}-{3*s}-{18*s}-{11*s}-{18*s}-{22*s}v-{14*s}z'
    f = f'fill="{c}" fill-opacity=".22"' if fill else 'fill="none"'
    return f'<path d="{d}" {f} stroke="{c}" stroke-width="1.8" stroke-linejoin="round"/>'

ART = {}

# 1. ASR-SDN : contrôleur, commutateurs, hôte compromis isolé
ART['asr-sdn'] = (
    '<path d="M160 30l22 12v26l-22 12-22-12V42z" fill="var(--c1)" fill-opacity=".25" stroke="var(--c1)" stroke-width="1.8"/>'
    + node(160, 55, 6, A, 1)
    + f'<path d="M160 80v20M160 100H90v18M160 100h70v18M160 100v18" {S}/>'
    + ''.join(f'<rect x="{x-20}" y="118" width="40" height="16" rx="4" {PANEL}/>' + ''.join(node(x-10+i*7, 126, 1.6, 'currentColor', .7) for i in range(3)) for x in (90, 160, 230))
    + f'<path d="M90 134v14M70 148h40M70 148v8M110 148v8M160 134v22M230 134v12" {SOFT}/>'
    + node(70, 160, 5) + node(110, 160, 5) + node(160, 160, 5)
    + f'<path d="M230 146v4" {SOFT}/><path d="M230 152v4" stroke="#f43f5e" stroke-width="1.6" stroke-dasharray="2 3"/>'
    + node(230, 162, 6, '#f43f5e', 1) + pulse(230, 162, 7, '#f43f5e')
    + shield(262, 120, .9, A)
    + f'<path d="M190 44c30-12 58 4 70 30" stroke="var(--c1)" stroke-width="1.4" stroke-dasharray="3 4" fill="none"/>'
    + bar(36, 34, 54) + bar(36, 44, 36) + bar(36, 54, 46, 4, .2)
)

# 2. Site web PoleIT : navigateur + cluster Kubernetes
k = ''.join(f'<path d="M262 92L{262+38*__import__("math").cos(a):.1f} {92+38*__import__("math").sin(a):.1f}" {SOFT}/>' for a in [i*6.2832/7-1.5708 for i in range(7)])
import math
hept = ' '.join(f'{262+40*math.cos(i*2*math.pi/7-math.pi/2):.1f},{92+40*math.sin(i*2*math.pi/7-math.pi/2):.1f}' for i in range(7))
ART['site-web-poleit'] = (
    win(30, 30, 170, 120)
    + f'<rect x="42" y="56" width="146" height="34" rx="5" fill="var(--c1)" fill-opacity=".22"/>' + bar(52, 66, 70, 5, .6) + bar(52, 77, 44, 4, .35)
    + ''.join(f'<rect x="{42+i*50}" y="100" width="42" height="38" rx="5" {PANEL}/>' + bar(48+i*50, 126, 26, 3, .35) for i in range(3))
    + f'<polygon points="{hept}" fill="var(--c2)" fill-opacity=".2" stroke="var(--c1)" stroke-width="1.8"/>' + k
    + f'<circle cx="262" cy="92" r="14" fill="#0b0d12" stroke="var(--c1)" stroke-width="2"/>' + node(262, 92, 4, A, 1)
    + f'<path d="M200 92h22" stroke="var(--c1)" stroke-width="1.4" stroke-dasharray="3 4"/>'
)

# 3. Maquettes SIMS : écrans superposés, composants, curseur
ART['maquettes-sims'] = (
    f'<rect x="38" y="40" width="150" height="104" rx="10" {PANEL}/>'
    + f'<rect x="38" y="40" width="34" height="104" rx="10" fill="currentColor" fill-opacity=".08"/>'
    + ''.join(bar(46, 54+i*12, 18, 4, .4) for i in range(5))
    + ''.join(f'<rect x="{82+i*34}" y="54" width="28" height="30" rx="5" fill="var(--c1)" fill-opacity="{.15+i*.12}"/>' for i in range(3))
    + bar(82, 94, 96, 4, .35) + bar(82, 104, 70, 4, .25) + bar(82, 114, 84, 4, .25)
    + f'<rect x="200" y="30" width="82" height="124" rx="14" fill="#0b0d12" fill-opacity=".7" stroke="var(--c1)" stroke-width="1.8"/>'
    + f'<rect x="210" y="46" width="62" height="34" rx="6" fill="var(--c1)" fill-opacity=".3"/>' + bar(210, 88, 48, 4, .5) + bar(210, 98, 36, 4, .3)
    + f'<rect x="210" y="112" width="62" height="16" rx="8" fill="var(--c1)"/>' + bar(226, 118, 30, 4, .9, '#0b0d12')
    + f'<path d="M186 120l14 30 4-12 12-4z" fill="#fff" stroke="#0b0d12" stroke-width="1.2" stroke-linejoin="round"/>'
)

# 4. Refonte SIMS : pipeline CI/CD
stages = [(50, 'build'), (115, 'test'), (180, 'scan'), (245, 'deploy')]
ART['refonte-sims'] = (
    f'<path d="M50 70H270" {SOFT} stroke-dasharray="4 5"/>'
    + f'<path d="M50 70H270" stroke="var(--c1)" stroke-width="2" stroke-dasharray="40 180"><animate attributeName="stroke-dashoffset" values="220;0" dur="3s" repeatCount="indefinite"/></path>'
    + ''.join(f'<circle cx="{x}" cy="70" r="17" fill="#0b0d12" stroke="{A if i<3 else "currentColor"}" stroke-width="1.8" {"stroke-opacity=\".6\"" if i==3 else ""}/>'
              + (check(x-6, 70) if i < 3 else node(x, 70, 4, A, 1)) for i, (x, _) in enumerate(stages))
    + ''.join(bar(x-16, 96, 32, 4, .35) for x, _ in stages)
    + ''.join(f'<rect x="{112+i*34}" y="{122}" width="28" height="28" rx="4" fill="var(--c{1 if i%2==0 else 2})" fill-opacity=".25" stroke="var(--c1)" stroke-width="1.4"/>'
              + f'<path d="M{117+i*34} 131h18M{117+i*34} 137h18M{117+i*34} 143h12" {SOFT}/>' for i in range(3))
    + f'<path d="M245 87v24h-30" {SOFT}/>'
)

# 5. Application Mawemba : mobile + bulles
ART['application-mawemba'] = (
    f'<rect x="118" y="18" width="84" height="150" rx="16" fill="#0b0d12" fill-opacity=".6" stroke="currentColor" stroke-opacity=".8" stroke-width="1.8"/>'
    + f'<rect x="148" y="24" width="24" height="5" rx="2.5" fill="currentColor" fill-opacity=".4"/>'
    + f'<rect x="128" y="40" width="64" height="40" rx="8" fill="var(--c1)" fill-opacity=".35"/>'
    + node(144, 58, 7, '#fff', .8) + bar(156, 54, 28, 4, .7) + bar(156, 63, 18, 4, .45)
    + ''.join(f'<rect x="128" y="{90+i*20}" width="64" height="14" rx="5" {PANEL}/>' + node(137, 97+i*20, 3, A, 1) + bar(145, 95+i*20, 36-i*6, 4, .4) for i in range(3))
    + f'<rect x="128" y="152" width="64" height="8" rx="4" fill="var(--c1)"/>'
    + f'<path d="M40 52h56a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H60l-10 9v-9h-10a8 8 0 0 1-8-8V60a8 8 0 0 1 8-8z" {PANEL}/>' + bar(44, 64, 46, 4, .5) + bar(44, 72, 30, 4, .3)
    + f'<path d="M224 96h56a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8h-10v9l-10-9h-36a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8z" fill="var(--c1)" fill-opacity=".3" stroke="var(--c1)" stroke-width="1.4"/>' + bar(228, 108, 50, 4, .7) + bar(228, 116, 32, 4, .45)
    + f'<path d="M262 46l4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z" fill="var(--c1)"/>'
)

# 6. Identité graphique : construction de logo, nuancier, plume
ART['identite-graphique-d-entreprises'] = (
    f'<circle cx="110" cy="90" r="52" {SOFT}/><circle cx="110" cy="90" r="32" {SOFT}/><path d="M50 90h120M110 30v120M68 48l84 84M152 48l-84 84" {SOFT} stroke-opacity=".18"/>'
    + f'<path d="M84 118V62l26 30 26-30v56" stroke="var(--c1)" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    + ''.join(f'<rect x="{196+i*24}" y="40" width="18" height="40" rx="5" fill="{c}"/>' for i, c in enumerate([A, B, '#fff', '#1e293b']))
    + f'<path d="M200 140c20-40 50-40 80-10" stroke="currentColor" stroke-opacity=".85" stroke-width="1.8" fill="none"/>'
    + f'<path d="M200 140l18-34M280 130l-6-36" {SOFT}/>'
    + ''.join(f'<rect x="{x-3.5}" y="{y-3.5}" width="7" height="7" fill="#0b0d12" stroke="var(--c1)" stroke-width="1.5"/>' for x, y in [(200, 140), (280, 130)])
    + node(218, 106, 3.5, '#fff', .9) + node(274, 94, 3.5, '#fff', .9)
)

# 7. Hardening : serveurs, cadenas, check-list
ART['hardening-de-serveurs'] = (
    ''.join(f'<rect x="48" y="{34+i*38}" width="130" height="30" rx="6" {PANEL}/>'
            + node(62, 49+i*38, 3.5, A if i != 1 else '#34d399', 1) + node(74, 49+i*38, 3.5, 'currentColor', .4)
            + bar(92, 47+i*38, 72, 4, .3) for i in range(3))
    + lock(146, 64)
    + f'<rect x="204" y="34" width="84" height="106" rx="8" {PANEL}/>'
    + ''.join(f'<rect x="214" y="{50+i*22}" width="12" height="12" rx="3" stroke="var(--c1)" stroke-width="1.4" fill="var(--c1)" fill-opacity=".2"/>' + check(216, 56+i*22, .6) + bar(234, 54+i*22, 42-i*6, 4, .4) for i in range(4))
)

# 8. Pentest : terminal + cible
ART['pentest-en-lab'] = (
    f'<rect x="34" y="30" width="176" height="120" rx="8" fill="#05060a" fill-opacity=".7" stroke="currentColor" stroke-opacity=".7" stroke-width="1.4"/>'
    + f'<path d="M34 46h176" {SOFT}/>' + ''.join(f'<circle cx="{44+i*8}" cy="38" r="2" fill="currentColor" fill-opacity=".5"/>' for i in range(3))
    + ''.join(f'<path d="M46 {62+i*16}l5 4-5 4" stroke="var(--c1)" stroke-width="1.6" fill="none"/>' + bar(58, 64+i*16, w, 4, o) for i, (w, o) in enumerate([(96, .55), (70, .35), (120, .35), (54, .55)]))
    + f'<rect x="58" y="126" width="8" height="12" fill="var(--c1)"><animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite"/></rect>'
    + f'<circle cx="252" cy="90" r="40" {S}/><circle cx="252" cy="90" r="24" stroke="var(--c1)" stroke-width="1.6" fill="none"/>'
    + f'<path d="M252 40v22M252 118v22M202 90h22M280 90h22" {S}/>' + node(252, 90, 5, A, 1) + pulse(252, 90, 6)
)

# 9. Reverse engineering : graphe de flot de contrôle + hexadécimal
blk = lambda x, y, w=56, h=26, hl=False: (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4" fill="{A if hl else "currentColor"}" fill-opacity="{.25 if hl else .06}" stroke="{A if hl else "currentColor"}" stroke-opacity=".75" stroke-width="1.4"/>'
                                          + bar(x+6, y+7, w-20, 3, .5) + bar(x+6, y+15, w-30, 3, .3))
ART['reverse-engineering'] = (
    blk(132, 20) + blk(82, 76) + blk(182, 76, hl=True) + blk(132, 132)
    + f'<path d="M160 46v12H110v18M160 58h50v18M110 102v18h50v12M210 102v18h-50" {S}/>'
    + f'<path d="M150 46l10 10 10-10" fill="none"/>'
    + ''.join(f'<text x="{24}" y="{40+i*16}" font-family="ui-monospace,monospace" font-size="9" fill="currentColor" fill-opacity="{.25 if i!=3 else .7}">{t}</text>' for i, t in enumerate(['48 89 e5', '41 57 56', '0f 1f 44', 'e8 ff 3a', '31 c0 c3', '90 90 90', '5d c3 00', 'c3 cc cc']))
    + ''.join(f'<text x="{254}" y="{40+i*16}" font-family="ui-monospace,monospace" font-size="9" fill="currentColor" fill-opacity="{.25 if i!=4 else .7}">{t}</text>' for i, t in enumerate(['mov rbp', 'push r15', 'xor eax', 'test al', 'jz 0x4f', 'call f', 'leave', 'ret']))
)

# 10. Ransomware : fichiers chiffrés + loupe
fil = lambda x, y, c='currentColor', o=.06: (f'<path d="M{x} {y}h30l12 12v42h-42z" fill="{c}" fill-opacity="{o}" stroke="{c}" stroke-opacity=".75" stroke-width="1.4" stroke-linejoin="round"/>'
                                             f'<path d="M{x+30} {y}v12h12" stroke="{c}" stroke-opacity=".75" stroke-width="1.4" fill="none"/>')
ART['analyse-de-ransomware'] = (
    fil(40, 40) + bar(48, 66, 24, 3, .35) + bar(48, 74, 18, 3, .25)
    + fil(100, 60, '#f43f5e', .18) + lock(111, 74, '#f43f5e')
    + fil(40, 112) + bar(48, 138, 24, 3, .35)
    + fil(160, 34) + bar(168, 60, 24, 3, .35)
    + f'<circle cx="236" cy="96" r="36" fill="var(--c1)" fill-opacity=".14" stroke="currentColor" stroke-opacity=".85" stroke-width="2.2"/>'
    + f'<path d="M262 122l26 26" stroke="currentColor" stroke-opacity=".85" stroke-width="6" stroke-linecap="round"/>'
    + ''.join(f'<text x="214" y="{88+i*12}" font-family="ui-monospace,monospace" font-size="9" fill="var(--c1)">{t}</text>' for i, t in enumerate(['.locked', 'AES-256', 'C2 ?']))
)

# 11. Zero Trust : utilisateur -> contrôles -> ressource
ART['poc-zero-trust'] = (
    f'<circle cx="52" cy="76" r="14" {S}/><path d="M28 124c2-20 12-30 24-30s22 10 24 30" {S}/>'
    + f'<path d="M84 96H248" {SOFT} stroke-dasharray="4 5"/>'
    + ''.join(shield(x, 72, .95, A) + check(x-6, 96, .8) for x in (118, 168, 218))
    + ''.join(bar(x-16, 132, 32, 4, .35) for x in (118, 168, 218))
    + f'<rect x="250" y="70" width="46" height="54" rx="6" {PANEL}/>' + lock(263, 76) + bar(258, 112, 30, 4, .35)
    + f'<circle r="4" fill="var(--c1)"><animateMotion path="M84 96H248" dur="3s" repeatCount="indefinite"/></circle>'
)

# 12. Application conteneurisée : conteneurs isométriques
def cube(x, y, s, c1, o=.25):
    return (f'<path d="M{x} {y}l{s} {-s/2}l{s} {s/2}l{-s} {s/2}z" fill="{c1}" fill-opacity="{o+.15}" stroke="{c1}" stroke-width="1.4" stroke-linejoin="round"/>'
            f'<path d="M{x} {y}v{s}l{s} {s/2}v{-s}z" fill="{c1}" fill-opacity="{o}" stroke="{c1}" stroke-width="1.4" stroke-linejoin="round"/>'
            f'<path d="M{x+s} {y+s/2}v{s}l{s} {-s/2}v{-s}z" fill="{c1}" fill-opacity="{o-.1}" stroke="{c1}" stroke-width="1.4" stroke-linejoin="round"/>'
            + ''.join(f'<path d="M{x+s*.25*i} {y+s*.125*i+6}v{s-12}" {SOFT}/>' for i in (1, 2, 3)))
ART['application-conteneurisee'] = (
    cube(96, 104, 36, B, .3) + cube(168, 104, 36, A, .3) + cube(132, 68, 36, A, .35)
    + f'<path d="M40 150h240" {SOFT}/>' + f'<path d="M58 150c0-20 10-26 24-26" {SOFT}/>'
    + ''.join(f'<rect x="{240}" y="{42+i*16}" width="44" height="10" rx="3" {PANEL}/>' + node(246, 47+i*16, 2, A, 1) for i in range(4))
)

# 13. WorkTrack Pro : tableau de suivi
ART['worktrack-pro'] = (
    win(30, 22, 260, 140)
    + ''.join(f'<rect x="{42+i*80}" y="48" width="70" height="104" rx="6" fill="currentColor" fill-opacity=".04"/>' + bar(48+i*80, 55, 30, 4, .5)
              + ''.join(f'<rect x="{48+i*80}" y="{66+j*28}" width="58" height="22" rx="4" fill="{A if (i+j)%3==0 else "currentColor"}" fill-opacity="{.3 if (i+j)%3==0 else .08}" stroke="currentColor" stroke-opacity=".3"/>'
                        + bar(54+i*80, 72+j*28, 36-j*6, 3, .5) + bar(54+i*80, 80+j*28, 46, 3, .15) + bar(54+i*80, 80+j*28, 46*[.3, .7, 1][i], 3, .9, A) for j in range(3 - (i == 2)))
              for i in range(3))
)

# 14. Pointage OCR : document manuscrit scanné -> tableau
ART['pointage-ocr'] = (
    f'<rect x="40" y="26" width="96" height="128" rx="6" {PANEL}/>'
    + ''.join(f'<path d="M52 {48+i*16}c8-4 14 4 22 0s14-4 22 0 12 4 22 0" {SOFT} stroke-opacity=".55"/>' for i in range(6))
    + f'<rect x="34" y="60" width="108" height="3" rx="1.5" fill="var(--c1)"><animate attributeName="y" values="34;146;34" dur="3.2s" repeatCount="indefinite"/></rect>'
    + f'<path d="M152 90h26m-8-8l8 8-8 8" stroke="var(--c1)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    + f'<rect x="192" y="40" width="96" height="100" rx="6" {PANEL}/>'
    + f'<rect x="192" y="40" width="96" height="18" rx="6" fill="var(--c1)" fill-opacity=".35"/>'
    + ''.join(f'<path d="M192 {58+i*16}h96" {SOFT}/>' for i in range(1, 5)) + f'<path d="M224 40v100M256 40v100" {SOFT}/>'
    + ''.join(bar(198+c*32, 64+r*16, [18, 12, 16][c], 4, .45) for r in range(5) for c in range(3))
)

# 15. SilvereMusic Stream : lecture + égaliseur
ART['silveremusic-stream'] = (
    f'<circle cx="92" cy="90" r="46" fill="var(--c1)" fill-opacity=".18" stroke="currentColor" stroke-opacity=".8" stroke-width="1.8"/>'
    + f'<circle cx="92" cy="90" r="30" {SOFT}/><circle cx="92" cy="90" r="16" {SOFT}/>'
    + f'<path d="M86 80v20l16-10z" fill="#fff"/>'
    + ''.join(f'<rect x="{160+i*12}" y="{90-h/2}" width="7" height="{h}" rx="3.5" fill="var(--c{1 if i%3 else 2})">'
              f'<animate attributeName="height" values="{h};{max(8,h*.4):.0f};{h}" dur="{1+i%4*.25}s" repeatCount="indefinite"/>'
              f'<animate attributeName="y" values="{90-h/2};{90-max(8,h*.4)/2:.0f};{90-h/2}" dur="{1+i%4*.25}s" repeatCount="indefinite"/></rect>'
              for i, h in enumerate([20, 44, 64, 36, 80, 52, 28, 60, 40, 22]))
    + bar(160, 142, 118, 4, .25) + bar(160, 142, 66, 4, 1, A) + node(226, 144, 5, '#fff', 1)
)

# 16. Chemin du Dragon : jeu, montagnes et chemin
ART['chemin-du-dragon'] = (
    f'<circle cx="250" cy="48" r="18" fill="var(--c1)" fill-opacity=".5"/>'
    + ''.join(node(x, y, 1.4, '#fff', .6) for x, y in [(40, 30), (80, 48), (130, 24), (190, 36), (296, 86), (210, 70)])
    + f'<path d="M20 150l70-80 40 40 50-62 70 82 50-36 20 20v36z" fill="var(--c2)" fill-opacity=".28" stroke="currentColor" stroke-opacity=".7" stroke-width="1.4" stroke-linejoin="round"/>'
    + f'<path d="M150 50l-10 12 8-2 2 8z" fill="#fff" fill-opacity=".7"/>'
    + f'<path d="M60 166c40-6 30-30 70-34s50-22 90-26 40-24 50-30" stroke="var(--c1)" stroke-width="2.5" stroke-dasharray="6 6" fill="none" stroke-linecap="round"/>'
    + f'<path d="M270 76V50l16 6-16 6" stroke="#fff" stroke-width="1.8" fill="var(--c1)" stroke-linejoin="round"/>'
    + f'<path d="M150 118l8-8 8 8-8 8z" fill="var(--c1)"><animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="2s" repeatCount="indefinite"/></path>'
)

def symbols():
    return '\n'.join(f'  <symbol id="a-{k}" viewBox="0 0 320 180">{v}</symbol>' for k, v in ART.items())

if __name__ == '__main__':
    path = sys.argv[1]
    h = open(path, encoding='utf-8').read()
    # retire d'anciens symboles d'illustration si on relance
    h = re.sub(r'\n  <symbol id="a-[^"]+" viewBox="0 0 320 180">.*?</symbol>', '', h, flags=re.S)
    h = h.replace('  <symbol id="i-devops"', symbols() + '\n  <symbol id="i-devops"', 1)
    # cartes : icône -> illustration
    def rep(m):
        cls, icon, tag = m.group(1), m.group(2), m.group(3)
        return f'<div class="{cls}"><svg class="art" aria-hidden="true"><use href="#a-{tag}"/></svg><span class="media-tag">{tag}</span></div>'
    h, n = re.subn(r'<div class="(media(?: sm)?)"><svg class="(?:ico|art)" aria-hidden="true"><use href="#[ia]-[^"]+"/></svg><span class="media-tag">([^<]+)</span></div>'.replace('(?:ico|art)" aria-hidden="true"><use href="#[ia]-[^"]+"', '(?:ico|art)" aria-hidden="true"><use href="#[ia]-([^"]+)"'), rep, h)
    print('cartes remplacées :', n)
    # diaporama du hero
    hero = {'ASR-SDN': 'asr-sdn', 'Site web PoleIT': 'site-web-poleit', 'Maquettes SIMS': 'maquettes-sims', 'Refonte SIMS': 'refonte-sims',
            'Application Mawemba': 'application-mawemba', 'Identité graphique': 'identite-graphique-d-entreprises'}
    for name, tag in hero.items():
        h, c = re.subn(r'<svg class="(?:ico|art)" aria-hidden="true"><use href="#[ia]-[^"]+"/></svg>(<div class="hs-cap"><b>' + re.escape(name) + '</b>)',
                       rf'<svg class="art" aria-hidden="true"><use href="#a-{tag}"/></svg>\1', h)
        assert c == 1, name
    open(path, 'w', encoding='utf-8').write(h)
