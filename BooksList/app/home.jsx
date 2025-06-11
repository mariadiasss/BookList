import React, { useEffect, useState } from 'react'
import { Alert, FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import BookListItem from '../components/ItemList';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BookList() {
  const [textInput, setTextInput] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooksFromDevice();
  }, []);

  useEffect(() => {
    saveBooksToDevice();
  }, [books]);

  const getBooksFromDevice = async () => {
    try {
      const booksMemory = await AsyncStorage.getItem('bookList');
      if (booksMemory != null) {
        setBooks(JSON.parse(booksMemory));
      }
    } catch (error) {
      console.log(`Erro: ${error}`)
    }
  }

  const saveBooksToDevice = async () => {
    try {
      const booksJson = JSON.stringify(books);
      await AsyncStorage.setItem('bookList', booksJson);
    } catch (error) {
      console.log(`Erro: ${error}`)
    }
  }

  const addBook = () => {
    if (textInput == '') {
      Alert.alert(
        'Ocorreu um problema :(',
        'Por favor, informe o título do livro!'
      );
    } else {
      const newBook = {
        id: Date.now().toString(),
        name: textInput,
        read: false
      }
      setBooks([...books, newBook]);
      setTextInput('');
    }
  }

  const markBookRead = bookId => {
    const newBooks = books.map((book) => {
      if (book.id == bookId) {
        return { ...book, read: true}
      }
      return book;
    });
    setBooks(newBooks);
  }

  const unmarkBookRead = bookId => {
    const newBooks = books.map((book) => {
      if (book.id == bookId) {
        return { ...book, read: false}
      }
      return book;
    });
    setBooks(newBooks);
  }

  const removeBook = bookId => {
    Alert.alert(
      'Excluir Livro?', 'Confirma a exclusão deste livro?',
      [
        {
          text: 'Sim', onPress: () => {
            const newBooks = books.filter(book => book.id != bookId)
            setBooks(newBooks);
          }
        },
        {
          text: 'Cancelar', style: 'cancel'
        }
      ]
    )
  }

  const removeAll = () => {
    Alert.alert(
      "Limpar Lista?", "Confirma a exclusão de todos os livros?",
      [
        {
          text: 'Sim',
          onPress: () => { setBooks([]) }
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ]
    )
  }

  return (
    <SafeAreaView style={{ flex: 1}}>
      <ImageBackground 
        source={require('../assets/background.jpg')}
        style={{flex: 1, justifyContent: 'flex-start'}}
        resizeMode='repeat'
      >
        <View style={styles.header}>
          <Text style={styles.title}>Lista de Livros</Text>
          <Ionicons name="trash" size={32} color="#fff" onPress={removeAll} />
        </View>

        <FlatList
          contentContainerStyle={{ padding: 20, paddingBottom: 100, color:'#fff'}}
          data={books}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) =>
            <BookListItem
              item={item}
              markItem={markBookRead}
              unmarkItem={unmarkBookRead}
              removeItem={removeBook}
            />
          }
        />

        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              color="#fff"
              fontSize={18}
              placeholder='Digite o título do livro...'
              placeholderTextColor='#aeaeae'
              value={textInput}
              onChangeText={(text) => setTextInput(text)}
            />
          </View>
          <TouchableOpacity style={styles.iconContainer} onPress={addBook}>
            <Ionicons name='add' size={36} color='#fff' />
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 25,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000000c0',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#000000c0',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  inputContainer: {
    backgroundColor: "#000",
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#000',
    borderRadius: 25,
    elevation: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

