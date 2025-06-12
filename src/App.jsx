import { useState, useRef, useEffect } from 'react';
import { model } from './gemini.ts';
import { settingsList } from './variables/settingList.ts';
import HoneyBee from './assets/honeybee.png';
import './App.css';
function App() {
    const [briefType, setBriefType] = useState('digital_designer');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState();
    const [resultText, setResultText] = useState();
    const [resultTable, setResultTable] = useState();
    // const [conversation, setConversation] = useState<{ name: string; time: string; message: string }[]>([])
    useEffect(() => {
        // function handleMessage(message: any, sender: any, sendResponse: any) {
        //   if (message.action === 'file_uploaded') {
        //     // Do something with the file content
        //     console.log('Received file:', message.fileName);
        //     console.log('File content:', message.content);
        //     // For example, set it in state:
        //     setResultText(`File "${message.fileName}" uploaded!\n\n${message.content}`);
        //   }
        // }
        // chrome.runtime.onMessage.addListener(handleMessage);
        // return () => chrome.runtime.onMessage.removeListener(handleMessage);
    }, []);
    const config = {
        responseMimeType: 'application/json',
        // responseSchema: {
        //     briefText: "Full human-readable brief text here...",
        //     specsTable: [
        //         ["specification", "value"],
        //     ]
        // },
    };
    const chatRef = useRef(model.startChat({
        history: [],
        generationConfig: config
    }));
    // Get #section-notes content from the current page
    async function getSectionNotesContent() {
        return new Promise((resolve) => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (!tabs[0]?.id)
                    return resolve([]);
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: () => {
                        const conversation = [];
                        const noteSections = document.querySelectorAll('#section-notes > section[data-noteid]');
                        noteSections.forEach((section) => {
                            const content = section.querySelector('.ck-content');
                            if (!content)
                                return;
                            const name = content.querySelector('span strong')?.textContent?.trim() || '';
                            const time = content.querySelector('.task-comment-date')?.textContent?.trim() ||
                                '';
                            const message = content.querySelector('.task-comment-notes')?.textContent?.trim() ||
                                '';
                            conversation.push({
                                name,
                                time,
                                message,
                            });
                        });
                        return conversation;
                    },
                }, (results) => {
                    resolve(results?.[0]?.result || []);
                });
            });
        });
    }
    async function generateBriefWithGemini(briefType, conversation) {
        console.log('generate conversation', conversation);
        const prompt = `Generate a brief for: ${briefType}, Here are the specifications needed: ` + JSON.stringify(settingsList[briefType].description) + `, Here is the conversation: ` + conversation;
        await chatRef.current.sendMessage(prompt).then((result) => {
            console.log(result.response.text());
            const parsedText = JSON.parse(result.response.text());
            // text = result.response.text();
            setResult(parsedText);
            setResultText(parsedText.briefText);
            setResultTable(parsedText.specsTable);
            return parsedText;
        }).catch((err) => {
            setResult('Error: ' + 'No response from Gemini -- ' + err);
        });
        return false;
    }
    const handleGenerate = async () => {
        setLoading(true);
        // generateBriefWithGemini(briefType)
        setResult(null);
        let conversation = '';
        try {
            await getSectionNotesContent().then((sectionNotes) => {
                console.log('sectionNotes', sectionNotes);
                conversation = JSON.stringify(sectionNotes);
            }).catch((err) => {
                console.error('Error getting section notes:', err);
                setResult('Error: ' + 'Conversation is Empty');
            });
            // await
            await generateBriefWithGemini(briefType, conversation);
        }
        catch (err) {
            setResult('Error: ' + err);
        }
        setLoading(false);
    };
    return (
    <div className="app-container">
      <h1 className='header'>BriefBee <img className="header_logo" src={HoneyBee} alt="honey bee"/></h1>
      <div className='brief-type-selector'>
        <select value={briefType} onChange={e => setBriefType(e.target.value)}>
          {settingsList && Object.keys(settingsList).map((key) => {
            const { title } = settingsList[key];
            return (<option key={key} value={key}>
                  {title}
                </option>);
        })}
        </select>
        <input type='file' className='file_input'/>
        <button onClick={() => window.open(chrome.runtime.getURL('upload.html'), '_blank')}>
          Upload File
        </button>
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>
      
      {result && (<div className="result-box">
          {resultText}
          <table className='result-table'>
            {resultTable && resultTable.map((row, index) => (<tr key={index} className='result-table-row'>
                {row.map((cell, cellIndex) => (<td key={cellIndex} className='result-table-cell'>
                    {cell}
                  </td>))}
              </tr>))}
        </table>
        </div>)}
        <a href="terms_and_conditions.html" target="_blank">Terms and Conditions</a>
    </div>
    );
}
export default App;
