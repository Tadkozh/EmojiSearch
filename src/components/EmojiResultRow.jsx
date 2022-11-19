
import useClipboard from 'react-use-clipboard'

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
export default EmojiResultRow