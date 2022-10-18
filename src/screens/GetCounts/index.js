import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Animated,
  Button,
  Alert,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

// Import the action from slice:
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {removeCount} from '../../redux/counterSlice';

import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

const GetCountsScreen = ({route, navigation}) => {
  const {saveToFolder} = route.params;

  // fullCountsData is entire dataset of all counts for every folder
  const reduxData = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();
  const [listData, setListData] = useState([]);
  //listData is countData for 'current' saveToFolder

  const [loading, setLoading] = useState(true);
  const {colors} = useTheme();

  useEffect(() => {
    getData();
  }, [listData]);

  const getData = async () => {
    for (let i = 0; i < reduxData.folderList.length; i++) {
      if (reduxData.folderList[i].isSelected) {
        setListData(reduxData.folderList[i].countData);
      } else {
        for (let j = 0; j < reduxData.folderList[i].subfolders.length; j++) {
          if (reduxData.folderList[i].subfolders[j].isSelected) {
            setListData(reduxData.folderList[i].subfolders[j].countData);
          }
        }
      }
    }
    setLoading(false);
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    dispatch(removeCount(newData));
    setListData(newData);
  };

  const onRowDidOpen = rowKey => {
    //console.log('This row opened', rowKey);
  };

  const onLeftActionStatusChange = rowKey => {
    //console.log('onLeftActionStatusChange', rowKey);
  };

  const onRightActionStatusChange = rowKey => {
    //console.log('onRightActionStatusChange', rowKey);
  };

  const onRightAction = rowKey => {
    //console.log('onRightAction', rowKey);
  };

  const onLeftAction = rowKey => {
    //console.log('onLeftAction', rowKey);
  };

  const VisibleItem = props => {
    const {
      data,
      rowHeightAnimatedValue,
      removeRow,
      leftActionState,
      rightActionState,
    } = props;

    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }

    return (
      <Animated.View
        style={[styles.rowFront, {height: rowHeightAnimatedValue}]}>
        <TouchableHighlight
          style={styles.rowFrontVisible}
          onPress={() => console.log('Element touched')}
          underlayColor={'#aaa'}>
          <View>
            <Text style={styles.title} numberOfLines={1}>
              Count: {data.item.count}
            </Text>
            <Text style={styles.details} numberOfLines={1}>
              {data.item.countDate}
            </Text>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  };

  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  const HiddenItemWithActions = props => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose,
      onDelete,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false,
      }).start();
    }

    return (
      <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
        <Text>Left</Text>
        {!leftActionActivated && (
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={onClose}>
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={25}
              style={styles.trash}
              color="#fff"
            />
          </TouchableOpacity>
        )}
        {!leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={onDelete}>
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={25}
                  color="#fff"
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  const showConfirmDelete = () => {
    return Alert.alert(
      'Are your sure?',
      'This action can not be undone. Are you sure you want to delete all saved Counts?',
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            handleClearAllCounts();
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No',
        },
      ],
    );
  };

  const handleClearAllCounts = () => {
    setListData([]);
  };

  return (
    <View>
      {loading ? (
        <View>
          <Text> Loading .... </Text>
        </View>
      ) : (
        <View>
          <SwipeListView
            data={listData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-150}
            disableRightSwipe
            onRowDidOpen={onRowDidOpen}
            leftActivationValue={100}
            rightActivationValue={-200}
            leftActionValue={0}
            rightActionValue={-500}
            onLeftAction={onLeftAction}
            onRightAction={onRightAction}
            onLeftActionStatusChange={onLeftActionStatusChange}
            onRightActionStatusChange={onRightActionStatusChange}
          />
          {(() => {
            if (
              listData === null ||
              listData === undefined ||
              listData.length === 0
            ) {
              return (
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 40,
                    color: colors.text,
                  }}>
                  {' '}
                  There are no saved Counts.{' '}
                </Text>
              );
            } else {
              return (
                <Button
                  title="Clear All Counts"
                  onPress={() => showConfirmDelete()}>
                  Clear All Counts
                </Button>
              );
            }
          })()}
        </View>
      )}
    </View>
  );
};
export default GetCountsScreen;
