chrome.runtime.onMessage.addListener(async data => {

    let url = chrome.runtime.getURL("popup.html");

    if ( data.type === 'notification' ) {
            chrome.notifications.create(
                '',
                {
                    type: 'basic',
                    title: 'Notify!',
                    message: data.message || 'Notify!',
                }
            );
    }

    console.log(err);
});

