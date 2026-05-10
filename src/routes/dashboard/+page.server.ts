import type { PageServerLoad} from './$types';

export const load: PageServerLoad = async ({cookies}) => {
    const at = cookies.get('access_token');
    const fetchRes = at;
};