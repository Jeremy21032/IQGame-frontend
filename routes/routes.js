import HomeScreen from '../screens/HomeScreen';
import LevelScreen from '../screens/LevelScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GameScreen from '../screens/GameScreen';

export const routes = [
  { key: 'home', focusedIcon: 'home', unfocusedIcon: 'home-outline', component: HomeScreen },
  { key: 'games', focusedIcon: 'gamepad-variant', unfocusedIcon: 'gamepad-variant-outline', component: LevelScreen },
  { key: 'profile', focusedIcon: 'account', unfocusedIcon: 'account-outline', component: ProfileScreen },
];
