export async function getAll(url){
    const response = await fetch (url)
    return await response.json()
}

export async function postBody(url, body){}

export async function getById (url, id){}

export async function updatebyId(url, body){}

export async function deletebyId(url, id){}