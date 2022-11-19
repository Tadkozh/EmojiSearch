
import React from 'react'
import { useState, useEffect } from 'react'

//import Clipboard from 'clipboard'

import emojiList from '../assets/emojiList.json'
import Header from "./Header";
import SearchInput from "./SearchInput";
import Result from "./Result";
import filterEmoji from "../functions/filterEmoji";

function EmojiSearch() {
  const [dataEmoji, setDataEmoji] = useState(emojiList) //contient un tableau d'émojis

  const handleTextChange = text => {
    setDataEmoji(filterEmoji(text))
  }
  return (
    <div>
      <Header nbFound={dataEmoji.length} />
      <SearchInput onTextChange={handleTextChange}/>
      <Result data={dataEmoji}/>
    </div>
  )
}
export default EmojiSearch

// function filterEmoji(searchText, maxResults = 10) {
//   return emojiList
//     .filter(emoji => {
//       if (emoji.title.toLowerCase().includes(searchText.toLowerCase())) {
//         return true
//       }
//       if (emoji.keywords.includes(searchText)) {
//         return true
//       }
//       if (emoji.symbol.includes(searchText)) {
//         return true
//       }
//       return false
//     })
//     .slice(0, maxResults)
// }