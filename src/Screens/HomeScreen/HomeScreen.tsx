import React, { useContext } from 'react';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BasicButton } from '../../components/BasicButton/BasicButton';
import { BasicText } from '../../components/BasicText/BasicText';
import { HomeHeader } from '../../components/HomeHeader/HomeHeader';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { AuthContext } from '../../contexts/AuthContext';
import { useProducts } from '../../hooks/useProducts';
import { colors } from '../../theme/Colors';

export const HomeScreen = () => {
    const { logout } = useContext(AuthContext);
    const { products, productCategoryIdSelected, filterProductsByCategoryId, getProducts, getNextsProducts, isLoading } = useProducts();

    return (
        <View>
            <FlatList
                ListHeaderComponent={<HomeHeader onPressCategory={filterProductsByCategoryId} categoryIdSelected={productCategoryIdSelected} />}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl
                    refreshing={isLoading}
                    onRefresh={getProducts} />}
                onEndReachedThreshold={0.4}
                onEndReached={getNextsProducts}
                data={products}
                renderItem={({ item }) => <ProductCard styles={{ margin: 10, alignSelf: 'center' }} product={item} />}
                keyExtractor={item => item._id}
            />

            <View style={{ position: 'absolute', bottom: 10, alignSelf: 'center', backgroundColor: colors.primary, borderRadius: 100, elevation: 10 }}>
                <Icon style={{}} name='add-outline' color='white' size={40} />
            </View>
        </View>

    );
};
