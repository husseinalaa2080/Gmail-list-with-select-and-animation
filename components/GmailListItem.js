import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import { Feather } from '@expo/vector-icons';

const COLORS = {
  WHITE: "#fff",
  BLUE: "#1a73e8",
  BLIUE_SKY: "#c2dbff",
  BLACK: "#000",
  BLACK_GRAY: "#444"
}

const GmailListItem = ({item, index, selectedItems, setSelectedItems}) => {
  const [firstTime, setFirstTime] = useState(true);

  const isFound = selectedItems?.some(e => e?.id === item?.id)

  // handle animation start here
  const animatedValue = new Animated.Value(0);
  let currentValue = 0;
  animatedValue.addListener(({value}) => {
    currentValue = value;
  })

  const animateImage = async () => {
    if (currentValue == 180) {
      await Animated.timing(animatedValue, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
    } else {
      await Animated.timing(animatedValue, {
        toValue: 180,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        if (firstTime == true) {
          setFirstTime(false)
        }
      });
    }
    setTimeout(() => selectItem(), 550);
  };

  const interpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '0deg'],
  });

  const animatedStyle = {
    transform: [
      {rotateY: interpolate}
    ]
  }
  // handle animation start here

  // select and deselect item
  const selectItem = () => {
    if (isFound) {
      let array = [...selectedItems];
      const i = array.findIndex(e => e?.id == item?.id);
      if (i !== -1) {
        array?.splice(i, 1);
      }
      setSelectedItems(array);
    } else {
      setSelectedItems(oldItems => [...oldItems, item]);
    }
  };

  // rotate text
  const rotateTextStyle = {transform: [{rotateY: "-180deg"}]}

  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        {
          backgroundColor: isFound
            ? COLORS.BLIUE_SKY
            : COLORS.WHITE,
        },
      ]}
      onLongPress={animateImage}>
      <Animated.View style={animatedStyle}>
        <TouchableOpacity
          style={[
            styles.leftSection,
            {
              backgroundColor: isFound
                ? COLORS.BLUE
                : item?.color,
            },
          ]}
          activeOpacity={1}
          onPress={animateImage}>
          {isFound ? (
            <Feather name="check" size={23} color={COLORS.WHITE} />
          ) : (
            <Text style={[styles.avatarText, firstTime ? rotateTextStyle : null]}>
              {item?.first_name?.charAt(0) + item?.last_name?.charAt(0)}
            </Text>
          )}
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.rightSection}>
        <Text style={styles.title} numberOfLines={1}>
          {item?.title}
        </Text>
        <Text style={styles.subTitle} numberOfLines={1}>
          {item?.sub_title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GmailListItem;

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 7.5,
    marginHorizontal: 7.5,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 17,
    marginBottom: 5,
  },
  leftSection: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22.5,
  },
  rightSection: {
    flex: 1,
    paddingLeft: 15,
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.BLACK,
  },
  subTitle: {
    fontSize: 14,
    color: COLORS.BLACK_GRAY,
  },
  avatarText: {
    fontSize: 25,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
});
