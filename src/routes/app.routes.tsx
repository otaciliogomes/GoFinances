import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Dashboard, Register } from '../screens'

const { Navigator, Screen } = createBottomTabNavigator()


export const AppRoutes = () => {
    return (
        <Navigator>
            <Screen
                name="Listagem"
                component={Dashboard}
            />
            <Screen
                name="Cadastrar"
                component={Register}
            />
            <Screen
                name="Registar"
                component={Register}
            />
        </Navigator>
    )
}