import { Component, createEffect, onCleanup } from 'solid-js';
import { useTranslation } from '../i18n/context';
import { getPrivacyPolicyVersion } from '../util/privacy-policy';

type PrivacyPolicyModalProps = {
	open: boolean;
	onAccept: () => void;
	onClose?: () => void;
};

export const PrivacyPolicyModal: Component<PrivacyPolicyModalProps> = (props) => {
	const { t } = useTranslation();
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

	const handleAccept = () => {
		props.onAccept();
	};

	return (
		<dialog
			ref={dialogRef!}
			class="modal"
			aria-labelledby="privacy-policy-title"
			aria-describedby="privacy-policy-content"
			onClose={props.onClose}
		>
			<div class="modal-box max-w-2xl">
				<h3 id="privacy-policy-title" class="font-bold text-lg mb-4 text-primary">
					{t.privacyPolicy.title()}
				</h3>
				<div id="privacy-policy-content" class="prose max-w-none mb-6 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
					{t.privacyPolicy.content()}
					<details class="collapse collapse-arrow bg-base-100 border-base-300 border [&>.collapse-content>p:first-child]:mt-0 [&>.collapse-content>p:last-child]:mb-0">
						<summary class="collapse-title font-semibold text-sm">
							{t.privacyPolicy.summary()}
						</summary>
						<div class="collapse-content">
							{t.privacyPolicy.details()}
						</div>
					</details>
				</div>
				<div class="modal-action flex-col items-stretch">
					<button
						class="btn btn-primary"
						onClick={handleAccept}
						autofocus
					>
						{t.privacyPolicy.acceptButton()}
					</button>
					<p class="text-sm text-gray-600 mt-3 text-center">
						{t.privacyPolicy.dataUsageNote()}
					</p>
				</div>
			</div>
		</dialog>
	);
};
