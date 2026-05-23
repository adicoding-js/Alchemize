
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
    //Check if any user cookies is not present/ invalid, if so make the user relogin
    const accessToken = cookies.get('access_token_new');

    const airtableUserRecordId = cookies.get('airtable_user_record_id');
    
  

    if (!accessToken || !airtableUserRecordId || accessToken === "" || airtableUserRecordId === "") {
        return{
            relogin:true,
        }
    }



    return {
        relogin: false,
    }
}