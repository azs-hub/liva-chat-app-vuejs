// sentBy-Author: 0=guest - 1=admin
// 

export default class Message {
  constructor(content, author) {
    this.content = content;
    this.sendby = author;
    this.author = this.getAuthor(author);
    
    // Used by vue-chat-widget 
    // to remove after create own front compo
    this.body = content;
  }

  getAuthor(type) {
    return (!type) ? 'you' : 'them';
  }
}
