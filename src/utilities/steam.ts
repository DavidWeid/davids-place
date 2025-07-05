import avatarDefault from '@images/about/avatar-default.png';

const steamApiKey = import.meta.env.STEAM_API_KEY || null;
const steamUserId = import.meta.env.PUBLIC_STEAM_USER_ID || null;

// const games = [
//   {
//     title: 'Helldivers 2',
//     id: 553850,
//   },
//   {
//     title: 'Chivalry 2',
//     id: 1824220,
//   },
//   {
//     title: 'Timberborn',
//     id: 1062090,
//   },
//   {
//     title: 'Farthest Frontier',
//     id: 1044720,
//   },
//   {
//     title: 'The Planet Crafter',
//     id: 1284190,
//   },
// ];

export const getGameNews = async (
  appId: string,
  count: number = 3,
  truncateLength: number = 500,
) => {
  const responseGameNews = await fetch(
    `https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${appId}&count=${count}&maxlength=${truncateLength}&format=json`,
  );
  try {
    return await responseGameNews.json();
  } catch (error) {
    console.log('Error fetching game news data', error);
    return false;
  }
};

export const getPlayerData = async (
  steamKey: string = steamApiKey,
  userId: string = steamUserId,
) => {
  const staticPlayerData = {
    personaname: 'Lord Arbiter',
    profileurl: 'https://steamcommunity.com/id/davidweid/',
    avatarfull: avatarDefault,
    personastate: 0,
    stateText: getStateText(0),
    stateClasses: getStateClasses(0),
    gameextrainfo: null, // Currently playing
  };

  if (!steamKey || !userId) return staticPlayerData;

  const responsePlayerData = await fetch(
    `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamKey}&steamids=${userId}`,
  );
  try {
    const playerDataJSON = await responsePlayerData.json();
    const playerData = playerDataJSON.response.players[0];
    playerData.stateText = getStateText(playerData.personastate);
    playerData.stateClasses = getStateClasses(playerData.personastate);
    return playerData;
  } catch (error) {
    console.error('Error fetching player data', error);
    return staticPlayerData;
  }
};

export const getOwnedGames = async (
  steamKey: string = steamApiKey,
  userId: string = steamUserId,
) => {
  const staticOwnedGames = {};

  if (!steamKey || !userId) return staticOwnedGames;

  const responseOwnedGames = await fetch(
    `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamKey}&steamid=${userId}&format=json&include_appinfo=1&include_played_free_games=1`,
  );
  try {
    const response = await responseOwnedGames.json();
    return response.response.games.filter(
      (game: any) => game.playtime_forever > 60,
    );
  } catch (error) {
    console.error('Error fetching owned games', error);
    return staticOwnedGames;
  }
};

export const getRecentGames = async (
  steamKey: string = steamApiKey,
  userId: string = steamUserId,
) => {
  const staticRecentGames = {};

  if (!steamKey || !userId) return staticRecentGames;

  const responseRecentGames = await fetch(
    `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${steamKey}&steamid=${userId}&format=json`,
  );
  try {
    const recentGamesJSON = await responseRecentGames.json();
    return recentGamesJSON.response.games;
  } catch (error) {
    console.error('Error fetching recently played games', error);
    return staticRecentGames;
  }
};

export const getStateText = (state: number) => {
  if (state === 0) return 'Offline';
  if (state === 1) return 'Online';
  if (state === 2) return 'Busy';
  if (state === 3) return 'Away';
  if (state === 4) return 'Snooze';
  if (state === 5) return 'Looking to trade';
  if (state === 6) return 'Looking to play';
  return 'Offline';
};

export const getStateClasses = (state: number) => {
  if (state === 0) return 'bg-gray-500';
  if (state === 1) return 'bg-green-emerald';
  if (state === 2) return 'bg-red-500';
  if (state === 3) return 'bg-yellow-500';
  if (state === 4) return 'bg-blue-500';
  if (state === 5) return 'bg-purple-500';
  if (state === 6) return 'bg-green-500';
  return 'bg-gray-500';
};
