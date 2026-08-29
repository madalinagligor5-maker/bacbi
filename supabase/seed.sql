-- BacPilot — date inițiale pentru traseul "Biologie B2"
-- Conținut generic, de test — va fi înlocuit ulterior prin panoul admin (Etapa 7).

-- =========================================================================
-- CAPITOLE
-- =========================================================================
insert into public.capitole (id, traseu_id, titlu, ordine, dificultate)
select gen_random_uuid(), t.id, c.titlu, c.ordine, c.dificultate
from public.trasee t
cross join (
  values
    ('Sistemul nervos', 1, 'mediu'),
    ('Sistemul circulator', 2, 'mediu'),
    ('Genetică - noțiuni de bază', 3, 'dificil')
) as c(titlu, ordine, dificultate)
where t.nume = 'Biologie B2'
  and not exists (
    select 1 from public.capitole existing
    where existing.traseu_id = t.id and existing.titlu = c.titlu
  );

-- =========================================================================
-- INTREBARI — Sistemul nervos
-- =========================================================================
insert into public.intrebari (capitol_id, tip, enunt, optiuni_json, raspuns_corect, explicatie, dificultate)
select c.id, 'grila', q.enunt, q.optiuni, q.raspuns, q.explicatie, q.dificultate
from public.capitole c
cross join (
  values
    ('Care este unitatea structurală și funcțională a sistemului nervos?',
      '["Neuronul", "Nefronul", "Miocitul", "Osteocitul"]'::jsonb,
      'Neuronul', 'Neuronul este celula specializată în transmiterea impulsului nervos.', 'usor'),
    ('Ce parte a neuronului transmite impulsul nervos către alți neuroni?',
      '["Dendrita", "Axonul", "Nucleul", "Corpul celular"]'::jsonb,
      'Axonul', 'Axonul conduce impulsul nervos de la corpul celular către alte celule.', 'usor'),
    ('Sistemul nervos central este alcătuit din:',
      '["Encefal și măduva spinării", "Nervi cranieni și spinali", "Ganglioni nervoși", "Receptori senzoriali"]'::jsonb,
      'Encefal și măduva spinării', 'SNC cuprinde encefalul (creierul) și măduva spinării.', 'mediu'),
    ('Care este rolul sinapsei?',
      '["Transmite impulsul nervos între doi neuroni", "Produce hormoni", "Filtrează sângele", "Depozitează glicogen"]'::jsonb,
      'Transmite impulsul nervos între doi neuroni', 'Sinapsa este joncțiunea prin care impulsul nervos trece de la un neuron la altul.', 'mediu'),
    ('Ce structură protejează encefalul?',
      '["Cutia craniană", "Coloana vertebrală", "Coastele", "Bazinul"]'::jsonb,
      'Cutia craniană', 'Cutia craniană oferă protecție mecanică encefalului.', 'usor'),
    ('Substanța cenușie din encefal este formată în principal din:',
      '["Corpii celulari ai neuronilor", "Axoni mielinizați", "Celule gliale exclusiv", "Vase de sânge"]'::jsonb,
      'Corpii celulari ai neuronilor', 'Substanța cenușie conține în principal corpii celulari ai neuronilor.', 'dificil'),
    ('Ce tip de neuroni transmit informația de la receptori spre SNC?',
      '["Neuroni senzitivi", "Neuroni motori", "Interneuroni", "Neuroni gliali"]'::jsonb,
      'Neuroni senzitivi', 'Neuronii senzitivi (aferenți) transmit informația de la receptori către SNC.', 'mediu'),
    ('Reflexul rotulian este un exemplu de:',
      '["Act reflex simplu", "Comportament învățat", "Reflex condiționat", "Activitate voluntară"]'::jsonb,
      'Act reflex simplu', 'Reflexul rotulian este un reflex necondiționat, cu arc reflex simplu la nivelul măduvei spinării.', 'mediu')
) as q(enunt, optiuni, raspuns, explicatie, dificultate)
where c.titlu = 'Sistemul nervos'
  and not exists (
    select 1 from public.intrebari existing
    where existing.capitol_id = c.id and existing.enunt = q.enunt
  );

