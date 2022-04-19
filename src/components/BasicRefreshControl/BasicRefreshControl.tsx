import React from 'react';
import { RefreshControl } from 'react-native';

interface Props {
    isLoading: boolean;
    onRefresh: () => void;
}
export const BasicRefreshControl = ({ isLoading, onRefresh }: Props) => {
    return (
        <RefreshControl
            colors={["#9Bd35A", "#689F38"]}
            refreshing={isLoading}
            onRefresh={onRefresh} />
    );
};
