import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AuctionCard = ({ auction, onBidPress }) => {
  const navigation = useNavigation();

  const handleViewDetails = () => {
    navigation.navigate('AuctionDetails', {
      auctionId: auction.id,
      itemName: auction.itemName,
      currentBid: auction.currentBid,
    });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.itemName}>{auction.itemName}</Text>
      <Text style={styles.currentBid}>Current Bid: ${auction.currentBid}</Text>
      <Text style={styles.auctionStatus}>
        {auction.isOngoing ? 'Auction Ongoing' : 'Auction Closed'}
      </Text>
      
      {/* View details and bid button */}
      <TouchableOpacity style={styles.viewDetailsButton} onPress={handleViewDetails}>
        <Text style={styles.viewDetailsText}>View Details</Text>
      </TouchableOpacity>

      {auction.isOngoing && (
        <TouchableOpacity style={styles.bidButton} onPress={onBidPress}>
          <Text style={styles.bidButtonText}>Place Bid</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
  },
  currentBid: {
    fontSize: 16,
    marginVertical: 8,
  },
  auctionStatus: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
  },
  viewDetailsButton: {
    backgroundColor: '#6200EE',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  viewDetailsText: {
    color: '#fff',
    fontSize: 16,
  },
  bidButton: {
    backgroundColor: '#FF6347',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  bidButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AuctionCard;
