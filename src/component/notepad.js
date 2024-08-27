import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Alert, StatusBar, SafeAreaView, StyleSheet, View, Dimensions, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import LinearGradient from 'react-native-linear-gradient';
import ErrorPage from './ErrorPage'; // Ensure this component is correctly implemented

const { height: screenHeight } = Dimensions.get('window');

const App = () => {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [isConnected, setIsConnected] = useState(null);
  const [currentUrl, setCurrentUrl] = useState('https://skvtreact.shrikashivishwanath.org/');

  const injectedJavaScript = `
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    document.getElementsByTagName('head')[0].appendChild(meta);
    true;
  `;

  useEffect(() => {
    if (currentUrl === 'https://shrikashiprasadam.com/') {
      setShowSpinner(true);
      Linking.openURL('https://shrikashiprasadam.com/');
      webViewRef.current.injectJavaScript("window.location.href = 'https://skvtreact.shrikashivishwanath.org/';");
    }

    if (currentUrl === 'https://www.instagram.com/shrikashivishwanath/') {
      setShowSpinner(true);
      Linking.openURL('https://www.instagram.com/shrikashivishwanath/');
      webViewRef.current.injectJavaScript("window.location.href = 'https://skvtreact.shrikashivishwanath.org/';");
    }

    if (currentUrl.startsWith('https://m.facebook')) {
      setShowSpinner(true);
      Linking.openURL(currentUrl);
      webViewRef.current.injectJavaScript("window.location.href = 'https://skvtreact.shrikashivishwanath.org/';");
    }

    if (currentUrl === 'https://twitter.com/ShriVishwanath') {
      setShowSpinner(true);
      Linking.openURL('https://twitter.com/ShriVishwanath');
      webViewRef.current.injectJavaScript("window.location.href = 'https://skvtreact.shrikashivishwanath.org/';");
    }

    if (currentUrl === 'https://api.whatsapp.com/send/?phone=918528996606&text&type=phone_number&app_absent=0') {
      setShowSpinner(true);
      Linking.openURL('https://api.whatsapp.com/send/?phone=918528996606&text&type=phone_number&app_absent=0');
      webViewRef.current.injectJavaScript("window.location.href = 'https://skvtreact.shrikashivishwanath.org/';");
    }
  }, [currentUrl]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    const onBackPress = () => {
      if (canGoBack) {
        webViewRef.current.goBack();
        return true; // Prevent default behavior (exit app)
      }

      if (currentUrl === 'https://skvtreact.shrikashivishwanath.org/BookingOrderList' || currentUrl === 'https://skvtreact.shrikashivishwanath.org/DonationList') {
        webViewRef.current.injectJavaScript("window.location.href = 'https://skvtreact.shrikashivishwanath.org/';");
        return true;
      }

      if (currentUrl === 'https://skvtreact.shrikashivishwanath.org/') {
        Alert.alert(
          'Exit App',
          'Do you want to exit the app?',
          [
            { text: 'No', onPress: () => null, style: 'cancel' },
            { text: 'Yes', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );
      } else {
        webViewRef.current.goBack();
      }
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      unsubscribe();
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [canGoBack, currentUrl]);

  const handleLoadStart = () => {
    setShowSpinner(true);
  };

  const handleLoadEnd = () => {
    setShowSpinner(false);
  };

  const handleError = () => {
    setShowSpinner(false);
    Alert.alert('Error', 'An error occurred while loading the page.');
  };

  const handleLoadProgress = ({ nativeEvent }) => {
    if (nativeEvent.progress === 1) {
      setShowSpinner(false);
    }
  };

  const resetScrollPosition = () => {
    webViewRef.current.injectJavaScript(window.scrollTo(0, 0);true;);
  };

  if (isConnected === null) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorPage />
      </SafeAreaView>
    );
  }

  if (!isConnected) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorPage />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* StatusBar configuration */}
      <StatusBar 
        translucent={true}
        backgroundColor={Platform.OS === 'ios' ? 'transparent' : 'rgba(0,0,0,0)'}
        barStyle="dark-content" // or 'light-content' based on your design
      />

      {/* Gradient background for StatusBar area */}
      <LinearGradient
        colors={['#FF5733', '#FFBD33']} // Adjust these colors as needed
        style={styles.gradient}
      />

      <Spinner
        visible={showSpinner}
        textContent={'Please Wait ...'}
        textStyle={{ color: '#FFF', fontWeight: '400' }}
        size="large"
        color="#bb5533"
      />

      <WebView
        source={{ uri: 'https://skvtreact.shrikashivishwanath.org/' }}
        ref={webViewRef}
        injectedJavaScript={injectedJavaScript}
        onNavigationStateChange={navState => {
          const { url } = navState;
          setCurrentUrl(url);

          if (url === 'https://secure.ccavenue.com/cancelTransaction') {
            webViewRef.current.injectJavaScript("window.location.href = 'https://skvtreact.shrikashivishwanath.org/';");
          }

          if (!navState.loading) {
            setShowSpinner(false);
            resetScrollPosition();
          }
        }}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        onHttpError={handleError}
        onLoadProgress={handleLoadProgress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? (StatusBar.currentHeight || 0) + 0 : StatusBar.currentHeight || 0, // Adjust height for iOS notch
    zIndex: 1, // Ensure gradient is behind other content
  },
});

export default App;