import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import { useTheme } from '@react-navigation/native';

const AuctionDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme(); // Access theme colors (light/dark mode)

  // Auction data passed through navigation
  const { itemName, currentBid, itemDescription } = route.params;

  // State for placing bid
  const [bidAmount, setBidAmount] = useState('');

  const handleBidChange = (text) => {
    setBidAmount(text);
  };

  const handlePlaceBid = () => {
    if (!bidAmount || isNaN(bidAmount) || parseFloat(bidAmount) <= currentBid) {
      Alert.alert('Invalid Bid', 'Please place a bid higher than the current bid.');
    } else {
      Alert.alert('Bid Placed', `Your bid of $${bidAmount} has been placed successfully!`);
      // Here, you'd typically send the bid to a backend API or Firebase
      setBidAmount('');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Auction Details</Text>
        <Ionicons name="notifications-outline" size={24} color={colors.text} />
      </View>

      {/* Item Details */}
      <View style={styles.detailsContainer}>
        <Text style={[styles.itemName, { color: colors.text }]}>{itemName}</Text>
        <Text style={[styles.itemDescription, { color: colors.text }]}>{itemDescription}</Text>
        <Text style={[styles.currentBid, { color: colors.text }]}>Current Bid: ${currentBid}</Text>
      </View>

      {/* Place a bid */}
      <View style={styles.placeBidContainer}>
        <TextInput
          style={[styles.bidInput, { borderColor: colors.text }]}
          placeholder="Enter your bid"
          placeholderTextColor={colors.text}
          keyboardType="numeric"
          value={bidAmount}
          onChangeText={handleBidChange}
        />
        <TouchableOpacity style={styles.placeBidButton} onPress={handlePlaceBid}>
          <Text style={styles.placeBidText}>Place Bid</Text>
        </TouchableOpacity>
      </View>
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
  detailsContainer: {
    marginBottom: 24,
  },
  itemName: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  currentBid: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 16,
  },
  placeBidContainer: {
    marginTop: 16,
  },
  bidInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 16,
  },
  placeBidButton: {
    padding: 16,
    backgroundColor: '#6200EE',
    borderRadius: 8,
    alignItems: 'center',
  },
  placeBidText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default AuctionDetailsScreen;
