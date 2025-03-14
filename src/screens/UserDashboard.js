import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import { useTheme } from '@react-navigation/native';

const UserDashboardScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme(); // Access theme colors (light/dark mode)

  // Example state for user activities
  const [ongoingBids, setOngoingBids] = useState([
    { id: '1', itemName: 'Smartphone', bidAmount: 250, status: 'Ongoing' },
    { id: '2', itemName: 'Laptop', bidAmount: 600, status: 'Ongoing' },
    // Add more ongoing bids here
  ]);

  const [pastBids, setPastBids] = useState([
    { id: '3', itemName: 'Headphones', bidAmount: 50, status: 'Won' },
    { id: '4', itemName: 'Camera', bidAmount: 350, status: 'Lost' },
    // Add more past bids here
  ]);

  // Function to handle bid details navigation
  const handleBidDetails = (item) => {
    navigation.navigate('AuctionDetails', {
      itemName: item.itemName,
      currentBid: item.bidAmount,
      itemDescription: 'Some description of the item', // You can fetch this from the backend or state
    });
  };

  // Function to handle bid cancellation (example logic)
  const handleCancelBid = (itemId) => {
    Alert.alert('Cancel Bid', 'Are you sure you want to cancel this bid?', [
      {
        text: 'Yes',
        onPress: () => {
          setOngoingBids(prevBids => prevBids.filter(bid => bid.id !== itemId));
        },
      },
      { text: 'No' },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>User Dashboard</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Ongoing Bids Section */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Ongoing Bids</Text>
      <FlatList
        data={ongoingBids}
        renderItem={({ item }) => (
          <View style={styles.bidItem}>
            <Text style={[styles.itemName, { color: colors.text }]}>{item.itemName}</Text>
            <Text style={[styles.bidAmount, { color: colors.text }]}>${item.bidAmount}</Text>
            <Text style={[styles.status, { color: colors.text }]}>{item.status}</Text>
            <TouchableOpacity
              style={styles.bidDetailsButton}
              onPress={() => handleBidDetails(item)}
            >
              <Text style={styles.bidDetailsText}>View Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBidButton}
              onPress={() => handleCancelBid(item.id)}
            >
              <Text style={styles.cancelBidText}>Cancel Bid</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.bidList}
      />

      {/* Past Bids Section */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Past Bids</Text>
      <FlatList
        data={pastBids}
        renderItem={({ item }) => (
          <View style={styles.bidItem}>
            <Text style={[styles.itemName, { color: colors.text }]}>{item.itemName}</Text>
            <Text style={[styles.bidAmount, { color: colors.text }]}>${item.bidAmount}</Text>
            <Text style={[styles.status, { color: colors.text }]}>{item.status}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.bidList}
      />
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 24,
  },
  bidList: {
    marginBottom: 24,
  },
  bidItem: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '500',
  },
  bidAmount: {
    fontSize: 16,
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    marginBottom: 8,
  },
  bidDetailsButton: {
    backgroundColor: '#6200EE',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  bidDetailsText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelBidButton: {
    backgroundColor: '#FF6347',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelBidText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UserDashboardScreen;
