require('dotenv').config()
const { TOKEN, API_BASE_URL, CHARACTER } = process.env

// run this with `node action/withdraw.js code=helmet count=5 character=Flyanne`

const withdraw = async () => {

  args = process.argv

  const code = args.find(arg => arg.startsWith("code="))?.split('=')[1]
  const count = args.find(arg => arg.startsWith("count="))?.split('=')[1] || 1
  const parsedCharacter = args.find(arg => arg.startsWith("character="))?.split('=')[1] || CHARACTER 

  const body = `{ "code": "${code}", "quantity": ${count} }`

  console.log(`✨ Withdrawing ${code}, count: ${count} ✨`)

  const url = `${API_BASE_URL}/my/${parsedCharacter}/action/bank/withdraw`
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
      throw new Error(`😱 Oh no! Failed to withdraw ${code}`)
    }
    const { data } = await response.json();
    console.log('✅ Withdraw successful!')
  } catch (error) {
    console.log({ error })
  }
}

withdraw()