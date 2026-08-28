-- Seed Chapters for Biologie B2 (traseu_id: '00000000-0000-0000-0000-000000000001')
insert into public.capitole (id, traseu_id, titlu, ordine, dificultate) values
('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', 'Sistemul nervos', 1, 'Mediu'),
('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000001', 'Sistemul circulator', 2, 'Mediu'),
('00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000001', 'Genetică - noțiuni de bază', 3, 'Dificil');

-- Seed Questions for Chapter 1: Sistemul nervos (8 questions)
insert into public.intrebari (id, capitol_id, tip, enunt, optiuni_json, raspuns_corect, explicatie, dificultate) values
('00000000-0000-0000-0000-000000001011', '00000000-0000-0000-0000-000000000101', 'grila', 
 'Care este unitatea structurală și funcțională a sistemului nervos?', 
 '["Nefronul", "Neuronul", "Sinapsa", "Glila"]', 'Neuronul', 
 'Neuronul este celula nervoasă responsabilă de transmiterea influxului nervos.', 'Ușor'),

('00000000-0000-0000-0000-000000001012', '00000000-0000-0000-0000-000000000101', 'grila', 
 'Ce structură asigură legătura funcțională dintre doi neuroni?', 
 '["Dendrita", "Axonul", "Sinapsa", "Mielina"]', 'Sinapsa', 
 'Sinapsa este zona de contact funcțional ce permite transmiterea semnalului chimic sau electric.', 'Ușor'),

('00000000-0000-0000-0000-000000001013', '00000000-0000-0000-0000-000000000101', 'grila', 
 'Meningele spinal este alcătuit din câte membrane protectoare?', 
 '["Una", "Două", "Trei", "Patru"]', 'Trei', 
 'Membranele sunt dura mater, arahnoida și pia mater.', 'Mediu'),

('00000000-0000-0000-0000-000000001014', '00000000-0000-0000-0000-000000000101', 'grila', 
 'Unde se află centrii nervoși ai reflexelor respiratorii și cardiovasculare?', 
 '["În cerebel", "În bulbul rahidian", "În măduva spinării", "În scoarța cerebrală"]', 'În bulbul rahidian', 
 'Bulbul rahidian controlează funcțiile vitale reflexe involuntare.', 'Mediu'),

('00000000-0000-0000-0000-000000001015', '00000000-0000-0000-0000-000000000101', 'grila', 
 'Care dintre următoarele este un reflex necondiționat (înnăscut)?', 
 '["Scrierea", "Mersul pe bicicletă", "Salivația la vederea lămâii", "Reflexul rotulian"]', 'Reflexul rotulian', 
 'Reflexul rotulian este un reflex osteotendinos simplu, involuntar și înnăscut.', 'Ușor'),

('00000000-0000-0000-0000-000000001016', '00000000-0000-0000-0000-000000000101', 'grila', 
 'Sistemul nervos parasimpatic este responsabil pentru:', 
 '["Reacția de fugă sau luptă", "Starea de repaus și digestie", "Coordonarea motorie fină", "Sensibilitatea tactilă"]', 'Starea de repaus și digestie', 
 'Sistemul parasimpatic conservă energia și susține procesele metabolice bazale.', 'Mediu'),

('00000000-0000-0000-0000-000000001017', '00000000-0000-0000-0000-000000000101', 'grila', 
 'Cerebelul (creierul mic) are ca principală funcție:', 
 '["Gândirea logică", "Coordonarea mișcărilor și echilibrul", "Termoreglarea", "Secretarea hormonilor"]', 'Coordonarea mișcărilor și echilibrul', 
 'Cerebelul ajustează tonusul muscular și asigură precizia mișcărilor.', 'Ușor'),

