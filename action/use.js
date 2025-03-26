require('dotenv').config()
const { TOKEN, API_BASE_URL, CHARACTER } = process.env

// run this with `node action/use.js code=apple count=2 character=Flyanne`

// code = snake case item code, see docs for full list
  
const use = async () => {

  const args = process.argv

  const codeArg = args.find(arg => arg.startsWith("code="))?.split('=')[1]
  const count = args.find(arg => arg.startsWith("count="))?.split('=')[1] || '1'

  if (!codeArg && !count) {
    console.log('😱 Oh no! No item code or count provided')
    return 
  }

  const parsedCharacter = args.find(arg => arg.startsWith("character="))?.split('=')[1] || CHARACTER
  const body = `{ "code": "${codeArg}", "quantity": "${count}" }`


  console.log(`✨ Using ${count} item(s) with code ${codeArg}✨`)
      
  const url = `${API_BASE_URL}/my/${parsedCharacter}/action/use`

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
      throw new Error('😱 Oh no! Failed to use item')
    }
    const { data } = await response.json();
    console.log('✅ Use successful!')
  } catch (error) {
    console.log({ error })
  }
}
  
use()