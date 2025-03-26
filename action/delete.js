require('dotenv').config()
const { TOKEN, API_BASE_URL, CHARACTER } = process.env

// run this with `node action/delete.js code=copper count=10 character=Flyanne`
  
const deleteItem = async () => {

  const args = process.argv

  const code = args.find(arg => arg.startsWith("code="))?.split('=')[1]
  const count = args.find(arg => arg.startsWith("count="))?.split('=')[1] || '1'

  if (!code && !count) {
    console.log('😱 Oh no! No code and/or quantity provided')
    return 
  }
  
  const body = JSON.stringify({
    code,
    quantity: parseInt(count)
  })
  
  const parsedCharacter = args.find(arg => arg.startsWith("character="))?.split('=')[1] || CHARACTER 

  console.log(`✨ Deleting ${count} item(s): ${code} ✨`)
      
  const url = `${API_BASE_URL}/my/${parsedCharacter}/action/delete`

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + TOKEN
    },
    body
  }
  
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.log({ response })
      throw new Error('😱 Oh no! Failed to delete item')
    }
    const { data } = await response.json();
    console.log('✅ Delete successful!')
  } catch (error) {
    console.log({ error })
  }
}
  
deleteItem()