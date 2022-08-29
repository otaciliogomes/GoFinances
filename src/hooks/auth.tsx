import React, { createContext, useContext, useEffect, useState } from 'react'
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
    children: React.ReactNode
}

interface User {
    id: string
    name: string
    email: string
    photo?: string
}

interface AuthContextData {
    user: User
    signInWithGoogle(): Promise<void>
    signInWithApple(): Promise<void>
    signOut(): Promise<void>
    userStorageLoading: boolean
}

interface AuthorizationResponse {
    params: {
        access_token: string
    },
    type: string
}

export const AuthContext = createContext({} as AuthContextData)


function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User) 
    const [userStorageLoading, setUserStorageLoading] = useState(true)
    const keyUser = '@gofinances:user'

    async function signInWithGoogle() {
        try {
            const CLIENT_ID = '567520006797-jvpn2sbji96ok1mkqr2bapf4ig97kt96.apps.googleusercontent.com'
            const REDIRECT_URI = 'https://auth.expo.io/@otaciliogomes/gofinances'
            const RESPONSE_TYPE = 'token'
            const SCOPE = encodeURI('profile email')

            const authUrl =
                `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

            const { params, type } = await AuthSession
                .startAsync({ authUrl }) as AuthorizationResponse

            if(type === 'success') {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
                const userinfo = await response.json()
                
                const userLogged = {
                    id: userinfo?.id,
                    email: userinfo?.email,
                    name: userinfo?.given_name,
                    photo: userinfo?.picture,
                }

                setUser(userLogged)
                await AsyncStorage.setItem(keyUser, JSON.stringify(userLogged));
            }
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function signInWithApple() {
        try {
            const credentials = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
            })

            if(credentials) {
                const name =  credentials?.fullName?.givenName!
                const photo = `https://ui-avatars.com/api/?name=${name}`
                
                const userLogged = {
                    id: String(credentials.user),
                    email: credentials?.email!,
                    name,
                    photo,
                }
                setUser(userLogged)
                await AsyncStorage.setItem(keyUser, JSON.stringify(userLogged));
            }
            
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function signOut() {
        await AsyncStorage.removeItem(keyUser)
        setUser({} as User)
    }

    useEffect(() => {
        async function loadUseStorageData () {
            const userStorage  = await AsyncStorage.getItem(keyUser)

            if(userStorage) {
                const userLogged = JSON.parse(userStorage)
                setUser(userLogged)
            }
            setUserStorageLoading(false)
        }
        loadUseStorageData()
    }, [])

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                signInWithGoogle, 
                signInWithApple, 
                signOut,
                userStorageLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export { useAuth, AuthProvider }