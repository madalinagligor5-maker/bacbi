# Materiale pentru aplicația Bac Biologie

Conținut structurat din cărțile și subiectele furnizate. **Modulul A (clasele IX–X, proba E.d) este complet pe cele 23 de capitole; Modulul B este doar o hartă** (vezi `docs/modul_B_harta.md`).

## Conținut (`out/`)
| Fișier | Ce este |
|---|---|
| `harta_continut.json` | capitole, concepte, sloturi de bac, prerechizite, idei mari |
| `banca_itemi.json` / `.csv` | 623 itemi (grile 289, A/F 119, completări 56, exemple 43, structurați 52, enunțuri 25, minieseuri 26, probleme de calcul 4, probleme de genetică 9) |
| `glosar.json` | 294 termeni |
| `fise_recuperare.json` | 414 fișe de recuperare (definiții + întrebări-cheie) |
| `tabele_comparative.json` | 27 tabele comparative |
| `confuzii_tipice.json` | registrul M01–M47: confuzii frecvente, cu remediere |

## Schema unui item
`id` (ex. A22-GRI05), `chapter`, `type`, `bac_slot` (ex. I.C, II.B), `topic`, `q`, `options`, `correct` (index), `explanation`, `wrong_why` (confuzia asociată fiecărui distractor), `level` (C = cunoaștere, U = înțelegere, A = aplicare, R = raționament), `difficulty` (1–3), `source`.
Problemele conțin `given`, `steps`, `answer`, `extra_requirement_example`.

## Reconstruire
`python3 -I src/build.py` validează și exportă; `python3 -I src/make_docs.py` regenerează `docs/harta_continut.md`.
Validări: 4 opțiuni unice, index corect valid, confuzii existente în registru, consistență A/F (fals → corecție), nr. de spații = nr. de răspunsuri, 2 conținuturi și 4 enunțuri, 6 noțiuni care apar în text de maximum 4 fraze. Calculele (procente în lanț, genetică) sunt făcute în cod (`Decimal`, `genetics.py`), nu scrise de mână.

## Limite de care trebuie ținut cont
1. **Fișele de sinteză sunt din 2012**; programa actuală de bac nu a fost verificată. Capitolele A01–A23 urmează fișele.
2. **Baremul oficial nu a fost furnizat**; punctajele pe subcerințe sunt orientative.
3. Surse în conflict: mitoza (momentul separării cromatidelor) diferă între surse – nu există itemi dependenți de acest detaliu. Ghidul Nominatrix are o greșeală (C6H10O6) – folosită formula corectă C6H12O6.
4. Grila 4 din 2025 (pleura) a fost rezolvată prin eliminare, fără barem.
5. Problemele heterozomale (hemofilie, daltonism) din A23 sunt extinderi: confirmați că apar în programa profilului vostru.
6. Doar o parte din itemi citează o sursă explicită (câmpul `source`); restul se bazează pe capitolul indicat în `meta.sources`.
7. Barron’s este sursă suplimentară de nivel universitar; nu a fost folosită pentru itemi.
