interface Data {
    id: string,
    email: string,
}
export const getDataFromAccessToken = async (accessToken: string): Promise<Data> => {
    if (accessToken === undefined || accessToken === "") {
        return {id: "", email: ""};
    }
    const response = await fetch("https://auth.hackclub.com/api/v1/me",{
        method: "GET",
        headers:{
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data?.message ?? "Failed to fetch user data from access token");
    }
    return {
        id: data.identity.id,
        email: data.identity.primary_email
    }
}