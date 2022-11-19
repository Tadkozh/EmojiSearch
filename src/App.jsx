// Emoji List

//*****************************************************
// 👨✈️ Hugo the Project Manager gives the specifications of the application: Build an application to search for emojis in a web page. 
// This application will contain:

// Header - A header containing a label and the number of results found
// SearchInput - A search field that will search in
//           The title of the emoji
//           The emoji's keywords
//           On its symbol
// Result which contains EmojiResultRow - An array of results
//           Which will display emojis
//           By clicking on the result row, the emoji will be copied to the clipboard

// EmojiSearch is the parent component

// 🐶 In this exercise we will have to implement emoji search with useState and useEffect hooks if needed. 
//*****************************************************

import React from 'react'
import { useState, useEffect } from 'react'
import emojiList from './assets/emojiList.json'
//import Clipboard from 'clipboard'
import useClipboard from 'react-use-clipboard'
import './App.css'

function Header({nbFound}) {
  return (
    <div className='component-header'>
      <div>Recherche Emoji</div>
      <div className='result-found'>
        {nbFound > 0 ? `${nbFound} emojis trouvés`: 'Aucun résultat'}
      </div>
    </div>
  )
}

function SearchInput({onTextChange}) {

  return (
    <div className='component-search-input'>
      <div>
      <input
        placeholder='Recherche par titre, symbole, mot-clé'
        onChange={e => onTextChange(e.target.value)}
      />
      </div>
    </div>
  )
}

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


function Result({data = []}) {

// 🐶 Gère le 'copier dans le presse papier' grâce à la librairie clipboard (npm i clipboard)
  // React.useEffect(() => {
  //   const clipboard = new Clipboard('.copy-to-clipboard')
  //   return () => { clipboard.destroy() }
  // }, [])

  return (
    <div className='component-emoji-results'>
      {data.map(emojiData => (
        <EmojiResultRow
          key={emojiData.title}
          symbol={emojiData.symbol}
          title={emojiData.title}
        />
      ))}
    </div>
  )
}

// 🐶 Gère le hook react-use-clipboard
function EmojiResultRow({symbol, title}) {
  const [isCopied, setCopied] = useClipboard(symbol)

  return (
    <div 
      //data-clipboard-text={symbol} 
      className='component-emoji-result-row' //copy-to-clipboard
      onClick={setCopied}
    >
      {symbol}
      <span className='title'>{title}</span>
      <span className='info' >
        { isCopied ? <span className="info"> 📋 </span> : null }
        Copier
      </span>
    </div>
  )
}

function App() {
  return <EmojiSearch />
}
export default App

function filterEmoji(searchText, maxResults = 10) {
  return emojiList
    .filter(emoji => {
      if (emoji.title.toLowerCase().includes(searchText.toLowerCase())) {
        return true
      }
      if (emoji.keywords.includes(searchText)) {
        return true
      }
      if (emoji.symbol.includes(searchText)) {
        return true
      }
      return false
    })
    .slice(0, maxResults)
}
