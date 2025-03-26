require('dotenv').config()
const { TOKEN, API_BASE_URL, CHARACTER } = process.env

// run this with `node action/basic.js a=rest character=Flyanne`

// a = rest | gathering | fight

// there's some npm scripts I added to package.json for this also to make actions easier for default characters too!

const basicAction = async () => {

  args = process.argv

  let action = args.find(arg => arg.startsWith("action=")).split('=')[1] || "rest"
  const parsedCharacter = args.find(arg => arg.startsWith("character="))?.split('=')[1] || CHARACTER 

  console.log(`✨Performing action: ${action}✨`)

  const url = `${API_BASE_URL}/my/${parsedCharacter}/action/${action}`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + TOKEN
    },
    // no body needed for basic actions
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.log({ response })
      throw new Error('😱 Oh no! Failed to perform action')
    }
    const { data } = await response.json();
    console.log('✅ Action successful!')
  } catch (error) {
    console.log({ error })
  }
}

basicAction()