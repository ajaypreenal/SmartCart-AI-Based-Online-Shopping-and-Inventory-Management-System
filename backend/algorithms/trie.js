export class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  // Return array of words that start with the given prefix
  getWordsWithPrefix(prefix) {
    const results = [];
    let node = this.root;
    for (const char of prefix.toLowerCase()) {
      if (!node.children[char]) {
        return results; // No words with this prefix
      }
      node = node.children[char];
    }
    this._dfs(node, prefix.toLowerCase(), results);
    return results;
  }

  _dfs(node, path, results) {
    if (node.isEndOfWord) {
      results.push(path);
    }
    for (const [char, child] of Object.entries(node.children)) {
      this._dfs(child, path + char, results);
    }
  }
}
