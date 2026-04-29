const attributionKeys = [
	'utm_source',
	'utm_medium',
	'utm_campaign',
	'utm_term',
	'utm_content',
] as const;

const storageKey = (key: string) => `spaciousclarity:${key}`;

const getStoredValue = (key: string) => {
	try {
		return window.sessionStorage.getItem(storageKey(key)) ?? '';
	} catch {
		return '';
	}
};

const setStoredValue = (key: string, value: string) => {
	if (!value) return;

	try {
		window.sessionStorage.setItem(storageKey(key), value);
	} catch {
		// Storage can be unavailable in strict privacy modes; the form still submits.
	}
};

export const initKitAttributionFields = () => {
	const params = new URLSearchParams(window.location.search);

	attributionKeys.forEach((key) => {
		const value = params.get(key);
		if (value) setStoredValue(key, value);
	});

	if (document.referrer) setStoredValue('referrer', document.referrer);

	document
		.querySelectorAll<HTMLInputElement>('input[data-kit-attribution]')
		.forEach((input) => {
			const key = input.dataset.kitAttribution;
			if (!key) return;

			input.value = getStoredValue(key);
		});
};
