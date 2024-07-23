export const setNickname = (nickname: string): void => {
    localStorage.setItem('nickname', nickname);
  };
  
  export const getNickname = (): string | null => {
    return localStorage.getItem('nickname');
  };
  
  export const removeNickname = (): void => {
    localStorage.removeItem('nickname');
  };
  
  export const setAvatar = (avatar: string): void => {
    localStorage.setItem('avatar', avatar);
  };
  
  export const getAvatar = (): string | null => {
    return localStorage.getItem('avatar');
  };
  
  export const removeAvatar = (): void => {
    localStorage.removeItem('avatar');
  };
  
  export const clearStorage = (): void => {
    removeNickname();
    removeAvatar();
  };
  