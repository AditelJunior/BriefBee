import { useState, useRef, useEffect } from 'react'
import { model } from './gemini.ts'
import { settingsList } from './variables/settingList.ts'
// import { getTextExtractor } from 'office-text-extractor'
import HoneyBee from './assets/honeybee.png'

import './App.css'

function App() {
  const [briefType, setBriefType] = useState<string>('digital_designer')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>()
  const [resultText, setResultText] = useState<string | null>()
  const [resultTable, setResultTable] = useState<[][] | null>()
  const [selectedFile, setSelectedFile] = useState<{name: string, file:File, type: string, fileUri: string,}>()
  // const [conversation, setConversation] = useState<{ name: string; time: string; message: string }[]>([])

  useEffect(() => {
    console.log('App mounted');
    chrome.storage.local.get('uploadedFile', (result) => {
      console.log('File uploaded:', result.uploadedFile);
      console.log(result.uploadedFile.base64);
      if (result.uploadedFile.fileName) {
        setSelectedFile({name: result.uploadedFile.fileName, type: result.uploadedFile.fileType, file: result.uploadedFile.file, fileUri: result.uploadedFile.fileUri})
      }
    });
  }, []);

  // const extractor = getTextExtractor()
  const config = {
    responseMimeType: 'application/json',
    // responseSchema: {
    //     briefText: "Full human-readable brief text here...",
    //     specsTable: [
    //         ["specification", "value"],
    //     ]
    // },
  }
  
  const chatRef = useRef(model.startChat({
    history: [],
    generationConfig: config
  }));

    // Get #section-notes content from the current page
 async function getSectionNotesContent(): Promise<{ name: string; time: string; message: string }[]> {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]?.id) return resolve([]);
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: () => {
            const conversation: { name: string; time: string; message: string }[] = [];
            const noteSections = document.querySelectorAll(
              '#section-notes > section[data-noteid]'
            );
            noteSections.forEach((section) => {
              const content = section.querySelector('.ck-content');
              if (!content) return;
              const name =
                content.querySelector('span strong')?.textContent?.trim() || '';
              const time =
                content.querySelector('.task-comment-date')?.textContent?.trim() ||
                '';
              const message =
                content.querySelector('.task-comment-notes')?.textContent?.trim() ||
                '';
              conversation.push({
                name,
                time,
                message,
              });
            });
            return conversation;
          },
        },
        (results) => {
          resolve(results?.[0]?.result || []);
        }
      );
    });
  });
}
function removeFile() {
  chrome.storage.local.remove('uploadedFile', () => {
      console.log('File removed from storage');
      setSelectedFile(undefined);
    }
  );
}

  async function generateBriefWithGemini(briefType: string, conversation: string) {
    let prompt: string = `Generate a brief for: ${briefType}. Here are the specifications needed: ${JSON.stringify(settingsList[briefType as keyof typeof settingsList].description)}.`;

    if (selectedFile && selectedFile.name) {
      // File has priority
      // const arrayBuffer = await selectedFile.file.arrayBuffer();
      // const fileBuffer = Buffer.from(arrayBuffer);
      const text = 'hello world'
      prompt += ` Text from the file for the brief is here: ${text}`;
    } else {
      // No file, use conversation
      prompt += ` Here is the conversation: ${conversation}`;
    }

    try {
      // Send the array of message parts, not just the prompt string!
      const result = await chatRef.current.sendMessage(prompt);
      const parsedText = JSON.parse(result.response.text());
      setResult(parsedText);
      setResultText(parsedText.briefText);
      setResultTable(parsedText.specsTable);
      return parsedText;
    } catch (err) {
      setResult('Error: ' + 'No response from Gemini -- ' + err);
    }
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
      
    } catch (err) {
      setResult('Error: ' + err)
    }
    setLoading(false)
  }

  return (
    <div className="app-container">
      <h1 className='header'>BriefBee <img className="header_logo" src={HoneyBee} alt="honey bee" /></h1>
      <div className='brief-type-selector'>
        <select
          value={briefType}
          onChange={e => setBriefType(e.target.value)}
        >
          {
            settingsList && Object.keys(settingsList).map((key) => {
              const { title } = settingsList[key as keyof typeof settingsList]
              return (
                <option key={key} value={key}>
                  {title}
                </option>
              )
            }
            )
          }
        </select>
        <button
          onClick={() => window.open(chrome.runtime.getURL('upload.html'), '_blank')}
        >
          Upload File
        </button>
          {
            selectedFile ? <span className='file_name'>{selectedFile.name} <button className='remove_file' onClick={()=>removeFile()}>×</button></span> :  null
          }
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>
      
      {result && (
        <div className="result-box">
          {resultText}
          <table className='result-table'>
            {resultTable && resultTable.map((row, index) => (
              <tr key={index} className='result-table-row'>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className='result-table-cell'>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
        </table>
        </div>
        
      )}
    </div>
  )
}

export default App