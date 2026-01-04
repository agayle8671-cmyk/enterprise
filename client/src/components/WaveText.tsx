export function WaveText({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(' ');
  let globalIndex = 0;
  
  const wordElements = words.map((word, wordIdx) => {
    const letters = word.split('').map((char, charIdx) => {
      const delay = globalIndex * 0.05;
      globalIndex++;
      return (
        <span 
          key={charIdx} 
          className="inline-block animate-wave-letter"
          style={{ animationDelay: `${delay}s` }}
        >
          {char}
        </span>
      );
    });
    globalIndex++;
    
    return (
      <span key={wordIdx} className="inline-block whitespace-nowrap">
        {letters}
        {wordIdx < words.length - 1 && <span>&nbsp;</span>}
      </span>
    );
  });

  return <span className={className}>{wordElements}</span>;
}
