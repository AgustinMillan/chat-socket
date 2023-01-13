import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
function Profile() {
    const {user,isAuthenticated,isLoading} = useAuth0();
    isLoading?(<div>Loading...</div>):(<h1>cambio</h1>);
//   return (
//     {isLoading?(<div>Loading...</div>):isAuthenticated?(<div><img src={user.picture} alt='fotoPerfil'/><h2>{user.name}</h2></div>):(<h1>Debes iniciar sesion</h1>)}
//   )
}

export default Profile