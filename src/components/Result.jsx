
import EmojiResultRow from "./EmojiResultRow";

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
export default Result