import React from 'react';
import { View, FlatList } from 'react-native';
import { useCategories } from '../../hooks/useCategories';
import { BasicSearchInput } from '../BasicSearchInput/BasicSearchInput';
import { CategoryButton } from '../CategoryButton/CategoryButton';

interface Props {
    onPressCategory: (categoryId: string) => void;
    categoryIdSelected: string;
}

export const HomeHeader = ({ onPressCategory, categoryIdSelected }: Props) => {
    const { categories } = useCategories();

    return (
        <View>
            <BasicSearchInput styles={{ marginTop: 10, marginBottom: 10, marginHorizontal: 10 }}></BasicSearchInput>

            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={categories}
                renderItem={({ item, index }) =>
                    <CategoryButton
                        styles={{
                            marginLeft: 10,
                            marginRight: index == categories.length - 1 ? 10 : 0
                        }}
                        onPress={() => onPressCategory(item._id)}
                        category={item.nombre}
                        isSelected={item._id == categoryIdSelected} />
                }
            />
        </View>
    );
};
