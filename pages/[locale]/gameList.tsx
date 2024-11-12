// components/GamesList.tsx
import { FC } from 'react';
import { games } from '../components/data';

const GamesList: FC = () => {
  return (
    <div>
      <h1>Jeux Collectifs et Individuels</h1>

      <h2>Jeux Collectifs</h2>
      <div>
        {games.collectiveGames.map((game, index) => (
          <div key={index}>
            <h3>{game.name}</h3>
            <p>{game.description}</p>
            <ul>
              {game.rules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2>Jeux Individuels</h2>
      <div>
        {games.individualGames.map((game, index) => (
          <div key={index}>
            <h3>{game.name}</h3>
            <p>{game.description}</p>
            <ul>
              {game.rules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesList;
