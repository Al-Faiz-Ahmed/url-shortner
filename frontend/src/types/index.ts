export type User = {
    id: string;
    createdAt: Date;
    ipAddress: string;
    totalShortenedURL: number;
}

export type GeneratedURL = {
  generatedURL: string;
  id: string;
  givenURL: string;
  uniqueHash: string;
  isBlock: boolean;
  totalVisitors: number;
  userId: string;
  expirationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}