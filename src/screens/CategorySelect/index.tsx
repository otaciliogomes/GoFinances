import React from 'react'

import * as S from './styles'
import { categories } from '../../mock'
import { Button } from '../../components'

export interface CategoryProps {
    key: string
    name: string
    icon?: string
    color?: string
}

interface CategoryCardProps {
    item: CategoryProps
}

interface Props {
    category: CategoryProps
    setCategory: (category: CategoryProps) => void
    closeCategory: () => void
}
 

export const CategorySelect = ({
    category,
    setCategory,
    closeCategory
}: Props) => {

    function CategoryCard ({ item }: CategoryCardProps) {
        return (
            <S.Category 
                onPress={() => setCategory(item)}
                isActive={item.key === category.key}
            >
                <S.Icon name={item.icon}/>
                <S.Label>{item.name}</S.Label>
            </S.Category>
        )
    }

    return (
        <S.Container>
            <S.Header>
                <S.Title>Categoria</S.Title>
            </S.Header>
            <S.CategoryList
                data={categories}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => <CategoryCard  item={item}/>}
                ItemSeparatorComponent={() => <S.Separator />}
            />
            <S.Footer>
                <Button 
                    title="Selecionar"
                    onPress={closeCategory}
                />
            </S.Footer>
        </S.Container>
    )
}