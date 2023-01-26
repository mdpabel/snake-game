# Snake game (Doubly Linked List)

A snake game using a doubly linked list and React is a fun and interactive way to learn about both data structures and front-end development. The doubly linked list allows for efficient manipulation of the snake's movements and growth, while React provides a user-friendly interface for the game.

### Live Link [snake game](snake-game-pi-amber.vercel.app/).

## Screenshots

![App Screenshot](./screenshort.gif)

## Snake Doubly Linked List

```js
export class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyLinkedList {
  constructor(head) {
    this.head = null;
    this.tail = null;

    this.addToHead(head);
  }

  addToTail(val) {
    let newNode = new Node(val);
    if (this.tail) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
    } else {
      this.head = newNode;
    }
    this.tail = newNode;

    return this.tail;
  }

  addToHead(val) {
    let newNode = new Node(val);
    if (this.head) {
      this.head.prev = newNode;
      newNode.next = this.head;
    } else {
      this.tail = newNode;
    }
    this.head = newNode;

    return this.head;
  }

  removeTail() {
    if (!this.tail) {
      return;
    }
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return;
    }

    this.tail = this.tail.prev;
    this.tail.next = null;

    return this.tail;
  }
}
```

## Tech Stack

**Client:** React, TailwindCSS

## Run Locally

Clone the project

```bash
  git clone https://github.com/mdpabel/snake-game.git
```

Go to the project directory

```bash
  cd snake-game-main
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Lessons Learned

The power of data structures: Using a doubly linked list allowed for efficient traversal and manipulation of the snake's body, resulting in smooth game play.

## License

[MIT](https://choosealicense.com/licenses/mit/)
