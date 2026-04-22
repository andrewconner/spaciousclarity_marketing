/**
 * Shared waitlist form handler.
 *
 * Initializes every form on the page that carries `data-waitlist` +
 * `data-waitlist-recipient`. On submit it opens a `mailto:` draft with the
 * entered email prefilled, so the visitor's mail client does the sending.
 *
 * Call `initWaitlistForms()` once on page load.
 */
export const initWaitlistForms = () => {
	const forms = document.querySelectorAll<HTMLFormElement>('form[data-waitlist]');

	forms.forEach((form) => {
		if (form.dataset.waitlistReady === 'true') return;
		form.dataset.waitlistReady = 'true';

		const input = form.querySelector<HTMLInputElement>('input[name="email"]');
		const recipient = form.dataset.waitlistRecipient;

		if (!input || !recipient) return;

		form.addEventListener('submit', (event) => {
			event.preventDefault();

			if (!input.reportValidity()) return;

			const subject = 'Spacious Clarity Waitlist';
			const body = `Please add me to the waitlist.%0A%0AEmail: ${encodeURIComponent(input.value)}`;
			window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${body}`;
		});
	});
};
