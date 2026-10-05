export function initCourseForm() {
	const form = document.querySelector<HTMLFormElement>('#course-form');
	const email = document.querySelector<HTMLInputElement>('#course-email');
	if (!form || !email) return;
	const params = new URLSearchParams(window.location.search);
	const rawToken = params.get('invite')?.trim();
	const token =
		rawToken && rawToken.length <= 1024 && /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(rawToken)
			? rawToken
			: undefined;
	let edited = false;
	email.addEventListener('input', () => {
		edited = true;
	});

	if (token) {
		const feedback = document.querySelector('#course-feedback');
		if (feedback)
			feedback.textContent =
				'Reply to Charlie’s invitation with what helped, what was confusing, or anything that went wrong. For account or payment help, email support@spaciousclarity.com.';
		void fetch(`${form.dataset.apiUrl}/invitations/resolve`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ token }),
			credentials: 'omit',
			referrerPolicy: 'no-referrer',
			signal: AbortSignal.timeout(8000),
		})
			.then(async (response) => (response.ok ? response.json() : null))
			.then((data: unknown) => {
				if (
					!edited &&
					!email.value &&
					data &&
					typeof data === 'object' &&
					'email' in data &&
					typeof data.email === 'string'
				) {
					email.value = data.email;
					if (!email.validity.valid) email.value = '';
				}
			})
			.catch(() => {
				/* Manual email entry remains available. */
			});
	}

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		if (!form.reportValidity()) return;
		const destination = new URL(form.action);
		// Keep campaign parameters across the handoff, but never forward legacy auto-checkout flags.
		destination.search = params.toString();
		destination.searchParams.delete('checkout');
		destination.searchParams.delete('changeEmail');
		destination.searchParams.delete('email');
		destination.searchParams.set('productId', 'opening-awareness');
		if (token) destination.searchParams.set('invite', token);
		else destination.searchParams.delete('invite');
		// Fragments are not sent to the server or in the Referer header.
		destination.hash = new URLSearchParams({ email: email.value.trim().toLowerCase() }).toString();
		window.location.assign(destination.href);
	});
}
