export const isLoggedIn = (): boolean => {
    const nickname = localStorage.getItem('nickname');
    const avatar = localStorage.getItem('avatar');
    return !!nickname && !!avatar;
  };
  