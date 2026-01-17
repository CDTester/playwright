export class UtilsData {
  static generateRandomEmail(): string {
    return `test${Date.now()}@example.com`;
  }

  static generateRandomString(length: number = 10): string {
    return Math.random().toString(36).substring(2, length + 2);
  }
}