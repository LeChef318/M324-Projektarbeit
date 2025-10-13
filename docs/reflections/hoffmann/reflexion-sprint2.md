1.1.
Im Sprint wurden die Themen Testing, Docker, Paket-Manager, Terraform, Kamal und GitHub Actions behandelt.
Beim Testing lag der Fokus darauf, durch automatisierte Tests die Qualität der Software sicherzustellen und Fehler frühzeitig zu erkennen.
Docker wurde genutzt, um Anwendungen in Containern bereitzustellen und dadurch eine einheitliche und flexible Entwicklungsumgebung zu schaffen.
Mit Paket-Managern konnten Softwareabhängigkeiten effizient verwaltet werden.
Terraform diente dazu, Infrastruktur als Code zu definieren und automatisiert bereitzustellen.
Kamal wurde eingesetzt, um Anwendungen einfach auf Servern zu deployen, und GitHub Actions ermöglichte die Automatisierung von Entwicklungsprozessen wie Testing und Deployment direkt aus dem Repository heraus.

1.2.
Alle behandelten Themen stehen im engen Zusammenhang mit den Grundprinzipien von DevOps, da sie Entwicklung, Bereitstellung und Betrieb enger miteinander verbinden.
Testing unterstützt kontinuierliche Integration und Qualitätssicherung, Docker und Paket-Manager sorgen für reproduzierbare Umgebungen, Terraform und Kamal automatisieren die Bereitstellung und Verwaltung der Infrastruktur, und GitHub Actions ermöglicht kontinuierliche Integrations- und Bereitstellungsprozesse.
Zusammen fördern sie eine effiziente, automatisierte und zuverlässige Softwareentwicklung.

1.3
Die Kommunikation hat sich nicht wesentlich verändert, aber trotzdem besser geworden. Seit Sprint 1 gab es mehr Arbeiten, welche verteilt und unabhängig von anderen gemacht werden konnten.
Dies hat dazu geführt, dass mehr Input von allen Teammitgliedern kam, was auch zu mehr Feedback bei den Arbeiten führte. Wir haben jedoch meist den kürzeren Weg genommen und Dinge direkt im Team diskutiert, anstelle die Diskusionen z.B. in PRs zu führen, wie es eigentlich gedacht wäre. Wir haben uns trotzdem bemüht immer mal wieder einen PR zu kommentieren, hätte aber durchaus mehr sein können.

1.4
Nach einigen Fehlschlägen mit diversen GitHub-Actions (testing, linting) ist es uns doch gelungen einen kompletten Workflow inklusive Deployment hinzubekommen. Da wir einige eigene und abgeänderte Actions haben war es eine grosse Erleichterung für das Team als das erste Deployment erfolgreich war.

1.5
Persönlich habe ich mich sehr mit Github-Actions und Terraform auseinandergesetzt, nicht nur direkt im Projekt, auch in privaten Projekten und bei der Arbeit. Ich konnte doch einiges aus dem Modul mitnehmen, vorallem aber die Motivation mich damit auseinanderzusetzen. Da ich mich bei der Arbeit auch mit der Infrastruktur auseinandersetzen musste (und da die Infrastruktur wesentlich komplexer ist...) war das, was ich Modul und privat gemacht habe, eine gute Vorbereitung.

1.6
Github-Actions sind manchmal etwas kompliziert... Vorallem wenn es um Berechtigungen und Secrets geht! Da musste ich doch einige Fehlschläge hinnehmen. Vorallem bei den e2e-Tests, welche ich einführen wollte, musste ich schlussendlich aufgeben. Lokal lief alles einwandfrei, jedoch hat die Github-Action immer Probleme gemacht. Da dies die weitere Entwicklung auch teilweise blockierte, haben wir beschlossen e2e-Tests vorerst wegzulassen.

1.7
Besonders stolz bin ich auf meine PR-Validation. Obwohl die Action nicht direkt von mir ist, war der nutzen doch erheblich (einige Leute in meinem Team hatten Probleme conventional-commits zu erstellen...).

1.8 & 1.9
Ich finde den Fokus auf Zusammenarbeit im Team sehr gut, jedoch wäre es evtl. besser etwas grössere Teams zu machen mit einer festere Rollenzuteilung. Dies würde zwar einzelnen bestimmte Aspekte weniger direkt zeigen, jedoch verschiedene Verantwortlichkeiten besser verdeutlichen (oder evtl. Rollenrotation alle 2 Wochen).
Die freie Projektwahl ist zwar gut um erste Diskussionen in den Teams zu forcieren, war jedoch (zumindest in unserem Team) ein doch eher langsamer Prozess. Dies könnte mit Standart-Projekten (oder eine vorgegebene Auswahl an Projekten) besschleunigt werden und andere Themen hätten mehr Platz.
Die kaskadierende Gruppenwahl (ich nenn das jetzt einfach mal so...) am Anfang des Moduls war sehr gut (nicht nur weil es meine Idee war;)). Dies hat meiner Meinung nach die "übliche" Gruppenverteilung der Klasse etwas aufgebrochen.
