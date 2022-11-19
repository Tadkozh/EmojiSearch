// Emoji List

//*****************************************************
// 👨‍✈️ Hugo le Chef de projet donnera les spécifications de l’application : Construire une application de recherche d’émojis dans un page web. 
// Cette application contiendra :

// Header - Un header contenant un libellé et le nombre de résultats trouvés
// SearchInput - Un champs de recherche qui permettra de rechercher dans
//           Le titre le l’émoji
//           Les mots clef de l’emoji
//           Sur son symbole
// Result qui contient EmojiResultRow - Un tableau de résultats
//           Qui affichera des emojis
//           En cliquant sur la ligne de résultat, l’emoji sera copié au presse papier

// EmojiSearch est le composant parent

// 🐶 Dans cette exercice il va falloir implémenter la recherche d’emoji avec des Hooks useState et useEffect si besoin. 
// Le pattern Lift state up se rapproche le plus de ce que l’on veut faire.
//*****************************************************

// http://localhost:3000/alone/exercise/04.js
// Fork de : https://github.com/ahfarmer/emoji-search/

// import { useState, useEffect } from 'react'; Marche pas à l'intérieur du cours 
import React from 'react'
import { useState, useEffect } from 'react'
import emojiList from './assets/emojiList.json'
// eslint-disable-next-line no-unused-vars
// import Clipboard from 'clipboard'
import './App.css'

function Header({nbFound}) {
  return (
    <div className="component-header">
      <div>Recherche Emoji</div>
      <div className="reusult-found">
        {nbFound > 0 ? `${nbFound} emojis trouvés`: 'Aucun résultat'}
      </div>
    </div>
  )
}

function SearchInput({onTextChange}) {

  return (
    <div className="component-search-input">
      <div>
      <input
        placeholder='Search for an emoji by title, symbol, keyword'
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
// fin EmojiSearch parent*************************

// 🐶 Gère le 'copier dans le presse papier' grace à la librairie clipboard
// 📑 https://www.npmjs.com/package/clipboard
// 📑 Dans la documentation il est spécifié que pour utiliser il faut instancier clipboard
// 🤖 var clipboard = new ClipboardJS('.btn'); //btn nom de classe ou sera appliqué la copy.
// 📑 l'attribut 'data-clipboard-text' permet de spécifier ce qui sera copié
// 🤖 <div data-clipboard-text='Salut' /> copiera dans le press papier salut

// 📑 il faut ensuite detruire l'objet quand on en a plus besoin
// 🤖 clipboard.destroy();
function Result({data = []}) {
  // 🐶 Utilise 'useEffect' pour gérer l'instanciation de clipboard
  // 🤖 React.useEffect
  // 🤖 const clipboard = new Clipboard('.copy-to-clipboard')

  // 🐶 N'oubllie pas de 'cleanup' detruire l'objet dans useEffect en retournant une fonction fléché
  // 🤖 return () => { clipboard.destroy() }
  return (
    <div className="component-emoji-results">
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

// 🐶 Gère la copie de l'emoji en appliquant lesattributs necessaires à clipboard
function EmojiResultRow({symbol, title}) {
  // 🐶 Ajoute le className 'copy-to-clipboard'
  // 🤖 className="copy-to-clipboard"

  // 🐶 Ajoute l'attribut data-clipboard-text à la div
  // 🤖 <div data-clipboard-text={symbol}
  return (
    <div className="component-emoji-result-row">
      {symbol}
      <span className="title">{title}</span>
      <span className="info">Copier</span>
    </div>
  )
}

function App() {
  return <EmojiSearch />
}
export default App

// eslint-disable-next-line no-unused-vars
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
