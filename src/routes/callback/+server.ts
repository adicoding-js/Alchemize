import { env } from '$env/dynamic/private';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');

	if (!code) {
		throw error(400, 'Missing authorization code');
	}

	const clientId = env.HACKCLUB_AUTH;
	const clientSecret = env.HACKCLUB_SECRET;
	const redirectUri = env.HACKCLUB_REDIRECT;

	if (!clientId || !clientSecret || !redirectUri) {
		throw error(500, 'Missing OAuth environment variables');
	}

	const tokenResponse = await fetch('https://auth.hackclub.com/oauth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			client_id: clientId,
			client_secret: clientSecret,
			redirect_uri: redirectUri,
			code,
			grant_type: 'authorization_code'
		})
	});

	const tokenBody = await tokenResponse.json();

	if (!tokenResponse.ok) {
		throw error(tokenResponse.status, tokenBody?.message ?? 'Token exchange failed');
	}

	cookies.set('access_token', tokenBody.access_token, {
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 30
	});

	if (tokenBody.id_token) {
		cookies.set('id_token', tokenBody.id_token, {
			httpOnly: false,
			secure: true,
			sameSite: 'lax',
			path: '/',
			maxAge: 60 * 60 * 24 * 30
		});
	}

	throw redirect(303, '/dashboard');
};