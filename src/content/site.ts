const kitWaitlistOptions = {
	settings: {
		after_subscribe: {
			action: 'redirect',
			success_message: 'Success! Now check your email to confirm your subscription.',
			redirect_url: 'https://spaciousclarity.com/waitlist',
		},
		analytics: {
			google: null,
			fathom: null,
			facebook: null,
			segment: null,
			pinterest: null,
			sparkloop: null,
			googletagmanager: null,
		},
		powered_by: {
			show: false,
			url: 'https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic',
		},
		recaptcha: {
			enabled: false,
		},
		return_visitor: {
			action: 'show',
			custom_content: '',
		},
	},
	version: '5',
};

export const site = {
	name: 'Spacious Clarity',
	domain: 'spaciousclarity.com',
	url: 'https://spaciousclarity.com',
	email: 'hello@spaciousclarity.com',
	waitlist: {
		action: 'https://app.kit.com/forms/9384984/subscriptions',
		formId: '9384984',
		options: JSON.stringify(kitWaitlistOptions),
		source: 'spaciousclarity.com',
		uid: '7f3407b82e',
	},
	title: 'Spacious Clarity — Meditation that welcomes all of life',
	description:
		'A life-affirming meditation practice for people who want steadiness, vivid presence, and real involvement in ordinary life.',
};

export const primaryContactHref = `mailto:${site.email}?subject=Spacious%20Clarity`;
