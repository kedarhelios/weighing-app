import * as React from "react";
import { StyleSheet } from "react-nativescript";

interface BluetoothStatusProps {
    isConnected: boolean;
    onConnectPress: () => void;
}

export function BluetoothStatus({ isConnected, onConnectPress }: BluetoothStatusProps) {
    return (
        <flexboxLayout style={styles.container}>
            <label className={`text-lg mb-4 ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                {isConnected ? 'Connected' : 'Disconnected'}
            </label>
            {!isConnected && (
                <button
                    className="bg-blue-500 text-white p-4 rounded"
                    onTap={onConnectPress}
                >
                    Connect to Scale
                </button>
            )}
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
    }
});