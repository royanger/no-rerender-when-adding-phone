import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/clerk-react';

function App() {
  const { user } = useUser()
  const phoneNumber = user?.phoneNumbers[0]

  async function onClickAdd() {
    await user?.createPhoneNumber({ phoneNumber: "+15555550100" })
    await user?.reload()
  }
  const onClickRemove = () => phoneNumber?.destroy()


  return (
    <>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <main>
        <div>Your phone number is: {phoneNumber?.phoneNumber ?? "none"}</div>
        {phoneNumber && <button onClick={onClickRemove}>Destroy</button>}
        {!phoneNumber && <button onClick={onClickAdd}>Add phone number</button>}
      </main>
    </>
  );
}

export default App;
