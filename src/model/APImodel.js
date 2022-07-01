export async function getAll(url){
    const response = await fetch (url)
    return await response.json()
}

export async function postBody(url, body){
    const response = await fetch(url, {
        method: 'POST', 
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      return await response;
}

export async function getById (url, id){}

export async function updatebyId(url, body){}

export async function deletebyId(url, id){}