require('dotenv').config()
const { TOKEN, API_BASE_URL, CHARACTER } = process.env

// run this with `node action/deposit.js code=helmet count=5 character=Flyanne`

const deposit = async () => {

  args = process.argv

  const code = args.find(arg => arg.startsWith("code="))?.split('=')[1]
  const count = args.find(arg => arg.startsWith("count="))?.split('=')[1] || 1
  const parsedCharacter = args.find(arg => arg.startsWith("character="))?.split('=')[1] || CHARACTER 

  const body = `{ "code": "${code}", "quantity": ${count} }`

  console.log(`✨ Depositing ${code}, count: ${count} ✨`)

  const url = `${API_BASE_URL}/my/${parsedCharacter}/action/bank/deposit`
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
      throw new Error(`😱 Oh no! Failed to deposit ${code}`)
    }
    const { data } = await response.json();
    console.log('✅ Deposit successful!')
  } catch (error) {
    console.log({ error })
  }
}

deposit()