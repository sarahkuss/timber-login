import { useState } from "react"
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const firebaseConfig = {
  apiKey: "AIzaSyBHJ0UKq8V2ZyqnpyzcnvOHhZETS15cI64",
  authDomain: "timber-login-sk.firebaseapp.com",
  projectId: "timber-login-sk",
  storageBucket: "timber-login-sk.appspot.com",
  messagingSenderId: "266433347861",
  appId: "1:266433347861:web:b5ae7c54f3dc598318e91c"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export default function SignupForm () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState()

  const handleSignup = async (e) => {
    e.preventDefault()
    const results = await createUserWithEmailAndPassword(auth, email, password)
      .catch(alert)
    setUser(results.user)
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const results = await signInWithPopup(auth, provider)
      .catch(alert)
    setUser(results.user)
  }

  if(user) {
    return <h2>Welcome User {user.email}</h2>
  }

  return (
    <>
      <Form onSubmit={handleSignup}>
        <Form.Group className="mb-2">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)} />
          <Form.Text className="text">We'll never share your email with anyone else.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        
        <Form.Group>
          <Button
            variant="success"
            size="lg"
            type="submit">Sign Up</Button>
        </Form.Group>
      </Form>
      <Button className="googleButton" onClick={signInWithGoogle} variant="dark" size="lg"> Sign in with Google</Button>
    </>
  )
}