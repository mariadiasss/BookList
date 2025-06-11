import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function BookListItem({ item, markItem, unmarkItem, removeItem }) {
  return (
    <View style={styles.itemList}>
      <Text style={item?.read ? styles.itemRead : styles.itemUnread}>
        {item?.name}
      </Text>
      {!item?.read ? (
        <TouchableOpacity style={styles.actionIcon} onPress={() => markItem(item.id)}>
          <Ionicons name='library-outline' size={24} color='#fff' />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.actionIcon} onPress={() => unmarkItem(item.id)}>
          <Ionicons name='book-outline' size={24} color='#fff' />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[styles.actionIcon, { backgroundColor: "darkred"}]}
        onPress={() => removeItem(item.id)}
      >
        <Ionicons name='trash-bin-outline' size={24} color='#fff' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  itemList: {
    backgroundColor: '#000000c0',
    padding: 15,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'white',
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemUnread: {
    flex: 1,
    color: '#fff',
    fontSize: 24,
    textDecorationLine: 'none'
  },
  itemRead: {
    flex: 1,
    color: '#fff',
    fontSize: 24,
    textDecorationLine: 'line-through'
  },
  actionIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: 'darkgreen'
  }
})

