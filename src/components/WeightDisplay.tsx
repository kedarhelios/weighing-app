import * as React from "react";
import { StyleSheet } from "react-nativescript";

interface WeightDisplayProps {
    weight: number | null;
}

export function WeightDisplay({ weight }: WeightDisplayProps) {
    return (
        <flexboxLayout style={styles.container}>
            <label className="text-3xl font-bold">
                {weight !== null ? `${weight} kg` : 'No data'}
            </label>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    }
});