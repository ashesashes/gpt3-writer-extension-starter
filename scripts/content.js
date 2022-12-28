const insert = (content) => {
    //Find the Calmly editor input section
    const elements = document.getElementsByClassName('droid');

    if (elements.length === 0){
        return;
    }

    const element = elements[0]; 

    //Grab the first p tag so we can replace it with our injection 
    const pToRemove = element.childNodes[0]; 
    pToRemove.remove();

    //Split the content by \n 
    const splitContent = content.split('\n'); 

    //Wrap in p tags
    splitContent.forEach((content) => {
        const p = document.createElement('p');

        if (content === '') {
            const br = document.createElement('br');
            p.appendChild(br); 
        }else {
            p.textContent = content; 
        }
    });

    //Insert the HTML one at a time 
    element.appendChild(p); 

    //On Success return true 
    return true; 
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'inject') {
      const { content } = request;
  
      console.log(content);

      const result = insert(content);

      if (!result) {
        sendResponse({ status: 'failed' });
      }
  
      sendResponse({ status: 'success' });
    }
  });