-- =========================================================================
-- INTREBARI — Sistemul circulator
-- =========================================================================
insert into public.intrebari (capitol_id, tip, enunt, optiuni_json, raspuns_corect, explicatie, dificultate)
select c.id, 'grila', q.enunt, q.optiuni, q.raspuns, q.explicatie, q.dificultate
from public.capitole c
cross join (
  values
    ('Câte camere are inima umană?',
      '["4", "2", "3", "5"]'::jsonb,
      '4', 'Inima are 4 camere: 2 atrii și 2 ventricule.', 'usor'),
    ('Care vas de sânge transportă sânge oxigenat de la inimă la organe?',
      '["Aorta", "Vena cavă", "Artera pulmonară", "Vena pulmonară"]'::jsonb,
      'Aorta', 'Aorta este cea mai mare arteră și pleacă din ventriculul stâng.', 'mediu'),
    ('Ce celule din sânge transportă oxigenul?',
      '["Hematiile (eritrocitele)", "Leucocitele", "Trombocitele", "Plasma"]'::jsonb,
      'Hematiile (eritrocitele)', 'Hematiile conțin hemoglobină, care leagă oxigenul.', 'usor'),
    ('Micul circuit (circulația pulmonară) leagă inima de:',
      '["Plămâni", "Ficat", "Rinichi", "Intestin"]'::jsonb,
      'Plămâni', 'Circulația pulmonară asigură oxigenarea sângelui la nivelul plămânilor.', 'mediu'),
    ('Ce structură previne refluxul sângelui între atrii și ventricule?',
      '["Valvele atrioventriculare", "Septul interventricular", "Pericardul", "Miocardul"]'::jsonb,
      'Valvele atrioventriculare', 'Valvele atrioventriculare (mitrală și tricuspidă) împiedică refluxul sângelui.', 'dificil'),
    ('Presiunea sângelui este cea mai mare în:',
      '["Artere", "Vene", "Capilare", "Atrii"]'::jsonb,
      'Artere', 'Arterele transportă sângele sub presiune mare, direct de la inimă.', 'mediu'),
    ('Rolul trombocitelor este:',
      '["Coagularea sângelui", "Transportul oxigenului", "Apărarea imunitară", "Transportul hormonilor"]'::jsonb,
      'Coagularea sângelui', 'Trombocitele intervin în procesul de coagulare, oprind hemoragiile.', 'usor'),
    ('Ce reprezintă tensiunea arterială?',
      '["Presiunea exercitată de sânge asupra pereților arteriali", "Volumul de sânge din inimă", "Numărul de bătăi ale inimii pe minut", "Cantitatea de oxigen din sânge"]'::jsonb,
      'Presiunea exercitată de sânge asupra pereților arteriali', 'Tensiunea arterială măsoară presiunea sângelui asupra pereților arterelor.', 'mediu')
) as q(enunt, optiuni, raspuns, explicatie, dificultate)
where c.titlu = 'Sistemul circulator'
  and not exists (
    select 1 from public.intrebari existing
    where existing.capitol_id = c.id and existing.enunt = q.enunt
  );

-- =========================================================================
-- INTREBARI — Genetică - noțiuni de bază
-- =========================================================================
insert into public.intrebari (capitol_id, tip, enunt, optiuni_json, raspuns_corect, explicatie, dificultate)
select c.id, 'grila', q.enunt, q.optiuni, q.raspuns, q.explicatie, q.dificultate
from public.capitole c
cross join (
  values
    ('Ce este o genă?',
      '["Un fragment de ADN care codifică o caracteristică", "O celulă reproducătoare", "Un tip de cromozom", "O proteină structurală"]'::jsonb,
      'Un fragment de ADN care codifică o caracteristică', 'Gena este unitatea de bază a eredității, un segment de ADN.', 'usor'),
    ('Câți cromozomi are o celulă somatică umană?',
      '["46", "23", "44", "48"]'::jsonb,
      '46', 'Celulele somatice umane sunt diploide, cu 46 de cromozomi (23 de perechi).', 'usor'),
    ('Un individ homozigot pentru o genă are:',
      '["Alele identice pentru acea genă", "Alele diferite pentru acea genă", "Trei alele pentru acea genă", "Nicio alelă pentru acea genă"]'::jsonb,
      'Alele identice pentru acea genă', 'Homozigot înseamnă că ambele alele ale genei respective sunt identice.', 'mediu'),
    ('Legea segregării independente a fost formulată de:',
      '["Gregor Mendel", "Charles Darwin", "James Watson", "Rosalind Franklin"]'::jsonb,
      'Gregor Mendel', 'Mendel a formulat legile eredității pe baza experimentelor cu mazăre.', 'usor'),
    ('Ce reprezintă genotipul?',
      '["Ansamblul genelor unui individ", "Aspectul exterior al unui individ", "Numărul de cromozomi", "Tipul de reproducere"]'::jsonb,
      'Ansamblul genelor unui individ', 'Genotipul este constituția genetică, spre deosebire de fenotip (manifestarea observabilă).', 'mediu'),
    ('O alelă dominantă se manifestă fenotipic:',
      '["Chiar și în stare heterozigotă", "Doar în stare homozigotă", "Niciodată", "Doar la femei"]'::jsonb,
      'Chiar și în stare heterozigotă', 'Alela dominantă își manifestă efectul chiar dacă e prezentă o singură copie.', 'dificil'),
    ('Mutațiile genetice reprezintă:',
      '["Modificări ale secvenței de ADN", "Diviziuni celulare normale", "Procese de digestie", "Reacții imunitare"]'::jsonb,
      'Modificări ale secvenței de ADN', 'Mutațiile sunt schimbări permanente în secvența de nucleotide a ADN-ului.', 'mediu'),
    ('Cromozomii sexuali la om sunt:',
      '["X și Y", "A și B", "M și N", "1 și 2"]'::jsonb,
      'X și Y', 'La om, sexul este determinat de cromozomii X și Y (femei XX, bărbați XY).', 'usor')
) as q(enunt, optiuni, raspuns, explicatie, dificultate)
where c.titlu = 'Genetică - noțiuni de bază'
  and not exists (
    select 1 from public.intrebari existing
    where existing.capitol_id = c.id and existing.enunt = q.enunt
  );