('00000000-0000-0000-0000-000000001018', '00000000-0000-0000-0000-000000000101', 'grila', 
 'Lichidul cefalorahidian (LCR) circulă în spațiul:', 
 '["Subdural", "Epidural", "Subarahnoidian", "Intracelular"]', 'Subarahnoidian', 
 'LCR circulă în spațiul subarahnoidian dintre arahnoidă și pia mater.', 'Dificil';


-- Seed Questions for Chapter 2: Sistemul circulator (8 questions)
insert into public.intrebari (id, capitol_id, tip, enunt, optiuni_json, raspuns_corect, explicatie, dificultate) values
('00000000-0000-0000-0000-000000001021', '00000000-0000-0000-0000-000000000102', 'grila', 
 'Inima omului are un număr de:', 
 '["Două camere", "Trei camere", "Patru camere", "Cinci camere"]', 'Patru camere', 
 'Inima este complet septată în două atrii și două ventricule.', 'Ușor'),

('00000000-0000-0000-0000-000000001022', '00000000-0000-0000-0000-000000000102', 'grila', 
 'Vasele care transportă sângele de la inimă spre țesuturi se numesc:', 
 '["Vene", "Capilare", "Artere", "Limfatice"]', 'Artere', 
 'Arterele pleacă din ventricule și duc sângele oxigenat sau neoxigenat în corp.', 'Ușor'),

('00000000-0000-0000-0000-000000001023', '00000000-0000-0000-0000-000000000102', 'grila', 
 'Circulația mică (pulmonară) începe în:', 
 '["Ventriculul stâng", "Atriul stâng", "Ventriculul drept", "Atriul drept"]', 'Ventriculul drept', 
 'Circulația mică începe în ventriculul drept prin trunchiul pulmonar.', 'Mediu'),

('00000000-0000-0000-0000-000000001024', '00000000-0000-0000-0000-000000000102', 'grila', 
 'Ce tip de sânge circulă prin venele pulmonare?', 
 '["Sânge neoxigenat", "Sânge oxigenat", "Limfă", "Sânge mixt"]', 'Sânge oxigenat', 
 'Venele pulmonare aduc sânge oxigenat de la plămâni în atriul stâng.', 'Mediu'),

('00000000-0000-0000-0000-000000001025', '00000000-0000-0000-0000-000000000102', 'grila', 
 'Valvula bicuspidă (mitrală) se află între:', 
 '["Atriul drept și ventriculul drept", "Atriul stâng și ventriculul stâng", "Ventriculul stâng și aortă", "Atriul stâng și atriul drept"]', 'Atriul stâng și ventriculul stâng', 
 'Valvula mitrală separă atriul stâng de ventriculul stâng.', 'Mediu'),

('00000000-0000-0000-0000-000000001026', '00000000-0000-0000-0000-000000001027', 'grila', 
 'Sistola reprezintă faza de:', 
 '["Relaxare a mușchiului cardiac", "Contractare a mușchiului cardiac", "Umplere a inimii", "Pauză generală"]', 'Contractare a mușchiului cardiac', 
 'Sistola reprezintă contracția miocardului ce evacuează sângele din camere.', 'Ușor', 'Ușor'),

('00000000-0000-0000-0000-000000001027', '00000000-0000-0000-0000-000000000102', 'grila', 
 'Care dintre următoarele celule sanguine sunt responsabile pentru coagularea sângelui?', 
 '["Hematiile", "Leucocitele", "Trombocitele", "Limfocitele"]', 'Trombocitele', 
 'Trombocitele participă activ la formarea cheagului de sânge (hemostază).', 'Ușor'),

('00000000-0000-0000-0000-000000001028', '00000000-0000-0000-0000-000000000102', 'grila', 
 'Pacemakerul natural principal al inimii este:', 
 '["Nodulul atrioventricular", "Nodulul sinoatrial", "Fasciculul His", "Rețeaua Purkinje"]', 'Nodulul sinoatrial', 
 'Nodulul sinoatrial din atriul drept dictează ritmul cardiac sinusal normal.', 'Dificil';


-- Seed Questions for Chapter 3: Genetică - noțiuni de bază (8 questions)
insert into public.intrebari (id, capitol_id, tip, enunt, optiuni_json, raspuns_corect, explicatie, dificultate) values
('00000000-0000-0000-0000-000000001031', '00000000-0000-0000-0000-000000000103', 'grila', 
 'Care este macromocula responsabilă de stocarea informației genetice?', 
 '["ARN-ul mesager", "ADN-ul", "Proteina", "Lipida"]', 'ADN-ul', 
 'Acidul dezoxiribonucleic (ADN) conține instrucțiunile genetice ereditare.', 'Ușor'),

('00000000-0000-0000-0000-000000001032', '00000000-0000-0000-0000-000000000103', 'grila', 
 'Câte legi ale eredității a formulat Gregor Mendel?', 
 '["Una", "Două", "Trei", "Patru"]', 'Două', 
 'Mendel a formulat Legea purității gameților și Legea segregării independente a perechilor de caractere.', 'Mediu'),

('00000000-0000-0000-0000-000000001033', '00000000-0000-0000-0000-000000000103', 'grila', 
 'Procesul prin care se copiază informația din ADN în ARN se numește:', 
 '["Translație", "Replicare", "Transcripție", "Splicing"]', 'Transcripție', 
 'Transcripția reprezintă sinteza ARN-ului mesager pe matricea de ADN.', 'Mediu'),

('00000000-0000-0000-0000-000000001034', '00000000-0000-0000-0000-000000000103', 'grila', 
 'Cum se numește o variantă alternativă a unei gene?', 
 '["Locus", "Genom", "Alelă", "Genotip"]', 'Alelă', 
 'Alelele determină variații diferite ale aceluiași caracter ereditar.', 'Ușor'),

('00000000-0000-0000-0000-000000001035', '00000000-0000-0000-0000-000000000103', 'grila', 
 'Un organism heterozigot pentru o pereche de gene va fi notat ca:', 
 '["AA", "aa", "Aa", "AAb"]', 'Aa', 
 'Heterozigotul are două alele diferite (una dominantă și una recesivă).', 'Ușor'),

('00000000-0000-0000-0000-000000001036', '00000000-0000-0000-0000-000000000103', 'grila', 
 'Ce bază azotată se găsește în ARN, dar nu și în ADN?', 
 '["Timiă", "Uracil", "Adenină", "Citozină"]', 'Uracil', 
 'Uracilul înlocuiește timina în structura acidului ribonucleic (ARN).', 'Ușor'),

('00000000-0000-0000-0000-000000001037', '00000000-0000-0000-0000-000000000103', 'grila', 
 'Sindromul Down reprezintă o mutație de tip:', 
 '["Genică", "Trisomie autosomală (21)", "Monosomie", "Poloploidie"]', 'Trisomie autosomală (21)', 
 'Sindromul Down este caracterizat prin prezența unui cromozom 21 suplimentar.', 'Mediu'),

('00000000-0000-0000-0000-000000001038', '00000000-0000-0000-0000-000000000103', 'grila', 
 'Codonul de start universal pentru traducerea proteinelor este:', 
 '["UAA", "AUG", "UGA", "UAG"]', 'AUG', 
 'AUG codifică metionina și servește drept semnal de start în translație.', 'Dificil';
