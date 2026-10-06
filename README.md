# BacBio

Aplicație web (apoi mobil) care pregătește elevii pentru Bacalaureatul la biologie, pe programa oficială de simulare 2026, în 10–20 de minute pe zi.

- Structura aplicației: [docs/STRUCTURA.md](docs/STRUCTURA.md)
- Conținutul (banca de itemi, glosar, fișe, hărți, formatul probei): [continut/README.md](continut/README.md)

## Pornire

```bash
npm install
npm run dev
```

Toate rutele din documentul de structură există ca pagini. Funcționează deja, cu date reale din `continut/out/`:

- `/invata`: capitolele pe variante și clase; pagina unui capitol arată temele, întrebările de verificare, tabelele comparative și glosarul.
- `/grile`: filtru pe dificultate și sesiuni de grile (alegere multiplă și adevărat/fals) cu „Cât de sigur ești?”, explicație, confuzia tipică asociată și scor final.

Restul paginilor sunt schelete. Progresul nu se salvează încă.

## Conținutul

Materialele se generează din `continut/src/ch_*.py`:

```bash
python3 -I continut/src/build.py      # validează și exportă în continut/out/
python3 -I continut/src/make_docs.py  # regenerează continut/docs/harta_continut.md
```
