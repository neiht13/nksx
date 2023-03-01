const baseUrl = 'http://test.nhanchauthanhdt.vn/api/'


export async function fetchApi(query) {
  const call = await fetch(baseUrl + query)
  const res = await call.json()

  return res;
}

export async function postApi(query, values) {
  const call = await fetch(baseUrl + query, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values)
  })
  const res = await call.json()

  return res;
}
