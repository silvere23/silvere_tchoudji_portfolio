## Le principe

Dans une architecture Zero Trust, rien n'est accordé par défaut, même à l'intérieur du réseau : chaque accès est vérifié, à chaque fois.

## Ce que j'ai mis en place

- segmentation du réseau en zones ;
- vérification de l'identité et des droits avant chaque accès à une ressource ;
- refus par défaut de tout flux qui n'est pas explicitement autorisé.

Le projet s'appuie sur les principes du NIST SP 800-207.
