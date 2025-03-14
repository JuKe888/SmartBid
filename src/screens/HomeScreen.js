import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import { useTheme } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme(); // Access theme colors (light/dark mode)

  // Example state for bids
  const [bids, setBids] = useState([
    { id: '1', itemName: 'Smartphone', bidAmount: 250 },
    { id: '2', itemName: 'Laptop', bidAmount: 600 },
    { id: '3', itemName: 'Headphones', bidAmount: 50 },
    // Add more bid items here
  ]);

  // Example state for searching
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const filteredBids = bids.filter(bid => bid.itemName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { marginTop: 38 }]}>
        <Text style={[styles.title, { color: colors.text }]}>SmartBid</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={35} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { borderColor: colors.text }]}
          placeholder="Search Items"
          placeholderTextColor={colors.text}
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>

      {/* Bidding Items List */}
      <FlatList
        data={filteredBids}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.bidItem}>
            <Text style={[styles.itemName, { color: colors.text }]}>{item.itemName}</Text>
            <Text style={[styles.bidAmount, { color: colors.text }]}>${item.bidAmount}</Text>
          </View>
        )}
      />

      {/* Add New Bid Button */}
      <TouchableOpacity style={styles.addBidButton} onPress={() => navigation.navigate('AddBid')}>
        <Text style={styles.addBidText}>Place a New Bid</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 8,
  },
  bidItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '500',
  },
  bidAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007BFF',
  },
  addBidButton: {
    padding: 16,
    backgroundColor: '#6200EE',
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  addBidText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default HomeScreen;
