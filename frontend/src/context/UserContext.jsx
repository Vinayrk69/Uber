import React from 'react';
export const UserDataContext=createContext()
const USerContext=({children}) => {

    const [user, setUser] = useState({
        email: "",
        fullname:{
            firstName: "",
            lastName: ""
        }
    })
    return(
        <div>
            <UserDataContext.Provider >
                {children}
             </UserDataContext.Provider>
        </div>
    )
}

export default USerContext;