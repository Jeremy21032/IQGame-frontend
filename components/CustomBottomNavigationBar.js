import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { StyleSheet, View, Platform, SafeAreaView } from 'react-native';
import { routes } from '../routes/routes';
const CustomBottomNavigationBar = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  
  const renderScene = ({ route }) => {
    const RouteComponent = route.component;
    return <RouteComponent />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          barStyle={styles.barStyle}
          labeled={true}
          activeColor="#FF0000"
          inactiveColor="#999999"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  barStyle: {
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default CustomBottomNavigationBar;
