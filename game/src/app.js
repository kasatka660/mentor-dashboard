// Import components.
import Battle from './screens/battle/battle';
import Monster from './components/monster/monster';
import login from './components/login/login';

import 'jquery';

// Import styles.
import 'bootstrap';
import './style.scss';

require('webpack-jquery-ui');
require('webpack-jquery-ui/css');

login().then((newPlayer) => {
  const monster = new Monster();
  const newBattle = new Battle(newPlayer, monster);
  newBattle.startBattle();
});
