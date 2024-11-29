import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { bluetoothService } from "../services/bluetooth.service";
import { WeightDisplay } from "../components/WeightDisplay";
import { BluetoothStatus } from "../components/BluetoothStatus";

export function WeightScreen() {
    const [isConnected, setIsConnected] = React.useState(false);
    const [weight, setWeight] = React.useState<number | null>(null);

    const handleConnect = async () => {
        try {
            if (!await bluetoothService.hasPermissions()) {
                await bluetoothService.requestPermissions();
            }

            if (!await bluetoothService.isBluetoothEnabled()) {
                console.log("Please enable Bluetooth");
                return;
            }

            bluetoothService.startScanning((device) => {
                // Add your device filtering logic here
                // For example, check device.name or device.UUID
                // Then connect to the correct device
                bluetoothService.connect(device.UUID)
                    .then(() => {
                        setIsConnected(true);
                        // Start listening for weight updates
                        // Implementation depends on your specific device protocol
                    })
                    .catch(error => {
                        console.error("Connection error:", error);
                    });
            });
        } catch (error) {
            console.error("Bluetooth error:", error);
        }
    };

    return (
        <flexboxLayout style={styles.container}>
            <BluetoothStatus
                isConnected={isConnected}
                onConnectPress={handleConnect}
            />
            <WeightDisplay weight={weight} />
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
});