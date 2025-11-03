import { Component, createEffect, onCleanup } from 'solid-js';
import { t } from '../i18n/dict';

type AdblockWarningProps = {
	open: boolean;
};

export const AdblockWarning: Component<AdblockWarningProps> = (props) => {
	let dialogRef: HTMLDialogElement;

	createEffect(() => {
		if (props.open && dialogRef && !dialogRef.open) {
			dialogRef.showModal();
		} else if (!props.open && dialogRef && dialogRef.open) {
			dialogRef.close();
		}
	});

	onCleanup(() => {
		if (dialogRef && dialogRef.open) {
			dialogRef.close();
		}
	});

	return (
		<dialog
			ref={dialogRef!}
			class="modal"
			aria-labelledby="logging-warning-title"
			aria-describedby="logging-warning-message"
		>
			<div class="modal-box">
				<h3 id="logging-warning-title text-primary" class="font-bold text-lg mb-4 text-primary">
					{t.speedtest.loggingBlocked.title()}
				</h3>
				<p id="logging-warning-message" class="">
					{t.speedtest.loggingBlocked.message()}
				</p>
				<form method="dialog" class="modal-action">
					<button class="btn btn-primary" autofocus>
						{t.speedtest.loggingBlocked.dismiss()}
					</button>
				</form>
			</div>
		</dialog>
	);
};
