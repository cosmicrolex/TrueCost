import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// Define the type for the comparison data returned by the backend
type ComparisonData = {
  Amazon: string;
  Flipkart: string;
  Myntra: string;
};

// Replace '<codespace-name>-8000.app.github.dev' with the actual public URL from Codespaces
const API_BASE_URL = 'https://supreme-zebra-g4497rj5prpjhvrx7-8000.app.github.dev';

const App = () => {
  // State for the product input and comparison results
  const [product, setProduct] = useState<string>('');
  const [comparison, setComparison] = useState<ComparisonData | null>(null);

  // Function to fetch comparison data from the backend
  const fetchComparison = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/compare?product=${product}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ComparisonData = await response.json();
      setComparison(data);
    } catch (error) {
      console.error('Error fetching comparison:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TrueCost</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product name"
        value={product}
        onChangeText={setProduct}
      />
      <Button title="Compare Prices" onPress={fetchComparison} />
      {comparison && (
        <View style={styles.results}>
          <Text>Amazon: {comparison.Amazon}</Text>
          <Text>Flipkart: {comparison.Flipkart}</Text>
          <Text>Myntra: {comparison.Myntra}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  results: {
    marginTop: 20,
  },
});

export default App;