;(() => {
  const target = new Target({
    username: 'cheng',
    password: '123',
    age: 18,
    gender: 'male'
  })

  const init = () => {
    console.log(target.username)
  }

  init()
})()