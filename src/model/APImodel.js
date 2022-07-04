export async function getAll(url){
    const response = await fetch (url)
    return await response.json()
}

export async function getAllSearch(url, searchterm){
  const path =  url+ "?searchterm="+ searchterm
  const response = await fetch (path)
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

export async function getById (url, id){
  const urlByid = url + "?id=" + id
  const response = await fetch (urlByid)
  return await response.json()

}

export async function updatebyId(url, body){
  let path =  url 
  const response = await fetch(path, {
    method: 'PUT', 
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(body)
  });
  return await response;

}

export async function deletebyId(url, id){
  let path =  url + "?id=" + id
  const response = await fetch(path, {
    method: 'DELETE', 
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await response;
}