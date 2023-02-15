import React, { useState } from 'react';
import { Text, View, StyleSheet, StatusBar, FlatList } from 'react-native';
import GmailListItem from './components/GmailListItem';
import gmailList from './gmailList';

export default function App() {
  const [selectedItems, setSelectedItems] = useState([]);

  const _renderItem = ({ item, index }) => {
    return (
      <GmailListItem
        item={item}
        index={index}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gmail</Text>
      <FlatList
        data={gmailList}
        renderItem={_renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(item) => item?.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  contentContainerStyle: {
    paddingTop: 10
  }
});
