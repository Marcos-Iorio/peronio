export interface TokenInfo {
    name: string;
    address: string;
    image: string;
  }
  
export interface TokenMap {
    [key: string]: TokenInfo;
}