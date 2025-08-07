import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

// Type for the comparison data
type ComparisonData = {
  Amazon: string;
  Flipkart: string;
  Myntra: string;
};

// Get the Codespaces port-forwarded URL (replace with your actual Codespace URL)
const API_BASE_URL = 'https://supreme-zebra-g4497rj5prpjhvrx7-8000.app.github.dev';

const App = () => {
  const [product, setProduct] = useState<string>('');
  const [comparison, setComparison] = useState<ComparisonData | null>(null);

  const fetchComparison = async () => {
    if (!product.trim()) {
      Alert.alert('Error', 'Please enter a product name');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/compare?product=${encodeURIComponent(product)}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data: ComparisonData = await response.json();
      setComparison(data);
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Could not fetch comparison data. Check the backend.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TrueCost</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product name (e.g., shoes)"
        value={product}
        onChangeText={setProduct}
        autoCapitalize="none"
      />
      <Button title="Compare Prices" onPress={fetchComparison} />
      {comparison && (
        <View style={styles.results}>
          <Text style={styles.resultText}>Amazon: {comparison.Amazon}</Text>
          <Text style={styles.resultText}>Flipkart: {comparison.Flipkart}</Text>
          <Text style={styles.resultText}>Myntra: {comparison.Myntra}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  results: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resultText: {
    marginVertical: 5,
    color: '#444',
  },
});

export default App;