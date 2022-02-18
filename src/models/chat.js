export default class Chat {
  constructor(id, username, start_date, end_date, is_closed) {
    this.id = id;
    this.username = username;
    this.start_date = start_date;
    this.end_date = end_date;
    this.is_closed = is_closed;
  }
}
