export const de = {
	title: "Was, wie, warum?",
	description: [
		"Mit diesem Speedtest kannst du überprüfen, ob Dein Internetanschluss von Engpässen am Eingang ins Netz Deines Anbieters betroffen ist, die bestimmte Webseiten und Dienste verlangsamen könnten. Damit hilfst du der Netzbremse Kampagne, das Problem noch besser mit Daten zu belegen. Der Test dauert länger, weil 5 Speedtests nacheinander durchgeführt werden.",
		() => (<>
			Wichtig: Bitte <strong>deaktiviere deinen Adblocker für diese Seite</strong> Nur so können wir deine anonymisierten Testergebnisse sammeln und auswerten. Danke!
		</>),
		"Tests am Abend und am Wochenende sind besonders aussagekräftig, weil zu diesen Zeiten besonders häufig Probleme auftreten.",
	],
	speedtest: {
		title: "Speedtest",
		startBtn: "Starten",
		runInBackground: "Test im Hintergrund wiederholen",
		stepN: (n: number) => `Schritt ${n}`,
		pause: "Pausieren",
		resume: "Fortsetzen",
		download: "Download",
		upload: "Upload",
		testing: (name: string) => `Teste ${name}`,
		latencyDuringDownload: (n: string) => <><span class="inline-block min-w-[3ch] text-end">{n}</span> ms Latency während des Downloads</>,
		latencyDuringUpload: (n: string) => <><span class="inline-block min-w-[3ch] text-end">{n}</span> ms Latency während des Uploads</>,
	},
	faqTitle: "Hintergründe zum Speedtest",
	faq: [
		{
			title: "Warum dauert der Test so lange?",
			body: () => (<>
				<p>
					Dieser Test misst Engpässe zwischen verschiedenen Teilen des Internets (sogenannten Transit-Betreibern) und deinem Internetanschluss. Anders als andere Speedtests messen wir nicht die Verbindung von deinem Anschluss zu anderen Teilen des Netzes, sondern in die Gegenrichtung vom Internet zu deinem Internetanbieter und deinem Anschluss.
				</p>
				<p>
					Der Test misst verschiedene Verbindungen (Transit-Betreiber) nacheinander. Deshalb dauert er länger als normale Speedtests. Bitte lass den Test trotzdem bis zum Ende durchlaufen, um aussagekräftige Ergebnisse zu erhalten.
				</p>
			</>),
		},
		{
			title: "Warum kann ich diesen Test im Hintergrund laufen lassen?",
			body: () => (<>
				<p>
					Wenn du die Checkbox unter dem Testknopf aktivierst, wiederholen wir den Test, bis du diese Seite verlässt. Dabei werden alle Transitbetreiber nacheinander wiederholt getestet und jedes Mal eine neue Testreihe erstellt.
				</p>
				<p>
					Du hilfst uns damit, mehr Daten zu sammeln und dadurch zuverlässigere Aussagen zu treffen.
				</p>
			</>),
		},
		{
			title: "Kann ich neben dem Test andere Dinge tun?",
			body: "Du solltest, während der Test läuft, keine bandbreitenintensiven Anwendungen wie Videostreaming oder Filesharing über denselben Internetanschluss laufen lassen. Auch rechenintensive Aufgaben auf demselben Gerät könnten den Test verfälschen. Bestenfalls lässt du den Test auf deinem Browser laufen, während du den Computer gerade nicht verwendest.",
		},
		{
			title: "Was ist eure Datenschutzpolicy?",
			body: () => (<>
				<p>
					Tl;dr: wir speichern keine personenbezogenen Daten. Wir können und wollen nicht herausfinden, wer du bist. Deine Teilnahme am Test bleibt anonym.
				</p>
				<p>
					Dieser Test speichert lediglich den Netzwerkteil deiner IP-Adresse, aber nicht deine konkrete Anschlusskennung. Bei IPv4 Adressen speichern wir also nur die ersten drei Zahlenblöcke (Oktetts).
				</p>
				<p>
					Wenn du eine Netzwerkmessung durchführst, werden alle dazu gehörigen Messungen im Datenpool zusammen gespeichert. So können wir erkennen, dass diese Messungen von demselben Anschluss aus durchgeführt wurden, ohne dass wir deinen Anschluss identifizieren können.
				</p>
				<p>
					Für alle übrigen Funktionen der Webseite verweisen wir auf die generelle <a href="https://epicenter.works/datenschutz" target="_blank">Datenschutzpolicy</a> von epicenter.works.
				</p>
			</>),
		},
		{
			title: "Wie wirkt sich ein VPN auf die Messung aus?",
			body: () => (<>
				<p>
					Bitte führe den Test ohne VPN durch. Nur so können wir Missstände aufdecken und beheben.
				</p>
				<p>
					VPNs können massive Auswirkungen auf die Ergebnisse der Netzwerkmessung haben. Weil ein VPN deinen gesamten Internetverkehr über eine andere Route leitet, werden mögliche Engpässe zwischen deinem Internetanbieter und Transit-Betreibern umgangen.<br />
					Ein VPN kann deshalb ein guter Weg sein, um das Problem im Alltag zu lösen. Deshalb verhindert ein VPN eine sinnvolle Messung des Problems.
				</p>
			</>),
		},
		{
			title: "Wieso arbeitet ihr mit Cloudflare zusammen?",
			body: () => (<>
				Die Netzbremse Kampagne wird von der Zivilgesellschaft getragen. Ohne die Unterstützung von Cloudflare hätten wir nicht die technischen Möglichkeiten, ein so komplexes Messwerkzeug zur Verfügung zu stellen. Wie ganz viele andere Netz- und Webseitenbetreiber hat Cloudflare bereits zum <a href="https://blog.cloudflare.com/de-de/eu-network-usage-fees/" target="_blank">Problem der Netzbremse Stellung bezogen</a>. Wir zahlen Cloudflare nichts dafür, dass wir ihre Infrastruktur für diesen Netzwerktest nutzen können.
			</>),
		},
		{
			title: "Was passiert mit den Messergebnissen?",
			body: "Wir müssen zuerst ausreichend Daten sammeln, um eine sinnvolle statistische Auswertung zu ermöglichen. Nur mit ausreichend vielen Daten können wir belastbare Aussagen treffen. Im Zuge dieser Auswertung werden wir auch die Daten an die Bundesnetzagentur übergeben, damit diese unsere Ergebnisse unabhängig überprüfen kann.",
		},
	]
}
