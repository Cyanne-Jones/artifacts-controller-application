require('dotenv').config()
const { TOKEN, API_BASE_URL, CHARACTER } = process.env

// run this with `node action/craft.js code=wooden_staff character=Flyanne`
// code = snake case item code, see docs for full list
  
const craft = async () => {

  const args = process.argv

  const codeArg = args.find(arg => arg.startsWith("code="))?.split('=')[1]

  if (!codeArg) {
    console.log('😱 Oh no! No item code provided!')
    return 
  }

  const parsedCharacter = args.find(arg => arg.startsWith("character="))?.split('=')[1] || CHARACTER
  const body = `{ "code": "${codeArg}" }`

  console.log(`✨ Crafting item with code: ${codeArg}✨`)
      
  const url = `${API_BASE_URL}/my/${parsedCharacter}/action/crafting`

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
      throw new Error('😱 Oh no! Failed to craft item')
    }
    const { data } = await response.json();
    console.log('✅ Crafting successful!')
  } catch (error) {
    console.log({ error })
  }
}
  
craft()