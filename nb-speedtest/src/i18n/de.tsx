export const de = {
	title: "Was, wie, warum?",
	description: "Mit diesem Speedtest kannst du deinen Internetanschluss auf Verstopfungen in der Zusammenschaltung überprüfen. Damit hilfst du der Netzbremse Kampagne, weil wir das Problem damit noch besser mit Daten belegen können. Der Test dauert länger, weil 5 Speedtests nacheinander durchgeführt werden.",
	disableAdblocker: (policyURL: string) => (
		<>
			👉 Bitte <strong>deaktiviere deinen Adblocker</strong> für diese Seite, da wir ansonsten die Ergebnisse deiner Tests nicht an unseren Datenpool einmelden können. Danke! <br /><a href={policyURL} target="_blank">Datenschutzpolicy</a>
		</>),
	speedtest: {
		title: "Speedtest",
		startBtn: "Starten",
		runInBackground: "Test im Hintergrund wiederholen",
		stepN: (n: number) => `Schritt ${n}`,
	},
	faqTitle: "Hintergründe zum Speedtest",
	faq: [
		{
			title: "Warum dauert der Test so lange?",
			body: "Dieser Test misst die Verstopfung von verschiedenen Teilen des Internets (Transit-Betreiber) zu deinem Internetanschluss. Anders als andere Speedtests messen wir also nicht von deinem Anschluss zu anderen Teilen des Netzes, sondern in die andere Richtung die Verbindung hin zu deinem Internetanbieter und deinem Anschluss. Dabei misst der Testserver über verschiedene Verbindungen (Transit Betreiber) nacheinander. Deshalb dauert dieser Test auch länger als normale Speedtests. Bitte lass den Test trotzdem bis zum Ende durchlaufen.",
		},
		{
			title: "Warum kann ich diesen Test im Hintergrund laufen lassen?",
			body: "Wenn du die Checkbox unter dem Testknopf aktivierst, wiederholen wir die Tests bis du diese Seite verlässt. Dabei werden alle Transitbetreiber nacheinander getestet und jedes Mal eine neue Testreihe erstellt. Du hilfst uns damit mehr Daten zu generieren und in der Folge belastbarere Aussagen aufgrund der größeren Menge an Daten zu treffen.",
		},
		{
			title: "Kann ich neben dem Test andere Dinge tun?",
			body: "Du solltest, während der Test läuft, keine bandbreitenintensiven Anwendungen über denselben Internetanschluss laufen lassen. Auch rechenintensive Aufgaben auf dem selben Gerät könnten den Test verfälschen. Bestenfalls lässt du den Test auf deinem Browser laufen, während du den Computer gerade nicht verwendest.",
		},
		{
			title: "Was ist eure Datenschutzpolicy?",
			body: () => (<>
				<p>
					Tl;dr: wir speichern keine personenbezogenen Daten.<br />
					Diese Netzwerkmessung speichert lediglich den Netzwerkteil deiner IP-Adresse, aber nicht deine konkrete Anschlusskennung.In IPV4 Adressen bedeutet dies, dass wir nur die ersten drei Oktetts speichern.Wenn du eine Netzwerkmessung durchführst, dann werden die einzelnen Messungen im Datenpool zusammengeführt.Diese Zusammenführung ist jedoch nur auf die einzelne Messung bezogen und nicht für deinen Anschluss identifizierbar.
				</p>
				<p>
					Für alle übrigen Funktionen der Webseite verweisen wir auf die generelle <a href="https://epicenter.works/datenschutz" target="_blank">Datenschutzpolicy</a> von epicenter.works.
				</p>
			</>),
		},
		{
			title: "Wie wirkt sich ein VPN auf die Messung aus?",
			body: "VPNs können massive Auswirkungen auf die Ergebnisse der Netzwerkmessung haben. Weil ein VPN deinen gesamten Verkehr über eine andere Route leitet, würden etwaige Verknappungen an den Zusammenschaltungspunkten deines Internetanbieters mit einem Transitanbieter umgangen werden. Ein VPN kann deshalb ein guter Weg sein, um das Problem im Alltag zu lösen. Jedoch verhindert ein VPN eine sinnvolle Messung des Problems und hilft uns damit nicht, Missstände aufzudecken und zu beheben. Es kann informativ sein hin und wieder eine Messung bei aktiviertem VPN zu machen, jedoch eher zur Falsifizierung von Problemen und nicht um über ein VPN sinnvolle Daten zu erzeugen.",
		},
		{
			title: "Wieso arbeitet ihr mit Cloudflare zusammen?",
			body: () => (<>
				Die Netzbremse Kampagne wird von der Zivilgesellschaft getragen und wir hätten ohne die Unterstützung von Cloudflare nicht die technischen Möglichkeiten ein so komplexes Messwerkzeug zur Verfügung zu stellen. Wie ganz viele andere Netz- und Webseitenbetreiber hat Cloudflare bereits zum <a href="https://blog.cloudflare.com/de-de/eu-network-usage-fees/" target="_blank">Problem der Netzbremse Stellung bezogen</a>. Wir zahlen Cloudflare nichts dafür, dass wir ihre Infrastruktur für diesen Netzwerktest nutzen können.
			</>),
		},
		{
			title: "Was passiert mit den Messergebnissen?",
			body: "Wir müssen zuerst ausreichend Daten sammeln, um eine sinnvolle statistische Auswertung zu ermöglichen. Nur mit ausreichend vielen Daten können wir belastbare Aussagen treffen. Im Zuge dieser Auswertung werden wir auch die Daten an die Bundesnetzagentur übergeben, damit diese unsere Ergebnisse unabhängig überprüfen kann.",
		},
	]
}
