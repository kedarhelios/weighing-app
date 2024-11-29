import { Bluetooth, Observable } from '@nativescript/core';

class BluetoothService {
    private static instance: BluetoothService;
    private bluetooth: typeof Bluetooth;

    private constructor() {
        this.bluetooth = Bluetooth;
    }

    public static getInstance(): BluetoothService {
        if (!BluetoothService.instance) {
            BluetoothService.instance = new BluetoothService();
        }
        return BluetoothService.instance;
    }

    public async hasPermissions(): Promise<boolean> {
        return this.bluetooth.hasCoarseLocationPermission();
    }

    public async requestPermissions(): Promise<void> {
        return this.bluetooth.requestCoarseLocationPermission();
    }

    public async isBluetoothEnabled(): Promise<boolean> {
        return this.bluetooth.isBluetoothEnabled();
    }

    public startScanning(onDeviceFound: (device: any) => void): void {
        this.bluetooth.startScanning({
            filters: [],
            seconds: 4,
            onDiscovered: (peripheral: any) => {
                onDeviceFound(peripheral);
            }
        }).catch(err => console.error('Error starting scan:', err));
    }

    public connect(deviceUUID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.bluetooth.connect({
                UUID: deviceUUID,
                onConnected: (peripheral: any) => {
                    resolve(peripheral);
                },
                onDisconnected: (peripheral: any) => {
                    console.log("Disconnected from device:", peripheral.UUID);
                }
            }).catch(reject);
        });
    }

    public disconnect(deviceUUID: string): Promise<void> {
        return this.bluetooth.disconnect({
            UUID: deviceUUID
        });
    }

    public stopScanning(): void {
        this.bluetooth.stopScanning();
    }
}

export const bluetoothService = BluetoothService.getInstance();