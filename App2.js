import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, FlatList, Image, TouchableOpacity } from 'react-native';
import Swipeout from 'react-native-swipeout';
const ic_delete = require('./assets/images/delete.png');
const ic_back = require('./assets/images/return.png');


export default class App2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 0, name: 'Key lime pie', img: 'https://dynaimage.cdn.cnn.com/cnn/q_auto,w_634,c_fill,g_auto,h_357,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F150527112722-cnngo-miami-best-eats--joes-keylime-pie.jpg' },
        { id: 1, name: 'Tater tots', img: 'https://dynaimage.cdn.cnn.com/cnn/q_auto,w_634,c_fill,g_auto,h_357,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170206144443-taters.jpg' },
        { id: 2, name: 'San Francisco sourdough bread', img: 'https://dynaimage.cdn.cnn.com/cnn/q_auto,w_634,c_fill,g_auto,h_357,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170203114916-sourdough-bread.jpg' },
        { id: 3, name: 'Cobb salad', img: 'https://dynaimage.cdn.cnn.com/cnn/q_auto,w_634,c_fill,g_auto,h_357,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170206144051-cobb-salad-2.jpg' },
        { id: 4, name: 'Pot roast', img: 'https://dynaimage.cdn.cnn.com/cnn/q_auto,w_634,c_fill,g_auto,h_357,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170206145021-pot-roast-2.jpg' }
      ],
      close: false
    };
  }
  item = null;

  _renderButtonDelete = () => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => {
        this.setState({
          data: [... this.state.data.filter(e => e.id != this.item.id)]
        })
        this.item = null;
      }}>
        <Image source={ic_delete} resizeMode='contain' style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    )
  }

  _renderButtonClose = () => {
    return (
      <TouchableOpacity style={[styles.button, { backgroundColor: 'orange' }]} onPress={() => {
        this.setState({
          close: !this.state.close
        })
      }}>
        <Image source={ic_back} resizeMode='contain' style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    )
  }

  swipeoutBtns = [
    {
      // text: 'Delete',
      backgroundColor: 'white',
      component: this._renderButtonDelete(),
      // onPress: () => {
      //   Alert.alert('Delete')
      // }
    },
    {
      // text: 'Close',
      component: this._renderButtonClose(),
      backgroundColor: 'white',
      // onPress: () => {
      //   Alert.alert('Close')
      // }
    }
  ];

  renderItem = ({ item, index }) => {
    return (
      <Swipeout
        close={this.state.close}
        onOpen={() => {
          this.item = item
        }}
        style={{ padding: 4, backgroundColor: 'white' }}
        autoClose
        right={this.swipeoutBtns}>
        <View style={styles.item}>
          <Image source={{ uri: item.img }} resizeMode='stretch' style={styles.img} />
          <View style={{ flexDirection: 'column', marginLeft: 10, flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
            <Text numberOfLines={2}>The childhood Sunday family dinner of baby boomers everywhere, pot roast claims a sentimental favorite place in the top 10 of American comfort foods. There's a whole generation that would be lost without it.</Text>
          </View>
        </View>
      </Swipeout>

    )
  }

  render() {
    const { data } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={item => `key-${item.id}`}
          renderItem={this.renderItem}
          extraData={data}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    flex: 1, padding: 8
  },
  item: {
    flexDirection: 'row',
    marginTop: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: 'white',
    elevation: 3,
  },
  img: {
    width: 80,
    height: 80
  },
  button: {
    flex: 1, backgroundColor: 'pink', justifyContent: 'center', alignItems: 'center', marginTop: 12, padding: 12
  }
})