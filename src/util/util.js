export class Util {
  static getDateTime() {
    return new Date().toISOString().replace('T', ' ').replace('Z', '');
  }
}
