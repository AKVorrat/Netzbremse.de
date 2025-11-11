import { Show } from "solid-js";

export const de = {
	title: "Was, wie, warum?",
	description: [
		"Mit diesem Speedtest kannst du überprüfen, ob Dein Internetanschluss von Engpässen am Eingang ins Netz Deines Anbieters betroffen ist, die bestimmte Webseiten und Dienste verlangsamen könnten. Damit hilfst du der Netzbremse Kampagne, das Problem noch besser mit Daten zu belegen. Der Test dauert länger, weil 5 Speedtests nacheinander durchgeführt werden.",
		() => (<>
			Wichtig: Bitte <strong>deaktiviere deinen Adblocker für diese Seite.</strong> Nur so können wir deine anonymisierten Testergebnisse sammeln und auswerten. Danke!
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
		route: (letter: string, label?: string) => label ? `Route ${letter} (${label})` : `Route ${letter}`,
		testing: (name: string) => `Teste ${name}`,
		latencyDuringDownload: (latency: string, jitter: string) => <>
			<span class="inline-block min-w-[3ch] text-end">{latency}</span> ms Latency während Download
			<Show when={jitter}> (±{jitter} ms)</Show>
		</>,
		latencyDuringUpload: (latency: string, jitter: string) => <>
			<span class="inline-block min-w-[3ch] text-end">{latency}</span> ms Latency während Upload
			<Show when={jitter}> (±{jitter} ms)</Show>
		</>,
		idleLatencyDisplay: (latency: string, jitter: string) => <>
			Latenz (Idle): <span class="inline-block min-w-[3ch] text-end">{latency}</span>&nbsp;ms | Jitter: <span class="inline-block min-w-[3ch] text-end">{jitter}</span>&nbsp;ms
		</>,
		restart: "Neustart",
		error: "Fehler",
		subtitle: "Netzbremse x Cloudflare",
		testsCompleted: (count: number) => `${count} Tests abgeschlossen`,
		restartIn: "Neustart in",
		unknownError: "Unbekannter Fehler",
		loggingBlocked: {
			title: "Daten können nicht übertragen werden",
			message: "Für die Netzbremse-Kampagne sammeln wir anonyme Testergebnisse. Die Datenübertragung scheint blockiert zu sein (möglicherweise durch einen Adblocker). Du kannst den Test trotzdem durchführen. Wenn du der Kampagne helfen möchtest, deaktiviere bitte den Adblocker für diese Seite und starte den Test neu.",
			dismiss: "Verstanden",
		},
		peakHoursInfo: () => <>
			<strong>Hinweis:</strong> Messungen zu <a href="https://radar.cloudflare.com/traffic/de" target="_blank">Stoßzeiten</a> (zB Abends) sind hilfreicher für uns.
		</>
	},
	advancedResults: {
		title: "Detaillierte Testergebnisse",
		overview: "Übersicht",
		routesTested: (count: number) => `${count} Routen getestet`,
		testCompleted: "Test abgeschlossen",
		sessionId: "Session ID",
		exportData: "Daten exportieren",
		rawMetrics: "Messwerte",
		performanceData: "Leistungsdaten",
		downloadSpeed: "Download-Geschwindigkeit",
		uploadSpeed: "Upload-Geschwindigkeit",
		loadedLatencyDown: "Latenz unter Last (Download)",
		loadedLatencyUp: "Latenz unter Last (Upload)",
		noLatencyData: "Keine Latenz-Daten verfügbar",
		idleLatency: "Latenz (Idle)",
		jitter: "Jitter",
		server: "Server",
		testDuration: "Testdauer",
		seconds: "Sekunden",
		mbps: "Mbit/s",
		ms: "ms",
		download: "Download",
		upload: "Upload",
		latency: "Latenz",
		timeSeconds: "Zeit (Sekunden)",
		speedMbps: "Geschwindigkeit (Mbit/s)",
		latencyMs: "Latenz (ms)",
		stats: {
			min: "Min",
			max: "Max",
			median: "Median",
			average: "Durchschnitt",
		},
		chart: {
			noDataAvailable: (type: string) => `Keine ${type}-Daten verfügbar`,
		},
	},
	privacyPolicy: {
		title: "Datenschutzerklärung",
		content: () => (
			<p>
				Wenn du den Speedtest ausführst, wird deine IP-Adresse mit Cloudflare geteilt und gemäß unserer <a href="https://www.cloudflare.com/de-de/privacypolicy/" target="_blank">Privay Policy</a> verarbeitet.
			</p>
		),
		summary: "Mehr erfahren",
		details: () => (<>
			<p>
				Wenn du den Speedtest verwendest, erhält Cloudflare die IP-Adresse, mit der du eine Verbindung zum Speedtest-Dienst von Cloudflare herstellst. Cloudflare nutzt deine IP-Adresse, um deine ungefähre geografische Position (auf Länder- und Stadtebene) zu bestimmen und die „Autonomous System Number“ (ASN) zu identifizieren, die mit deiner IP-Adresse verknüpft ist.
			</p>
			<p>
				Cloudflare teilt anonymisierte Messdaten (z. B. die geschätzte geografische Position, die mit deinem Speedtest verknüpfte ASN usw.) zusammen mit deiner gekürzten IP-Adresse mit unseren Messpartnern, einschließlich Epicenter Works, als Teil von Cloudflares Beitrag zu einer gemeinsamen Datenbank für Internetleistungsmessungen. Wir geben deine vollständige IP-Adresse nicht an unsere Messpartner weiter. Nach Abschluss unserer Analyse werden diese Messdaten und die gekürzten IP-Adressen außerdem in der öffentlichen BigQuery-Datenbank von Measurement Lab veröffentlicht.
			</p>
			<p>
				Im Rahmen dieses Speedtest erhält Cloudflare folgende Informationen:
			</p>
			<ul>
				<li>Deine IP-Adresse;</li>
				<li>Eine Schätzung deines Standorts (Land, Stadt);</li>
				<li>Die „Autonomous System Number“ (ASN) deines Internetanbieters (ISP).</li>
			</ul>
			<p>
				Cloudflare kürzt die IP-Adresse, die im Rahmen deiner Nutzung des Speedtests übermittelt wird, auf /24 für IPv4- und /48 für IPv6-Adressen.
			</p>
		</>),
		acceptButton: "Akzeptieren und Test starten",
		dataUsageNote: "Hinweis: Ein Speedtest kann bis zu 200MB Datenvolumen verbrauchen.",
	},
	faqTitle: "Hintergründe zum Speedtest",
	faq: [
		{
			title: "Wieso soll ich meinen Adblocker deaktivieren?",
			body: () => (<>
				<p>
					Wir sammeln die anonymisierten Messergebnisse von deinem Browser mittels Cloudflare Endpunkten ein.
					Obwohl diese Endpunkte anonymisiert sind und kein Tracking durchführen, werden sie häufig von Werbeblockern blockiert.
					Der Test funktioniert mit Adblocker einwandfrei, nur werden deine Ergebnisse nicht an uns zurück gemeldet und helfen der Kampagne nicht.
				</p >
			</>),
		},
		{
			title: "Was misst der Test? Warum dauert es so lange?",
			body: () => (<>
				<p>
					Dieser Test misst Engpässe zwischen verschiedenen Teilen des Internets (sogenannten Transit-Betreibern) und deinem
					Internetanschluss. Anders als andere Speedtests messen wir nicht die Verbindung von deinem Anschluss zu anderen Teilen
					des Netzes, sondern in die Gegenrichtung vom Internet zu deinem Internetanbieter und deinem Anschluss.
				</p>
				<p>
					Der Test misst verschiedene Verbindungen (Transit-Betreiber) nacheinander. Deshalb dauert er länger als normale
					Speedtests. Bitte lass den Test trotzdem bis zum Ende durchlaufen, um aussagekräftige Ergebnisse zu erhalten.
				</p>
			</>),
		},
		{
			title: "Warum soll ich diesen Test im Hintergrund laufen lassen?",
			body: () => (<>
				<p>
					Wenn du die Checkbox unter dem Testknopf aktivierst, wiederholen wir den Test, bis du diese Seite verlässt.
					Dabei werden alle Transitbetreiber nacheinander wiederholt getestet und jedes Mal eine neue Testreihe erstellt.
					Die Reihenfolge der Transit-Betreiber ist immer zufällig.
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
			title: "Wie kann ich möglichst genaue Messergebnisse erzielen?",
			body: () => (<>
				<p>
					Führe den Speedtest nach Möglichkeit mit einer stabilen Verbindung durch - am besten mit einem Computer, der per LAN-Kabel direkt mit dem Router verbunden ist.
				</p>
				<p>
					Wenn du den Test über WLAN machst, achte darauf, dass sich dein Endgerät in unmittelbarer Nähe des Routers befindet und keine Hindernisse (z. B. Wände) die Verbindung stören.
				</p>
				<p>
					So stellst du sicher, dass mögliche Geschwindigkeitseinbußen tatsächlich vom Internetanschluss herrühren und nicht durch dein Heimnetzwerk verursacht werden.
				</p>
			</>),
		},
		{
			title: "Was ist eure Datenschutzpolicy?",
			body: () => (<>
				<p>
					Tl;dr: wir speichern keine personenbezogenen Daten. Wir können und wollen nicht herausfinden, wer du bist.
					Deine Teilnahme am Test bleibt anonym.
				</p>
				<p>
					Dieser Test speichert lediglich den Netzwerkteil deiner IP-Adresse, aber nicht deine konkrete Anschlusskennung.
					Bei IPv4 Adressen speichern wir also nur die ersten drei Zahlenblöcke (Oktetts).
				</p>
				<p>
					Wenn du eine Netzwerkmessung durchführst, werden alle dazu gehörigen Messungen im Datenpool zusammen gespeichert.
					So können wir erkennen, dass diese Messungen von demselben Anschluss aus durchgeführt wurden, ohne dass wir deinen
					Anschluss identifizieren können.
				</p>
				<p>
					Für alle übrigen Funktionen der Webseite verweisen wir auf die generelle
					<a href="https://epicenter.works/datenschutz" target="_blank">Datenschutzpolicy</a> von epicenter.works.
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
					VPNs können massive Auswirkungen auf die Ergebnisse der Netzwerkmessung haben. Weil ein VPN deinen gesamten Internetverkehr
					über eine andere Route leitet, werden mögliche Engpässe zwischen deinem Internetanbieter und Transit-Betreibern umgangen.<br />
					Ein VPN kann deshalb ein guter Weg sein, um das Problem im Alltag zu lösen. Deshalb verhindert ein VPN eine sinnvolle Messung des Problems.
				</p>
			</>),
		},
		{
			title: "Wieso arbeitet ihr mit Cloudflare zusammen?",
			body: () => (<>
				Die Netzbremse Kampagne wird von der Zivilgesellschaft getragen. Ohne die Unterstützung von Cloudflare hätten wir nicht die technischen Möglichkeiten, ein so komplexes Messwerkzeug zur Verfügung zu stellen. Wie ganz viele andere Netz- und Webseitenbetreiber hat Cloudflare bereits zum <a href="https://blog.cloudflare.com/de-de/eu-network-usage-fees/" target="_blank">Problem der Netzbremse Stellung bezogen</a>.
			</>),
		},
		{
			title: "Was passiert mit den Messergebnissen?",
			body: "Wir müssen zuerst ausreichend Daten sammeln, um eine sinnvolle statistische Auswertung zu ermöglichen. Nur mit ausreichend vielen Daten können wir belastbare Aussagen treffen. Im Zuge dieser Auswertung werden wir auch die Daten an die Bundesnetzagentur übergeben, damit diese unsere Ergebnisse unabhängig überprüfen kann.",
		},
	]
}
